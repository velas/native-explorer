import React from 'react';
import Logo from "img/logos-solana/dark-explorer-logo.svg";
import { clusterPath } from "utils/url";
import { Link, NavLink } from "react-router-dom";

export function Sidebar() {
    return (
        <div className="sidebar col-auto col-md-3 col-xl-2">
            <div className="d-flex flex-column align-items-center align-items-sm-start pt-2 text-white min-vh-100">
                <Link to={clusterPath("/")} className="logo w-50 mx-auto d-block">
                    <img src={Logo} alt="Velas Native Explorer"/>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <NavLink to={clusterPath("/")} className="nav-link align-middle" exact>
                            <span className="ms-1 d-none d-sm-inline">Cluster Stats</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={clusterPath("/supply")} className="nav-link align-middle">
                            <span className="ms-1 d-none d-sm-inline">Supply</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={clusterPath("/tx/inspector")} className="nav-link align-middle">
                            <span className="ms-1 d-none d-sm-inline">Inspector</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="https://evmexplorer.velas.com/" target="_blank" className="nav-link align-middle ">
                            <span className="ms-1 d-none d-sm-inline">EVM Explorer</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}