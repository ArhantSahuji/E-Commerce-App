import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext';

function Navbar() {

    const [visible,setVisible]=useState(false);
    const {setShowSearch , getCartCount ,navigate,token,setToken,setCartItems}=useContext(ShopContext);
    const location=useLocation();

    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        
    }

    const searchClicked=()=>{
        if(location.pathname==='/collection'){
            setShowSearch(true);
        }
        else{
            navigate('/collection');
            setShowSearch(true);
        }
    }

    const resetsearch=()=>{
        setShowSearch(false);
    }


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to="/"><img src={assets.logo2} className='' alt=''></img></Link>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink onClick={resetsearch} to="/" className={({isActive}) =>`flex flex-col items-center gap-1
                                                             ${isActive ? "text-orange-700" : "text-gray-700"}
                                                              hover:bg-gray-50 
                                                              lg:hover:bg-transparent lg:border-0 
                                                              hover:text-orange-700 lg:p-0`}>
                HOME
            </NavLink>

        <NavLink onClick={()=>(setShowSearch(true))} to="/collection" className={({isActive}) =>`flex flex-col items-center gap-1
                                                             ${isActive ? "text-orange-700" : "text-gray-700"}
                                                              hover:bg-gray-50 
                                                              lg:hover:bg-transparent lg:border-0 
                                                              hover:text-orange-700 lg:p-0`}>
                COLLECTION
            </NavLink>

            <NavLink onClick={resetsearch} to="/about" className={({isActive}) =>`flex flex-col items-center gap-1
                                                             ${isActive ? "text-orange-700" : "text-gray-700"}
                                                              hover:bg-gray-50 
                                                              lg:hover:bg-transparent lg:border-0 
                                                              hover:text-orange-700 lg:p-0`}>
                ABOUT
            </NavLink>

            <NavLink onClick={resetsearch} to="/contact" className={({isActive}) =>`flex flex-col items-center gap-1
                                                             ${isActive ? "text-orange-700" : "text-gray-700"}
                                                              hover:bg-gray-50 
                                                              lg:hover:bg-transparent lg:border-0 
                                                              hover:text-orange-700 lg:p-0`}>
                CONTACT
            </NavLink>


        </ul>


        <div className='flex items-center gap-6'>
            {/* <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className={`w-5 cursor-pointer ${location.pathname=== '/collection' ? '' : 'hidden'}`} about=''></img> */}
            <img onClick={searchClicked} src={assets.search_icon} className={`w-5 cursor-pointer`} about=''></img>
            <div className='group relative'>
                <img onClick={()=> token? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt=""></img>
                {/* {dropdown menue} */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>}
            </div>
            <Link to='/cart' className='relative'>
                <img onClick={resetsearch} className='w-5 min-w-5' src={assets.cart_icon} alt='' />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''></img>

        </div>

        {/* sidebar menue for small screens */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible? 'w-full' : 'w-0'}`}>
            <div className="flex flex-col text-grey-600">
                <div onClick={()=> setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                    <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=''></img>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/">HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/collection">COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/about">ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to="/contact">CONTACT</NavLink>
            </div>
        </div>

    </div>
  )
}

export default Navbar