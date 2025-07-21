import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

export const LeaveEmployee = () => {
  const maxLeaves = 20;
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(maxLeaves);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchLeaves(token);
  }, []);

  const fetchLeaves = (token) => {
    setLoading(true);
    fetch(`https://hr-back-2.onrender.com/leaves/employee`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const acceptedLeaves = data.filter(leave => leave.status === 'accepted');
        setLeaveBalance(maxLeaves - acceptedLeaves.length);
        setLeaves(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch("https://hr-back-2.onrender.com/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setShowLeaveModal(false);
          fetchLeaves(token);
        } else {
          console.error(`Error: ${response.status}`);
        }
      });
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-Heading text-2xl font-bold dark:text-variant1-light flex items-center justify-center lg:justify-start">My applications</h1>
      {loading ? (
        <p className="text-lg md:text-xl text-Heading dark:text-primary-light">Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px] shadow-md max-w-40 mx-auto lg:mx-0 lg:items-start">
            <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">Leave Balance</h2>
            <div className="flex justify-center">
              <span className="flex gap-[5px]">
                <FaRegCalendarAlt className="text-secondary w-[40px] h-[40px]" />
                <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
                  {leaveBalance} Days
                </div>
              </span>
            </div>
          </div>
          <div>
            <table className="w-full mx-auto text-left text-Heading">
              <thead className="text-[18px] font-body bg-secondary dark:bg-variant1-dark text-white dark:text-secondary">
                <tr className="border-[6px] border-white dark:border-primary-dark">
                  <th className="p-[10px]">Leave Type</th>
                  <th className="p-[10px]">Start Date</th>
                  <th className="p-[10px]">End Date</th>
                  <th className="p-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="text-[16px] font-normal text-Heading dark:text-white">
                {leaves.map((item, index) => (
                  <tr key={index} className="bg-white dark:bg-variant1-dark border-[6px] border-white dark:border-primary-dark">
                    <td className="p-[10px]">{item.leaveType}</td>
                    <td className="p-[10px]">{item.startDate}</td>
                    <td className="p-[10px]">{item.endDate}</td>
                    <td className="p-[10px]">
                      <span className={` capitalize
                    ${item.status === 'pending' ? 'text-orange-500' :
                          item.status === 'accepted' ? 'text-secondary' :
                            'text-Red'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setShowLeaveModal(true);
              }}
              className='bg-secondary text-primary-light px-[10px] py-[10px] rounded-[8px]'
            >
              Apply for leave
            </button>
          </div>
          {showLeaveModal && (
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-variant1-dark shadow-md rounded p-5 w-[350px]">
                  <h3 className="text-lg text-center font-bold mb-2 text-Heading dark:text-secondary">Leave Application</h3>
                  <div className="flex flex-col space-y-4">
                    <select
                      id="leaveType"
                      name="leaveType"
                      className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
                      value={formData.leaveType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Leave Type</option>
                      <option value="sick">Sick</option>
                      <option value="vacation">Vacation</option>
                      <option value="casual">Casual</option>
                    </select>
                    <input
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
                      required
                    />
                    <input
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white dark:bg-primary-dark rounded-md text-sm text-primary-dark dark:text-white placeholder-Heading dark:placeholder-white border border-variant1-light dark:border-primary-dark outline-none"
                      required
                    />
                    <div className="flex justify-center gap-2">
                      <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer">Submit</button>
                      <button type="button" onClick={() => setShowLeaveModal(false)} className="bg-variant1-light px-4 py-2 rounded hover:cursor-pointer">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};