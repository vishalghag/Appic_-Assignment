//Please Go through readMe document
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import User from "./User";
import {
  ascendingDescending,
  fetchTableData,
  filterToAgeRange,
  generateAgeRange,
} from "../utils";
import { employeeDataStatic } from "../static";
import { ASC, DESC } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const DynamicTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggle, SetToggle] = useState(true);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);

  const [consistentEmployeeData,setConsistentEmployeeData] = useState([])

  useEffect(() => {
    fetchInitialData();
  }, []);


  const fetchInitialData = () => {
    setLoader(true);
    const { data, status } = fetchTableData();
    if (status === 200) {
      // if does not work due access connection coming fromserver
      setEmployeeData(data);
    }
    //so I used static data for this just unComment this to see data comming from API 
    setEmployeeData(employeeDataStatic);
    setLoader(false);
  };

const handleSelectOnChange = (data) => {
  setSelectedAgeRange(data);
  // change employeeDataStatic to employeeData while checking it with api
  setEmployeeData(filterToAgeRange(employeeDataStatic,data.value.min,data.value.max))
}

  const renderTable = () => {
    return (
      <>
        <h2>Dynamic Table</h2>
        <Select 
          placeholder='Select Age Range'
          value={selectedAgeRange}
          onChange={handleSelectOnChange}
          // change employeeDataStatic to employeeData while checking it with api
          options={generateAgeRange(employeeDataStatic)}
          
        />
        <table>
          <thead>
            <tr>
              <th>ID's</th>
              <th>Employee Name</th>
              <th>Age</th>
              {toggle ? (
                <th>
                  Employee Salary{" "}
                  <button
                    onClick={() =>
                      ascendingDescending(
                        employeeData,
                        setEmployeeData,
                        ASC,
                        SetToggle
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>{" "}
                </th>
              ) : (
                <th>
                  Employee Salary{" "}
                  <button
                    onClick={() =>
                      ascendingDescending(
                        employeeData,
                        setEmployeeData,
                        DESC,
                        SetToggle
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>{" "}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <User users={employeeData} />
          </tbody>
        </table>
      </>
    );
  };

  return loader ? (
    <HashLoader size={40} color="#443C68" />
  ) : !!employeeData.length ? (
    renderTable()
  ) : (
    <h2>Error While Fetching Data</h2>
  );
};

export default DynamicTable;
