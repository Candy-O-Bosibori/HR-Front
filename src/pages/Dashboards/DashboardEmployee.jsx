import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const DashboardEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [password, setPassword] = useState('');

    const clearForm = () => {
        setName('');
        setImageUrl('');
        setPassword('');
    };

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
                setName(user.name);
                setImageUrl(user.image);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`https://hr-back-2.onrender.com/employee/${employee.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                image: imageUrl,
                password
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setEmployee(data);
                setShowEditModal(false);
                clearForm();
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="flex flex-col items-center justify-center mt-[100px] gap-[20px]">
            {employee ? (
                <>
                    <h1 className='text-Heading dark:text-primary-light text-[20px] font-bold'>Welcome {employee.name}</h1>
                    <div className='w-[345px] h-[345px] rounded-[64px] overflow-hidden'>
                        <img className='w-full h-full object-cover' src={employee.image} alt={employee.name} />
                    </div>
                    <button
                        className='bg-secondary text-primary-light px-[10px] py-[10px] rounded-[8px]'
                        onClick={() => {
                            setShowEditModal(true);
                            clearForm();
                        }}
                    >
                        Edit Profile
                    </button>
                </>
            ) : (
                <div className="flex items-center justify-center mt-[200px]">
                    <p className='text-Heading dark:text-primary-light'>Loading...</p>
                </div>
            )}
            {showEditModal && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
                        <div className="bg-white dark:bg-variant1-dark p-4 rounded shadow-md w-[350px] lg:w-[500px]">
                            <h2 className="mb-2 text-xl font-bold text-center text-Heading dark:text-primary-light">Edit Profile</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full mb-2 p-2 border dark:border-none rounded focus:outline-none dark:bg-primary-dark text-Heading dark:text-primary-light"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    className="w-full mb-2 p-2 border dark:border-none rounded focus:outline-none dark:bg-primary-dark text-Heading dark:text-primary-light"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full mb-2 p-2 border dark:border-none rounded focus:outline-none dark:bg-primary-dark text-Heading dark:text-primary-light"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="flex justify-center items-center gap-2">
                                    <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer">Submit</button>
                                    <button type="button" onClick={() => setShowEditModal(false)} className="bg-variant1-light px-4 py-2 rounded hover:cursor-pointer">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};