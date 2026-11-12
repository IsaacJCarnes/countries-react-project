import { useState, useEffect, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetch from "../hooks/useFetch";
export const FilterContext = createContext(null);
export const ThemeContext = createContext(null);
export const CountriesContext = createContext(null);

import fallbackData from "../assets/fallback-data.js";

const fetchCountryData = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://countries-api-project.isaacjdeveloper.workers.dev/countries/v5?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Could not get API data");
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch {
    throw new Error("Could not recieve API data, using fallback data");
  }
};

export function AppProvider({ children }) {
  const { storageData, setStorageItem } = useLocalStorage();
  const countries = storageData.countries ?? [];

  useEffect(() => {
    const msPerMinute = 1000 * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const dayRefreshLimit = 2;
    const countriesArray = storageData["LastCountryArray"] ?? [];
    const msSinceStored = storageData["LastStoredDate"]
      ? new Date().getTime() - new Date(storageData["LastStoredDate"]).getTime()
      : null;
    const daysSinceStored = Math.floor(msSinceStored / msPerDay);

    if (daysSinceStored <= dayRefreshLimit && countriesArray.length !== 0)
      return;

    async function assembleCountryArray() {
      try {
        //Attempt to get/reduce country array from country API
        let countryArray = [];
        const countryData1 = await fetchCountryData(100, 0);
        if (countryData1?.data?.objects)
          countryArray = countryArray.concat(countryData1.data.objects);
        const countryData2 = await fetchCountryData(100, 100);
        if (countryData2?.data?.objects)
          countryArray = countryArray.concat(countryData2.data.objects);
        const countryData3 = await fetchCountryData(100, 200);
        if (countryData3?.data?.objects)
          countryArray = countryArray.concat(countryData3.data.objects);
        setStorageItem("LastCountryArray", reduceCountryArray(countryArray));
        setStorageItem("LastStoredDate", new Date().toISOString());
      } catch (e) {
        console.error(e);
        const importedArray = await import("../assets/fallback-data.js");
        setStorageItem("LastCountryArray", importedArray["default"]);
        setStorageItem("LastStoredDate", new Date().toISOString());
      }
    }

    assembleCountryArray();
  }, []);

  function getCountryByID(id) {
    const filteredList = countries.filter((country) => country.id === id);
    return filteredList.length > 0 ? filteredList[0] : null;
  }

  const [filter, setFilter] = useState({});

  const theme = storageData.theme ? storageData.theme : "light";

  function toggleTheme() {
    setStorageItem("theme", theme === "light" ? "dark" : "light");
  }

  return (
    <CountriesContext.Provider
      value={{
        countries,
        getCountryByID,
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

/*
export async function getCountryData() {
  try {
    //Attempt to get/reduce country array from country API
    let countryArray:Array<Object> = [];
    const countryData1 = await fetchCountryData(100, 0);
    if (countryData1?.data?.objects)
      countryArray = countryArray.concat(countryData1.data.objects)
    const countryData2 = await fetchCountryData(100, 100);
    if (countryData2?.data?.objects)
      countryArray = countryArray.concat(countryData2.data.objects)
    const countryData3 = await fetchCountryData(100, 200);
    if (countryData3?.data?.objects)
      countryArray = countryArray.concat(countryData3.data.objects)    
    return reduceCountryArray(countryArray);
  } catch (e){
    console.error(e);
    // @ts-expect-error fallback-data.js does not provide TypeScript declarations.
    const importedArray = await import("../../assets/fallback-data.js");
    return importedArray["default"];
  }
}

async function fetchCountryData(limit: number, offset: number) {
  try {
    const response = await fetch(
      `https://countries-api-project.isaacjdeveloper.workers.dev/countries/v5?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error("Could not get API data");
    }
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch {
    throw new Error("Could not recieve API data, using fallback data");
  }
}

function reduceCountryArray(inputArray: Array<any>): Country[] {
  return inputArray.map((country: any) => {
    //Native Name
    const nativeNames = country["names"]?.["native"] ?? {};
    const firstNativeKey = Object.keys(nativeNames)[0];
    const nativeNameType = firstNativeKey
      ? (nativeNames[firstNativeKey] as Record<string, string> | undefined)
      : undefined;
    const firstTypeKey = nativeNameType ? Object.keys(nativeNameType)[0] : "";
    const nativeName =
      nativeNameType && firstTypeKey
        ? (nativeNameType[firstTypeKey] ?? "")
        : "";
    //Country Capital
    const capital: string = country["capitals"][0]?.name;
    //Country Currencies
    const currencies = country["currencies"].map(
      (currency: Record<string, string>) => currency?.name,
    );
    //Country Languages
    const languages = country["languages"].map(
      (language: Record<string, string>) => language?.name,
    );
    return {
      index: country["index"],
      name: country["names"]["common"],
      nativeName: nativeName,
      population: country["population"],
      region: country["region"],
      subregion: country["subregion"],
      capital: capital,
      tlds: country["tlds"],
      currencies: currencies,
      languages: languages,
      borders: country["borders"],
      code: country["codes"]["alpha_3"],
      flagUrl: country["flag"]["url_svg"],
    };
  });
}
  */

/*
const msPerMinute = 1000 * 60;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const dayRefreshLimit = 2;
//If recent local storage is available, use that instead or remaking an API call on every refresh
export function getLocallyStoredData(): Array<any> | null {
  const storedData = localStorage.getItem("LastCountryArray");
  if (!storedData) return null;
  const storedJsonData = JSON.parse(storedData);
  if (
    storedJsonData["date"] === "undefined" ||
    storedJsonData["countryArray"] === "undefined"
  )
    return null;
  const msSinceStored =
    new Date().getTime() - new Date(storedJsonData["date"]).getTime();

  const daysSinceStored = Math.floor(msSinceStored / msPerDay);

  if (daysSinceStored > dayRefreshLimit) return null;
  return storedJsonData["countryArray"];
}

export function setLocallyStoredData(countryArray: Array<any>): void {
  localStorage.setItem(
    "LastCountryArray",
    JSON.stringify({
      date: new Date().toISOString(),
      countryArray: countryArray,
    }),
  );
}
*/
