import React from 'react'
import ProductCard from './ProductCard'
import { dummyProducts } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const BestSellers = () => {
    //1h53
     const {products} = useAppContext();
    return (
        <div className='mt-16'>
            <p className='text-2xl font-medium md:text-3xl'>Best Sellers</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-6'>
                {products.filter((product) => product.inStock).slice(0, 5).map((product, i) => {
                    return <ProductCard 
                        key={i}
                        product={product}
                     />
                })}
                
            </div>
        </div>
    )
}

export default BestSellers
