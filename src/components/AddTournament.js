import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import { Redirect } from "react-router-dom";
import Navbar from './Navbar';
import calls from './helpers/Calls'
import imageUploader from './helpers/ImageUploader'


class AddTournament extends Component {
  constructor(props) {
    super(props);
    console.log('this props: ',props);
    this.state = {
      name: '',
      img: '',
      players: [],
      games: [],
      redirect: false,
      disable: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('this state: ',this.state)
    calls.handleFormSubmitAddTournament(this.state)
      .then((newTournament) => {
        console.log('this data: ',newTournament)
        
        this.props.setCurrentTournament(newTournament.data._id, 'set');
        this.setState({ name: "", img: "", redirect: true });
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/players' />
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)
    console.log('shit', uploadData, file);

    imageUploader.uploadImage(uploadData)
      .then((img) => {
        this.setState({
          img,
          disable: false,
        })
      })
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="container">
        {this.renderRedirect()}
        <Navbar />
        <h2>NEW TOURNAMENT</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.handleChange(e)} />
          <input type="file" onChange={this.fileOnchange}></input>
          {this.disable ? <input type="submit" disabled></input> : <input type="submit"></input>}

          {/* <input type="submit" value="Submit" /> */}
        </form>


      </div>
    )
  }
}

export default withAuth(AddTournament);
