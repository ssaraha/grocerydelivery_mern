import React from 'react'
import ProductCard from './ProductCard'
import { dummyProducts } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const BestSellers = () => {
     const {products} = useAppContext();
    return (
        <div className='mt-16'>
            <p className='text-2xl font-medium md:text-3xl'>Best Sellers</p>
            <div className=''>
                {products.map((product, i) => {
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
