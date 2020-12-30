import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Switch, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import getRootReducer from "./redux/reducers";
import defaultConfig from "./config";

import EmployeeApp from "./EmployeeApp";
import { Header, HomeLink, Loader } from "@egovernments/digit-ui-react-components";
import { getI18n } from "react-i18next";
import { fetchBusinessServiceByTenant } from "./redux/actions";

export const TLReducers = getRootReducer;

export const TLModule = ({ deltaConfig = {}, stateCode, cityCode, moduleCode = "TL", userType, tenants }) => {
  const { path } = useRouteMatch();
  const state = useSelector((state) => state["tl"]);
  const disptach = useDispatch();
  const language = state?.common?.selectedLanguage;
  const store = Digit.Services.useStore(defaultConfig, { deltaConfig, stateCode, cityCode, moduleCode, language });

  useEffect(() => {
    if (state && !state.businessService) {
      disptach(fetchBusinessServiceByTenant("pb.amritsar", "TL"));
    }
    console.log("state", state);
  });

  if (Object.keys(store).length === 0) {
    return <Loader />;
  }

  Digit.SessionStorage.set("TL_TENANTS", tenants);

  console.log("tl", userType, tenants, state, store);
  console.log("tl i18n keys", Object.keys(getI18n().getDataByLanguage("en_IN").translations).length);
  console.log("state", state);

  if (userType === "citizen") {
    return <EmployeeApp />;
  } else {
    return <EmployeeApp />;
  }
};

export const TLLinks = ({ matchPath }) => (
  <React.Fragment>
    <Header>Complaints</Header>
    <HomeLink to={`${matchPath}/create-complaint`}>File a Complaint</HomeLink>
    <HomeLink to={`${matchPath}/complaints`}>My Complaints</HomeLink>
  </React.Fragment>
);
