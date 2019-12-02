import React, {Component} from 'react';
import Header from "./components/Header"
import cookie from 'react-cookies'
import './styles/App.css';
import './styles/bootstrap.css'

export default class App extends Component {
    constructor(props) {
        super(props)

        let token = cookie.load('token')
        let user_id = cookie.load('user_id')
        if (token === "undefined" || token === undefined) {
            token = ""
            user_id = -1
            cookie.save('token', token, { path: '/' })
            cookie.save('user_id', user_id, { path: '/' })
        }

        this.state = {
            "token": token,
            "proxy": "http://127.0.0.1:8000",
            "basket": [],
            "user_id": user_id
        }
        this.onTokenChange = this.onTokenChange.bind(this)
        this.addToBasket = this.addToBasket.bind(this)
        this.remFromBasket = this.remFromBasket.bind(this)
    }

    remFromBasket(product) {
        console.log("Remove from basket")
        console.log(product)        
    }

    addToBasket(product) {
        console.log("Add to basket")
        console.log(product)
    }

    onTokenChange(token, user_id = -1) {
        cookie.save('token', token, { path: '/' })
        cookie.save('user_id', user_id, { path: '/' })
        this.setState({token: token, user_id: user_id})
    }

    render() {
        return (
            <Header token={this.state.token} 
                    proxy={this.state.proxy}
                    onTokenChange={this.onTokenChange} 
                    addToBasket={this.addToBasket}
                    remFromBasket={this.remFromBasket}
                    basket={this.state.basket}
                    user_id={this.state.user_id}
                />
        );
    }
}