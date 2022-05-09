import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

import LocationMarker from './LocationMarker.component'

function GeoMap({ secretKey, temporary, goRideData, updateGoRideData }) {
  const mapSettings = {
    zoom: 15,
    scrollWheelZoom: true,
    style: { height: '100%', width: '100%' },
  }
  const mapTileLayer = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attrib:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }

  return (
    <div className='mb-4 mx-5 lg:mx-10'>
      <div className='w-[100%] h-[50vh] lg:h-[75vh]'>
        <MapContainer
          center={temporary.coordinates.pickUpPoint}
          zoom={mapSettings.zoom}
          style={mapSettings.style}
          scrollWheelZoom={mapSettings.scrollWheelZoom}
        >
          <TileLayer url={mapTileLayer.url} attribution={mapTileLayer.attrib} />
          <LocationMarker
            secretKey={secretKey}
            temporary={temporary}
            goRideData={goRideData}
            updateGoRideData={updateGoRideData}
          />
        </MapContainer>
      </div>
    </div>
  )
}

export default GeoMap
