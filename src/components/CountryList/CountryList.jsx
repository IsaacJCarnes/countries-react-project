import { useContext } from "react";
import { Link } from "react-router-dom";
import { CountriesContext } from "../../context/AppProvider.jsx";
import CountryItem from "./CountryItem.jsx";
import { filterCountries } from "../../utils/CountriesUtils";
import FilterSection from "../FilterSection/FilterSection.jsx";

function CountryList() {
  const { countries } = useContext(CountriesContext);
  return (
    <section id="country-list-section">
      <FilterSection />
      <ul id="country-list">
        {countries &&
          countries.map((country) => <Link to={`/country/${country['index']}`}><CountryItem country={country} /></Link>)}
      </ul>
    </section>
  );
}

export default CountryList;
