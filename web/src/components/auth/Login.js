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

        this.setState({
            error: ""
        })
            fetch(`${this.props.proxy}/api/login/`, {
                method: 'POST', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json',
                },
                redirect: 'follow', 
                referrer: 'no-referrer',
                body: JSON.stringify(data)
            }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
            .then(obj => {
                if (obj.status === 404) {
                    this.setState({
                        'error': 'Wrong credentials'
                    })
                } 
                else
                    this.props.onTokenChange(obj['body']['token'], obj.body.user_id)
            })
        event.preventDefault()
    }

    render() {
        return (
            <div>
            {this.props.token !== "" && (
                <Redirect to="/"/>
            )}
            <form className="auth-form" onSubmit={this.handleSubmit}>
                <h2>Log in</h2>
                <br/>
                {this.state.error !== "" ? (
                    <div className='alert alert-danger'>
                        {this.state.error}
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