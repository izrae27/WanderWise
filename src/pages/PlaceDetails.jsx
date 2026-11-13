
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPlaceDetails } from '../services/opentripmap'

export default function PlaceDetails() {
  const { id } = useParams()

  const [place, setPlace] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPlace() {
      try {
        setLoading(true)
        setError('')

        const data = await getPlaceDetails(id)
        setPlace(data)
      } catch (err) {
        setError(err.message || 'Unable to load destination details.')
      } finally {
        setLoading(false)
      }
    }

    loadPlace()
  }, [id])

  if (loading) {
    return (
      <main className="place-details-page">
        <p>Loading destination details...</p>
      </main>
    )
  }

  if (error || !place) {
    return (
      <main className="place-details-page">
        <p className="search-error">
          {error || 'Destination not found.'}
        </p>
        <Link to="/explore">Back to Explore</Link>
      </main>
    )
  }

  const description =
    place.wikipedia_extracts?.text ||
    place.info?.descr ||
    'No description is currently available for this destination.'

  const image = place.preview?.source
  const latitude = place.point?.lat
  const longitude = place.point?.lon

  return (
    <main className="place-details-page">
      <Link to="/explore" className="back-link">
        ← Back to Explore
      </Link>

      <section className="place-details-content">
        {image && (
          <img
            src={image}
            alt={place.name}
            className="place-details-image"
          />
        )}

        <h1>{place.name || 'Unnamed Attraction'}</h1>

        <p className="place-category">
          {place.kinds
            ? place.kinds.split(',').slice(0, 4).join(', ')
            : 'Tourist attraction'}
        </p>

        <h2>About this place</h2>
        <p>{description}</p>

        {place.address && (
          <div className="place-information">
            <h2>Location</h2>
            <p>
              {[
                place.address.road,
                place.address.suburb,
                place.address.city,
                place.address.state,
                place.address.country,
              ]
                .filter(Boolean)
                .join(', ') || 'Location details unavailable'}
            </p>
          </div>
        )}

        {latitude != null && longitude != null && (
          <div className="place-information">
            <p>
              Coordinates: {latitude}, {longitude}
            </p>

            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Google Maps
            </a>
          </div>
        )}

        {place.wikipedia && (
          <p>
            <a
              href={place.wikipedia}
              target="_blank"
              rel="noreferrer"
            >
              Read more on Wikipedia
            </a>
          </p>
        )}
      </section>
    </main>
  )
}
