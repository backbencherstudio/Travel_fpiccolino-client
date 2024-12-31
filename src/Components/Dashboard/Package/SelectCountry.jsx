/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select } from "@mui/material";
import { getCountry } from "../../../features/country/countrySlice";

const SelectCountry = ({ country, setCountry }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry()); // Fetch countries when the component mounts
  }, [dispatch]);

  const { countries } = useSelector((state) => state.country);
  const handleChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCountry(e.target.value);
  };

  return (
    <div>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
          Country
        </h2>

        <Select
          style={{
            width: "100%",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
          }}
          size="small"
          value={country}
          onChange={handleChange}
        >
          {countries && countries.length > 0 ? (
            countries.map((element, index) => (
              <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={index}
                value={element.name}
              >
                <div>{element.name}</div>
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">No Countries Available</MenuItem>
          )}
        </Select>
      </div>
    </div>
  );
};

export default SelectCountry;
