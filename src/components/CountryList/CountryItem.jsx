import { useContext, useEffect } from "react";
import { CountriesContext } from "../../context/AppProvider";

function CountryItem() {
  const { countryId } = useParams();
  const { getCountryById } = useContext(CountriesContext);
  const [country, setCountry] = useState({});

  useEffect(() => {
    setCountry(getCountryById(countryId));
  }, [countryId]);

  return (
    <li className="country-item basicElement">
      <image className="country-image" src={country["flagUrl"]}></image>
      <h3 className="country-name">{country["name"]}</h3>
      <dl>
        <dt>Population: </dt>
        <dd className="country-population">
          {country["population"].toLocaleString("en-US")}
        </dd>
      </dl>
      <dl>
        <dt>Region: </dt>
        <dd className="country-region">{country["region"]}</dd>
      </dl>
      <dl>
        <dt>Capital: </dt>
        <dd className="country-capital">{country["capital"]}</dd>
      </dl>
    </li>
  );
}

export default CountryItem;
