export function filterCountries(countries, filter) {
  const { name, region } = filter;
  countries.filter(
    (country) =>
      country.name.toLowerCase().includes(name) &&
      country.region.includes(region),
  );
}
