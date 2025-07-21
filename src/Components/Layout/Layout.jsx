import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

export const Layout = ({ Sidebar, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`relative h-screen overflow-auto ${isLargeScreen ? 'flex' : ''}`}>
            <button onClick={handleSidebarToggle} className="absolute right-0 z-20 p-3 lg:hidden">
                {isSidebarOpen ? <FaTimes className='fill-secondary'/> : <FaBars className='fill-secondary' />}
            </button>
            {(isSidebarOpen || isLargeScreen) && (
                <div className={`z-10 w-full lg:w-64 bg-white ${isLargeScreen ? 'lg:sticky lg:top-0' : 'absolute'}`}>
                    {Sidebar && <Sidebar />}
                </div>
            )}
            {!isSidebarOpen || isLargeScreen ? (
                <div className="flex-grow px-4 lg:px-[50px] py-4 lg:py-[20px] dark:bg-primary-dark">
                    {children}
                </div>
            ) : null}
        </div>
    );
};