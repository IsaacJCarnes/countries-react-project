import { useState, useEffect, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetch from "../hooks/useFetch";
import fallbackData from "../assets/fallback-data.js";
import { reduceCountryArray } from "../utils/CountriesUtils.js";
export const FilterContext = createContext(null);
export const ThemeContext = createContext(null);
export const CountriesContext = createContext(null);

const countryApiUrl =
  "https://countries-api-project.isaacjdeveloper.workers.dev/countries/v5";
const msPerDay = 24 * 60 * 60 * 1000;
const dayRefreshLimit = 2;

export function AppProvider({ children }) {
  const [doneLoading, setDoneLoading] = useState(false);
  const { storageData, setStorageItem, isLoaded } =
    useLocalStorage("CountryViewer");
  const storedCountryArray = storageData.countries ?? [];
  const storedDate = Date.parse(storageData.storedDate);
  const hasRecentCountryData =
    storedCountryArray.length > 0 &&
    Math.floor((Date.now() - storedDate) / msPerDay) <= dayRefreshLimit;

  const fetchCountryData = (url, canFetch = false) => {
    return useFetch(canFetch ? url : null);
  };

  const shouldFetchCountryData = isLoaded && !hasRecentCountryData;

  const {
    data: countryData1,
    loading: countryLoading1,
    error: countryError1,
  } = fetchCountryData(
    `${countryApiUrl}?limit=100&offset=0`,
    shouldFetchCountryData,
  );
  const {
    data: countryData2,
    loading: countryLoading2,
    error: countryError2,
  } = fetchCountryData(
    `${countryApiUrl}?limit=100&offset=100`,
    shouldFetchCountryData,
  );
  const {
    data: countryData3,
    loading: countryLoading3,
    error: countryError3,
  } = fetchCountryData(
    `${countryApiUrl}?limit=100&offset=200`,
    shouldFetchCountryData,
  );

  useEffect(() => {
    if (!shouldFetchCountryData || doneLoading) return;

    if (countryError1 || countryError2 || countryError3) {
      console.error(
        "Could not retrieve country data; using fallback data.",
        errors,
      );
      setDoneLoading(true);
      setStorageItem("countries", fallbackData);
      setStorageItem("storedDate", new Date().toISOString());
      return;
    }
    if (
      !countryData1?.data?.objects ||
      !countryData2?.data?.objects ||
      !countryData3?.data?.objects
    )
      return;

    const countryObjects = [
      countryData1?.data?.objects,
      countryData2?.data?.objects,
      countryData3?.data?.objects,
    ];
    if (!countryObjects.every((value) => Array.isArray(value))) {
      console.error(
        "Country API returned an invalid response; using fallback data.",
      );
      setDoneLoading(true);
      setStorageItem("countries", fallbackData);
      setStorageItem("storedDate", new Date().toISOString());
      return;
    }

    const countryArray = countryObjects.flat();
    setDoneLoading(true);
    setStorageItem("countries", reduceCountryArray(countryArray));
    setStorageItem("storedDate", new Date().toISOString());
  }, [
    shouldFetchCountryData,
    countryData1,
    countryData2,
    countryData3,
    countryLoading1,
    countryLoading2,
    countryLoading3,
    countryError1,
    countryError2,
    countryError3,
  ]);

  const [filter, setFilter] = useState({});

  const theme = storageData.theme ? storageData.theme : "light";

  const toggleTheme = () => {
    setStorageItem("theme", theme === "light" ? "dark" : "light");
  }

  return (
    <CountriesContext.Provider
      value={{
        isLoading: doneLoading,
        countries: storedCountryArray,
      }}
    >
      <FilterContext.Provider value={{ filter, setFilter }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </FilterContext.Provider>
    </CountriesContext.Provider>
  );
}
