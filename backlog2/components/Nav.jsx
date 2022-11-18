import Link from 'next/link'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function NavBar() {
  const supabase = useSupabaseClient()
  const user = useUser()

  return (
    <nav>
      <ul>
        {user ? (
          <li>
            <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
          </li>
        ) : (
          <li>
            <Link href={'/'}>Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
