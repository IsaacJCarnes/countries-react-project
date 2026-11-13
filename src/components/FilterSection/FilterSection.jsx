import { useContext } from "react";

import { FilterContext } from "../../context/AppProvider";

function FilterSection({}) {
  const { filter, changeFilter } = useContext(FilterContext);

  return (
    <section id="filter-section">
      <div id="filter-name" className="basicElement">
        <span className="fa fa-magnifying-glass"></span>
        <input
          defaultValue={filter['name']}
          id="filter-search"
          placeholder="Search for a country..."
          onChange={(e) => changeFilter("name", e.target.value)}
        />
      </div>
      <select
        defaultValue={filter['region']}
        id="filter-region"
        className="basicElement"
        onChange={(e) => changeFilter("region", e.target.value)}
      >
        <option value="">
          Filter by Region
        </option>
        <option value="Africa" >
          Africa
        </option>
        <option value="America">
          America
        </option>
        <option value="Asia">
          Asia
        </option>
        <option value="Europe">
          Europe
        </option>
        <option value="Oceania">
          Oceania
        </option>
      </select>
    </section>
  );
}

export default FilterSection;
