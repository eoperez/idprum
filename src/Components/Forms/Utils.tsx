import { Grid, Paper, styled, Box, Stack, Typography} from '@mui/material'



export const FormItem = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export const FormTitle = styled(Paper)(({ theme }) => ({
    ...theme.typography.h4,
    padding: theme.spacing(0),
    textAlign: 'left'
}));

export const FormTitleText = styled(Box)(({ theme }) => ({
    ...theme.typography.h4,
    fontWeight: 'normal',
    display: 'inline',
    fontSize: 70,
    verticalAlign: 'text-top',
    textAlign: 'left',
    letterSpacing: 10,
    marginLeft: 10,
    marginTop: 10,
    color: theme.palette.primary.main,
}));

export const InDanger = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    paddingTop: 20
}));

export const FormButtons = styled(Stack)(({ theme }) => ({
    ...theme.typography.body2
}));

export const ItWorksLabel = styled(Typography)(({ theme }) => ({
    ...theme.typography.body2,
    marginTop: 10,
    fontSize: 12
}));

