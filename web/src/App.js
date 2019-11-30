import React, {Component} from 'react';
import Header from "./components/Header"
import cookie from 'react-cookies'
import './styles/App.css';
import './styles/bootstrap.css'

export default class App extends Component {
    constructor(props) {
        super(props)

        let token = cookie.load('token')
        if (token === "undefined" || token === undefined) {
            token = ""
            cookie.save('token', token, { path: '/' })
        }

        this.state = {
            "token": token,
            "proxy": "http://127.0.0.1:8000"
        }
        this.onTokenChange = this.onTokenChange.bind(this)
    }

    onTokenChange(token) {
        this.setState({token: token})
        cookie.save('token', token, { path: '/' })
    }

    render() {
        return (
            <Header token={this.state.token} 
                    proxy={this.state.proxy}
                    onTokenChange={this.onTokenChange} 
                />
        );
    }
}