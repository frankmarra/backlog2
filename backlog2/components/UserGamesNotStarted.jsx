import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import supabase from '../utils/supabase'

const UserGamesNotStarted = ({ user }) => {
  const [userGamesNotStarted, setUserGamesNotStarted] = useState([])

  useEffect(() => {
    const getUserGamesNotStarted = async () => {
      const { data } = await supabase
        .from('userGames')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'Not Started')
      setUserGamesNotStarted(data)
    }
    user ? getUserGamesNotStarted() : null
  }, [user])

  return (
    <>
      {userGamesNotStarted.map((game) => (
        <GameCard
          key={game.id}
          name={game.name}
          image={game.image}
          slug={game.game_slug}
        />
      ))}
    </>
  )
}

export default UserGamesNotStarted
