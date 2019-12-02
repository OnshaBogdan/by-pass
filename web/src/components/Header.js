import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import About from "./About"
import Basket from "./Basket"
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import Registration from "./auth/Registration";

export default class Header extends Component {

    render() {
            return (
                <BrowserRouter>
                    <div className="header">
                        <ul className="header-list" style={{ listStyle: "none" }}>
                            <li className="header-link" style={{ float: "left" }}>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="header-link" style={{ float: "left" }}>
                                <Link to="/about">About</Link>
                            </li>
                            {this.props.token !== "" ? (
                                <li className="header-link" style={{ float: "right" }}>
                                    <Link to="/logout">Logout</Link>
                                </li>
                                
                            ) : ( 
                                <li className="header-link" style={{ float: "right" }}>
                                <Link to="/signup">Sign up</Link>
                                </li>
                                
                            )}
                            {this.props.token !== "" ? (
                                <li className="header-link" style={{ float: "right" }}>
                                    <Link to="/profile">Profile</Link>
                                </li>
                            ) : (
                                <li className="header-link" style={{ float: "right" }}>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="body">
                        <Switch>
                            <Route exact path="/">
                                <Home 
                                    token={this.props.token}
                                    proxy={this.props.proxy}
                                    basket={this.props.basket}
                                    addToBasket={this.props.addToBasket}
                                    remFromBasket={this.props.remFromBasket}
                                />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route exact path="/profile">
                                <Profile 
                                    proxy={this.props.proxy}
                                    token={this.props.token}    
                                    />
                            </Route>
                            <Route exact path="/basket">
                                <Basket/>
                            </Route>
                            <Route exact path="/signup">
                                <Registration proxy={this.props.proxy} token={this.props.token} onTokenChange={this.props.onTokenChange}/>
                            </Route>
                            <Route exact path="/login">
                                <Login proxy={this.props.proxy} token={this.props.token} onTokenChange={this.props.onTokenChange} />
                            </Route>
                            <Route exact path="/logout">
                                <Logout token={this.props.token} onTokenChange={this.props.onTokenChange}/>
                            </Route>
                            <Route exact component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            );
    }
}
