import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import reviewsImage from '../../assets/reviews.png';

export const ReviewsAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const currentUserId = decodedToken.sub.id;

        fetch("https://hr-back-2.onrender.com/employees", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                const filteredData = data.filter(employee => employee.id !== currentUserId);
                setEmployees(filteredData);
                setLoadingEmployees(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingEmployees(false);
            });
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            setLoadingReviews(true);
            const token = localStorage.getItem('token');
            fetch(`https://hr-back-2.onrender.com/reviews/employee/${selectedEmployee.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.length === 0) {
                        setReviews(['No reviews found']);
                    } else {
                        setReviews(data);
                    }
                    setLoadingReviews(false);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                    setLoadingReviews(false);
                });
        }
    }, [selectedEmployee]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((formData) => ({ ...formData, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        fetch("https://hr-back-2.onrender.com/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                employee_id: selectedEmployee.id,
                description: formData.description,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowModal(false);
                setFormData({ description: '' });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {showModal ? (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-white dark:bg-variant1-dark p-4 rounded shadow-lg max-w-full w-[350px] lg:w-[500px]">
                        <h2 className="mb-2 text-2xl font-bold text-center text-Heading dark:text-primary-light">Add Review</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea id="description" value={formData.description} onChange={handleChange} className="w-full mb-2 p-2 border dark:border-none rounded focus:outline-none dark:bg-primary-dark text-Heading dark:text-primary-light "></textarea>
                            <div className="flex justify-end gap-2">
                                <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer">Submit</button>
                                <button type="button" onClick={() => setShowModal(false)} className="bg-variant1-light px-4 py-2 rounded hover:cursor-pointer">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                        <img src={reviewsImage} alt="Reviews" className="w-10 h-10 mr-4" />
                        <h1 className="text-2xl font-bold text-Heading dark:text-primary-light">Reviews</h1>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start  gap-[20px]">
                        {loadingEmployees ? (
                            <p className='flex items-center justify-center text-Heading dark:text-primary-light'>Loading...</p>
                        ) : (
                            employees.map(employee => (
                                <div key={employee.id} className="bg-variant1-light dark:bg-variant1-dark rounded-[10px] p-4 flex flex-col items-center text-center w-64 h-92 ">
                                    <img src={employee.image} alt={employee.name} className="w-24 h-24 rounded-full object-cover mb-4 hover:cursor-pointer" onClick={() => { setSelectedEmployee(employee); setShowReviewsModal(true); }} />
                                    <h2 className="text-Heading dark:text-secondary font-bold text-lg mb-2">{employee.name}</h2>
                                    <p className="text-sm mb-2 text-Heading dark:text-primary-light">{employee.department}</p>
                                    <button
                                        className="bg-secondary text-white px-[10px] py-[5px] rounded-[10px]" onClick={() => { setShowModal(true); setSelectedEmployee(employee); }}>
                                        Add Review
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {showReviewsModal && (
                <>
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
                        <div className="bg-white dark:bg-variant1-dark p-4 rounded shadow-md w-[350px] lg:w-[500px] flex flex-col gap-[10px]">
                            <h2 className="mb-2 text-xl font-bold text-center text-Heading dark:text-primary-light">Reviews for {selectedEmployee.name}</h2>
                            {loadingReviews ? (
                                <p className='flex items-center justify-center text-Heading dark:text-primary-light'>Loading reviews...</p>
                            ) : (
                                Array.isArray(reviews) && reviews.length > 0 ? reviews.map((review, index) => (
                                    <div key={review.id}>
                                        <p className='text-Heading dark:text-primary-light'>{index + 1}. {review.description}</p>
                                    </div>
                                )) : <p className='flex items-center justify-center text-Heading dark:text-primary-light'>No reviews found</p>
                            )}
                            <div className="flex justify-center items-center">
                                <button type="button" onClick={() => setShowReviewsModal(false)} className="bg-variant1-light px-4 py-2 rounded hover:cursor-pointer">Close</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};