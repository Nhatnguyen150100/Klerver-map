import React, { useEffect } from 'react';
import { useState } from 'react';

function SearchBox(props) {
  return (
    <div className='d-flex shadow flex-row justify-content-center align-items-center position-absolute top-0 start-0 p-1 bg-white mt-1 ms-1' style={{borderRadius:"15px"}}>
      <div className='d-flex flex-column justify-content-center align-items-center mx-3 my-1'>
        <img src='/assets/icons/icon.png' alt='logo klever' style={{height:"18px"}}/>
        <span className='fw-bold text-uppercase' style={{color:"#91298c",fontSize:"16px"}}>
          klever fruits
        </span>
      </div>
      <div className='d-flex border justify-content-center align-items-center me-1 my-1' style={{borderRadius:"12px"}}>
        <input
          type="text"
          // eslint-disable-next-line react/prop-types
          value={props.currentLocation?props.currentLocation?.formatted_address:''}
          // eslint-disable-next-line react/prop-types
          onChange={e=>props.onSetCurrentLocation({
            formatted_address: e.target.value
          })}
          placeholder="Tìm kiếm địa điểm"
          className='form-control border-0'
          style={{
            outlineStyle:'none',
            width: `350px`,
            height: `40px`,
            padding: `0 12px`,
            borderRadius: `10px`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
        {
          // eslint-disable-next-line react/prop-types
          props.currentLocation && <button className='btn btn-outline-danger p-0 border-0 me-1' type='button' style={{borderRadius:"25%"}} onClick={props.onRemoveCurrentLocation}>
            <span className="material-symbols-outlined mt-1">
              cancel
            </span>
          </button>
        }
      </div>
      
    </div>
  );
}

export default SearchBox;