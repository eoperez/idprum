import { Cancel, SaveAs, Yard, GppGood, GppBad} from '@mui/icons-material';
import { Autocomplete, Button, Chip, createFilterOptions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { ChangeEvent, Fragment, useEffect, useState, useContext } from 'react';
import { NotificationContext } from '../../../Contexts/Notification';
import { TreatmentsContext } from '../../../Contexts/Treatment';
import { Pest } from '../../../Types/Pests';
import { PlantGroup, PlantGroupFormProps, Treatment, TreatmentDialog } from '../../../Types/PlantGroups';
import { Symptom } from '../../../Types/Symptoms';
import { FormButtons, FormItem, FormTitle, FormTitleText, InDanger, ItWorksLabel } from '../Utils';

const filter = createFilterOptions<TreatmentDialog>();

export const PlantGroupForm = (props: PlantGroupFormProps) => {
    const dialogInitialValue = {
        name: '',
        itWorked: false,
    }

    // Context needed
    const {treatmentsState, treatmentsDispatch} = useContext(TreatmentsContext);
    const {notificationState, notificationDispatch} = useContext(NotificationContext);
    
    // States to hold values of selected options
    const [platGroupRecord, setPlatGroupRecord] = useState<PlantGroup | undefined>(props.recordToEdit);
    const [activeFormRecord, setActiveFormRecord] = useState<any>(platGroupRecord);
    const [treatmentValue, setTreatmentValue] = useState<TreatmentDialog[]>(platGroupRecord?.treatments || []);
    const [symptomsValue, setSymptomsValue] = useState<Partial<Symptom>[]>(platGroupRecord?.symptoms || []);
    const [pestsValue, setPestValue] = useState<Partial<Pest>[]>(platGroupRecord?.pests || []);
    
    // States to hold temp values for UI component behaviors 
    const [open, toggleOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState(dialogInitialValue);
    
    // States to manage incoming lists
    const [treatmentList, setTreatmentList] = useState<Treatment[]>(props.treatments);
    const [symptomsList, setSymptomsList] = useState<Partial<Symptom>[]>(props.symptoms);
    const [pestsList, setPestList] = useState<Partial<Pest>[]>(props.pests);

    let actionType: string = 'New'
    if(platGroupRecord){
        actionType = 'Edit'
    }

    // Watch changes on complex fields
    useEffect(() => {
        setActiveFormRecord({
            ...activeFormRecord,
            ['treatments']: treatmentValue
        });
    }, [treatmentValue]);

    useEffect(() => {
        setActiveFormRecord({
            ...activeFormRecord,
            ['symptoms']: symptomsValue
        });
    }, [symptomsValue]);

    useEffect(() => {
        setActiveFormRecord({
            ...activeFormRecord,
            ['pests']: pestsValue
        });
    }, [pestsValue]);

    

    const handleDialogClose = () => {
        setDialogValue(dialogInitialValue);
        toggleOpen(false);
    };

    const handleDialogFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newValueCollection = [...treatmentValue];
        const foundInNewDialogTreatments = newValueCollection.find(treatmentObject => treatmentObject.name === dialogValue.name);
        if (foundInNewDialogTreatments) {
            console.log('Found in foundInNewDialogTreatments', foundInNewDialogTreatments);
            notificationDispatch({type: 'setNotification', payload:{
                type: "error",
                message: "Treatment with selected name already added to the list",
                isActive: true
            }});
        } else {
            newValueCollection.push({
                name: dialogValue.name,
                itWorked: dialogValue.itWorked,
            });
            setTreatmentValue(newValueCollection);
            handleDialogClose();
        }
    };

    const handleRecordFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.handleAddEditAction(actionType, activeFormRecord);
    };

    const onRecordFormFieldChange = (event: any) => {
        let value = event.target.value;
        if(event.target.name === "boolean"){
            value = event.target.checked;
        }
        setActiveFormRecord({
          ...activeFormRecord,
          [event.target.id]: value
        });
    };

    const handleTreatmentsOnChange = (event: any, selectionArray: any) => {
        
        const newValue: any = selectionArray[selectionArray.length - 1];
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                    name: newValue,
                    itWorked: false,
                });
            });
        } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
                name: newValue.inputValue,
                itWorked: false,
            });
        } else {
            setTreatmentValue(selectionArray);
        }
    }

    const handleSymptomsOnChange = (event: any, selectionArray: any) => {
        setSymptomsValue(selectionArray);
    }

    const handlePestsOnChange = (event: any, selectionArray: any) => {
        setPestValue(selectionArray);
    }

    const handleFilterOptions = (options: any, params: any) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
            filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
            });
        }
        return filtered;
    }

    const handleGetOptionLabel = (option: any) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.name;
    }

    const handleDialogOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.id === 'itWorks') {
            setDialogValue({
                ...dialogValue,
                itWorked: event.target.checked,
            });
        } else {
            setDialogValue({
                ...dialogValue,
                name: event.target.value,
            });
        }
    }
    
    const handleRenderTags = (tagValue: Array<Treatment>, getTagProps: Function) => {
        return tagValue.map((option, index) => (
          <Chip 
            color={option.itWorked ? "success" : "error" }
            icon={option.itWorked ? <GppGood /> : <GppBad /> } 
            {...getTagProps({ index })} 
            label={option.name} />
        ));
    }
    return (
        <Fragment>
            <form onSubmit={handleRecordFormSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <FormTitle variant="outlined" square  >
                            <Yard sx={{ fontSize: 80, verticalAlign: 'text-top', marginTop: .5 }} color='secondary' />
                            <FormTitleText>{actionType} Plant Group</FormTitleText>
                        </FormTitle>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <TextField required fullWidth value={activeFormRecord?.commonName} onChange={onRecordFormFieldChange} label="Common Name" id="commonName" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <TextField fullWidth value={activeFormRecord?.scientificName} onChange={onRecordFormFieldChange} label="Scientific Name" id="scientificName" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <InDanger elevation={0}>
                            <FormControlLabel
                                value="start"
                                control={<Switch name="boolean" id='isInDanger' onChange={onRecordFormFieldChange}  color="error"/>}
                                label="In danger specie?"
                                labelPlacement="start"
                        />
                        </InDanger>
                    </Grid>
                    <Grid item xs={12}>
                        <FormItem elevation={0}>
                            <TextField multiline value={activeFormRecord?.description} onChange={onRecordFormFieldChange} rows={4} fullWidth label="Description" id="description" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <TextField fullWidth value={activeFormRecord?.location} onChange={onRecordFormFieldChange} label="Location" id="location" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <TextField fullWidth value={activeFormRecord?.soilType} onChange={onRecordFormFieldChange} label="Soil Type" id="soilType" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <TextField fullWidth value={activeFormRecord?.specie} onChange={onRecordFormFieldChange} label="Specie" id="specie" />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <Autocomplete
                                value={treatmentValue}
                                multiple
                                fullWidth
                                onChange={handleTreatmentsOnChange}
                                filterOptions={handleFilterOptions}
                                id="treatment"
                                options={treatmentList}
                                getOptionLabel={handleGetOptionLabel}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                renderOption={(props, option) => <li {...props}>{option?.name}</li>}
                                freeSolo
                                renderInput={(params) => <TextField {...params} label="Treatment" />}
                                renderTags={handleRenderTags}
                            />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                            <Autocomplete
                                id="symptoms"
                                value={symptomsValue}
                                options={symptomsList}
                                getOptionLabel={(option: any) => option.name}
                                onChange={handleSymptomsOnChange}
                                multiple
                                fullWidth
                                renderInput={(params) => <TextField {...params} label="Symptoms" />}
                            />
                        </FormItem>
                    </Grid>
                    <Grid item xs={4}>
                        <FormItem elevation={0}>
                                <Autocomplete
                                    id="pests"
                                    value={pestsValue}
                                    options={pestsList}
                                    getOptionLabel={(option: any) => option.commonName}
                                    onChange={handlePestsOnChange}
                                    multiple
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Pests" />}
                                />
                        </FormItem>
                    </Grid>
                    <Grid item xs={12}>
                        <FormItem variant="outlined" square sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                            <FormButtons direction="row" spacing={2} justifyContent="flex-end">
                                <Button onClick={props.handleDrawerClose} variant="outlined" startIcon={<Cancel />}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" endIcon={<SaveAs />}>
                                    Save
                                </Button>
                            </FormButtons>
                        </FormItem>
                    </Grid>
                </Grid>
            </form>
            <Dialog open={open} onClose={handleDialogClose}>
            <form onSubmit={handleDialogFormSubmit}>
                <DialogTitle>New treatment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please add a new treatment.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.name}
                        onChange={handleDialogOnChange}
                        label="Name"
                        type="text"
                        variant="standard"
                    />
                    <FormControlLabel
                        value="start"
                        control={<Switch id="itWorks" onChange={handleDialogOnChange} />}
                        label={
                            <ItWorksLabel>
                            Does it works?
                            </ItWorksLabel>
                        }
                        labelPlacement="top"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </form>
            </Dialog>
        </Fragment>
    )
}
