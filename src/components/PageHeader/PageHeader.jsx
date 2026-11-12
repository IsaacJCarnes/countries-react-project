function PageHeader({}) {
  return (
    <header>
      <h1>Where in the world?</h1>

      <button id="light-mode-button">
        <span id="light-mode-icon" className="fa fa-regular fa-moon"></span>
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

export default PageHeader;
