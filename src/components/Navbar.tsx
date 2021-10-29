import React from "react";
import Switch from 'react-switch';
import {ClusterStatusButton} from "components/ClusterStatusButton";
import {SearchBar} from "./SearchBar";
import {IProps, ThemeMode} from "../index";


export function Navbar(props: IProps) {
  const { themeMode, switchTheme } = props;
  // TODO: use `collapsing` to animate collapsible navbar

  return (
    <nav className="navbar navbar-expand-md navbar-light px-0 px-md-2 px-lg-3 py-0">
      <div className="container-fluid justify-content-end">
        <div className="mr-5 flex-grow-1 d-none d-lg-block">
          <SearchBar />
        </div>
        <div className="mr-5 d-flex">
          <Switch
            checked={ themeMode === ThemeMode.light}
            onChange={ () => {switchTheme()} }
            checkedIcon={false}
            uncheckedIcon={false}
            onColor="#fff"
            offColor="#141C2B"
            onHandleColor="#141C2B"
            offHandleColor="#fff"
            className="theme-switch"
          />
        </div>
        <div>
          <ClusterStatusButton />
        </div>
      </div>
    </nav>
  );
}
