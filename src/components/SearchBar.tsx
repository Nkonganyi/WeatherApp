import "../styles/SearchBar.css";
type SearchBarProps = {
  onSearch: (city: string) => void;
  onCurrentLocation: () => void;
};

import { useState } from "react";
import type { FormEvent } from "react";

function SearchBar({ onSearch, onCurrentLocation }: SearchBarProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
    setCity("");
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="search-form"
  >
    <input
      type="text"
      placeholder="Search city..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />

    <button type="submit">
      Search
    </button>

    <button
      type="button"
      onClick={onCurrentLocation}
    >
      Current Location
    </button>

  </form>
);
}

export default SearchBar;