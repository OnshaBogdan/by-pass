import React, { Component } from "react";

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: [],
            isLoading: true
        }

        fetch(`${this.props.proxy}/api/products/`, {
            method: 'GET', 
        }).then(response => {
            response.json().then(data => ({
            status: response.status,
            data: data
        })).then(obj => {
            if (obj.status !== 200)
                this.setState({error : obj.data.error})
            else
                this.setState({
                    products: obj.data,
                    isLoading: false
                })
        })})
        
    }
    render() {
        return (
            <div>
                {this.state.isLoading === false && (
                    "Loaded"
                )}
            </div>
        );
    }
}
