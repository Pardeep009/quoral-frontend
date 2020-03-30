import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from '../../axios';
import { ToastifyError, ToastifySuccess } from '../../containers/React-Toastify/React-Toastify';
import { isAuthenticated } from '../../auth/index';
import Spinner from '../../containers/Spinner/Spinner';

class VerifyUser extends Component {
    state = {
        isVerified : false,
        showLoading : false
    }

    componentDidMount () {
        this.setState({
            showLoading : true
        })
        const parsed = queryString.parse(this.props.location.search);
        axios.post('/verifyUser',{
            token : parsed.token,
            username : parsed.username
        },{
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
            }
        })
        .then((response) => {
            ToastifySuccess(response.data.message + ' ,Redirecting to home page',()=> {
                this.setState({
                    isVerified : true
                })
            });
        })
        .catch((error) => {
            if(error.response && error.response && error.response.data) 
            {
                console.log(error.response.data);
                ToastifyError(error.response.data.error,() => {
                    this.setState({
                        showLoading : false
                    })
                });
            }
            else console.log(error);
        })
    }

    render() {
        
        if(this.state.isVerified === true) {
            return (
                <Redirect to="/" />
            )
        }

        if(this.state.isVerified === false) {
            return (
                <div className="row mainPage">
                    
                    <div className="col-sm-4">

                    </div>

                    <div className="col-sm-4">
                        <h1>Verifying Account</h1>
                        {
                            this.state.showLoading ? <Spinner /> : null
                        }
                    </div>
                    
                    <div className="col-sm-4">

                    </div>

                </div>
            );
        }
    }
}

export default VerifyUser;