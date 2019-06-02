import React from 'react'
import { withAuth } from "../../../lib/AuthProvider";
import { Link } from 'react-router-dom'

function LeaderBoardCell(props) {
  return (
    <div>
      <div className="tournament-cell">
        <img src={props.img} alt='pic' />

        <Link to={{ pathname: `/players`, state: {tournamentId: props._id} }}>
          <p className="tournament-name">{props.name}</p>
        </Link>

        <p className="tournament-name">SCORE: {props.score}</p>

        {/* <Link to={{ pathname: `/tournaments/edit-tournament/${props._id}`, state: {tournamentId:props._id} }}>
          <p>EDIT</p>
        </Link> */}

      </div>
    </div>
  )
}
export default withAuth(LeaderBoardCell)