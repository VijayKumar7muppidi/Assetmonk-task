import { Button, Card, TextField } from "@mui/material"
import { Component } from "react"
import successImage from "../../assets/images/success.png"
import "../index.css"

class Register extends Component {
  constructor(props) {
    super(props)
    this.onRegister = this.props.onRegister
    this.onGoBack = this.props.onGoBack
  }

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    inputsFilled: true,
    success: false
  }

  onChangeFirstname = (event) =>
    this.setState({ firstName: event.target.value })
  onChangeLastname = (event) => this.setState({ lastName: event.target.value })
  onChangeEmail = (event) => this.setState({ email: event.target.value })
  onChangePassword = (event) => this.setState({ password: event.target.value })

  onClickRegister = async () => {
    const { firstName, lastName, email, password } = this.state
    const nonEmpty =
      firstName.trim().length > 0 &&
      lastName.trim().length &&
      email.trim().length > 0 &&
      password.length > 0
    if (nonEmpty) {
      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
      const api = "https://reqres.in/api/register"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body
      }
      const response = await fetch(api, options)
      if (response.ok) {
        this.setState({ success: true }, () => {
          setTimeout(this.onRegister, 5000)
        })
      }
    } else {
      this.setState({ inputsFilled: false })
    }
  }

  renderSuccess = () => {
    return (
      <div className='success-card'>
        <img src={successImage} alt='success' />
        <p style={{ margin: 10 }}>Successfully Registered</p>
        <p>Redirecting to Login Page...</p>
      </div>
    )
  }

  renderForm = () => {
    const { firstName, lastName, email, password } = this.state
    return (
      <Card variant='outlined' className='card'>
        <h2>Register</h2>
        <TextField
          className='text-input'
          type='text'
          id='outlined-basic'
          label='Enter First Name'
          variant='outlined'
          margin='normal'
          value={firstName}
          onChange={this.onChangeFirstname}
          min
        />
        <TextField
          className='text-input'
          type='text'
          id='outlined-basic'
          label='Enter Last name'
          variant='outlined'
          margin='normal'
          value={lastName}
          onChange={this.onChangeLastname}
        />
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
        {!this.state.inputsFilled && (
          <p style={{ color: "#ff0000" }}>Please fill all the inputs</p>
        )}
        <div className='row space-between'>
          <Button variant='outlined' onClick={this.onGoBack}>
            Go back
          </Button>
          <Button variant='contained' onClick={this.onClickRegister}>
            Register
          </Button>
        </div>
      </Card>
    )
  }

  render() {
    return this.state.success ? this.renderSuccess() : this.renderForm()
  }
}

export default Register
