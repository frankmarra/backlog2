import { useState, useEffect } from 'react'
import GameCard from './GameCard'
import supabase from '../utils/supabase'

const UserGamesInProgress = ({ user }) => {
  const [userGamesInProgress, setUserGamesInProgress] = useState([])

  useEffect(() => {
    const getUserGamesInProgress = async () => {
      const { data } = await supabase
        .from('userGames')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'In Progress')

      setUserGamesInProgress(data)
    }
    user ? getUserGamesInProgress() : null
  }, [user])

  return (
    <>
      {userGamesInProgress.map((game) => (
        <GameCard
          key={game.id}
          name={game.name}
          image={game.image}
          slug={game.game_slug}
          backgroundColor={'#0d6bf2'}
        />
      ))}
    </>
  )
}

export default UserGamesInProgress
