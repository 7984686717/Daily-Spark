import React, { Component } from 'react'
import NavBar from './Component/NavBar'
import { News } from './Component/News'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <News pageSize={6} />

      </div>
    )
  }
}
