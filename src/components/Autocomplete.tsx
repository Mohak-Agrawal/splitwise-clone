import React, { useState } from "react";

interface Option {
  id: string;
  name: string;
}

interface AutocompleteProps {
  options: Option[];
  onSelect: (selected: Option[]) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
  };

  const handleClick = (option: Option) => {
    const updatedSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
    setInputValue("");
    setShowOptions(false);
  };

  const handleRemove = (option: Option) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (item) => item.id !== option.id
    );
    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
  };

  return (
    <div
      className="relative"
      style={{ marginBottom: showOptions ? "2rem" : 0 }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <div className="flex flex-wrap absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
        {selectedOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center m-1 bg-gray-100 rounded-md"
          >
            <span className="p-1">{option.name}</span>
            <button
              type="button"
              onClick={() => handleRemove(option)}
              className="ml-1"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
      {showOptions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 ">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
