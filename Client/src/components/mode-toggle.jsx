import { useTheme } from "./themeProvider.jsx";
import './mode.css';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Function to handle theme change
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <label className="ui-switch">
      <input 
        type="checkbox" 
        checked={theme === "dark"} // Checkbox is checked when theme is dark
        onChange={toggleTheme} // Change the theme on toggle
      />
      <div className="slider">
        <div className="circle"></div>
      </div>
    </label>
  );
}
