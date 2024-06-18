import React, { useEffect } from 'react';
import { useGeolocation } from '@uidotdev/usehooks';

const MyLocation = () => {
  const { latitude, longitude, error } = useGeolocation();

  useEffect(() => {
    if (latitude && longitude) {
      console.log(`Latitud: ${latitude}`);
      console.log(`Longitud: ${longitude}`);
    }
    if (error) {
      console.error(`Error: ${error.message}`);
    }
  }, [latitude, longitude, error]);

  return (
    <div>
    </div>
  );
};

export default MyLocation;
