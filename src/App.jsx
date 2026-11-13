import { useContext, useState } from "react";
import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";

import { Routes, Route, useHref } from "react-router-dom";
import CountryList from "./components/CountryList/CountryList";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import { ThemeContext } from "./context/AppProvider";

function App() {
  const { theme } = useContext(ThemeContext);
  const basename = useHref("/");
  return (
    <div id="App" className={theme}>
      <PageHeader />
      <Routes>
        <Route path={`${basename}/`} element={<CountryList />} />

        <Route
          path={`${basename}/country/:countryIndex`}
          element={<CountryDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
