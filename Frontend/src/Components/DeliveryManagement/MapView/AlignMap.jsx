import {Box,  Stack} from "@mui/material"
import DeliveryForm from "./DeliveryForm";
import MapView from "./MapView";
// import NavBar from "./NavBar";
import MapViewCss from './AlignMap.module.css';
import Footer from './Footer'

function App() {
  return (

    <Box  className={MapViewCss.body} >
      {/* <NavBar/> */}
      <Stack direction="row-reverse"  justifyContent={"inherit"}  > 
        {/* <Sidebar/> */}
        <DeliveryForm/>
        <MapView/>
        
      </Stack>
      {/* <Footer/> */}
    </Box>
       
  )
} 

export default App;
