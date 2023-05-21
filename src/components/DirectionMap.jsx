import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const DirectionMap = ({currentLocation, listStore}) => {
  const [storeNearest, setStoreNearest] = useState();

  const calculateDistances = async () => {
    const distancesArray = [];

    // eslint-disable-next-line react/prop-types
    for (let i = 0; i < listStore.length; i++) {
      // eslint-disable-next-line react/prop-types
      const response = await getDirections(listStore[i].location);
      const distance = extractDistance(response);
      distancesArray.push({
        ...listStore[i],
        distance: distance
      });
    }

    const storeNearestTemp = distancesArray.reduce((min,store) => store.distance < min.distance ? store : min)
    setStoreNearest(storeNearestTemp);
  };

  useEffect(() => {
    calculateDistances();
  }, [listStore]);

  const getDirections = (destination) => {
    return new Promise((resolve, reject) => {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: currentLocation, 
          destination: destination,
          travelMode: 'DRIVING', 
        },
        (response, status) => {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(new Error(`Directions request failed. Status: ${status}`));
          }
        }
      );
    });
  };

  const extractDistance = (response) => {
    const route = response.routes[0];
    const leg = route.legs[0];
    return leg.distance.value;
  };

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        return <DirectionsRenderer directions={response} />;
      } else {
        window.alert('Directions request failed. Status:', response.status);
      }
    }
    return null;
  };

  return <div>
    {
      storeNearest && <DirectionsService
        options={{
          origin: currentLocation,
          destination: storeNearest.location,
          travelMode: 'DRIVING',
        }}
        callback={directionsCallback}
      />
    }
  </div>
}

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(DirectionMap)