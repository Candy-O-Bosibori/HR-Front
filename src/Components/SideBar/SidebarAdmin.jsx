import home from '/src/assets/home.png'
import hiring from '/src/assets/hiring.png'
import leave from '/src/assets/leave.png'
import reviews from '/src/assets/reviews.png'
import employees from '/src/assets/employees.png'
import logo from '/src/assets/logo.png'
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetch('https://hr-back-2.onrender.com/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const user = data.find(employee => employee.id === userId);
        setEmployee(user);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role"); 
    navigate("/signin");
  };

  const [darkMode, setDarkMode] = useState(() => {
    const localData = localStorage.getItem("darkMode");
    return localData ? JSON.parse(localData) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className=' bg-variant1-light dark:bg-variant1-dark text-primary-dark dark:text-primary-light w-full h-[100vh] flex flex-col p-[20px] justify-between font-body m-0 text-center lg:text-left items-center lg:items-start'>
      <div className='gap-[50px] '>
        <div className='flex flex-col items-center gap-[20px]'>
          <img src={logo} alt="logo" className="w-[130px] h-[64px] max-w-full" />
          <hr className='border-[1px] border-secondary w-full' />
        </div>
        <div className='flex flex-col gap-[20px] py-[30px] '>
          <h1 className="text- font-bold">
            ADMINISTRATOR
          </h1>
          <div>
            <ul className='flex flex-col gap-[25px]'>
              <li>
                <Link to="/admin/dashboard" className='flex gap-[10px]  hover:text-secondary active:text-secondary'>
                  <img src={home} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/employees" className='flex gap-[10px]  hover:text-secondary'>
                  <img src={employees} alt="" className='w-7 h-7' />
                  <span className='pt-1'>Employees</span>
                </Link>
              </li>
              <li>
                <Link to="/hiring" className='flex gap-[10px]  hover:text-secondary'>
                  <img src={hiring} alt="" className='w-7 h-7' />
                  <span className='pt-1'>Hiring</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/leave" className='flex gap-[10px]  hover:text-secondary'>
                  <img src={leave} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Leave</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/reviews" className='flex gap-[10px]  hover:text-secondary'>
                  <img src={reviews} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Reviews</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='p-[5px] flex flex-col gap-[25px] text-center lg:text-left items-center lg:items-start'>
        <div className='flex ml-2 -mb-4 '>
          {employee ? (
            <div className='flex gap-[15px] p-[10px]'>
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
              </div>
              <div className='flex flex-col gap-[8px]'>
                <h1 className='text-[16px] font-bold text-Heading dark:text-primary-light'>{employee.name}</h1>
                <h1 className='text-[11px] font-bold text-Heading dark:text-primary-light'>{employee.department}</h1>
              </div>

            </div>
          ) : (
            <div>
              <p className='text-secondary text-sm'>Loading...</p>
            </div>
          )}
        </div>
        <div className='flex gap-[30px]'>
          {darkMode ? (
            <button
              onClick={() => setDarkMode(false)}
              className='flex flex-row items-center justify-center gap-[5px] text-[15px] hover:cursor-pointer'>
              <GoSun
                className="w-[30px] h-[30px] fill-green hover:cursor-pointer hover:fill-green"
              />
              Light
            </button>
          ) : (
            <button
              onClick={() => setDarkMode(true)}
              className='flex flex-row items-center justify-center gap-[5px] text-[15px] hover:cursor-pointer'>
              <IoMoonOutline
                className="w-[30px] h-[30px] fill-green hover:cursor-pointer hover:fill-green"
              />
              Dark
            </button>
          )}
          <button
            className='bg-secondary text-primary-light hover:cursor-pointer px-[10px] py-[5px] rounded-[5px] text-[15px]'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
