import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import { geosearch } from 'esri-leaflet-geocoder'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'

import { Fragment, useState, useEffect } from 'react'

function LocationMarker({ APIKEY, coordinates, listCoordinates, setListCoordinates }) {
  const control = geosearch()
  const [destination, setDestination] = useState({
    lat: 0,
    lng: 0,
    updated: false,
  })

  const map = useMapEvents({
    click: (location) => {
      map.locate()
      setDestination({
        lat: location.latlng.lat,
        lng: location.latlng.lng,
        updated: true,
      })
    },
  })

  // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  // This funciton only calcuate the straight line distance between two points
  function distanceKmBetweenTwoCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371

    var dLat = degreesToRadians(lat2 - lat1)
    var dLon = degreesToRadians(lon2 - lon1)

    lat1 = degreesToRadians(lat1)
    lat2 = degreesToRadians(lat2)

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return earthRadiusKm * c
  }

  // Converts numeric degrees to radians
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180
  }

  async function fetchNearestLocation(lat, lng) {
    const response = await fetch(
      // `https://www.mapquestapi.com/geocoding/v1/reverse?key=2c3Fa9WjwCEdWU0erVbbZeRTP3lAF6Q2`,
      `https://www.mapquestapi.com/geocoding/v1/reverse?key=${APIKEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: {
            latLng: {
              lat: lat,
              lng: lng,
            },
          },
          options: {
            thumbMaps: false,
          },
          includeNearestIntersection: true,
          includeRoadMetadata: true,
        }),
      }
    ).then((res) => res.json())

    const location = response.results[0].locations[0]
    const distance = distanceKmBetweenTwoCoordinates(
      coordinates.pickUpPoint.lat, // pickUpPoint.lat
      coordinates.pickUpPoint.lng, // pickUpPoint.lng
      location.latLng.lat, // destination.lat
      location.latLng.lng // destination.lng
    )
    // if the distance is less than 1 km, then the distance will be fixed to 1 km
    const fixedDistance = Math.round(distance) >= 1 ? Math.round(distance) : 1

    setListCoordinates([
      ...listCoordinates,
      {
        ...coordinates,
        destination: {
          lat: lat,
          lng: lng,
          updated: true,
          address: `${location.adminArea3}, ${location.street}`,
        },
        price: Math.round(fixedDistance * 5000), // 5k price per km,
      },
    ])
  }

  useEffect(() => {
    if (!map) return
    control.addTo(map)
  }, [])

  useEffect(() => {
    if (destination.updated && !coordinates.destination.updated) {
      const _lat = destination.lat
        ? destination.lat
        : coordinates.destination.lat
      const _lng = destination.lng
        ? destination.lng
        : coordinates.destination.lng

      fetchNearestLocation(_lat, _lng)
    }
  }, [destination])

  return (
    <Fragment>
      {listCoordinates.length < 1 ? null : (
        <Fragment>
          {listCoordinates.map((coordinate, index) => (
            <Marker
              position={{
                lat: coordinate.destination.lat,
                lng: coordinate.destination.lng,
              }}
              draggable={false}
              animate={true}
              key={index}
            >
              <Popup>Your destination is here</Popup>
            </Marker>
          ))}
        </Fragment>
      )}

      <Marker
        position={coordinates.pickUpPoint}
        draggable={false}
        animate={true}
      >
        <Popup>You are here</Popup>
      </Marker>
    </Fragment>
  )
}

export default function TMap({
  APIKEY,
  coordinates,
  setCoordinates,
  listCoordinates,
  setListCoordinates,
}) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    navigator.geolocation.watchPosition((position) => {
      setCoordinates({
        ...coordinates,
        pickUpPoint: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          updated: true,
          address: '',
        },
      })
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <div className='w-[100%] h-[75vh] my-12'>
      <MapContainer
        center={coordinates.pickUpPoint}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker
          APIKEY={APIKEY}
          coordinates={coordinates}
          listCoordinates={listCoordinates}
          setListCoordinates={setListCoordinates}
        />
      </MapContainer>
    </div>
  ) : (
    'loading'
  )
}
