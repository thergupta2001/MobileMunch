import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import { isAuthenticated } from '../utils/auth'
import OrderCard from './OrderCard'

const Order = () => {
  const [orders, setOrders] = useState([])

  const username = localStorage.getItem('username')

  const fetchData = async () => {
    try{
      const response = await axios.post('http://localhost:8080/getOrders', {
        username: username
      })

      const ordersArray = Object.values(response.data.user.orders)

      // console.log('Orders fetched successfully ', response.data.user.orders)
      setOrders(ordersArray)
    } catch (err) {
      console.log('Error fetching orders ', err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // console.log(orders)
  }, [orders])

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <Navbar />
          <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-semibold mb-4">Your Orders</h2>
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>Access denied! Go to login page</h1>
          <Link to="/">Login</Link>
        </>
      )}
    </div>
  )
}

export default Order
