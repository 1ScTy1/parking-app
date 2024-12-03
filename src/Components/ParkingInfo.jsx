// import React from 'react';

// const ParkingInfoApp = () => {

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{background: '#151A24',marginRight: '-20px', width: '380px', }}>
//       <div className="p-4">
//         <h2 className="text-xl import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import OpenRouteService from 'openrouteservice-js';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';

// import ParkingList from '../Components/ParkingList';

// import car from '../assets/car.png';
// import gps from '../assets/gps.png';
// import park from '../assets/index.png';
// import search from '../assets/search-normal.png';
// import close from '../assets/arrow.png'; 

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMjQ4NTg5LCJpYXQiOjE3MzIyMjY5ODksImp0aSI6IjY2YjIzZGQzZTE5MzRjNTE5MzI1NjM0N2EyOTkxMzk0IiwidXNlcl9pZCI6ImFkbWluIn0.fTYFwI0d7ltUBGsqY9ZSoFgQscHs8C41UR_AmzQQibg";

// const customIconUser = L.icon({
//   iconUrl: car,
//   iconSize: [20, 30],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const customIconParking = L.icon({
//   iconUrl: park,
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const LocateButton = ({ setUserLocation }) => {
//   const map = useMap();

//   const handleLocateClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ lat: latitude, lng: longitude });
//           map.setView([latitude, longitude], 13);
//         },
//         (err) => {
//           console.error("Ошибка получения геопозиции:", err);
//         }
//       );
//     } else {
//       alert("Геолокация не поддерживается вашим браузером.");
//     }
//   };

//   return (
//     <button
//       onClick={handleLocateClick}
//       style={{
//         position: 'absolute',
//         bottom: '100px',
//         right: '20px',
//         backgroundColor: '#293038',
//         borderRadius: '50%',
//         padding: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         cursor: 'pointer',
//         zIndex: 1000,
//       }}
//     >
//       <img src={gps} alt="Locate Me" style={{ width: '24px', height: '24px' }} />
//     </button>
//   );
// };

// const Search = ({ isActive, onClick }) => {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: '50px',
//         left: '80%',
//         zIndex: '1000',
//       }}
//     >
//       <button
//         style={{
//           backgroundColor: '#293038',
//           borderRadius: '50%',
//           padding: '10px',
//           border: 'none',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//           cursor: 'pointer',
//         }}
//         onClick={onClick} // Вызываем переданный обработчик клика
//       >
//         <img
//           src={isActive ? close : search} // Меняем иконку в зависимости от состояния
//           alt="Search Icon"
//           style={{ width: '24px', height: '24px' }}
//         />
//       </button>
//     </div>
//   );
// };

// const Map = () => {
//   const [userLocation, setUserLocation] = useState({
//     lat: 42.875298870843515,
//     lng: 74.57725165209227,
//   });
//   const [parkings, setParkings] = useState([]);
//   const [route, setRoute] = useState(null);
//   const [showParkingInfo, setShowParkingInfo] = useState(false); // Состояние для отображения ParkingInfo
//   const [isSearchActive, setIsSearchActive] = useState(false); // Состояние для смены иконки

//   const [selectedAddress, setSelectedAddress] = useState(null);

//   useEffect(() => {
//     const fetchParkings = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/parking/parking/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setParkings(response.data);
//       } catch (error) {
//         console.error('Ошибка при получении парковок:', error);
//       }
//     };

//     const intervalId = setInterval(fetchParkings, 1000);
//     return () => clearInterval(intervalId);
//   }, [userLocation]);

//   const getRoute = (parking) => {
//     const client = new OpenRouteService.Directions({
//       api_key: '5b3ce3597851110001cf62488ac025476fcb49e9b7438411c8fe1cdf',
//     });

//     client
//       .calculate({
//         coordinates: [
//           [userLocation.lng, userLocation.lat],
//           [parking.longitude, parking.latitude],
//         ],
//         profile: 'driving-car',
//         format: 'geojson',
//       })
//       .then((response) => {
//         const coordinates = response.features[0].geometry.coordinates.map((coord) => [
//           coord[1],
//           coord[0],
//         ]);
//         setRoute(coordinates);
//       })
//       .catch((err) => console.error('Ошибка при получении маршрута:', err));
//   };

//   const handleSearchClick = () => {
//     setIsSearchActive((prev) => !prev); // Переключаем состояние
//     setShowParkingInfo((prev) => !prev); // Показываем/скрываем ParkingInfo
//   };
//   const getStreetFromCoordinates = async (lat, lng) => {
//     try {
//       const response = await axios.get(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
//       );
//       console.log(response.data);
//       const address = response.data.address; 

//       return address.road || "Улица не найдена"; // Возвращаем только улицу
//     } catch (error) {
//       console.error("Ошибка при получении улицы:", error);
//       return "Улица не найдена";
//     }
//   };

//   return (
//     <div style={{ position: 'relative', height: '100vh' }}>
//       <MapContainer center={userLocation} zoom={13} style={{ height: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         <Marker position={[userLocation.lat, userLocation.lng]} icon={customIconUser}>
//           <Popup>Вы здесь</Popup>
//         </Marker>

//         {parkings.map((parking) => (
//           <Marker
//             key={parking.id}
//             position={[parking.latitude, parking.longitude]}
//             icon={customIconParking}
//             eventHandlers={{
//               click: async() => {
//                 getRoute(parking)
//                 const address = await getStreetFromCoordinates(parking.latitude, parking.longitude);
//                 alert(`Адрес парковки: ${address}`);
//                 console.log(address);
//               }
//             }}
//           >
//             <Popup>
//               <span>{parking.name}</span>
//             </Popup>
//           </Marker>
//         ))}

//         {route && <Polyline positions={route} pathOptions={{ color: 'blue', weight: 4 }} />}

//         <LocateButton setUserLocation={setUserLocation} />
//       </MapContainer>

//       {/* Кнопка Search */}
//       <Search isActive={isSearchActive} onClick={handleSearchClick} />

//       {/* Отображение ParkingInfo */}
//       {showParkingInfo && (
//         <div
//           style={{
//             position: 'absolute',
//             top: '100px',
//             right: '20px',
//             width: '300px',
//             zIndex: 1000,
//           }}
//         >
//           <ParkingList parkingList={parkings} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Map;
// font-bold mb-2 text-white">Муниципальная Платная парковка</h2>
//         <p className="text-gray-600 mb-4 text-white">г.Бишкек ул.Турусбекова, 35</p>

//         <h3 className="font-semibold mb-2 text-white">Информация</h3>
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-gray-600 text-white" style={{background: '#293038', padding: '10px 17px', borderRadius: '20px'}}>Рядом с Вами</span>
//           <span className="bg-green-500 text-white px-3 py-1 rounded-full" style={{ padding: '10px 17px', borderRadius: '20px'}}>17/40 мест</span>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <span className="text-white" style={{background: '#293038', padding: '10px 17px', borderRadius: '20px'}}>25 сом</span>
//         </div>

//         <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
//           Бронировать
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ParkingInfoApp;