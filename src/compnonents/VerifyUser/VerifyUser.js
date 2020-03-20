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
    }

    componentDidMount () {
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
            ToastifySuccess(response.data.message,()=> {
                this.setState({
                    isVerified : true
                })
            });
        })
        .catch((error) => {
            if(error.response && error.response && error.response.data) 
            {
                console.log(error.response.data);
                ToastifyError(error.response.data.error);
            }
            else console.log(error);
        })
    }

    render() {
        
        if(this.state.isVerified === true || isAuthenticated() ) {
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
                        <h1>Verifying Account,after verification you will be redirected to Home page</h1>
                        <Spinner />
                    </div>
                    
                    <div className="col-sm-4">

                    </div>

                </div>
            );
        }
    }
}

export default VerifyUser;