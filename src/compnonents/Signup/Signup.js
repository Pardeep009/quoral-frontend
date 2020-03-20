import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastifyError, ToastifySuccess } from '../../containers/React-Toastify/React-Toastify';
// import './Signup.css';
import { signup, isAuthenticated, authenticate } from '../../auth/index';
import Spinner from '../../containers/Spinner/Spinner';

class Signup extends Component {
    state = {
        username : '',
        email : '',
        password : '',
        showLoading : false,
        redirectToReferer : false
    }

    handleChange = (event) => {
        if(event.target.value[event.target.value.length-1] === ' ') {
            let message = 'Username cannot have space';
            if(event.target.name === 'password' ) {
                message = 'Password cannot have space';
            }
            else if(event.target.name === 'email') {
                message = 'Email cannot have space';
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

    signup = () => {
        if(this.state.username === '') {
            ToastifyError('Username cannot be empty');
            return;
        }
        else if(this.state.email === '') {
            ToastifyError('Email cannot be empty');
            return;
        }
        else if(this.state.password === '') {
            ToastifyError('Password cannot be empty');
            return;
        } 
        this.setState({
            showLoading : true,
        })
        let { username, email, password } = this.state;
        let user = { username, email, password };
        signup(user,(data) => {
            this.setState({
                showLoading : false
            })
            if(data.error) {
                // console.log(data);
                ToastifyError(data.error);
            }
            else {
                // console.log(data);
                authenticate(data,() => {
                    ToastifySuccess("Signup Successful.Redirecting to Home page",() => {
                        this.setState({
                            redirectToReferer : true,
                        })
                    });
                })
            }
        })
    }

    render() {
        
        if ( this.state.redirectToReferer === true ||  isAuthenticated() ) {
            return <Redirect to="/" />;
        }

        if (this.state.showLoading === true) {
            return <Spinner />;
        }

        return (
                <div className="row mainPage">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">                               
                                <div className="form-group">
                                    {/* <label className="control-label col-sm-2" htmlFor="username">Username:</label> */}
                                    <div className="col-sm-10">
                                        <input 
                                            type="text" 
                                            name="username" 
                                            value={this.state.username} 
                                            className="form-control" 
                                            id="username" 
                                            placeholder="Enter Username" 
                                            onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/* <label className="control-label col-sm-2" htmlFor="email">Email:</label> */}
                                    <div className="col-sm-10">
                                        <input 
                                            type="text" 
                                            name="email" 
                                            value={this.state.email} 
                                            className="form-control" 
                                            id="email" 
                                            placeholder="Enter Email" 
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
                                            <button type="button" className="btn" onClick={this.signup}>Signup</button>
                                        </div>
                                    </div>
        
                    </div>
                    <div className="col-sm-4">

                    </div>
                </div>
        )
    }
}

export default Signup;