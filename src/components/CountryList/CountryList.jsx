import CountryItem from "./CountryItem";
import { filterCountries } from "../../utils/CountriesUtils";

/*export type Country = {
  index: number;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tlds: string;
  currencies: string[];
  languages: string[];
  borders: string[];
  code: string;
  flagUrl: string;
};*/
function CountryList({ countries }) {
    
  return (
    <section id="country-list-section">
      <ul id="country-list"></ul>
    </section>
  );
}

export default CountryList;
