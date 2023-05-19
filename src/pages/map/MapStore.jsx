import React, { useEffect, useRef, useState } from "react";
import ListStoreControllers from "../../components/ListStoreControllers.jsx";
import MapContainer from "../../components/Mapcontainer.jsx";

export default function MapStore(props){

  return (
    <div className="h-100 w-100">
      <MapContainer/>
      <ListStoreControllers />
    </div>
  );
}