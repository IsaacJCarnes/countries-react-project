function FilterSection({}) {
  return (
    <section id="filter-section">
      <div id="filter-name" className="basicElement">
        <span className="fa fa-magnifying-glass"></span>
        <input id="filter-search" placeholder="Search for a country..." />
      </div>
      <select id="filter-region" className="basicElement">
        <option value="" selected>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </section>
  );
}

export default FilterSection;
