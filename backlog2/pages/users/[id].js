import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  useSession,
  useUser,
  useSupabaseClient
} from '@supabase/auth-helpers-react'
import Search from '../../components/Search'
import GameCard from '../../components/GameCard'

export default function UserHome() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()
  const rawg = process.env.NEXT_PUBLIC_RAWG_KEY

  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const getSearchResults = async (event) => {
    event.preventDefault()
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${rawg}&search=${searchQuery}`
    )
    console.log(rawg)
    setSearchResults(response.data.results)
    setSearchQuery('')
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <section className="container">
        <div className="content">
          <Search
            onChange={handleChange}
            value={searchQuery}
            onSubmit={getSearchResults}
          />
          <div className="search-results-wrapper">
            <div className="search-results">
              {searchResults.map((result) => (
                <GameCard
                  key={result.id}
                  name={result.name}
                  image={result.background_image}
                  rating={result.rating}
                  id={result.id}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
