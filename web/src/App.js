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
            "proxy": "http://127.0.0.1:8000",
            "basket": []
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

    onTokenChange(token) {
        cookie.save('token', token, { path: '/' })
        this.setState({token: token})
    }

    render() {
        return (
            <Header token={this.state.token} 
                    proxy={this.state.proxy}
                    onTokenChange={this.onTokenChange} 
                    addToBasket={this.addToBasket}
                    remFromBasket={this.remFromBasket}
                    basket={this.state.basket}
                />
        );
    }
}