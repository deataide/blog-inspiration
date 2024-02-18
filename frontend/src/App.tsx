import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import SignIn from "./pages/SignIn/SignIn";

import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider cssVarsRoot={undefined}>
      <SignIn/>
    </ChakraProvider>
  );
}

export default App;
