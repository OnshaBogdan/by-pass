import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "username" : "",
            "password": "",
            "error": ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    handleSubmit(event) {
        let data = {
            "username": this.state.username,
            "password": this.state.password
        }
            fetch(`${this.props.proxy}/api/login`, {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json',
                },
                redirect: 'follow', 
                referrer: 'no-referrer',
                body: JSON.stringify(data)
            }).then(response => {
                response.json().then(data => ({
                status: response.status,
                data: data
            })).then(obj => {
                if (obj.status != 200)
                    this.setState({error : obj.data.error})
                else
                    this.props.onTokenChange(obj.data['token'])
            })})
        event.preventDefault()
    }

    render() {
        return (
            <div>
            {this.props.token !== "" && (
                <Redirect to="/profile"/>
            )}
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <h2>Log in</h2>
                <br/>
                {this.state.error !== "" ? (
                    <div>
                        <h3 style={{color: "red"}}>{this.state.error}</h3>
                    </div>
                ) : ( "" )}
                <div className='form-group'>
                <label>Username</label>
                <input
                    required
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value = {this.state.username}
                    onChange = {this.handleChange}
                />
                </div>
                <div className='form-group'>
                <label>Password</label>
                <input
                    required
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                />
                </div>
                <button className='btn btn-primary' type="submit">Submit</button>
            </form>
            </div>
        )
    }
}