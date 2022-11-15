import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  useUser,
  useSession,
  useSupabaseClient
} from '@supabase/auth-helpers-react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/GamePage.module.css'

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `https://api.rawg.io/api/games/${params.slug}?key=${process.env.NEXT_PUBLIC_RAWG_KEY}`
  )
  const game = res.data

  return { props: { game } }
}

export default function GamePage({ game }) {
  const user = useUser()

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
      </div>

      <Link href={user ? `/users/${user.id}` : '/'}>Back</Link>
    </div>
  )
}
