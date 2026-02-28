import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = ({teamDetails}) => {
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li className="team-card">
      <Link to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
