import { useContext } from "react";

import { FilterContext } from "../../context/AppProvider";

function FilterSection({}) {
  const { filter, changeFilter } = useContext(FilterContext);

  return (
    <section id="filter-section">
      <div id="filter-name" className="basicElement">
        <span className="fa fa-magnifying-glass"></span>
        <input
          id="filter-search"
          placeholder="Search for a country..."
          onChange={(e) => changeFilter("name", e.target.value)}
        />
      </div>
      <select
        id="filter-region"
        className="basicElement"
        onChange={(e) => changeFilter("region", e.target.value)}
      >
        <option value="" selected={filter["region"] == ""}>
          Filter by Region
        </option>
        <option value="Africa" selected={filter["region"] == "Africa"}>
          Africa
        </option>
        <option value="America" selected={filter["region"] == "America"}>
          America
        </option>
        <option value="Asia" selected={filter["region"] == "Asia"}>
          Asia
        </option>
        <option value="Europe" selected={filter["region"] == "Europe"}>
          Europe
        </option>
        <option value="Oceania" selected={filter["region"] == "Oceania"}>
          Oceania
        </option>
      </select>
    </section>
  );
}

export default FilterSection;
