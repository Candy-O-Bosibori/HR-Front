import { useState, useEffect } from "react";
import { EmployeesList } from "./EmployeeList";
import { Search } from "./Search";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://hr-back-2.onrender.com/employees", {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})

      .then((resp) => resp.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  }, []);

  // Search filter
  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(search.toLowerCase());
  });

  // Delete employee
  function handleDelete(id) {
    const newEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(newEmployees);
  }

  return (
    <div className="font-body">
      <h2 className="text-Heading dark:text-primary-light font-bold text-2xl text-center lg:text-left py-5">
        Employees
      </h2>
      <Search search={search} setSearch={setSearch} />
      <EmployeesList employees={filteredEmployees} onDelete={handleDelete} />
    </div>
  );
}