import React, { Component } from "react";

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            isLoading: true,
            message: ''
        }

        fetch(`${props.proxy}/api/users/${props.user_id}/`, {
            method: 'GET', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}` },
            redirect: 'follow', 
            referrer: 'no-referrer'
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
            let data = obj.body
            this.setState({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                isLoading: false
            })
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        this.setState({
            'message': ""
        })

        fetch(`${this.props.proxy}/api/users/${this.props.user_id}/`, {
            method: 'PUT', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`},
            'body': JSON.stringify({
                "email": this.state.email,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name
            })
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => {
            let data = obj.body
            this.setState({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                isLoading: false,
                message: "Profile updated"
            })
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className='body'>
                {this.state.isLoading === true ? ("") : (
                    <form onSubmit={this.handleSubmit}>
                    <div className='col-md-6'>
                        {this.state.message !== "" && (
                            <div className="alert alert-success">{this.state.message}</div>
                        )}
                        <h4>Profile</h4>
                        <hr/>
                        <div className='mb-3'>
                            <label>Username</label>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <span className='input-group-text'>@</span>
                                </div>
                                <input 
                                    className="form-control"
                                    type='text'
                                    name='username'
                                    placeholder='Username'
                                    defaultValue={this.state.username}
                                    readOnly
                                    />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                            <label>First name</label>
                            <div className='input-group'>
                                <input 
                                    className="form-control"
                                    type='text'
                                    name='first_name'
                                    placeholder='First name'
                                    value={this.state.first_name}
                                    onChange={this.handleChange}
                                    />
                            </div>
                            </div>
                            <div className='col-md-6 mb-3'>
                            <label>Last name</label>
                            <div className='input-group'>
                                <input 
                                    className="form-control"
                                    type='text'
                                    name='last_name'
                                    placeholder='Last name'
                                    value={this.state.last_name}
                                    onChange={this.handleChange}
                                    />
                            </div>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>Email</label>
                            <div className='input-group'>
                                    <input 
                                    className="form-control"
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    />
                            </div>
                        </div>
                        <br/>
                        <button type='submit' className='btn btn-primary'>Update</button>
                        </div>
                    </form>
                )}
            </div>
        )
    }
}
