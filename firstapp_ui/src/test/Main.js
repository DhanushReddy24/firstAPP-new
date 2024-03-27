import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Main.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import ReactMapGL, {Marker, Source, Layer, GeolocateControl, NavigationControl, Popup} from 'react-map-gl';
import mapboxgl from "mapbox-gl"
import PlaceIcon from "@mui/icons-material/Place";
import  ApiDataIOManager from '../common/ApiDataIOManager';

function Main() {

  const [mapboxAccessToken, setmapboxAccessToken] = useState('pk.eyJ1IjoiZmlyc3RhcHAyMDIzIiwiYSI6ImNscmVvdmhoMTFnaXMybXMwaDdtOTZkM2sifQ.6huSBXAt0Q_fGTtUPFNCAg')
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [userlocations, setUserLocations] = useState([]);
  const [coords, setCoords] = useState([]);
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [Refresh, setRefresh] = useState(true)
  const [PopupUser, setPopupUser] = useState(null)
  const utils = ApiDataIOManager();

  const [viewPort, setviewPort] =useState({
    latitude: 18.733806, 
    longitude: 77.881278,
    zoom:8,
    pitch:50
  })

  const geojson = {
    "type":"FeatureCollection",
    "features":[{
      "type":"Feature",
      "properties": {},
      "geometry":{
        "type":"LineString",
        "coordinates":[...coords]
      }
    }]
  }

  const linestyle = {
    id:"roadLayer",
    source:"routeSouce",
    type:"line",
    layout:{
      "line-join":"round",
      "line-cap":"round"
    },
    paint:{
      "line-color":"blue",
      "line-width":4,
      "line-opacity":0.75
    }
    }
    const getUserLocations = async () => {
      try {
        let url = `user/userlocation/`;
        let response = await utils.fetchData(url);
        let data = await response.data
        setUserLocations(data)
        console.log('userlocations',userlocations)

        url = `user/userlocation/${userData.id}/`;
        response = await utils.fetchData(url);
        data = await response.data
        setStart({latitude:data[0].latitude,longitude:data[0].longitude})
        console.log('start-data',data[0])
        console.log('start',start)
      } 
      catch (error) {
        console.error('Error while fetching UserLocations data:', error);
      }
    }

  const getRoute = async () => {
    try {
      let apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}
      ?overview=full&steps=true&geometries=geojson&access_token=${mapboxAccessToken}`;

      const response = await axios.get(apiUrl);
      const data = await response.data
      const coords = data.routes[0].geometry.coordinates
      setCoords(coords)
      console.log(data)
    } 
    catch (error) {
      console.error('Error while fetching directions data:', error);
    }
  }

  useEffect(() => {
    getUserLocations();
  }, [Refresh]);

  useEffect(() => {
    if (start && end){
      getRoute();
    }
  }, [start,end]);

  const handleMapClick = (e) => {
    const newEnd = e.lngLat
    //const endPoint = Object.keys(newEnd).map((item,i) => newEnd[item])
    const endPoint = {latitude:newEnd.lat,longitude:newEnd.lng}
    setEnd(endPoint)
  };
  const handleMarkerClick = (e) => {
    const newEnd = e.target._lngLat
    console.log(newEnd)
    //const endPoint = Object.keys(newEnd).map((item,i) => newEnd[item])
    const endPoint = {latitude:newEnd.lat,longitude:newEnd.lng}
    setEnd(endPoint)
  };

  const handleGeolocateControlClick = (e) => {
    const newStart = e.coords
    console.log(e)
    //const endPoint = Object.keys(newEnd).map((item,i) => newEnd[item])
    const startPoint = {latitude:newStart.latitude,longitude:newStart.longitude}
    setStart(startPoint)
  };

  const MarkerPopup = (user) => {
    return (
      <Popup
        latitude={user.latitude}
        longitude={user.longitude}
        //onClose={closePopup}
        closeButton={true}
        closeOnClick={false}
        offsetTop={10}
        anchor="bottom"
      >
        <p style={{background:'white', color:'black'}}>{user.user}</p>
      </Popup>
    )};

  const handleMarkerEnter = (user) => {
    console.log('Enter',user.user)
    setPopupUser(user.user)
  };

  const handleMarkerLeave = (user) => {
    console.log('Leave',user.user)
    setPopupUser(null)
  };
    
  const popup = new mapboxgl.Popup({ offset: 25 });

  return (
    <div className='Map'>
      <ReactMapGL
      initialViewState={viewPort}
      mapboxAccessToken={mapboxAccessToken}
      mapStyle={"mapbox://styles/firstapp2023/clriwtq6700oe01p47uxi511h"}
      onViewportChange={(viewPort) => setviewPort(viewPort)}
      width="100%"
      height="100%"
      > 
        {userlocations.map((user) => (
          <span>
            {user.user!==userData.id ? (
              <span>
              <Marker latitude={user.latitude} longitude={user.longitude} 
                color="red" 
                onClick={handleMarkerClick}
              >
                <PlaceIcon fontSize="large" style={{ color: 'red' }} 
                  onMouseEnter={() => handleMarkerEnter(user)} 
                  onMouseLeave={() => handleMarkerLeave(user)}/>
                {PopupUser==user.user && MarkerPopup(user)}
              </Marker>
              </span>
            ) : (
              <Marker latitude={user.latitude} longitude={user.longitude}
              >
                <PlaceIcon fontSize="large" style={{ color: 'blue' }} 
                  onMouseEnter={() => handleMarkerEnter(user)} 
                  onMouseLeave={() => handleMarkerLeave(user)}/>
                  {PopupUser==user.user && MarkerPopup(user)}
              </Marker>
            )}
          </span>
        ))}

        {(start && end) && (
          <Source id="routeSource" type="geojson" data={geojson}>
            <Layer {...linestyle}>
              <Popup><p style={{background:'white', color:'black'}}>Hello</p></Popup>
            </Layer>
          </Source>
        )}
        <GeolocateControl onGeolocate={handleGeolocateControlClick}/>
        <NavigationControl position="top-right"/>
      </ReactMapGL>
      <PlaceIcon fontSize="large" style={{ color: 'blue' }}/>
    </div>
  );
}

export default Main;