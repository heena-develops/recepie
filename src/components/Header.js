import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CakeIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Header = () => {
    const Links = [
        { name: "HOME", link: "/" },
        { name: "Personal Recipes", link: "/personal" },
        { name: "Online Recipes", link: "/online" },
    ];
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleAddRecipeClick = () => {
        navigate('/AddRecipe'); // Navigate to the Add Recipe page
    };

    return (
        <div className='shadow-md w-full fixed top-0 left-0'>
            <div className='md:flex items-center justify-between bg-gradient-to-r from-emerald-50 to-blue-50 py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-3xl cursor-pointer flex items-center gap-1'>
                    <CakeIcon className='w-12 h-12 pb-1 text-yellow-500 hover:text-yellow-400' />
                    <span className='pl-2 hover:-translate-y-0.5 duration-300'>Cook Book</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {open ? <XMarkIcon aria-label="Close menu" /> : <Bars3BottomRightIcon aria-label="Open menu" />}
                </div>
                {/* link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto transition-all duration-500 ease-in ${open ? 'top-20 flex flex-col justify-center items-center bg-white' : 'top-[-490px]'}`}>
                    {Links.map((link, index) => (
                        <li key={index} className='md:ml-8 md:my-0 my-3 font-bold active:underline'>
                            <a href={link.link} className='text-gray-800 hover:text-gray-700 duration-500'>{link.name}</a>
                        </li>
                    ))}
                    <button onClick={handleAddRecipeClick} className='btn bg-yellow-500 hover:bg-yellow-400 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>Add Recipe</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;
