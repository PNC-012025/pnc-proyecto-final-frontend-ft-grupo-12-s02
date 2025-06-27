import { useEffect, useState } from "react";

const YearFilter = ( {className, setFilter, resetKey} ) => {

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(""); 
  }, [resetKey]);

  return (
    <select
    value={value}
     className={className}
      onChange={(e) => {
        setValue(e.target.value);
        const year = e.target.value ? parseInt(e.target.value) : null;
        setFilter((prevFilter) => ({
          ...prevFilter,
          year: year
        }));
      }}
    >
      <option value="">Año</option>
      <option value="2015">2015</option>
      <option value="2016">2016</option>
      <option value="2017">2017</option>
      <option value="2018">2018</option>
      <option value="2019">2019</option>
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      <option value="2022">2022</option>
      <option value="2023">2023</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
    </select>
  );
};

export default YearFilter;
