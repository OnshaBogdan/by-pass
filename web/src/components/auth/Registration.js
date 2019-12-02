import React, { Component } from "react";
import {Redirect} from 'react-router-dom'

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
            first_name: "",
            last_name: "",
            error: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        if (this.state.password !== this.state.password_confirmation) {
            this.setState({
                error: "Passwords do not match"
            })
        }

        this.setState({
            error: ""
        })

        let data = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email,
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
        }
            fetch(`${this.props.proxy}/api/users/`, {
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
                if (!(obj.status >= 200 && obj.status < 300))
                    this.setState({error : "Username is taken, choose another"})
                else {
                    this.setState({error: ""})
                }
            })}).then(() => {
                if (this.state.error === "") {
                    data = {
                        'username': this.state.username,
                        'password': this.state.password
                    }
                    fetch(`${this.props.proxy}/api/login/`, {
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
                            response.json().then(data => {
                                this.props.onTokenChange(data['token'])
                        })
                    })}}
                )
            

        event.preventDefault()
    }

    render() {
        return (
            <div>
                {this.props.token !== "" && (
                    <Redirect to="/profile"/>
                )}
                <form className="auth-form" onSubmit={this.handleSubmit}>
                    <h2>Sign up</h2>
                    <br/>
                    {this.state.error !== "" && (
                        <div className='alert alert-danger'>{this.state.error}</div>
                    )}
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className='form-row form-group'>
                    <div className="col">
                    <label>
                        First name
                    </label>
                        <input
                            className="form-control"
                            type="text"
                            name="first_name"
                            placeholder="First name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                    <label>
                        Last name
                    </label>
                        <input
                            className="form-control"
                            type="text"
                            name="last_name"
                            placeholder="Last name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    </div>
                    <div className='form-row form-group'>
                    <div className="col">
                    <label>
                        Password
                    </label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                    <label>
                        Password confirm
                    </label>
                        <input
                            className="form-control"
                            type="password"
                            name="password_confirmation"
                            placeholder="Password confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    </div>
                    <button className="btn btn-primary" onSubmit={this.state.onSubmit} type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
