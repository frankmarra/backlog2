import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push(`/users/${session.user.id}`)
    }
  })
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
        <div className={styles.about}>
          <p>Sign up to start tracking what games you want to play,</p>
          <p>and which ones you have already conquered.</p>
        </div>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home
