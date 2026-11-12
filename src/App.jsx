import { useState } from "react";
import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";

import { Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList/CountryList";
import CountryDetails from "./components/CountryDetails/CountryDetails";

function App() {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={<CountryList />} />

        <Route path="/country/:countryId" element={<CountryDetails />} />

      </Routes>
    </>
  );
}

export default App;
