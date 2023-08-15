import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function App() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://yourapi.com/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  return (
    <div className="App">
      <MapContainer center={[20,0]} zoom={2} style={{ width: '100%', height: '600px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {customers.map(customer => (
          <Marker key={customer.name} position={[customer.latitude, customer.longitude]}>
            <Popup>
              {customer.name} - {customer.city}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
