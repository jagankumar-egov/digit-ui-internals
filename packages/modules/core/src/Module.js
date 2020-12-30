import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch, useRouteMatch, Redirect, Link } from "react-router-dom";
import { getI18n, useTranslation } from "react-i18next";
import { useWindowSize } from "rooks";
import { PGRModule, PGRLinks, PGRReducers } from "@egovernments/digit-ui-module-pgr/src/Module";
import { FSMModule, FSMLinks } from "@egovernments/digit-ui-module-fsm/src/Module";
// import { TLModule,TLLinks } from "@egovernments/digit-ui-module-tl/src/Module";
import { Body, TopBar, Loader, PrivateRoute } from "@egovernments/digit-ui-react-components";

import getStore from "./redux/store";
import { TLModule, TLLinks } from "../../tl/src/Module";

const getTenants = (codes, tenants) => {
  return tenants.filter((tenant) => codes.map((item) => item.code).includes(tenant.code));
};

const AppModules = ({ stateCode, userType, modules, appTenants }) => {
  const { path } = useRouteMatch();
  const moduleList = ["PGR", "FSM", "TL"];

  const appRoutes = modules
    .filter((module) => moduleList.includes(module.code))
    .map(({ code, tenants }, index) => {
      if (code === "PGR") {
        return (
          <Route key={index} path={`${path}/pgr`}>
            <PGRModule stateCode={stateCode} cityCode="pb.amritsar" moduleCode={code} userType={userType} tenants={getTenants(tenants, appTenants)} />
          </Route>
        );
      }
      return;
    });

  return (
    <Switch>
      {appRoutes}
      {/* TODO: remove once FSM is enabled via MDMS */}
      <Route path={`${path}/fsm`}>
        <FSMModule stateCode={stateCode} cityCode="pb.amritsar" moduleCode="FSM" userType={userType} />
      </Route>
      <Route path={`${path}/tl`}>
        <TLModule stateCode={stateCode} cityCode="pb.amritsar" moduleCode="TL" userType={userType} />
      </Route>
      <Route>
        <AppHome userType={userType} />
      </Route>
    </Switch>
  );
};

const AppHome = ({ userType }) => {
  if (userType === "citizen") {
    return (
      <React.Fragment>
        <PGRLinks matchPath={`/digit-ui/${userType}/pgr`} userType={userType} />
        <FSMLinks matchPath={`/digit-ui/${userType}/fsm`} userType={userType} />
        <TLLinks matchPath={`/digit-ui/${userType}/tl`} userType={userType} />
      </React.Fragment>
    );
  }
  return (
    <div className="employee-app-container">
      <div className="ground-container">
        <div className="employeeCard">
          <div className="complaint-links-container">
            <div className="header">
              <span className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <span className="text">Complaints</span>
            </div>
            <div className="body">
              <span className="link">
                <Link to="/digit-ui/employee/pgr/inbox">Inbox</Link>
              </span>
              <span className="link">
                <Link to="/digit-ui/employee/pgr/complaint/create">New Complaint</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextToImg = ({ name }) => <span className="user-img-txt">{name[0].toUpperCase()}</span>;
const ulbCamel = (ulb) =>
  ulb
    .toLowerCase()
    .split(" ")
    .map((text) => text.substr(0, 1).toUpperCase() + text.substr(1))
    .join(" ");

const DigitUIApp = ({ stateCode, modules, appTenants, logoUrl, cityCode }) => {
  const { t } = useTranslation();
  const { innerWidth } = useWindowSize();
  const cityDetails = appTenants.find((tenant) => tenant.code === cityCode);
  const userDetails = Digit.SessionStorage.get("User");

  const mobileView = innerWidth <= 640;

  return (
    <Switch>
      <Route path="/digit-ui/employee">
        <div className="topbar">
          <img className="city" src={cityDetails.logoId} />
          <span className="ulb">
            {t(cityDetails.i18nKey)} {ulbCamel(t("ULBGRADE_MUNICIPAL_CORPORATION"))}
          </span>
          {!mobileView && (
            <div className="right">
              <TextToImg name={userDetails?.info?.name || userDetails?.info?.userInfo?.name || "Employee"} />
              <img className="state" src={logoUrl} />
            </div>
          )}
        </div>
        {!mobileView && (
          <div className="sidebar">
            <Link to="/digit-ui/employee">
              <div className="actions active">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white" />
                </svg>
              </div>
            </Link>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M8.17 5.7L1 10.48V21h5v-8h4v8h5V10.25z" fill="white" />
                  <path d="M17 7h2v2h-2z" fill="none" />
                  <path d="M10 3v1.51l2 1.33L13.73 7H15v.85l2 1.34V11h2v2h-2v2h2v2h-2v4h6V3H10zm9 6h-2V7h2v2z" fill="white" />
                </svg>
              </div>
            </a>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"
                    fill="white"
                  />
                </svg>
              </div>
            </a>
            <a href="/employee">
              <div className="actions">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M24 0H0v24h24z" fill="none" />
                  <path
                    d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"
                    fill="white"
                  />
                </svg>
              </div>
            </a>
          </div>
        )}
        <div className="main">
          <AppModules stateCode={stateCode} userType="employee" modules={modules} appTenants={appTenants} />
        </div>
      </Route>
      <Route path="/digit-ui/citizen">
        <TopBar img={"https://egov-micro-qa.egovernments.org/egov-dev-assets/logo-mseva-white.png"} />
        <div className="main">
          <AppModules stateCode={stateCode} userType="citizen" modules={modules} appTenants={appTenants} />
        </div>
      </Route>
      <Route>
        <Redirect to="/digit-ui/citizen" />
      </Route>
    </Switch>
  );
};

export const DigitUI = ({ stateCode }) => {
  const cityCode = "pb.amritsar";
  const userType = Digit.SessionStorage.get("userType") || "citizen";
  const initData = Digit.Services.useInitStore(stateCode);
  const queryClient = new QueryClient();

  if (Object.keys(initData).length === 0) {
    return <Loader page={true} />;
  }

  const i18n = getI18n();

  console.log("common i18n keys", Object.keys(i18n.getDataByLanguage("en_IN").translations).length);

  return (
    <div className={userType}>
      <Provider store={getStore(initData, { pgr: PGRReducers(initData) })}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Body>
              <DigitUIApp
                stateCode={stateCode}
                modules={initData?.modules}
                appTenants={initData.tenants}
                logoUrl={initData?.stateInfo?.logoUrl}
                cityCode={cityCode}
              />
            </Body>
          </Router>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};
