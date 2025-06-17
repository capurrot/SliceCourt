import { useState } from "react";

const ThemeSelector = () => {
  const [theme, setTheme] = useState("roland-garros");

  const handleChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.body.className = "";
    document.body.classList.add(`theme-${newTheme}`);
  };

  return (
    <select className="form-select w-auto" onChange={handleChange} value={theme}>
      <option value="roland-garros">Roland Garros</option>
      <option value="wimbledon">Wimbledon</option>
      <option value="us-open">US Open</option>
      <option value="australian-open">Australian Open</option>
    </select>
  );
};

export default ThemeSelector;
