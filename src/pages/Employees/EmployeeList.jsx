/* eslint-disable react/prop-types */
import { EmployeeTable } from "./EmployeeTable";
import { EmployeeCard } from "./EmployeeCard";

export const EmployeesList = ({ employees, onDelete }) => {
  return (
    <div className="flex h-auto font">
      <div className="relative overflow-x-auto w-full">
        <div className="sm:hidden flex flex-wrap justify-center gap-4">
          {employees.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee} onDelete={onDelete} />;
          })}
        </div>
        <table className="hidden sm:table w-full mx-auto text-left text-Heading">
          <thead className="text-[18px] font-body bg-secondary dark:bg-variant1-dark text-white dark:text-secondary">
            <tr className="border-[6px] border-white dark:border-primary-dark">
              <th className="p-[10px]" >ID</th>
              <th className="p-[10px]" >Employee</th>
              <th className="p-[10px]" >Email Address</th>
              <th className="p-[10px]" >Department</th>
              <th className="p-[10px]" >Role</th>
              <th className="p-[10px] flex justify-center items-center" >Actions</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-Heading dark:text-white">
            {employees.map((employee) => {
              return <EmployeeTable key={employee.id} employee={employee} onDelete={onDelete} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}