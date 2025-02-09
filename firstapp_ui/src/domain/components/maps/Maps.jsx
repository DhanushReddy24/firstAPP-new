import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
  NavigationControl,
  Popup,
} from 'react-map-gl';
import PlaceIcon from '@mui/icons-material/Place';
import ApiDataIOManager from '../../../common/ApiDataIOManager';
import './Maps.css';

function Maps() {
  const [mapboxAccessToken] = useState(
    'pk.eyJ1IjoiZmlyc3RhcHAyMDIzIiwiYSI6ImNscmVvdmhoMTFnaXMybXMwaDdtOTZkM2sifQ.6huSBXAt0Q_fGTtUPFNCAg'
  );
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [coords, setCoords] = useState([]);
  const [userData] = useState(() =>
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : { id: null }
  );
  const [refresh, setRefresh] = useState(true);
  const [popupUser, setPopupUser] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 17.3616,
    longitude: 78.4747,
    zoom: 10.5,
    pitch: 50,
  });
  const [mapKey, setMapKey] = useState(0);
  const utils = ApiDataIOManager();

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      },
    ],
  };

  const linestyle = {
    id: 'roadLayer',
    source: 'routeSource',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': 'blue',
      'line-width': 4,
      'line-opacity': 0.75,
    },
  };

  const getUserLocations = async () => {
    try {
      const url = `user/userlocation/`;
      const response = await utils.fetchData(url);
      const data = response.data;
      setUserLocations(data);

      const userLocationUrl = `user/userlocation/${userData.id}/`;
      const userLocationResponse = await utils.fetchData(userLocationUrl);
      const userLocationData = userLocationResponse.data;
      setStart(userLocationData);
      if (userLocationData.user) {
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: userLocationData.latitude,
          longitude: userLocationData.longitude,
        }));
      }
      setMapKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error while fetching UserLocations data:', error);
    }
  };

  const getRoute = async () => {
    try {
      const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&steps=true&geometries=geojson&access_token=${mapboxAccessToken}`;
      const response = await axios.get(apiUrl);
      const data = response.data;
      const routeCoords = data.routes[0].geometry.coordinates;
      setCoords(routeCoords);
    } catch (error) {
      console.error('Error while fetching directions data:', error);
    }
  };

  useEffect(() => {
    getUserLocations();
  }, [refresh]);

  useEffect(() => {
    if (start && end) {
      getRoute();
    }
  }, [start, end]);

  const handleMarkerClick = (userLocation) => {
    setEnd(userLocation);
  };

  const handleGeolocateControlClick = async (e) => {
    const newStart = e.coords;
    const url = `user/userlocation/`;
    const formData = {
      user: userData.id,
      latitude: newStart.latitude,
      longitude: newStart.longitude,
    };
    await utils.postData(url, formData);
    setStart((prevState) => ({
      ...prevState,
      latitude: newStart.latitude,
      longitude: newStart.longitude,
    }));
    setRefresh(!refresh);
  };

  const MarkerPopup = (user) => (
    <Popup
      latitude={user.latitude}
      longitude={user.longitude}
      closeButton={true}
      closeOnClick={false}
      offsetTop={10}
      anchor="bottom"
    >
      <p className="bg-white text-black">{user.firstname}</p>
    </Popup>
  );

  const handleMarkerEnter = (user) => {
    setPopupUser(user.user);
  };

  const handleMarkerLeave = () => {
    setPopupUser(null);
  };

  return (
    <div className="map-container">
      <ReactMapGL
        key={mapKey}
        initialViewState={viewport}
        mapboxAccessToken={mapboxAccessToken}
        mapStyle="mapbox://styles/firstapp2023/clriwtq6700oe01p47uxi511h"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        width="100%"
        height="100%"
      >
        {userLocations.map((userLocation) => (
          <Marker
            key={userLocation.id}
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
            onClick={() => handleMarkerClick(userLocation)}
          >
            <PlaceIcon
              fontSize="large"
              style={{
                color: userLocation.user !== userData.id ? 'red' : 'blue',
              }}
              onMouseEnter={() => handleMarkerEnter(userLocation)}
              onMouseLeave={handleMarkerLeave}
            />
            {popupUser === userLocation.user && MarkerPopup(userLocation)}
          </Marker>
        ))}

        {start && end && (
          <Source id="routeSource" type="geojson" data={geojson}>
            <Layer {...linestyle} />
          </Source>
        )}
        <GeolocateControl onGeolocate={handleGeolocateControlClick} />
        <NavigationControl position="top-right" />
      </ReactMapGL>
    </div>
  );
}

export default Maps;
