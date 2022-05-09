import { Fragment, useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import { geosearch } from 'esri-leaflet-geocoder'

import { distanceKmBetweenTwoCoordinates } from '../../utils/calculateDistance'
import { fetchNearestLocation, getAddressFromLocation } from '../../utils/getLocation'

function GeoMarker(props) {
  return (
    <Marker position={props.position} draggable={false} animate={true}>
      {props.children}
    </Marker>
  )
}

function YourGeoMarker({ goRideData }) {
  return goRideData.length > 0 ? (
    <Fragment>
      {goRideData.map((coordinate, index) => (
        <GeoMarker
          key={index}
          position={{
            lat: coordinate.destination.lat,
            lng: coordinate.destination.lng,
          }}
        >
          <Popup>Your destination is here</Popup>
        </GeoMarker>
      ))}
    </Fragment>
  ) : null
}

function LocationMarker({
  secretKey,
  temporary,
  goRideData,
  updateGoRideData,
}) {
  const [localDestination, setLocalDestination] = useState({
    lat: 0,
    lng: 0,
    updated: false,
  })

  const mapper = useMapEvents({
    click: (location) => {
      mapper.locate()
      setLocalDestination({
        lat: location.latlng.lat,
        lng: location.latlng.lng,
        updated: true,
      })
    },
  })

  function getCoordFromTemporaryOrLocal() {
    const lat = localDestination.lat
      ? localDestination.lat
      : temporary.coordinates.destination.lat
    const lng = localDestination.lng
      ? localDestination.lng
      : temporary.coordinates.destination.lng
    return { lat, lng }
  }

  async function updateDatas(secretKey) {
    const coords = getCoordFromTemporaryOrLocal()

    await fetchNearestLocation(secretKey, coords.lat, coords.lng).then(
      (res) => {
        const distance = distanceKmBetweenTwoCoordinates({
          ...coords,
          lat2: res.lat,
          lon2: res.lng,
        })
        const closestDistance =
          Math.round(distance) >= 1 ? Math.round(distance) : 1
        const adddress = getAddressFromLocation(res)

        updateGoRideData([
          ...goRideData,
          {
            ...temporary.coordinates,
            destination: {
              ...coords,
              address: adddress,
              updated: true,
            },
            price: Math.round(closestDistance * 5000), // price 5000/km
          },
        ])
      }
    )
  }

  useEffect(() => {
    if (
      localDestination.updated &&
      !temporary.coordinates.destination.updated
    ) {
      updateDatas(secretKey)
    }
  }, [localDestination])

  return (
    <Fragment>
      <GeoMarker position={temporary.coordinates.pickUpPoint}>
        <Popup>You are here</Popup>
      </GeoMarker>
      <YourGeoMarker goRideData={goRideData} />
    </Fragment>
  )
}

export default LocationMarker
