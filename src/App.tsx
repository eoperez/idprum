import PestsIcon from '@mui/icons-material/PestControl';
import SwipeableViews from 'react-swipeable-views';
import SymptomsIcon from '@mui/icons-material/Sick';
import PlantGroupIcon from '@mui/icons-material/Yard';
import { AppBar, Box, Tab, Tabs, useTheme } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { TabPanel } from './Components/TabPanel';
import { PlantGroups } from './Components/Pages/PlantGroups';
import { Symptoms } from './Components/Pages/Symptoms';
import { Pests } from './Components/Pages/Pests';

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
// This App has 2 primary components: menu represented as AppBar and Content as SwipeableViews
function App() {
  const theme = useTheme();
  const [Value, setValue] = useState(0);

  const handleTabsChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  }
  const handleTabPanelIdexChange = (index: number) => {
    setValue(index);
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
      {/* Main menu of the application */}
      <AppBar position="static">
        <Tabs
          value={Value}
          onChange={handleTabsChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="IDPRUM Main Options: Plant Group, Symptoms and Pests"
        >
          <Tab icon={<PlantGroupIcon />} iconPosition="start" label="Plant Groups" {...a11yProps(0)} />
          <Tab icon={<SymptomsIcon />} iconPosition="start" label="Symptoms" {...a11yProps(1)} />
          <Tab icon={<PestsIcon />} iconPosition="start" label="Pests" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* Content of the application */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={Value}
        onChangeIndex={handleTabPanelIdexChange}
      >
        <TabPanel value={Value} index={0} dir={theme.direction}>
          <PlantGroups />
        </TabPanel>
        <TabPanel value={Value} index={1} dir={theme.direction}>
          <Symptoms />
        </TabPanel>
        <TabPanel value={Value} index={2} dir={theme.direction}>
          <Pests />
        </TabPanel>
      </SwipeableViews>
    </Box>

  );
}

export default App;
