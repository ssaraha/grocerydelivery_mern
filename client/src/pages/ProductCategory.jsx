import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {

const {products} = useAppContext();
const {category} = useParams();

const searchCategory = categories.find((c) => c.path.toLowerCase() === category.toLowerCase());

const filteredProducts = products.filter((p) => p.category.toLowerCase() === category);

return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-16 h-0.5 bg-green-700 rounded-full'></div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
            {filteredProducts.map((p, index) => {
              return <ProductCard product={p} key={p._id} />
            })}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <h3 className='text-2xl font-medium'>No products found in this category.</h3>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
