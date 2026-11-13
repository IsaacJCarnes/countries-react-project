export function filterCountries(countries = [], filter = {}) {
  const { name = "", region = "" } = filter;
  return countries.filter(
    (country) =>
      country["name"].toLowerCase().includes(name.toLowerCase()) &&
      country["region"].includes(region),
  );
}

export function reduceCountryArray(inputArray) {
  return inputArray.map((country) => {
    const nativeNames = country.names?.native ?? {};
    const firstNativeKey = Object.keys(nativeNames)[0];
    const nativeNameType = firstNativeKey ? nativeNames[firstNativeKey] : {};
    const firstTypeKey = Object.keys(nativeNameType)[0];

    return {
      name: country.names?.common ?? "",
      nativeName: firstTypeKey ? (nativeNameType[firstTypeKey] ?? "") : "",
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capitals?.[0]?.name,
      tlds: country.tlds,
      currencies: (country.currencies ?? []).map((currency) => currency?.name),
      languages: (country.languages ?? []).map((language) => language?.name),
      borders: country.borders,
      code: country.codes?.alpha_3,
      flagUrl: country.flag?.url_svg,
    };
  });
}
