import { jwtDecode } from 'jwt-decode';

export const EmployeeCard = ({ employee, onDelete }) => {
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
    <div className="bg-white dark:bg-variant1-dark shadow-md rounded-lg p-4 mb-4 flex flex-col items-center text-center w-64 h-92 font-body">
      <img src={employee.image} alt={employee.name} className="w-24 h-24 rounded-full object-cover mb-4" />
      <h2 className="text-Heading dark:text-secondary font-medium text-lg mb-2">
        {employee.name}
      </h2>
      <p className="text-sm mb-2 text-Heading dark:text-white">Email: {employee.email}</p>
      <p className="text-sm mb-2 text-Heading dark:text-white">Department: {employee.department}</p>
      <p className="text-sm mb-2 text-Heading dark:text-white">Role: {employee.role}</p>
      <button onClick={handleDelete} disabled={isCurrentUser} className={`mt-4 rounded px-2 py-1 ${isCurrentUser ? 'bg-gray-500' : 'bg-Red'} text-white`}>
        Delete
      </button>
    </div>
  );
};