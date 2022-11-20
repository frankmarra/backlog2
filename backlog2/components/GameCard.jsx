import { useRouter } from 'next/router'

const GameCard = ({ image, name, id, slug, backgroundColor }) => {
  const router = useRouter()

  const showGame = () => {
    router.push(`/games/${slug}`)
  }

  return (
    <div
      className="game-card"
      key={id}
      style={{ backgroundColor: `${backgroundColor}` }}
      onClick={() => showGame()}
    >
      <div className="img-wrapper">
        <img src={image} alt={name} />
      </div>
      <div className="game-info-wrapper">
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default GameCard
