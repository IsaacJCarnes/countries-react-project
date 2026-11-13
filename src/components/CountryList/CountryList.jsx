import { useContext } from "react";
import { CountriesContext } from "../../context/AppProvider";
import CountryItem from "./CountryItem";
import { filterCountries } from "../../utils/CountriesUtils";

function CountryList() {
  const { countries } = useContext(CountriesContext);
  return (
    <section id="country-list-section">
      <ul id="country-list">
        {countries &&
          countries.map((country) => <CountryItem country={country} />)}
      </ul>
    </section>
  );
}

export default CountryList;
