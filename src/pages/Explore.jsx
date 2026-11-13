import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getPlacesByCity } from '../services/opentripmap'

export default function Explore() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [city, setCity] = useState(searchParams.get('search') || '')
  const [places, setPlaces] = useState([])
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('name')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchedCity, setSearchedCity] = useState('')

  async function handleSearch(event) {
    event.preventDefault()

    if (!city.trim()) {
      setError('Please enter a destination.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setPlaces([])
      setSearchedCity('')

      const result = await getPlacesByCity(city.trim())

      setPlaces(result.places || [])
      setSearchedCity(result.location.name || city.trim())

      if (!result.places?.length) {
        setError('No tourist attractions found for this destination.')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong while searching.')
    } finally {
      setLoading(false)
    }
  }

  const filteredPlaces = places
    .filter((place) => place.name && place.name.trim() !== '')
    .filter((place) => {
      const kinds = (place.kinds || '').toLowerCase()

      if (category === 'all') return true
      if (category === 'natural') return kinds.includes('natural')
      if (category === 'cultural') {
        return kinds.includes('cultural') || kinds.includes('architecture')
      }
      if (category === 'historic') {
        return kinds.includes('historic') || kinds.includes('historical')
      }
      if (category === 'interesting') {
        return kinds.includes('interesting')
      }

      return true
    })
    .sort((a, b) => {
      if (sort === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '')
      }

      return (a.name || '').localeCompare(b.name || '')
    })

  return (
    <main className="explore-page">
      <section className="explore-header">
        <h1>Explore Destinations</h1>
        <p>Discover amazing places and find your next adventure.</p>
      </section>

      <form className="explore-controls" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a city or destination..."
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="natural">Natural Attractions</option>
          <option value="cultural">Cultural Places</option>
          <option value="historic">Historic Places</option>
          <option value="interesting">Interesting Places</option>
        </select>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </form>

      {loading && (
        <p className="search-message">Finding destinations...</p>
      )}

      {error && (
        <p className="search-error">{error}</p>
      )}

      {searchedCity && !loading && (
        <h2 className="results-heading">
          Attractions near {searchedCity}
        </h2>
      )}

      <section className="destination-results">
        {filteredPlaces.map((place) => (
          <article className="destination-card" key={place.xid}>
            <div className="destination-card-content">
              <h3>{place.name || 'Unnamed Attraction'}</h3>
              <p>
                {place.kinds
                  ? place.kinds.split(',').slice(0, 3).join(', ')
                  : 'Tourist attraction'}
              </p>

              <button
                type="button"
                onClick={() => navigate(`/place/${place.xid}`)}
              >
                View Details
              </button>
            </div>
          </article>
        ))}

        {!loading && places.length > 0 && filteredPlaces.length === 0 && (
          <p>No attractions match this category.</p>
        )}
      </section>
    </main>
  )
}