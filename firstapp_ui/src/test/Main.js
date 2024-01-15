import React, { useState } from 'react';
import './Main.css'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker} from 'react-map-gl';
import PlaceIcon from "@material-ui/icons/Place";
import HomeIcon from "@material-ui/icons/Home";

function Main() {
  const [viewPort, setviewPort] =useState({
    latitude: 18.733806, 
    longitude: 77.881278,
    zoom:8,
    pitch:50
  })

  const markerCoordinates = {
    latitude: 18.733806,
    longitude: 77.881278,
  };

  return (
    <div className='Map'>
      <ReactMapGL
      initialViewState={viewPort}
      mapboxAccessToken='pk.eyJ1IjoiZmlyc3RhcHAyMDIzIiwiYSI6ImNscmVvdmhoMTFnaXMybXMwaDdtOTZkM2sifQ.6huSBXAt0Q_fGTtUPFNCAg'
      mapStyle={"mapbox://styles/firstapp2023/clresbysf00cm01pe0a8q3k1v"}
      onViewportChange={(viewPort) => setviewPort(viewPort)}
      width="100%"
      height="100%"
      >
        <Marker
          latitude={18.733806}
          longitude={77.881278}
        >
          <PlaceIcon style={{ color: "red", fontSize: 4*viewPort.zoom }}
          />
        </Marker>
        
      </ReactMapGL>
    </div>
  );
}

export default Main;