import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedLatestMatch = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const formattedRecentMatches = data.recent_matches.map(matches => ({
      umpires: matches.umpires,
      result: matches.result,
      manOfTheMatch: matches.man_of_the_match,
      id: matches.id,
      date: matches.date,
      venue: matches.venue,
      competingTeam: matches.competing_team,
      competingTeamLogo: matches.competing_team_logo,
      firstInnings: matches.first_innings,
      secondInnings: matches.second_innings,
      matchStatus: matches.match_status,
    }))

    this.setState({
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: formattedLatestMatch,
      recentMatches: formattedRecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatchDetails, recentMatches, isLoading} =
      this.state

    const wonCount = recentMatches.filter(
      each => each.matchStatus === 'Won',
    ).length

    const lostCount = recentMatches.filter(
      each => each.matchStatus === 'Lost',
    ).length

    const drawCount = recentMatches.filter(
      each => each.matchStatus === 'Draw',
    ).length

    const data = [
      {name: 'Won', value: wonCount},
      {name: 'Lost', value: lostCount},
      {name: 'Draw', value: drawCount},
    ]

    const COLORS = {
      Won: '#28a745',
      Lost: '#dc3545',
      Draw: '#ffc107',
    }

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <Link to="/" className="back-button">
              Back
            </Link>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <h1 className="latest-match-heading">Latest Matches</h1>
            <LatestMatch matchDetails={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
              ))}
            </ul>
            <h1 className="statistics-heading">Match Statistics</h1>

            <PieChart width={400} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map(entry => (
                  <Cell key={entry.name} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
