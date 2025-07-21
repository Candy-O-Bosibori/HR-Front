import { useState } from 'react';
import hiringImage from '../../assets/hiring.png';

export const Hiring = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Administrative ',
    role: 'employee',
    password: '',
    image: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch("https://hr-back-2.onrender.com/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    setFormData({
      name: "",
      email: "",
      department: "Administrative ",
      role: "employee",
      password: '',
      image: ""
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div className=" max-w-md">
        <div className="flex items-center justify-center mb-[20px]">
          <img src={hiringImage} alt="Hiring" className="w-[40px] h-[40px] mr-4" />
          <h1 className="text-2xl font-bold text-Heading dark:text-primary-light">Hiring</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-variant1-dark shadow-md rounded p-5 w-[350px]">
          <h3 className="text-lg text-center font-bold mb-2 text-Heading dark:text-secondary">Add new hire</h3>
          <div className="flex flex-col space-y-4">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Employee's Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              required
            />
            <select
              id="department"
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="Administrative">Administrative </option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Accounting">Accounting</option>
            </select>
            <select
              id="role"
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              required
            />
            <input
              id="image"
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
              required
            />
            <button
              type="submit"
              className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
