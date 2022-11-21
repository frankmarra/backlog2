import styles from '../styles/AboutPage.module.css'
import Nav from '../components/Nav'

const About = () => {
  return (
    <>
      <Nav />
      <div className={styles['about']}>
        <h1>Welcome to Backlog! </h1>
        <p>
          Search for a game to add to your backlog and start your quest to have
          zero games left to play! Yeah, we know that's impossible, but maybe
          chipping away at it will make you feel better!
        </p>
      </div>
    </>
  )
}

export default About
