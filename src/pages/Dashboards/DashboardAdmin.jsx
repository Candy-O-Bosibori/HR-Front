
import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const DashboardAdmin = () => {
  const [employees, setEmployees] = useState([]);
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
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  }, []);

  // Prepare data for charts
  const totalEmployees = employees.length;
  const employeesOnLeave = employees.filter(emp =>
    emp.leaves.some(leave => leave.status === 'accepted')
  ).length;
  const employeesInOffice = totalEmployees - employeesOnLeave;

  const pieData = [
    { name: 'On Leave', value: employeesOnLeave },
    { name: 'In Office', value: employeesInOffice }
  ];

  const COLORS = ['#FF6B6B', '#48937e'];  // Red-ish for leave, teal for office

  return (
    <div className="font-body flex flex-col gap-[15px] lg:gap-[20px] text-center lg:text-left items-center lg:items-start mt-3 lg:mt-0">
      <h1 className="text-Heading text-2xl font-bold dark:text-variant1-light">Welcome to HR-Hub</h1>
      {loading ? (
        <p className="text-Heading dark:text-primary-light">Loading...</p>
      ) : (
        <>
          <div className="flex gap-[40px] flex-wrap justify-center">
            <div className="flex flex-col gap-2 p-6 bg-variant1-light dark:bg-variant1-dark rounded-[10px] items-center">
              <h2 className="text-xl font-bold text-Heading dark:text-variant1-light mb-2">Employees Overview</h2>
              <IoIosPeople className="text-secondary w-[50px] h-[50px]" />
              <p className="text-Heading dark:text-variant1-light text-2xl font-semibold">{totalEmployees}</p>
            </div>

            <div style={{ width: '300px', height: '300px' }} className="bg-variant1-light dark:bg-variant1-dark rounded-[10px] p-4">
              <h2 className="text-xl font-bold text-Heading dark:text-variant1-light mb-4 text-center">Leave Status</h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#1f1c5cff"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Optional: List employees with status in a simpler table below the charts */}
          <table className="w-full mx-auto text-left text-Heading mt-6">
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










// import { useEffect, useState } from "react";
// import { IoIosPeople } from "react-icons/io";

// export const DashboardAdmin = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeesOnLeave, setEmployeesOnLeave] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     fetch("https://hr-back-2.onrender.com/employees", {
//       headers: {
//         'Authorization': 'Bearer ' + token,
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         setEmployees(data);
//         const onLeave = data.filter(employee => 
//           employee.leaves.some(leave => leave.status === 'accepted')
//         ).length;
//         setEmployeesOnLeave(onLeave);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching employees:', error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="font-body flex flex-col gap-[15px] lg:gap-[20px] text-center lg:text-left items-center lg:items-start mt-3 lg:mt-0">
//       <h1 className="text-Heading text-2xl font-bold dark:text-variant1-light">Welcome to HR-Hub</h1>
//       {loading ? (
//         <p className="text-Heading dark:text-primary-light">Loading...</p>
//       ) : (
//         <>
//           <div className="flex flex-col gap-[10px] lg:gap-[20px]">
//             <div className="flex gap-[80px]">
//               <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
//                 <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">Employees</h2>
//                 <div className="flex justify-center">
//                   <span className="flex gap-[5px]">
//                     <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
//                     <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
//                       {employees.length}
//                     </div>
//                   </span>
//                 </div>
//               </div>
//               <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
//                 <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">On Leave</h2>
//                 <div className="flex justify-center">
//                   <span className="flex gap-[5px]">
//                     <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
//                     <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
//                       {employeesOnLeave}
//                     </div>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <table className="w-full mx-auto text-left text-Heading">
//             <thead className="text-[18px] font-body bg-secondary dark:bg-variant1-dark text-white dark:text-secondary">
//               <tr className="border-[6px] border-white dark:border-primary-dark">
//                 <th className="p-[10px]">Employee</th>
//                 <th className="p-[10px]">Department</th>
//                 <th className="p-[10px]">Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-[16px] font-normal text-Heading dark:text-white">
//               {employees.map((employee, index) => (
//                 <tr key={index} className="bg-white dark:bg-variant1-dark border-[6px] border-white dark:border-primary-dark">
//                   <td className="p-[10px]">{employee.name}</td>
//                   <td className="p-[10px]">{employee.department}</td>
//                   <td className={`p-[10px] ${employee.leaves.some(leave => leave.status === 'accepted') ? 'text-Red' : 'text-secondary'}`}>
//                     {employee.leaves.some(leave => leave.status === 'accepted') ? 'Leave' : 'Office'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };