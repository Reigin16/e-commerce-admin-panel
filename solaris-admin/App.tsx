import React from "react";
import { createTheme, darkColors, ThemeProvider } from "@rneui/themed";
import Component from "./components/MyComponent";
import {registerRootComponent} from 'expo'


export default function App() {
  return (
    <ThemeProvider theme={{darkColors}}>
      <Component />
    </ThemeProvider>
  );
}
registerRootComponent(App)
