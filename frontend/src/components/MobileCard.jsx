import React from "react";
import axios from "axios";
import toast from 'react-hot-toast'

const MobileCard = ({ mobile }) => {
  const { name, model, memory, price, image } = mobile;

  const username = localStorage.getItem('username')

  const handleOrderClick = async () => {
     // console.log('Clicked')

     try{
          const response = await axios.post('http://localhost:8080/placeOrder', {
               username: username,
               mobileName: name,
               mobileModel: model,
               price: price
          })

          // console.log('Mobile added successfully')
          toast.success('Mobile added to orders successfully')
     } catch (err){
          console.log('Error adding this model ', err)
     }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={image}
        alt={`${name} ${model}`}
        className="w-full h-32 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <hr />
      <p className="text-gray-500">{model}</p>
      <p className="text-gray-500">{memory}</p>
      <p className="text-gray-700 font-bold">Rs. {price}</p>
      <button
        onClick={handleOrderClick}
        className="mt-1 w-full items-center bg-blue-500 p-1 border rounded text-white font-bold hover:bg-gray-200 hover:text-blue-500 hover:text-bold"
      >
        Order
      </button>
    </div>
  );
};

export default MobileCard;
