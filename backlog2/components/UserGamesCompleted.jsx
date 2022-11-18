import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import supabase from '../utils/supabase'

const UserGamesCompleted = ({ user }) => {
  const [userGamesCompleted, setUserGamesCompleted] = useState([])

  useEffect(() => {
    const getUserGamesCompleted = async () => {
      const { data } = await supabase
        .from('userGames')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'Completed')
      setUserGamesCompleted(data)
    }
    user ? getUserGamesCompleted() : null
  }, [user])

  return (
    <>
      {userGamesCompleted.map((game) => (
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

export default UserGamesCompleted
