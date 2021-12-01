import React, { Component } from "react"
import "./App.css"
import Login from "./components/Login/index"
import Album from "./components/Album"

class App extends Component {
  state = {
    logged: false,
    userId: undefined,
  }

  updateLogged = (logged, userId) => {
    this.setState({ logged, userId })
  }

  render() {
    const { logged } = this.state
    return logged ? (
      <Album userId={this.state.userId} />
    ) : (
      <Login logged={logged} onSuccessfulLogin={this.updateLogged} />
    )
  }
}

export default App
