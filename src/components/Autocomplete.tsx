import React, { useState } from "react";

interface AutocompleteProps {
  options: string[];
  onSelect: (selected: string[]) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options, onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
  };

  const handleClick = (option: string) => {
    const updatedSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
    setInputValue("");
    setShowOptions(false);
  };

  const handleRemove = (option: string) => {
    const updatedSelectedOptions = selectedOptions.filter(
      (item) => item !== option
    );
    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 rounded-md"
      />
      <div className="flex flex-wrap absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center m-1 bg-gray-100 rounded-md"
          >
            <span className="p-1">{option}</span>
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
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleClick(option)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
