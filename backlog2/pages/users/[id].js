import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import supabase from '../../utils/supabase'
import Search from '../../components/Search'
import GameCard from '../../components/GameCard'
import styles from '../../styles/UserPage.module.css'
import NavBar from '../../components/Nav'
import UserGamesNotStarted from '../../components/UserGamesNotStarted'
import { useUser } from '@supabase/auth-helpers-react'
import UserGamesInProgress from '../../components/UserGamesInProgress'
import UserGamesCompleted from '../../components/UserGamesCompleted'

export async function getServersideProps({ params }) {
  const { data, error } = await supabase
    .from('userGames')
    .select('*')
    .eq('user_id', params.id)

  if (error) throw Error(error)
  return {
    props: data
  }
}

export default function UserHome({ data }) {
  const user = useUser()
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const getSearchResults = async (event) => {
    event.preventDefault()
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_KEY}&search=${searchQuery}`
    )
    setSearchResults(response.data.results)
    setSearchQuery('')
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <NavBar />
      <section className={styles.container}>
        <div className={styles.content}>
          <Search
            onChange={handleChange}
            value={searchQuery}
            onSubmit={getSearchResults}
          />
          <div className={styles['scroll-bar-wrapper']}>
            <div className={styles['scroll-bar']}>
              {searchResults.map((result) => (
                <GameCard
                  key={result.id}
                  name={result.name}
                  image={result.background_image}
                  rating={result.rating}
                  id={result.id}
                  slug={result.slug}
                />
              ))}
            </div>
          </div>
          <h3>Games In Progress</h3>
          <div className={styles['scroll-bar-wrapper']}>
            <div className={styles['scroll-bar']}>
              <UserGamesInProgress user={user} />
            </div>
          </div>
          <h3>Games Not Started</h3>
          <div className={styles['scroll-bar-wrapper']}>
            <div className={styles['scroll-bar']}>
              <UserGamesNotStarted user={user} />
            </div>
          </div>
          <h3>Completed Games</h3>
          <div className={styles['scroll-bar-wrapper']}>
            <div className={styles['scroll-bar']}>
              <UserGamesCompleted user={user} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
