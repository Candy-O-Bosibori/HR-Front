import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";

export const DashboardAdmin = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://hr-back-2.onrender.com/employees", {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        const onLeave = data.filter(employee => 
          employee.leaves.some(leave => leave.status === 'accepted')
        ).length;
        setEmployeesOnLeave(onLeave);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-body flex flex-col gap-[15px] lg:gap-[20px] text-center lg:text-left items-center lg:items-start mt-3 lg:mt-0">
      <h1 className="text-Heading text-2xl font-bold dark:text-variant1-light">Welcome to HR-Hub</h1>
      {loading ? (
        <p className="text-Heading dark:text-primary-light">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-[10px] lg:gap-[20px]">
            <div className="flex gap-[80px]">
              <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
                <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">Employees</h2>
                <div className="flex justify-center">
                  <span className="flex gap-[5px]">
                    <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                    <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
                      {employees.length}
                    </div>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
                <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">On Leave</h2>
                <div className="flex justify-center">
                  <span className="flex gap-[5px]">
                    <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                    <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
                      {employeesOnLeave}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full mx-auto text-left text-Heading">
            <thead className="text-[18px] font-body bg-secondary dark:bg-variant1-dark text-white dark:text-secondary">
              <tr className="border-[6px] border-white dark:border-primary-dark">
                <th className="p-[10px]">Employee</th>
                <th className="p-[10px]">Department</th>
                <th className="p-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="text-[16px] font-normal text-Heading dark:text-white">
              {employees.map((employee, index) => (
                <tr key={index} className="bg-white dark:bg-variant1-dark border-[6px] border-white dark:border-primary-dark">
                  <td className="p-[10px]">{employee.name}</td>
                  <td className="p-[10px]">{employee.department}</td>
                  <td className={`p-[10px] ${employee.leaves.some(leave => leave.status === 'accepted') ? 'text-Red' : 'text-secondary'}`}>
                    {employee.leaves.some(leave => leave.status === 'accepted') ? 'Leave' : 'Office'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};