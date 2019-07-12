
import * as type from '../constants/ActionTypes'
import axios from 'axios'
import toastr from 'toastr'
import * as Ladda from "ladda";
export const auth = {

  authenticateUser(data){
    return {
      type: type.IS_AUTHENTICATED,
      data
    }
  },

  login(email, password, history) {
    return dispatch => {
      axios.post( `https://9l18txvcq5.execute-api.us-east-1.amazonaws.com/dev/login`, {
        email: email,
        password: password
      }).then((response) => {
        dispatch(this.authenticateUser(response));
        toastr.success('Logged In');
      }).catch((error) => {
        let l = Ladda.create(document.querySelector('#ladda-label'));
        l.stop();
        toastr.error('Invalid Credentials');
      });
    }
  },

  signout(cb) {
    return {
      type: type.IS_LOGGED_OUT,
    }
  },

  logoOut(){
    return {
      type: type.IS_LOGGED_OUT,
    }
  },

  isAuthenticated(){
    if(localStorage.getItem('reduxState')){
      return JSON.parse(localStorage.getItem('reduxState')).auth.isAuthenticated
    }else{
      return false
    }
  },

  authToken(){
    if(localStorage.getItem('reduxState')){
      return JSON.parse(localStorage.getItem('reduxState')).auth.authToken
    }else{
      return false
    }
  }

};