# Reflection

During this project, I built a React app that lets users browse a global countries directory, filter results, and view detailed country information. I started by mapping out the structure of the app and deciding how to organize components such as the list, filters, details page, and header. Once the project skeleton was in place, I connected the app to a country data API and began transforming the raw data into a cleaner, more useful format for display. I also used local storage to cache results and reduce unnecessary data fetches, which made the app more efficient and responsive.

The biggest challenge was managing the flow of data between the list, details view, and filter state while keeping the app organized. I solved this by using React context to share country and filter information across components and by building a reusable pagination system so the UI stayed clear even with large lists. Another challenge was handling navigation between countries and preserving the user's filter selections, which I addressed by using React Router and route parameters.

If I had more time, I would add a stronger error-handling experience, more advanced search options, and improved accessibility features such as keyboard navigation and better screen-reader labels.

[Deployed Site](https://isaacjcarnes.github.io/countries-react-project/)
