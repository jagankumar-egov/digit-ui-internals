import { BackButton } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Employee } from "../../constants/Routes";
import Search from "./Search";

const Tradelicence = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const match = useRouteMatch();

  function popupCall(option) {
    console.log("option", option);
    setDisplayMenu(false);
    setPopup(true);
  }
  return (
    <React.Fragment>
      <div className="ground-container">
        <BackButton>Back</BackButton>
        <Switch>
          <Route path={match.url + Employee.Search} component={Search} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Tradelicence;
