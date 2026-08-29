import React from 'react'

import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className='relative'>
            <img 
                className='md:block hidden w-full'
                src={assets.main_banner_bg} alt='banner' />
                <img 
                className='md:hidden w-full '
                src={assets.main_banner_bg_sm} alt='banner' />
                <div>
                    <h1>Freshness you can trust, Savings you will love.</h1>
                </div>
                <div>
                    <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-600 hover:bg-green-900 transition rounded text-white cursor-pointer'>
                        Shop now 
                        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='arrow' />
                    </Link>
                </div>

                {/* 1h05 */}
                
        </div>
    )
}

export default MainBanner
