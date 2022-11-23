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
      alert('Game added to your library')
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

      alert(`Game status updated to ${status}`)
    } catch (error) {
      throw error
    }
  }

  return (
    <div className={styles['game-content']}>
      <div className={styles['image-container']}>
        <Image
          src={game.background_image}
          alt={game.name}
          width={700}
          height={700}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px)33vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className={styles['game-info']}>
        <h1>{game.name}</h1>
        <h3>Released: {game.released}</h3>
        <h3>Rating: {game.rating}</h3>
        <p>{game.description_raw}</p>

        {userGameList?.length > 0 ? (
          <>
            <p>Status: {userGameList[0].status}</p>
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
        <Link className="btn" href={user ? `/users/${user.id}` : '/'}>
          Back
        </Link>
      </div>
    </div>
  )
}
