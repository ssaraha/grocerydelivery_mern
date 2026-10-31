import React, { useState } from 'react'
import { assets } from '../assets/assets'

//Input Field Component
const InputField = ({
    type, 
    placeholder,
    name,
    handleChange, 
    address
}) => (
    <input 
    className='w-full px-2 py-2.5 border border-gray-500/130 rounded outline-none text-gray-500 focus:border-gray-400 transition'
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    />
)

const AddAddress = () => {

    const [address, setAddress] = useState({
        firstname: "",
        lastname: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
    }

  return (
    <div className='mt-16 pb-16 '>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-indigo-500'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
            <form 
            className='space-y-3 mt-6 text-sm'
            onSubmit={onSubmitHandler}>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="firstname"
                        placeholder="First name"
                        />
                    <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="lastname"
                        placeholder="Last name"
                        />
                </div>
                <InputField 
                        type="email"
                        handleChange={(e) => handleChange(e)}
                        address={address}
                        name="email"
                        placeholder="Email address"
                        />
                <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="street"
                        placeholder="Street"
                        />
                <div className='grid grid-cols-2 gap-4'>
                    <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="city"
                        placeholder="City"
                        />
                    <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="state"
                        placeholder="State"
                        />    
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <InputField 
                        type="number"
                        handleChange={handleChange}
                        address={address}
                        name="zipcode"
                        placeholder="Zip Code"
                        />
                    <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="country"
                        placeholder="Country"
                        />    
                </div>     
                <InputField 
                        type="text"
                        handleChange={handleChange}
                        address={address}
                        name="phone"
                        placeholder="Phone"
                        /> 
                <button className='w-full mt-6 bg-indigo-500 text-white py-3 hover:bg-indigo-700 transition cursor-pointer uppercase rounded-md' >Save address</button>  
                
            </form>
        </div>
        <img className='md:mr-10 mb-10 md:mt-0' src={assets.add_address_iamge} alt='Add Address' />
      </div>
    </div>
  )
}

export default AddAddress
