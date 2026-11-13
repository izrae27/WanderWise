import { useState } from 'react'

export default function Explore() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('name')

  return (
    <main className="explore-page">
      <section className="explore-header">
        <h1>Explore Destinations</h1>
        <p>Discover amazing places and find your next adventure.</p>
      </section>

      <section className="explore-controls">
        <input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

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
      </section>

      <section className="destination-results">
        <p>Search and filter destinations to discover interesting places.</p>
      </section>
    </main>
  )
}