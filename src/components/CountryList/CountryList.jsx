import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CountriesContext, FilterContext } from "../../context/AppProvider.jsx";
import CountryItem from "./CountryItem.jsx";
import { filterCountries } from "../../utils/CountriesUtils";
import FilterSection from "../FilterSection/FilterSection.jsx";
import usePagination from "../../hooks/usePagination.js";

function CountryList() {
  const { countries } = useContext(CountriesContext);
  const { filter } = useContext(FilterContext);
  const filteredCountries = filterCountries(countries, filter);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    setPage,
    getAccordionArray,
  } = usePagination({ totalItems: filteredCountries.length, itemsPerPage });

  function createPaginationResults() {
    const slicedItems = filteredCountries.slice(startIndex, endIndex);
    return slicedItems.map((country, index) => (
      <Link key={index} to={`/country/${country.index}`}>
        <CountryItem country={country} />
      </Link>
    ));
  }
  function createPaginationButtons() {
    if (totalPages <= 1) {
      return <></>;
    }
    const newArray = getAccordionArray();
    return newArray.map((value, index) =>
      value !== null ? (
        <button
          key={index}
          disabled={currentPage === value}
          onClick={() => setPage(value)}
        >
          {value + 1}
        </button>
      ) : (
        <div>...</div>
      ),
    );
  }
  return (
    <section id="country-list-section">
      <FilterSection />
      <ul id="country-list">{createPaginationResults()}</ul>
      <div id="PageButtons">{createPaginationButtons()}</div>
    </section>
  );
}

export default CountryList;
