import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import bg from '../assets/bg.jpg'
import flag from '../assets/Flag.png'
import check from '../assets/check.png'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjgxMTc4LCJpYXQiOjE3MzIyNTk1NzgsImp0aSI6IjVkNTFmNmE3ZTk0OTQ0ZTJhZWNlYWQzNzkzNzUxN2M1IiwidXNlcl9pZCI6ImFkbWluIn0.SB0BVa4qYi4o5asXIOl05Emt4Pti1GBIqn3nq9HXRnU"

const CreateParking = () => {
  const navigate = useNavigate()
    
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [numPlaces, setNumPlaces] = useState('');
  const [parkingId, setParkingId] = useState(null)

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleNumPlacesChange = (e) => {
    const value = e.target.value;
    setNumPlaces(value ? parseInt(value) : ''); // Если значение пустое, оставляем пустым
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Подготавливаем данные для отправки
    const data = {
      latitude: latitude.toString(), // Конвертируем в строку
      longitude: longitude.toString(), // Конвертируем в строку
      total_spots: numPlaces, // Количество мест, может быть числом
    };
    console.log(typeof(data.total_spots));

    console.log("Отправленные данные:", data);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/parking/parking/',
        data,
        {
            headers: {
                'Content-Type': 'application/json', // Указываем тип контента
                'Authorization': `Bearer ${token}`, // Добавляем access token в заголовок
            },
        }
    );

      console.log('Ответ от сервера:', response.data);
      console.log(response.data.id);

      setParkingId(response.data.id)
      navigate('/admin/create',{state: {id: response.data.id}})

      alert('Форма отправлена!');
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      alert('Ошибка при отправке данных на сервер');
    }
  };

  return (
    <div className="main bg-gray-900 text-white flex items-center justify-center min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="max-w-lg w-full px-6">
        <h1 className="text-center text-2xl font-bold mb-8">Подключение камеры</h1>
        <form 
            className="space-y-6"
            onSubmit={handleSubmit
            }>
          {/* Number of seats */}
          <div>
            <label htmlFor="seats" className="block text-sm font-medium mb-2">
              Количество мест
            </label>
            <div className="flex items-center bg-gray-800 rounded-md p-2">
              <span className="text-gray-400 mr-2">
                <img src={check} alt="" />
              </span>
              <input
                type="number"
                name="lat"
                value={latitude}
                onChange={handleLatitudeChange}
                required
                className="bg-transparent flex-1 focus:outline-none text-gray-300"
                placeholder="000"
              />
            </div>
          </div>

          {/* Coordinates */}
          <div>
            <label className="block text-sm font-medium mb-2">Координаты</label>
            <div className="flex space-x-4">
              {/* Latitude */}
              <div className="flex items-center bg-gray-800 rounded-md p-2 flex-1">
                <span className="text-gray-400 mr-2">
                  <img src={flag} alt="" />
                </span>
                <input
                  type="number"
                  name="lng"
                  value={longitude}
                  onChange={handleLongitudeChange}
                  required
                  className="bg-transparent flex-1 focus:outline-none text-gray-300"
                  placeholder="Широта"
                />
              </div>
              {/* Longitude */}
              <div className="flex items-center bg-gray-800 rounded-md p-2 flex-1">
                <span className="text-gray-400 mr-2">
                  <img src={flag} alt="" />
                </span>
                <input
                  type="number"
                  value={numPlaces}
                  onChange={handleNumPlacesChange}
                  required
                  className="bg-transparent flex-1 focus:outline-none text-gray-300"
                  placeholder="Долгота"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateParking;
