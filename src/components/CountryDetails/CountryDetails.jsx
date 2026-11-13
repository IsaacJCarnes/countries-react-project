import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { CountriesContext } from "../../context/AppProvider";

function CountryDetails() {
  const navigate = useNavigate();
  const { countryIndex } = useParams();
  const { countries, isLoading } = useContext(CountriesContext);
  const [country, setCountry] = useState({});

  const getCountry = (name, value) => {
    const filteredList = countries.filter((country) => country[name] == value);
    return filteredList.length > 0 ? filteredList[0] : {};
  };

  useEffect(() => {
    if (isLoading) return;
    const foundCountry = getCountry("index", countryIndex);
    setCountry(foundCountry);
  }, [countryIndex, isLoading, countries]);

  function borderButtons() {
    if (!country || !country["borders"]) {
      return <></>;
    }
    return country["borders"].map((borderCountryCode, index) => {
      const borderCountry = getCountry("code", borderCountryCode);
      return (
        <Link key={index} to={`/country/${borderCountry["index"]}`}>
          <button className="basicElement">{borderCountry["name"]}</button>
        </Link>
      );
    });
  }

  return (
    <div id="details">
      <button className="basicElement" id="details-back" onClick={() => navigate(-1)}>
        <span className="fa fa-arrow-left"></span>Back
      </button>
      <section>
        <img
          id="details-image"
          src={country && country["flagUrl"] ? country["flagUrl"] : null}
        />
        <div id="details-holder">
          <h3 id="details-name">{country && country["name"]}</h3>
          <ul>
            <dl>
              <dt>Native Name: </dt>
              <dd id="details-native">{country && country["nativeName"]}</dd>
            </dl>
            <dl>
              <dt>Population: </dt>
              <dd id="details-population">
                {country &&
                  country["population"] &&
                  country["population"].toLocaleString("en-US")}
              </dd>
            </dl>
            <dl>
              <dt>Region: </dt>
              <dd id="details-region">{country && country["region"]}</dd>
            </dl>
            <dl>
              <dt>Subregion: </dt>
              <dd id="details-subregion">{country && country["subregion"]}</dd>
            </dl>
            <dl>
              <dt>Capital:</dt>
              <dd id="details-capital">{country && country["capital"]}</dd>
            </dl>
            <dl>
              <dt>Top Level Domain:</dt>
              <dd id="details-tlds">{country && country["tlds"]}</dd>
            </dl>
            <dl>
              <dt>Currencies:</dt>
              <dd id="details-currencies">
                {country &&
                  country["currencies"] &&
                  country["currencies"].join(", ")}
              </dd>
            </dl>
            <dl>
              <dt>Languages:</dt>
              <dd id="details-languages">
                {country &&
                  country["languages"] &&
                  country["languages"].join(", ")}
              </dd>
            </dl>
          </ul>
          <dl>
            <dt>Border Countries:</dt>
            <dd id="details-borders">{borderButtons()}</dd>
          </dl>
        </div>
      </section>
    </div>
  );
}

export default CountryDetails;
