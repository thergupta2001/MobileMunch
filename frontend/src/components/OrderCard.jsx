import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const OrderCard = ({ order }) => {
  const username = localStorage.getItem('username')

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/deleteOrder/${order._id}`, {
        data: { username: username },
      })

      // console.log('Order deleted successfully', response)
      window.location.reload()

      toast.success('Order deleted successfully')
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  return (
    <div className="flex items-center justify-between border p-4 mb-4 bg-blue-200 rounded-md">
      <div>
        <h3 className="text-xl font-semibold">{order.mobileName}</h3>
        <p><b>Model:</b> {order.mobileModel}</p>
        <p><b>Price:</b> Rs. {order.price}</p>
      </div>
      <button
        className="p-3 rounded-md text-white transition duration-300 ease-in-out bg-blue-600 hover:bg-red-600 active:bg-darkred"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default OrderCard;
