import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

export default class Logout extends Component {
    constructor(props) {
        super(props)

        props.onTokenChange("", -1)
    }
    render() {
        return (
            <Redirect to ="/"/>
        )
    }
}