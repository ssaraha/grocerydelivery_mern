import React, { useState } from 'react'

import {NavLink} from "react-router-dom"

import {assets} from "../assets/assets"

import {useAppContext} from "../context/AppContext"

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const {user, showUserLogin, setUser, setShowUserLogin, navigate} = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate('/');
    }

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className='h-9' src={assets.logo} alt='dummyLogo' />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Product</NavLink>
                <NavLink to="/contact">Contact</NavLink>
               

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='w-4 h-4' src={assets.search_icon} alt='Search' />
                </div>

                <div 
                    onClick={() => navigate('/cart')}
                    className="relative cursor-pointer">
                   <img className='w-4 h-4 opacity-80' src={assets.nav_cart_icon} alt='Search' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-green-600 w-4.5 h-[18px] rounded-full">3</button>
                </div>
                {!user ? <button 
                    onClick={() => setShowUserLogin(true)}
                    className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full">
                    Login
                </button> : 
                (
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt='profile' className='w-10' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 w-30 rounded-md text-sm z-40 transition-all text-center'>
                            <li 
                                onClick={() => navigate("my-orders")}
                                className='cursor-pointer p-1.5  hover:bg-gray-300 font-semibold'>My Orders</li>
                            <li 
                                onClick={logout}
                                className='cursor-pointer p-1.5  hover:bg-gray-300 font-semibold'>Logout</li>
                        </ul>
                    </div>
                )}
                
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
               <img src={assets.menu_icon} alt='menu' className='' />
            </button>

            {/* Mobile Menu */}
            {open && <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>All product</NavLink>
                {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink> }
                <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
                
                {/* {!user && <button className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full text-sm">
                    Login
                </button>} */}

                {!user ? <button 
                    onClick={
                        () => {
                           setOpen(false);
                           setShowUserLogin(true); 
                        }
                    }
                    className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-800 transition text-white rounded-full text-sm">
                    Login
                </button> : <button 
                    onClick={logout}
                    className="cursor-pointer px-6 py-2 mt-2 bg-slate-800 hover:bg-slate-950 transition text-white rounded-full text-sm">
                    Logout
                </button>
                }
                
            </div>}
            

        </nav>
    )
}

export default Navbar
