import React from "react";
import { NativeBaseProvider } from "native-base";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Index from "./Routes";
import "./styles/styles.scss";

const App = () => {
  return (
    <NativeBaseProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Index />
      </LocalizationProvider>
    </NativeBaseProvider>
  );
};

export default App;
