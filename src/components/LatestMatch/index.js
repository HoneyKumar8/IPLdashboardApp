import './index.css'

const LatestMatch = ({matchDetails}) => {
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = matchDetails

  return (
    <div className="latest-match-card">
      <div className="latest-match-details">
        <p>{competingTeam}</p>
        <p>{date}</p>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="latest-match-logo"
      />
      <div className="latest-match-details">
        <p>First Innings </p>
        <p>{firstInnings}</p>
        <p>Second Innings </p>
        <p>{secondInnings}</p>
        <p>Man of The Match </p>
        <p>{manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
