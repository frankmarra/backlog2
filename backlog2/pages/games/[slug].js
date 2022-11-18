import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/GamePage.module.css'
import supabase from '../../utils/supabase'

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `https://api.rawg.io/api/games/${params.slug}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`
  )
  const game = res.data

  return { props: { game } }
}

export default function GamePage({ game }) {
  const [userGameList, setUserGameList] = useState()
  const [gameStatus, setGameStatus] = useState()
  const user = useUser()

  useEffect(() => {
    user ? getUserGames() : null
  }, [user])

  const addToUserGames = async () => {
    try {
      let userGame = {
        user_id: user.id,
        status: 'Not Started',
        game_slug: game.slug,
        name: game.name,
        image: game.background_image
      }

      let { error } = await supabase.from('userGames').upsert(userGame)
      getUserGames()
      if (error) throw error
    } catch (error) {
      throw error
    }
  }

  async function getUserGames() {
    try {
      const { data: userGame, error } = await supabase
        .from('userGames')
        .select('*')
        .eq('user_id', user.id)
        .eq('game_slug', game.slug)

      setUserGameList(userGame)
    } catch (error) {
      throw error
    }
  }

  const handleStatusChange = (e) => {
    setGameStatus(e.target.value)
  }

  const updateGameStatus = async (status) => {
    try {
      let { error } = await supabase
        .from('userGames')
        .update({ status: status })
        .eq('id', userGameList[0].id)
    } catch (error) {}
  }

  return (
    <div className={styles['game-content']}>
      <div className="image-container">
        <Image
          src={game.background_image}
          alt={game.name}
          width={500}
          height={500}
        />
      </div>
      <div className={styles['game-info']}>
        <h2>{game.name}</h2>
        <h3>Released: {game.released}</h3>
        <h3>Rating: {game.rating}</h3>
        <p>{game.description_raw}</p>

        {userGameList?.length > 0 ? (
          <>
            <div className="drop-down-menu">
              <label htmlFor="game-status">Level Up:</label>
              <select
                id="game-status"
                value={gameStatus}
                onChange={handleStatusChange}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="update-status-button">
              <button
                className="btn primary"
                onClick={() => updateGameStatus(gameStatus)}
              >
                Save Status
              </button>
            </div>
          </>
        ) : (
          <button
            className="btn primary"
            type="button"
            onClick={() => addToUserGames()}
          >
            add to library
          </button>
        )}
      </div>

      <Link className="btn" href={user ? `/users/${user.id}` : '/'}>
        Back
      </Link>
    </div>
  )
}
