export async function fetchNearestLocation(secretKey, lat, lng) {
  const response = await fetch(
    `https://www.mapquestapi.com/geocoding/v1/reverse?key=${secretKey}`,
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

  return response.results[0].locations[0]
}

export function getAddressFromLocation(loc) {
  return `[${loc.adminArea1}] ${loc.adminArea3}, ${loc.adminArea4}${loc.adminArea5}. ${loc.street} ${loc.postalCode}`
}
