import React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "../../components";

const theme = extendTheme({
  fonts: {
    heading: '"Source Sans Pro", sans-serif',
    body: '"Source Sans Pro", sans-serif',
    mono: "Menlo, monospace",
  },
  styles: {
    global: {
      body: {
        bg: "#141416",
      },
    },
  },
  colors: {
    red: {
      500: "#E26262",
    },
    purple: {
      500: "#575BCE",
    },
  },
});

const App = () => {
  return (
    <div className="App">
      <ChakraProvider theme={theme} resetCSS={true}>
        <Router>
          <Routes />
        </Router>
      </ChakraProvider>
    </div>
  );
};

export default App;
