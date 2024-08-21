import React from 'react';
import AbilityList from "../component/AbilityAllComponent";
import {Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            MainLayout
            <AbilityList/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;