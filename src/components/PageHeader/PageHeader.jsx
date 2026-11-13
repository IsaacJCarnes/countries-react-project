import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/AppProvider";

function PageHeader({}) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme == "light";
  return (
    <header>
      <Link to="/"><h1>Where in the world?</h1></Link>
      <button id="light-mode-button" onClick={toggleTheme}>
        <span
          id="light-mode-icon"
          className={`fa fa-moon ${isLight && "fa-regular"}`}
        ></span>
        <span>Dark Mode</span>
      </button>
    </header>
  );
}

export default PageHeader;
