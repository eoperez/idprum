import { Box, Typography } from '@mui/material';
import React from 'react'

export const TabPanel = (props: { [x: string]: any; children: any; value: any; index: any; }) => {
    const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
