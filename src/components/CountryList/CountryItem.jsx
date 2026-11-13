import { useContext, useEffect } from "react";
import { CountriesContext } from "../../context/AppProvider";

function CountryItem({ country }) {
  return (
    <li className="country-item basicElement">
      <img
        className="country-image"
        src={country && country["flagUrl"] ? country["flagUrl"] : null}
      />
      <h3 className="country-name">{country && country["name"]}</h3>
      <dl>
        <dt>Population: </dt>
        <dd className="country-population">
          {country &&
            country["population"] &&
            country["population"].toLocaleString("en-US")}
        </dd>
      </dl>
      <dl>
        <dt>Region: </dt>
        <dd className="country-region">{country && country["region"]}</dd>
      </dl>
      <dl>
        <dt>Capital: </dt>
        <dd className="country-capital">{country && country["capital"]}</dd>
      </dl>
    </li>
  );
}

export default CountryItem;
