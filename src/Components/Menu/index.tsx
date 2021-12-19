import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import PlatGroupIcon from '@mui/icons-material/Yard';
import SymptomsIcon from '@mui/icons-material/Sick';
import PestsIcon from '@mui/icons-material/PestControl';

export const Menu = () => {
    const [Value, setValue] = useState(0);

    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    }

    return (
        <Tabs 
            value={Value} 
            onChange={handleChange} 
            aria-label="Main menu, options are: Plant Group, Symptoms and Pests" 
            variant="fullWidth"
        >
            <Tab icon={<PlatGroupIcon />} iconPosition="start" label="Plant Group" />
            <Tab icon={<SymptomsIcon />} iconPosition="start" label="Symptoms" />
            <Tab icon={<PestsIcon />} iconPosition="start" label="Pests" />
        </Tabs>
    );
}