import { IoTrashBin } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';

export const EmployeeTable = ({ employee, onDelete }) => {
  
  function handleDelete() {
    const token = localStorage.getItem('token')
    
    fetch(`https://hr-back-2.onrender.com/employee/${employee.id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        onDelete(employee.id);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation: ', error);
    });
  }

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const currentUserId = decodedToken.sub.id;
  const isCurrentUser = employee.id === currentUserId;

  return (
    <tr key={employee.id} className="bg-white dark:bg-variant1-dark border-[6px] border-white dark:border-primary-dark">
      <td className="p-[10px]">{employee.id}</td>
      <td className="p-[10px]">
        <img
          className="inline-block h-6 w-6 rounded-full object-cover mr-1"
          src={employee.image}
          alt="Profile pic"
        />
        {employee.name}
      </td>
      <td className="p-[10px]">{employee.email}</td>
      <td className="p-[10px]">{employee.department}</td>
      <td className="p-[10px]">{employee.role}</td>
      <td className="p-[10px] flex justify-center items-center">
        <button onClick={handleDelete} disabled={isCurrentUser}>
          <IoTrashBin className={isCurrentUser ? 'fill-gray-400' : 'fill-Red'} />
        </button>
      </td>
    </tr>
  );
}