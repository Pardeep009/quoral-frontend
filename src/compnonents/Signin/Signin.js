import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
// import { NavLink, withRouter } from "react-router-dom";
import {ToastifyError} from '../../containers/React-Toastify/React-Toastify';
import './Signin.css';
import { signin, isAuthenticated, authenticate } from '../../auth/index';
import Spinner from '../../containers/Spinner/Spinner';
import Layout from '../../Layout';

class Signin extends Component {
    state = {
        usernameORemail : '',
        password : '',
        redirectToReferer: false,
        showLoading : false,
    }

    handleChange = (event) => {
        if(event.target.value[event.target.value.length-1] === ' ') {
            let message = 'Username/Email cannot have space';
            if(event.target.name === 'password' ) {
                message = 'Password cannot have space';
            }
            ToastifyError(message);
            return;
        }
        else {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
    }

    login = (event) => {
        if(this.state.usernameORemail === '') {
            ToastifyError('Username/Email cannot be empty');
            return;
        }
        else if(this.state.password === '') {
            ToastifyError('Password cannot be empty');
            return;
        }
        this.setState({
            showLoading : true,
        })
        let { usernameORemail, password } = this.state;
        let user = { usernameORemail, password };
        signin(user,(data) => {
            if(data.error) {
                ToastifyError(data.error);
                this.setState({
                    showLoading : false
                })
            }
            else {
                authenticate(data,() => {
                    this.setState({
                        showLoading : false,
                        redirectToReferer: true
                    })
                })
            }
        })
    }

    render() {
        if (this.state.redirectToReferer || isAuthenticated() ) {
            return <Redirect to="/" />;
        }
      
        if (this.state.showLoading) {
            return <Spinner />;
        }

        return (
                // <div className="row mainPage">
                //     <div className="col-sm-4">

                //     </div>
                //     <div className="col-sm-4">
                    <Layout >
                                <div className="form-group">
                                    {/* <label className="control-label col-sm-2" htmlFor="email">Email or Username:</label> */}
                                    <div className="col-sm-10">
                                        <input 
                                            type="username" 
                                            name="usernameORemail" 
                                            value={this.state.usernameORemail} 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="Enter Email or Username" 
                                            onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/* <label className="control-label col-sm-2" htmlFor="pwd">Password:</label> */}
                                    <div className="col-sm-10">
                                        <input 
                                            type="password" 
                                            name="password" 
                                            value={this.state.password} 
                                            className="form-control" 
                                            id="pwd" 
                                            placeholder="Enter Password" 
                                            onChange={this.handleChange} />
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button type="button" className="btn" onClick={this.login}>Login</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <Link to="/forgot-password" className="forgot-password" >Forgot Password</Link>
                                    </div>
                                </div>
                                    
                    </Layout> 

                //     </div>
                //     <div className="col-sm-4">

                //     </div>
                // </div>
        )
    }
}

export default Signin;