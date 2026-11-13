import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { CountriesContext } from "../../context/AppProvider";

function CountryDetails() {
  const { countryCode } = useParams();
  const { countries, isLoading } = useContext(CountriesContext);
  const [country, setCountry] = useState({});

  const getCountry = (code) => {
    const filteredList = countries.filter(
      (country) => country.code.toLowerCase() === code.toLowerCase(),
    );
    return filteredList.length > 0 ? filteredList[0] : {};
  };

  useEffect(() => {
    if (isLoading) return;
    const country = getCountry(countryCode);
    setCountry(country);
  }, [countryCode, isLoading, countries]);

  function borderButtons() {
    if (!country || !country["borders"]) {
      return <></>;
    }
    return country["borders"].map((borderCountryCode, index) => {
      const borderCountry = getCountry(borderCountryCode);
      return (
        <Link key={index} to={`/country/${borderCountry["code"]}`}>
          <button className="basicElement">{borderCountry["name"]}</button>
        </Link>
      );
    });
  }
  return (
    <details>
      <summary></summary>
      <button className="txt-sm basicElement" id="details-back">
        <span className="fa fa-arrow-left"></span>Back
      </button>
      <section className="fill">
        <img
          id="details-image"
          src={country && country["flagUrl"] ? country["flagUrl"] : null}
        />
        <div className="flx-col" id="details-holder">
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
    </details>
  );
}

export default CountryDetails;
