import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer, EmployeeAppContainer } from "@egovernments/digit-ui-react-components";

import Tradelicence from "./pages/employee/index";
const App = () => {
  return (
    <EmployeeAppContainer>
      <Tradelicence />
    </EmployeeAppContainer>
  );
};

export default App;
