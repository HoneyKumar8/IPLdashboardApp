import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  const statusClass = matchStatus === 'Won' ? 'match-result' : 'match-lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-logo"
      />
      <p className="match-card-text">{competingTeam}</p>
      <p className="match-card-text">{result}</p>
      <p className={`match-card-text ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
