import PestsIcon from '@mui/icons-material/PestControl';
import SymptomsIcon from '@mui/icons-material/Sick';
import PlantGroupIcon from '@mui/icons-material/Yard';
import { AppBar, Box, CssBaseline, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import './App.css';
import { AppNoficiation } from './Components/Notifications';
import { Pests } from './Components/Pages/Pests';
import { PlantGroups } from './Components/Pages/PlantGroups';
import { Symptoms } from './Components/Pages/Symptoms';
import { TabPanel } from './Components/TabPanel';
import { NotificationContextProvider } from './Contexts/Notification';
import { PestsContextProvider } from './Contexts/Pests';
import { SymptomsContextProvider } from './Contexts/Symptoms';
import { TreatmentsContextProvider } from './Contexts/Treatment';
import { UserContextProvider } from './Contexts/User';


function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const theme = createTheme({
  //Edit template as wanted: https://mui.com/customization/theming/
  palette: {
    primary: {
      main: '#354258',
    },
    secondary: {
      main: '#009688',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#1565c0',
    },
  },
});


// This App has 2 primary components: menu represented as AppBar and Content as SwipeableViews
function App() {
  const [Value, setValue] = useState(0);

  const handleTabsChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  }
  const handleTabPanelIdexChange = (index: number) => {
    setValue(index);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserContextProvider>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper' }}>
          <NotificationContextProvider>
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
            <TreatmentsContextProvider>
              <SymptomsContextProvider>
                <PestsContextProvider>
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
                </PestsContextProvider>
              </SymptomsContextProvider>
            </TreatmentsContextProvider>
            <AppNoficiation />
          </NotificationContextProvider>
        </Box>

      </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
