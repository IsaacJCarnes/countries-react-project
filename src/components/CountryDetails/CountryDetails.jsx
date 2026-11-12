import { Link } from "react-router-dom";

import { CountriesContext } from "../../context/AppProvider";

function CountryDetails() {
  const { countryId } = useParams();
  const { getCountryById } = useContext(CountriesContext);
  const [country, setCountry] = useState({});

  useEffect(() => {
    setCountry(getCountryById(countryId));
  }, [countryId]);

  function prettifyArray(array) {
    return array.reduce((prevVal, curVal, currentIndex) =>
      currentIndex == 0 ? curVal : prevVal + ", " + curVal,
    );
  }
  function borderButtons() {
    return country["borders"].map((borderCountry) => (
      <Link to={`/country/${borderCountry.id}`}>
        <button className="basicElement">{borderCountry["name"]}</button>
      </Link>
    ));
  }
  return (
    <details>
      <summary></summary>
      <button class="txt-sm basicElement" id="details-back">
        <span class="fa fa-arrow-left"></span>Back
      </button>
      <section class="fill">
        <image id="details-image"></image>
        <div class="flx-col" id="details-holder">
          <h3 id="details-name">{country["name"]}</h3>
          <ul>
            <dl>
              <dt>Native Name: </dt>
              <dd id="details-native">{country["nativeName"]}</dd>
            </dl>
            <dl>
              <dt>Population: </dt>
              <dd id="details-population">
                {country["population"].toLocaleString("en-US")}
              </dd>
            </dl>
            <dl>
              <dt>Region: </dt>
              <dd id="details-region">{country["region"]}</dd>
            </dl>
            <dl>
              <dt>Subregion: </dt>
              <dd id="details-subregion">{country["subregion"]}</dd>
            </dl>
            <dl>
              <dt>Capital:</dt>
              <dd id="details-capital">{country["capital"]}</dd>
            </dl>
            <dl>
              <dt>Top Level Domain:</dt>
              <dd id="details-tlds">{country["tlds"]}</dd>
            </dl>
            <dl>
              <dt>Currencies:</dt>
              <dd id="details-currencies">
                {prettifyArray(country["currencies"])}
              </dd>
            </dl>
            <dl>
              <dt>Languages:</dt>
              <dd id="details-languages">
                {prettifyArray(country["languages"])}
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
