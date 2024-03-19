import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Table() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const response = await axios.get('/api/getFormData');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteFormData/${id}`);
      const newDrivers = drivers.filter((driver) => driver._id !== id);
      setDrivers(newDrivers);
    } catch (error) {
      console.error('Error deleting data:', error.response || error);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/updateDriver/${id}`);
  };

  function renderRating(rating) {
    const fullStar = '★';
    const emptyStar = '☆';
    let stars = '';
    for (let i = 0; i < Math.floor(rating); i++) {
      stars += fullStar;
    }
    if (rating % 1 !== 0) stars += '½';
    while (stars.length < 5) {
      stars += emptyStar;
    }
    return stars;
  }

  return (
    <div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Full Name</th>
            <th scope='col'>Phone Number</th>
            <th scope='col'>License Number</th>
            <th scope='col'>Vehicle Type</th>
            <th scope='col'>Availability Status</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Update</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={driver._id}>
              <th scope='row'>{index + 1}</th>
              <td>{driver.fullName}</td>
              <td>{driver.phoneNumber}</td>
              <td>{driver.licenseNumber}</td>
              <td>{driver.vehicleType}</td>
              <td>{driver.availabilityStatus}</td>
              <td>{renderRating(driver.rating)}</td>
              <td>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => handleUpdateClick(driver._id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDelete(driver._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
