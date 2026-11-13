
const BASE_URL = 'https://api.opentripmap.com/0.1/en/places'

const API_KEY = import.meta.env.VITE_OPENTRIPMAP_API_KEY

async function apiRequest(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('API key is missing. Check your .env.local file.')
  }

  const queryParams = new URLSearchParams({
    ...params,
    apikey: API_KEY,
  })

  const response = await fetch(
    `${BASE_URL}/${endpoint}?${queryParams}`
  )

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`OpenTripMap error (${response.status}): ${message}`)
  }

  return response.json()
}

export async function getCityCoordinates(city) {
  const data = await apiRequest('geoname', {
    name: city,
    country: 'PH',
  })

  if (data.status !== 'OK' || !data.lat || !data.lon) {
    throw new Error('Destination not found in the Philippines.')
  }

  return data
}

export async function getPlacesByCity(city) {
  const location = await getCityCoordinates(city)

  const places = await apiRequest('radius', {
    radius: '50000',
    lon: String(location.lon),
    lat: String(location.lat),
    limit: '20',
    offset: '0',
    format: 'json',
  })

  return {
    location,
    places,
  }
}

export async function getPlaceDetails(xid) {
  return apiRequest(`xid/${encodeURIComponent(xid)}`)
}
