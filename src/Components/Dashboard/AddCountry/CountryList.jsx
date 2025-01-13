import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../../features/country/countrySlice";

const CountryList = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  useEffect(() => {
    dispatch(getCountry({ search: "", startDate: "", endDate: "" }));
  }, []);
  const [columns] = useState({
    countryName: true,
    title: true,
    date: true,
    action: true,
  });
  console.log(countries);

  return (
    <div>
      <CustomHeadingDashboard />
      {countries?.length > 0 && (
        <CustomTable
          tableType={"country"}
          title={"Country List"}
          columns={columns}
          data={countries}
        />
      )}
    </div>
  );
};

export default CountryList;
