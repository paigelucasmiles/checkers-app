import React, { Component } from 'react'
import './SignupForm.css'

export default class SignupForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signUp(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <h1>Sign Up</h1>
                    <label>Username</label>
                    <input name='username' value={this.state.username} onChange={this.handleChange}/>
                    <label>Password</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange}/>
                    <input type='submit' value='Sign Up' />
                </form>
            </div>
        )
    }
}
