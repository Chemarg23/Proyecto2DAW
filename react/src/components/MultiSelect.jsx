import PropTypes from 'prop-types';
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function MultiSelect({ setter, values, name, value="" }) {
  const animatedComponents = makeAnimated();
  const element = document.querySelector("html");
  const [darkMode, setMode] = useState(element.classList.contains("dark"));
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const isDarkMode = mutation.target.classList.contains("dark");
        setMode(isDarkMode);
      }
    }
  });

  const config = { attributes: true, attributeFilter: ["class"] };

  observer.observe(element, config);

  return (
    <Select
      onChange={(selectedOptions) => {
        const mappedOptions = selectedOptions.map((option) => ({
          id: option.value,
          name: option.label,
        }));
        setter(name, mappedOptions);
      }}
      isSearchable
      defaultValue={value}
      name="categories"
      options={values}
      components={animatedComponents}
      isMulti
      className={`basic-multi-select dark:text-white`}
      classNamePrefix="select"
      styles={{
        input:(provided)=>({
            ...provided,
          backgroundColor: "transparent",
          color: darkMode ? "white" :"black",
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: darkMode ? "#1f2937" : "white",
          color: darkMode ? "white" :"black",
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: darkMode ? "#374151" : "white",
          color: darkMode ? "white" :"black",
          "&:hover": {
            backgroundColor: darkMode ? "#4b5563" : "#f3f4f6",
          },
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: darkMode ? "#374151" : "white",
          color: darkMode ? "white" :"black",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "black",
          "&:hover": {
            backgroundColor: darkMode ? "#1f2937" : "#4b5563",
            color: "white" 
          },
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: darkMode ? "#6B7280" : "#d1d5db",
          primary: darkMode ? "#6B7280" : "#6B7280",
        },
      })}
    />
  );
}

MultiSelect.propTypes = {
    setter: PropTypes.func.isRequired,
    values: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
  };