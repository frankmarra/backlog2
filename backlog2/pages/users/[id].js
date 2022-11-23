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

export async function getServerSideProps() {
  const rawg = process.env.NEXT_PUBLIC_RAWG_KEY

  return { props: { rawg } }
}

export default function UserHome({ rawg }) {
  const user = useUser()
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  const getSearchResults = async (event) => {
    event.preventDefault()
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${rawg}&search=${searchQuery}`
    )
    console.log('rawg key: ', rawg)
    setSearchResults(response.data.results)
    setSearchQuery('')
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    user && (
      <div>
        <NavBar />
        <section className={styles.container}>
          <div className={styles.content}>
            <h2>Search for a game</h2>
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
                    backgroundColor={'#525759'}
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
  )
}
