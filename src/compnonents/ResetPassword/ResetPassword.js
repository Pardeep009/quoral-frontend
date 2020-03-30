import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { ToastifyError, ToastifySuccess } from '../../containers/React-Toastify/React-Toastify';
import Layout from '../../Layout';
import axios from '../../axios';

class ResetPassword extends Component {
    
    state = {
        new_password : '',
        confirm_new_password : '',
        showLoading : false,
        redirectToReferer : false
    }

    handleChange = (event) => {
        if(event.target.value[event.target.value.length-1] === ' ') {
            ToastifyError('Password cannot have space');
            return;
        }
        else {
            this.setState({
                [event.target.name] : event.target.value
            })
        }
    }

    resetPassword = () => {
        let { new_password, confirm_new_password } = this.state;
        if(new_password==='' || confirm_new_password === '') {
            ToastifyError('Password cannot be empty');
        }
        else if(new_password !== confirm_new_password) {
            ToastifyError('Both Passwords must match');
        }
        else {
            const parsed = queryString.parse(this.props.location.search);
            let obj = { new_password, token : parsed.token, email : parsed.email }
            axios.post('/resetPassword',{
                email : parsed.email,
                password : obj.new_password,
                token : obj.token
            },{
                headers : {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                ToastifySuccess(response.data.message +"Please Signin.",() => {
                    this.setState({
                        redirectToReferer : true
                    })
                });
            })
            .catch((error) => {
                if(error.response) {
                    ToastifyError(error.response.data.error);
                }
                else {
                    console.log(error);
                }
            })
        }
    }

    render() {

        if(this.state.redirectToReferer ===  true) {
            return (
                <Redirect to="/signin" />
            );
        }

        return (
            <Layout>
                
                <div className="form-group">
                    {/* <label className="control-label col-sm-2" htmlFor="pwd">Password:</label> */}
                    <div className="col-sm-10">
                        <input 
                            type="password" 
                            name="new_password" 
                            value={this.state.new_password} 
                            className="form-control" 
                            id="pwd1" 
                            placeholder="Enter New Password" 
                            onChange={this.handleChange} />
                    </div>
                </div>
                                
                <div className="form-group">
                    {/* <label className="control-label col-sm-2" htmlFor="pwd">Password:</label> */}
                    <div className="col-sm-10">
                        <input 
                            type="password" 
                            name="confirm_new_password" 
                            value={this.state.confirm_new_password} 
                            className="form-control" 
                            id="pwd2" 
                            placeholder="Confirm New Password" 
                            onChange={this.handleChange} />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn" onClick={this.resetPassword}>Change Password</button>
                    </div>
                </div>

            </Layout>
        );
    }

}

export default ResetPassword;