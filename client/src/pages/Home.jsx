import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/categories'
import BestSellers from '../components/BestSellers'

const Home = () => {
    return (
        <div className='mt-10'>
            <MainBanner />
            <Categories />
            <BestSellers />
        </div>
    )
}

export default Home
