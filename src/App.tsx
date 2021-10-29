import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ClusterModal } from "components/ClusterModal";
import { MessageBanner } from "components/MessageBanner";
import { Navbar } from "components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { SearchBar } from "components/SearchBar";
import { AccountDetailsPage } from "pages/AccountDetailsPage";
import { TransactionInspectorPage } from "pages/inspector/InspectorPage";
import { ClusterStatsPage } from "pages/ClusterStatsPage";
import { SupplyPage } from "pages/SupplyPage";
import { TransactionDetailsPage } from "pages/TransactionDetailsPage";
import { BlockDetailsPage } from "pages/BlockDetailsPage";
import "./scss/theme.scss";
import {IProps, ThemeMode} from "./index";

const ADDRESS_ALIASES = ["account", "accounts", "addresses"];
const TX_ALIASES = ["txs", "txn", "txns", "transaction", "transactions"];

function App(props: IProps) {
  return (
    <div className={`container-fluid ${props.themeMode === ThemeMode.dark ? "dark" : ""}`}>
      <ClusterModal />
      <div className="row flex-nowrap">
        <Sidebar themeMode={props.themeMode} />
        <div className="main-content col py-3">
          <Navbar themeMode={props.themeMode} switchTheme={() => props.switchTheme()} />
          <MessageBanner />
          <div className="d-lg-none px-0 px-md-2 px-lg-3">
            <SearchBar />
          </div>
          <div className="px-0 px-md-2 px-lg-3">
            <Switch>
              <Route exact path={["/supply", "/accounts", "accounts/top"]}>
                <SupplyPage />
              </Route>
              <Route
                exact
                path={TX_ALIASES.map((tx) => `/${tx}/:signature`)}
                render={({ match, location }) => {
                  let pathname = `/tx/${match.params.signature}`;
                  return <Redirect to={{ ...location, pathname }} />;
                }}
              />
              <Route
                exact
                path={["/tx/inspector", "/tx/:signature/inspect"]}
                render={({ match }) => (
                  <TransactionInspectorPage signature={match.params.signature} />
                )}
              />
              <Route
                exact
                path={"/tx/:signature"}
                render={({ match }) => (
                  <TransactionDetailsPage signature={match.params.signature} />
                )}
              />
              <Route
                exact
                path={["/block/:id", "/block/:id/:tab"]}
                render={({ match }) => (
                  <BlockDetailsPage slot={match.params.id} tab={match.params.tab} />
                )}
              />
              <Route
                exact
                path={[
                  ...ADDRESS_ALIASES.map((path) => `/${path}/:address`),
                  ...ADDRESS_ALIASES.map((path) => `/${path}/:address/:tab`),
                ]}
                render={({ match, location }) => {
                  let pathname = `/address/${match.params.address}`;
                  if (match.params.tab) {
                    pathname += `/${match.params.tab}`;
                  }
                  return <Redirect to={{ ...location, pathname }} />;
                }}
              />
              <Route
                exact
                path={["/address/:address", "/address/:address/:tab"]}
                render={({ match }) => (
                  <AccountDetailsPage
                    address={match.params.address}
                    tab={match.params.tab}
                  />
                )}
              />
              <Route exact path="/">
                <ClusterStatsPage />
              </Route>
              <Route
                render={({ location }) => (
                  <Redirect to={{ ...location, pathname: "/" }} />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
