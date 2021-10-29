import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as Sentry from "@sentry/react";
import App from "./App";
import { ClusterProvider } from "./providers/cluster";
import { RichListProvider } from "./providers/richList";
import { SupplyProvider } from "./providers/supply";
import { TransactionsProvider } from "./providers/transactions";
import { AccountsProvider } from "./providers/accounts";
import { BlockProvider } from "./providers/block";
import { StatsProvider } from "providers/stats";
import { MintsProvider } from "providers/mints";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://5efdc15b4828434fbe949b5daed472be@o434108.ingest.sentry.io/5390542",
  });
}

export enum ThemeMode {
  'light',
  'dark'
}

export interface IProps {
  themeMode: ThemeMode,
  switchTheme: () => void
}

export function Index() {
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.light);

  const switchTheme = (): void => {
    if(mode === ThemeMode.dark) setMode(ThemeMode.light);
    else if(mode === ThemeMode.light) setMode(ThemeMode.dark);
  }

  return (
    <Router>
      <ClusterProvider>
        <StatsProvider>
          <SupplyProvider>
            <RichListProvider>
              <AccountsProvider>
                <BlockProvider>
                  <MintsProvider>
                    <TransactionsProvider>
                      <App themeMode={mode} switchTheme={() => {switchTheme()}}/>
                    </TransactionsProvider>
                  </MintsProvider>
                </BlockProvider>
              </AccountsProvider>
            </RichListProvider>
          </SupplyProvider>
        </StatsProvider>
      </ClusterProvider>
    </Router>
  )
}

ReactDOM.render(
    <Index />,
  document.getElementById("root")
);
