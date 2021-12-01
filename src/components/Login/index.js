import { Component } from "react"
import "../index.css"
import Register from "./Register"
import SignIn from "./SignIn"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegister: false
    }
    this.onLogin = props.onLogin
  }

  toggleShowRegister = () => {
    const { showRegister } = this.state
    this.setState({ showRegister: !showRegister })
  }

  render() {
    return (
      <div className='login-page-container'>
        {this.state.showRegister ? (
          <Register
            onRegister={this.toggleShowRegister}
            onGoBack={this.toggleShowRegister}
          />
        ) : (
          <SignIn
            onRegister={this.toggleShowRegister}
            onLogin={this.onLogin}
            onSuccessfulLogin={this.props.onSuccessfulLogin}
          />
        )}
      </div>
    )
  }
}

export default Login
