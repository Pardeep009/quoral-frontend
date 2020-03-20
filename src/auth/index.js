import axios from '../axios';

export const signup = (user,next) => {
  axios.post('/addUser',{
    email : user.email,
    password : user.password,
    username : user.username
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(res => {
    next(res.data);
  })
  .catch(error => {
    if(error.response)
    next(error.response.data);
    else next(error)
  });
};

export const signin = (user,next) => {
  axios.post('/login',{
    usernameORemail : user.usernameORemail,
    password : user.password
  },{
    headers : {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((response) => {
    next(response.data);
  })
  .catch(error => {
    if(error.response)
    next(error.response.data);
    else next(error)
  });
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
  axios.get('/logout')
  .then((response) => response.data)
  .catch(err => console.log(err));
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
