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
  const { storageData, setStorageItem, setStorageItems, isLoaded } =
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
      const indexedArray = fallbackData.map((country, index) => ({
        ...country,
        index,
      }));
      setStorageItems({
        countries: indexedArray,
        storedDate: new Date().toISOString(),
      });
      setDoneLoading(true);
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
      const indexedArray = fallbackData.map((country, index) => ({
        ...country,
        index,
      }));
      setStorageItems({
        countries: indexedArray,
        storedDate: new Date().toISOString(),
      });
      setDoneLoading(true);
      return;
    }

    const countryArray = countryObjects.flat();
    const reducedArray = reduceCountryArray(countryArray);
    const indexedArray = reducedArray.map((country, index) => ({
      ...country,
      index,
    }));
    setStorageItems({
      countries: indexedArray,
      storedDate: new Date().toISOString(),
    });
    setDoneLoading(true);
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

  const changeFilter = (name, value) => {
    setFilter({...filter, [name]: value})
  }


  const theme = storageData.theme ? storageData.theme : "light";

  const toggleTheme = () => {
    setStorageItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <CountriesContext.Provider
      value={{
        isLoading: doneLoading,
        countries: storedCountryArray,
      }}
    >
      <FilterContext.Provider value={{ filter, changeFilter, setFilter }}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </FilterContext.Provider>
    </CountriesContext.Provider>
  );
}
