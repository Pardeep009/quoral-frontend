import React, { Component } from 'react';
import Layout from '../../Layout';
import {ToastifyError, ToastifySuccess} from '../../containers/React-Toastify/React-Toastify';
import Spinner from '../../containers/Spinner/Spinner';
import axios from '../../axios';

class ForgotPassword extends Component {
    state = {
        email : '',
        showLoading : false,
    }

    handleChange = (event) => {
        if(event.target.value[event.target.value.length-1] === ' ') {
            let message = 'Email cannot have space';
            ToastifyError(message);
            return;
        }
        else {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
    }

    sendResetLink = () => {
        let email = this.state.email;
        if(email === '') {
            ToastifyError('Email Cannot Be Empty');
            return;
        }
        this.setState({
            showLoading : true
        })
        axios.post('/sendResetLink',{
            email : this.state.email
        },{
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            this.setState({
                showLoading : false
            })
            ToastifySuccess(response.message);
        })
        .catch((error) => {
            this.setState({
                showLoading : false
            })
            if(error.response)
            ToastifyError(error.response.data.error);
            else console.log(error);
        })
    }
 
    render() {
        if(this.state.showLoading === true) {
            return <Spinner />
        }

        return (
             <Layout>
                 
                 <div className="form-group">
                 <div className="col-sm-10">Enter Your Registered email, You will get a password reset link in your email</div>
                    {/* <label className="control-label col-sm-2" htmlFor="email">Enter Your Registered email,You will get a password reset link in your email</label> */}
                    <div className="col-sm-10">
                        <input 
                            type="email" 
                            name="email" 
                            value={this.state.email} 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter Your Email" 
                            onChange={this.handleChange} />
                    </div>

                </div>
                
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn" onClick={this.sendResetLink}>Send Reset Link</button>
                    </div>
                </div>

             </Layout>
        )
    }

}

export default ForgotPassword;