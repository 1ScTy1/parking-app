import React, { useState, useEffect } from 'react';
import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjgxMTc4LCJpYXQiOjE3MzIyNTk1NzgsImp0aSI6IjVkNTFmNmE3ZTk0OTQ0ZTJhZWNlYWQzNzkzNzUxN2M1IiwidXNlcl9pZCI6ImFkbWluIn0.SB0BVa4qYi4o5asXIOl05Emt4Pti1GBIqn3nq9HXRnU'

const ParkingList = () => {
  const [parkingList, setParkingList] = useState([]); // Хранение данных о парковках
  const [searchQuery, setSearchQuery] = useState(''); // Строка поиска
  const [loading, setLoading] = useState(false); // Состояние загрузки

  // Функция для получения данных о парковках
  const fetchParkingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/parking/parking/', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setParkingList(response.data); // Сохраняем данные о парковках
    } catch (error) {
      console.error('Ошибка при загрузке парковок:', error);
    } finally {
      setLoading(false);
    }
  };

  // Загружаем парковки при монтировании компонента и обновляем каждую секунду
  useEffect(() => {
    fetchParkingData(); // Первый вызов для мгновенной загрузки

    const intervalId = setInterval(() => {
      fetchParkingData();
    }, 1000); // Обновление каждую секунду

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, []);

  // Фильтруем парковки на основе поискового запроса
  const filteredParkings = parkingList.filter((parking) =>
    parking.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className=" shadow-lg rounded-lg overflow-hidden"
      style={{ background: '#151A24',marginRight: '-20px', width: '380px', height:'500px' , position: 'absolute', right: '0',top: '40px' }}
    >
      {/* Search bar */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Обновляем поисковый запрос
            className="w-full py-2 px-4 rounded-full pl-10 text-white"
            style={{ background: 'none', border: '1px solid gray' }}
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
      </div>

      {/* Parking list */}
      <div className="px-4 pb-4">
        {loading ? (
          <p className="text-center text-white">Загрузка...</p>
        ) : (
          <div className="space-y-4">
            {filteredParkings.length > 0 ? (
              filteredParkings.map((parking) => (
                <div
                  key={parking.id}
                  className="flex justify-between items-center p-4 rounded-lg shadow"
                  style={{ border: '1px solid gray', borderRadius: '20px' }}
                >
                  <div>
                    <h2 className="font-semibold text-white">{parking.name || 'Парковка'}</h2>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, starIndex) => (
                          <i key={starIndex} className="fas fa-star"></i>
                        ))}
                      </div>
                      <span className="text-sm text-white ml-2">
                        {parking.reviews_count || 0} отзывов
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                      {parking.occupied_spots}/{parking.total_spots} мест
                    </span>
                    <span className="bg-gray-800 text-white px-2 py-1 rounded-full text-sm">
                      {parking.price || 'N/A'}с
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white">Парковки не найдены.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingList;
