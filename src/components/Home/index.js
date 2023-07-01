// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeams()
    // this.updateData()
  }

  //   updateData = async () => {
  //     const responses = await fetch(teamsApiUrl)
  //     console.log(responses)
  //     const fetchedData = await responses.json()
  //     console.log(fetchedData)

  //     const newTeam = [
  //       {
  //         name: 'Gujairat Taitans',
  //         id: 'GT',
  //         team_image_url:
  //           'https://res.cloudinary.com/dpgviap9s/image/upload/v1684751791/Gujarat-Titans_x51jmu.png',
  //       },
  //       {
  //         name: 'Lucknow Super gaints',
  //         id: 'LSG',
  //         team_image_url:
  //           'https://res.cloudinary.com/dpgviap9s/image/upload/v1684751812/Lucknow_y4nscc.png',
  //       },
  //     ]
  //     const updatedData = {...fetchedData, newTeam} // Create an updated data object

  //     // {
  //     //   "name": "Royal Challengers Bangalore",
  //     //   "id": "RCB",
  //     //   "team_image_url": "https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png",
  //     //   // use value of the key 'name' for alt as `${name}`
  //     // },

  //     fetch(teamsApiUrl, {
  //       method: 'PUT', // or 'PATCH'
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedData),
  //     })
  //       .then(response => response.json())
  //       .then(updatedDataFromAPI => {
  //         // Handle the response from the API
  //         console.log('Data updated:', updatedDataFromAPI)
  //         // Update the component's state or context if needed
  //         // this.setState(updatedDataFromAPI)
  //       })
  //       .catch(error => {
  //         // Handle error
  //         console.error('Error updating data:', error)
  //       })
  //   }

  getTeams = async () => {
    const response = await fetch(teamsApiUrl)
    // console.log(response)
    const fetchedData = await response.json()
    // console.log(fetchedData)
    const formattedData = fetchedData.teams.map(team => ({
      name: team.name,
      id: team.id,
      teamImageURL: team.team_image_url,
    }))

    this.setState({
      teamsData: formattedData,
      isLoading: false,
    })
  }

  renderTeamsList = () => {
    const {teamsData} = this.state

    return (
      <ul className="teams-list">
        {/* FIX6: The list of team cards should be rendered using Array.map() method */}
        {teamsData.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    // FIX7: For the purpose of testing here testid attribute should be added with the value "loader"
    // eslint-disable-next-line react/no-unknown-property
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
