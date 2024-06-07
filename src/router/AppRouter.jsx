import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Country from "../pages/country/Country.jsx";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/selected-country" element={<Country />} />
        </Routes>
    );
};

export default AppRouter;
