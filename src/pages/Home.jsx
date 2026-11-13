import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    if (search.trim()) {
      navigate(`/explore?search=${encodeURIComponent(search.trim())}`)
    } else {
      navigate('/explore')
    }
  }

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">YOUR NEXT ADVENTURE STARTS HERE</span>

          <h1>
            Discover amazing places.
            <br />
            Create unforgettable memories.
          </h1>

          <p>
            Explore fascinating attractions, discover hidden gems,
            and find inspiration for your next journey.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search destinations or attractions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <button type="submit">Explore Now</button>
          </form>
        </div>
      </section>

      <section className="welcome-section">
        <span>EXPLORE THE WORLD</span>
        <h2>Your journey begins with WanderWise</h2>
        <p>
          Find interesting destinations and explore places
          worth discovering around the world.
        </p>
      </section>
    </main>
  )
}
