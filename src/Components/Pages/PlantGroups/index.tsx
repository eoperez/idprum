import { AddBox, DeleteForever, Edit } from '@mui/icons-material';
import { Button, Container, Drawer, IconButton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { NotificationContext } from '../../../Contexts/Notification';
import { PestsContext } from '../../../Contexts/Pests';
import { SymptomsContext } from '../../../Contexts/Symptoms';
import { TreatmentsContext } from '../../../Contexts/Treatment';
import { PlantGroup } from '../../../Types/PlantGroups';
import { PlantGroupForm } from '../../Forms/PlantGroups';

export const PlantGroups = () => {
    const addBtnName: string = 'Plant Groups'
    const {notificationState, notificationDispatch} = useContext(NotificationContext);
    const {treatmentsState, treatmentsDispatch} = useContext(TreatmentsContext)
    const {symptomsState, symptomsDispatch} = useContext(SymptomsContext);
    const {pestsState, pestsDispatch} = useContext(PestsContext);
    const [activeRecord, setActiveRecord] = useState<PlantGroup | undefined>();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const useStyles = makeStyles({
        paper: {
            height: 'calc(100% - 80px)',
            top: 80,
            padding: '30px'
        }
    });
    const classes = useStyles();

    const editRecord = (targetRecord: Partial<PlantGroup>) => {
        console.log('plant group to edit', targetRecord);
        setActiveRecord(targetRecord as PlantGroup);
        setIsDrawerOpen(true);
    }

    const deleteRecord = (targetRecord: Partial<PlantGroup>) => {
        console.log('plant group to delete', targetRecord)
    }

    const addRecord = () => {
        setActiveRecord(undefined);
        setIsDrawerOpen(true);
    }

    const handleAddEditAction = (action: string, targetRecord: any) => {
        if(action === 'New'){
            console.log('Saving New:', targetRecord);
            // TODO: use Axios to POST Save
        } else {
            console.log('Saving Edit:', targetRecord);
            // TODO: use Axios to PUT Save
        }
        setIsDrawerOpen(false);
        notificationDispatch({
            type: 'setNotification',
            payload: {
                isActive: true,
                message: `${action} record: ${targetRecord.commonName} saved.`,
                type: 'success'
            }
        })
    }

    const rowActionHandler = (record: Partial<PlantGroup>, action: string) => {
        switch (action) {
            case 'edit':
                editRecord(record);
                break;
            case 'delete':
                deleteRecord(record)
                break;
            default:
                break;
        }
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    const renderActions = (params: any) => {
        return (
            <Stack spacing={0} direction="row">
                <IconButton aria-label="Delete" color="error" onClick={() => {
                    rowActionHandler(params.row, 'delete')
                }}>
                    <DeleteForever />
                </IconButton>
                <IconButton aria-label="Edit" color="warning" onClick={() => {
                    rowActionHandler(params.row, 'edit')
                }}>
                    <Edit />
                </IconButton>
            </Stack>
        )

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.1 },
        { field: 'commonName', headerName: 'Common Name', flex: 0.1 },
        { field: 'scientificName', headerName: 'Scientific Name', flex: 0.3 },
        { field: 'description', headerName: 'Description', flex: 0.3 },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            renderCell: renderActions
        }
    ];

    const rows: Partial<PlantGroup>[] = [];
    for (let index = 0; index < 50; index++) {
        const rid = (Math.random() + 1).toString(36).substring(7);
        rows.push(
            { 
                id: rid, 
                commonName: 'Planta de coco', 
                scientificName: 'Plantanuscocunus', 
                description: 'Agrupa a todas las plantas de coco que existen.',
                location: 'Area norte PR',
                soilType: 'Arena',
                isInDanger: false,
                specie: 'Counonus',
                treatments: [
                    { id: '1', name: 'Disolusión en serie de alcohol 50%', itWorked: false},
                    { id: '2', name: 'Disolusión en serie de alcohol 60%', itWorked: false},
                    { id: '3', name: 'Disolusión en serie de alcohol 70%', itWorked: false}
                ]
            },
        );

    }


    return (
        <Container fixed>
            <Stack spacing={2} direction="row">
                <Button color="success" variant="outlined" startIcon={<AddBox />} onClick={addRecord}>
                    Add {addBtnName}
                </Button>
            </Stack>
            <div style={{ height: 400, width: '100%', marginTop: '10px' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>
            <Drawer
                anchor="bottom"
                variant="temporary"
                open={isDrawerOpen}
                classes={{paper: classes.paper}}
                onClose={handleDrawerClose}
            >
                <PlantGroupForm
                    recordToEdit={activeRecord}
                    treatments={treatmentsState.treatmentsCollection}
                    symptoms={symptomsState.symptomsCollection}
                    pests={pestsState.pestsCollection}
                    handleDrawerClose={handleDrawerClose}
                    handleAddEditAction={handleAddEditAction}
                />
            </Drawer>
        </Container>
    )
}

