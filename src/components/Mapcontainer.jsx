import { DirectionsService, GoogleMap , Marker, StandaloneSearchBox, useLoadScript } from '@react-google-maps/api';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyGoogleMap } from '../common/common.jsx';
import CurrentLocationButton from './CurrentLocationButton.jsx';
import SearchBox from './SearchBox.jsx';
import * as bootstrap from 'bootstrap';
import LIST_STORE_LOCATION from '../mocks/LIST_STORE_LOCATION.json'
import DirectionMap from './DirectionMap.jsx';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 21.030109,
  lng: 105.825548
};

const optionsMap = {
  styles: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f7f7f7" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3fb8b5" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
  mapTypeControl: false,
  streetViewControl: false,
  zoomControlOptions: {
    position: window.google.maps.ControlPosition.TOP_RIGHT
  },
  fullscreenControlOptions: {
    position:  window.google.maps.ControlPosition.BOTTOM_RIGHT
  }
}

function MapContainer(props) {
  const dispatch = useDispatch();
  const showListStore = useSelector(state => state.general.showListStore)
  const mapRef = useRef(null);
  const [searchBox, setSearchBox] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showDirection, setShowDirection] = useState(false);

  const informationModal = useRef()
  const inforModalRef = useRef()

  useEffect(() => {
    informationModal.current = new window.bootstrap.Modal(inforModalRef.current, {});
  }, [])

  const listStore = useMemo(()=>{
    const listStoreLocation = LIST_STORE_LOCATION.storeArray
    const map = mapRef.current;
    if(showListStore==='all'){
      if(map) map.setZoom(13)
      return listStoreLocation
    } 
    else if(!showListStore) return []
    else{
      const result = listStoreLocation.filter(store => store.district === showListStore);
      if(map){
        map.setZoom(14);
        map.setCenter(result[0].location)
      }
      return result
    }
  },[showListStore])

  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: keyGoogleMap,
    libraries: ['places'],
  });

  const onPlacesChanged = () =>{
    const places = searchBox.getPlaces()
    const lat = places[0].geometry?.location?.lat()
    const lng = places[0].geometry?.location?.lng()
    setCurrentLocation({
      value: places[0],
      position: {
        lat, 
        lng
      }
    })
    const map = mapRef.current;
    if(map){
      map.setZoom(15);
      map.setCenter({
        lat, 
        lng
      })
    }
  }
  
  const handleGetUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
    });
  }

  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  return (
    <>
    {
      isLoaded &&
      <GoogleMap
        onLoad={map => {
          mapRef.current = map; // Lưu tham chiếu đến đối tượng google.maps.Map
        }}
        mapContainerStyle={containerStyle}
        options={optionsMap}
        center={userLocation || center}
        zoom={userLocation ? 15 : 13}
      >
        {
          currentLocation && <Marker 
            icon={{
              url: '/assets/gif/search_location.gif',
              scaledSize: new window.google.maps.Size(50, 80) // Kích thước của custom marker
            }}
            position={currentLocation?.position}
          />
        }
        {
          userLocation && <Marker
            icon={{
              url: '/assets/gif/current_location.gif',
              scaledSize: new window.google.maps.Size(50, 80) // Kích thước của custom marker
            }}
            title='Vị trí hiện tại'
            position={userLocation}
          />
        }
        {
          listStore.length > 0 && listStore.map((store)=>{
            return <Marker 
              key={store.id}
              position={store.location}
              icon={{
                url: '/assets/gif/store_location.gif',
                scaledSize: new window.google.maps.Size(45, 45) // Kích thước của custom marker
              }}
              onMouseDown={()=>{setSelectedStore(store);informationModal.current.show()}}
            />
          })
        }
        {
          listStore.length > 0 && <div className='position-absolute start-0 top-0 bg-white p-3 d-flex flex-column justify-content-center align-items-start ms-1' style={{marginTop:"70px",borderRadius:"15px"}}>
            <div className='d-flex justify-content-center align-items-center'>
              <span className='default-color fw-bold' style={{fontSize:"16px"}}>Số cửa hàng được hiển thị:</span>
              <span className='text-primary fw-bold ms-2' style={{fontSize:"16px"}}>{listStore.length} cửa hàng</span>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
              <span className='default-color fw-bold' style={{fontSize:"16px"}}>Tại:</span>
              <span className='text-primary fw-bold ms-2' style={{fontSize:"16px"}}>{showListStore==='all'?'Thành phố Hà Nội':`Quận ${showListStore}`}</span>
            </div>
          </div>
        }
        {/* {
          currentLocation && <button type='button' style={{marginTop:"80px",marginLeft:"10px",borderRadius:"50%"}} className='standout p-2 position-absolute start-0 top-0 btn btn-primary d-flex justify-content-center align-items-center' onClick={()=>setShowDirection(true)}>
            <span className="material-symbols-outlined" style={{fontSize:"32px"}}>
              directions
            </span>
          </button>
        }
        {
          showDirection && <DirectionMap currentLocation={currentLocation.position} listStore={listStore} />
        } */}
        <StandaloneSearchBox
          bounds={new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(8.5591, 102.1446),
            new window.google.maps.LatLng(23.3934, 109.4695)
          )}
          onLoad={onSBLoad}
          onPlacesChanged={onPlacesChanged}
        >
          <SearchBox currentLocation={currentLocation} onSetCurrentLocation={value=>setCurrentLocation(value)} onRemoveCurrentLocation={()=>{
            const map = mapRef.current;
            if(map){
              map.setZoom(13);
              map.setCenter(center)
            }
            setCurrentLocation(null)
          }}/>
        </StandaloneSearchBox>
        <CurrentLocationButton userLocation={userLocation} onShowMyLocation={handleGetUserLocation} onRemoveMyLocation={()=>{setUserLocation(null);setShowDirection(false)}}/>
      </GoogleMap>
    }
    <div className="modal fade" tabIndex={-1} aria-hidden="true" ref={inforModalRef}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Thông tin cửa hàng</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setSelectedStore(null);informationModal.current.hide()}}></button>
          </div>
          <div className="modal-body">
            <div className='d-flex flex-column justify-content-center align-items-start'>
              <div  className='d-flex flex-row align-items-center justify-content-start'>
                <span className='text-secondary' style={{fontSize:"15px",width:"150px"}}>Tên cửa hàng:</span>
                <h5 className='text-capitalize fw-bold' style={{color:"#91298c"}}>{selectedStore?.name}</h5>
              </div>
              <div className='d-flex flex-row align-items-center justify-content-start'>
                <span className='text-secondary' style={{fontSize:"15px",width:"150px"}}>Địa chỉ cửa hàng:</span>
                <span className='text-secondary' style={{fontSize:"15px"}}>{selectedStore?.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default MapContainer;