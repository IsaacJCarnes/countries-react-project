import { useContext } from "react";
import { Link } from "react-router-dom";
import { CountriesContext, FilterContext } from "../../context/AppProvider.jsx";
import CountryItem from "./CountryItem.jsx";
import { filterCountries } from "../../utils/CountriesUtils";
import FilterSection from "../FilterSection/FilterSection.jsx";

function CountryList() {
  const { countries } = useContext(CountriesContext);
  const { filter } = useContext(FilterContext);
  const filteredCountries = filterCountries(countries, filter);
  return (
    <section id="country-list-section">
      <FilterSection />
      <ul id="country-list">
        {filteredCountries.map((country, index) => (
            <Link key={index} to={`/country/${country["index"]}`}>
              <CountryItem country={country} />
            </Link>
          ))}
      </ul>
    </section>
  );
}

export default CountryList;
