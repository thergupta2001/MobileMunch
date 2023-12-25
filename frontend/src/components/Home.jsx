import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import axios from "axios";
import Navbar from "./Navbar";
import MobileCard from "./MobileCard";

const Home = () => {
  // const navigate = useNavigate();

  const [mobiles, setMobiles] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedMemory, setSelectedMemory] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8080/mobiles");
      const mobilesArray = Object.values(response.data);

      // console.log(response)
      // console.log(Object.values(response))

      setMobiles(mobilesArray);
    } catch (err) {
      console.log("No mobiles yet ", err);
    }
  }

  const filterMobiles = () => {
    const filteredMobiles = mobiles.filter(
      (mobile) =>
        (!minPrice || mobile.price >= minPrice) &&
        (!maxPrice || mobile.price <= maxPrice) &&
        (!selectedMemory ||
          mobile.memory.toLowerCase().includes(selectedMemory.toLowerCase()))
    );
    return filteredMobiles;
  };

  useEffect(() => {
    // console.log('component mounted')
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(mobiles);
  }, [mobiles]);

  const handleFilter = () => {
    const filteredMobiles = filterMobiles();

    console.log(filteredMobiles);
    setMobiles(filteredMobiles);
  };

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <Navbar />

          <div className="text-center mb-6 mt-6">
            <h1 className="text-2xl font-semibold">
              Explore and manage your orders
            </h1>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-10">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Min Price
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Max Price
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Memory
                </label>
                <input
                  type="text"
                  value={selectedMemory}
                  onChange={(e) => setSelectedMemory(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleFilter}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-32">
              {mobiles.map((mobile) => (
                <MobileCard key={mobile._id} mobile={mobile} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Access denied! Go to login page</h1>
          <Link to="/">Login</Link>
        </>
      )}
    </div>
  );
};

export default Home;
