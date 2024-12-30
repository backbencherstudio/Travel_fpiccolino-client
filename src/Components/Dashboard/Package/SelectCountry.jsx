import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import countryList from "react-select-country-list";

const CountryDropdown = ({ value, setValue }) => {
  const options = countryList().getData();

  const changeHandler = (event) => {
    const selectedOption = event.target.value;
    setValue(selectedOption);
    console.log("Selected Country:", selectedOption);
  };

  return (
    <div>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
          Category
        </h2>

        <FormControl fullWidth>
          <Select
            labelId="country-select-label"
            size="small"
            value={value}
            onChange={changeHandler}
            displayEmpty
          >
            {/* Placeholder */}
            <MenuItem value="" disabled>
              Choose a country
            </MenuItem>
            {/* Country options */}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CountryDropdown;
