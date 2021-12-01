import { Button, Card, TextField } from "@mui/material"
import { Component } from "react"
import "../index.css"

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      formError: ""
    }
    this.onRegister = this.props.onRegister
    this.onLogin = this.props.onLogin
  }

  componentDidMount(){
    this.loadUserList()
  }
  loadUserList = async () => {
    const api = "https://reqres.in/api/users"
    const response = await fetch(api)
    const json = await response.json()
    this.usersList = json.data
    console.log(json.data)
  }

  onChangeEmail = (event) => this.setState({ email: event.target.value })
  onChangePassword = (event) => this.setState({ password: event.target.value })

  onClickLogin = () => {
    const { email, password } = this.state
    if (email.trim().length === 0 || password.length === 0) {
      this.setState({ formError: "Please fill all the inputs" })
    } else {
      const user = this.usersList.find(
        (user) => user.email === email
      )
      if (user !== undefined) {
        console.log(user.id)
        this.props.onSuccessfulLogin(true, user.id)
      } else {
        this.setState({ formError: "Invalid User Credentials" })
      }
    }
  }

  render() {
    const { email, password } = this.state
    return (
      <Card variant='outlined' className='card'>
        <h2>Login</h2>
        <TextField
          className='text-input'
          id='outlined-basic'
          label='Enter Email'
          variant='outlined'
          margin='normal'
          value={email}
          onChange={this.onChangeEmail}
        />
        <TextField
          className='text-input'
          type='password'
          id='outlined-basic'
          label='Enter Password'
          variant='outlined'
          margin='normal'
          value={password}
          onChange={this.onChangePassword}
        />
        {this.state.formError.length > 0 && (
          <p style={{ color: "#ff0000" }}>{this.state.formError}</p>
        )}
        <div className='row space-between'>
          <Button variant='outlined' onClick={this.onRegister}>
            Register
          </Button>
          <Button variant='contained' onClick={this.onClickLogin}>
            Login
          </Button>
        </div>
      </Card>
    )
  }
}

export default SignIn
