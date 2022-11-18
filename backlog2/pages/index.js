import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import UserAccount from '../components/UserAccount'
import { useRouter } from 'next/router'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>Backlog</title>
        <meta name="description" content="Backlog login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <p>Welcome to</p>
          <h1>Backlog</h1>
        </div>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        ) : (
          router.push(`/users/${session.user.id}`)
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
