import React from "react";

export default function CurrentLocationButton(props){
  // eslint-disable-next-line react/prop-types
  return <button 
    type="button" 
    // eslint-disable-next-line react/prop-types
    className={`btn ${props.userLocation?'btn-primary':'btn-secondary'} border-0 p-1 d-flex justify-content-center align-items-center position-absolute end-0 top-0`} 
    // eslint-disable-next-line react/prop-types
    onClick={props.userLocation?props.onRemoveMyLocation:props.onShowMyLocation} style={{marginTop:"100px",marginRight:"10px"}}>
    <span className="material-symbols-outlined" style={{fontSize:"30px"}}>
      my_location
    </span>
  </button>
}