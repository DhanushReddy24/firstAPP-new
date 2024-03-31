import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Maps.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker, Source, Layer, GeolocateControl, NavigationControl, Popup} from 'react-map-gl';
import mapboxgl from "mapbox-gl"
import PlaceIcon from "@mui/icons-material/Place";
import  ApiDataIOManager from '../../common/ApiDataIOManager';

function Maps () {

  const [mapboxAccessToken, setmapboxAccessToken] = useState('pk.eyJ1IjoiZmlyc3RhcHAyMDIzIiwiYSI6ImNscmVvdmhoMTFnaXMybXMwaDdtOTZkM2sifQ.6huSBXAt0Q_fGTtUPFNCAg')
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [userlocations, setUserLocations] = useState([]);
  const [coords, setCoords] = useState([]);
  const [userData, setuserData] = useState(()=> localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {"id": null})
  const [Refresh, setRefresh] = useState(true)
  const [PopupUser, setPopupUser] = useState(null)
  const [viewPort, setviewPort] =useState({latitude: 18.5063454,longitude: 77.3558051,zoom:8,pitch:50})
  const [mapKey, setMapKey] = useState(0);
  const utils = ApiDataIOManager();

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
        setStart(data)
        setviewPort(prevViewport => ({
            ...prevViewport,
            latitude: data.latitude,
            longitude: data.longitude
        }));
        setMapKey(prevKey => prevKey + 1);
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

  const handleMarkerClick = (userlocation) => {
    console.log(userlocation)
    setEnd(userlocation)
  };

  const handleGeolocateControlClick = async (e) => {
    const newStart = e.coords
    console.log(e)
    let url = `user/userlocation/`;
    const formData = {user:userData.id, latitude: newStart.latitude, longitude: newStart.longitude}
    const response = await utils.postData(url,formData);
    setStart(prevState => ({
        ...prevState,
        latitude: newStart.latitude,
        longitude: newStart.longitude
    }));
    setRefresh(!Refresh)
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
        <p style={{background:'white', color:'black'}}>{user.firstname}</p>
      </Popup>
    )};

  const handleMarkerEnter = (user) => {
    setPopupUser(user.user)
  };

  const handleMarkerLeave = () => {
    setPopupUser(null)
  };
    
  const popup = new mapboxgl.Popup({ offset: 25 });

  return (
    <div className='Map'>
      <ReactMapGL
      key={mapKey}
      initialViewState={viewPort}
      mapboxAccessToken={mapboxAccessToken}
      mapStyle={"mapbox://styles/firstapp2023/clriwtq6700oe01p47uxi511h"}
      onViewportChange={(newViewPort) => setviewPort(newViewPort)}
      width="100%"
      height="100%"
      > 
        {userlocations.map((userlocation) => (
          <span>
            {userlocation.user!==userData.id ? (
              <span>
              <Marker key={userlocation.id} latitude={userlocation.latitude} longitude={userlocation.longitude} color="red" onClick={() => handleMarkerClick(userlocation)}>
                <PlaceIcon fontSize="large" style={{ color: 'red' }} 
                  onMouseEnter={() => handleMarkerEnter(userlocation)} 
                  onMouseLeave={() => handleMarkerLeave()}
                />
                {PopupUser==userlocation.user && MarkerPopup(userlocation)}
              </Marker>
              </span>
            ) : (
              <Marker key={userlocation.id} latitude={userlocation.latitude} longitude={userlocation.longitude}>
                <PlaceIcon fontSize="large" style={{ color: 'blue' }} 
                  onMouseEnter={() => handleMarkerEnter(userlocation)} 
                  onMouseLeave={() => handleMarkerLeave()}
                />
                  {PopupUser==userlocation.user && MarkerPopup(userlocation)}
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
    </div>
  );
}

export default Maps ;