import React from 'react';
import './App.css';
import { Box, Grid, Paper, styled, } from '@mui/material';
import { Menu } from "./Components/Menu";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Menu></Menu>
        </Grid>
        <Grid item xs={12}>
          <Item>xs=12</Item>
        </Grid>
      </Grid>
    </Box>

  );
}

export default App;
