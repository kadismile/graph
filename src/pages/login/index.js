import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {auth} from '../../actions/authActions'
import * as Ladda from 'ladda';
import './login.css'


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange =(e)=>{
    e.preventDefault();
    const {
      target: { value },
    } = e;
    this.setState({
      email: value,
    });
  };

  onPasswordChange =(e)=>{
    e.preventDefault();
    const {
      target: { value },
    } = e;
    this.setState({
      password: value,
    });
  };


  login =(e)=>{
    try {
      let l = Ladda.create(document.querySelector('#ladda-label'));
      l.start();
      //this.props.onLogin(this.state.email, this.state.password, this.props.history,);
      this.props.onLogin("tdAdmin@tradedepot.co", "7Ft&gy*$43eRD^");
    } catch (e) {
      console.log("Error ",e);
    }
  };


  render() {
    return (
      !auth.isAuthenticated() ?
      <div className="content content-fixed content-auth">
        <div className="container">
          <div className="media align-items-stretch justify-content-center ht-100p pos-relative">
            <div className="media-body align-items-center d-none d-lg-flex">
              <div className="mx-wd-600">
                <img src="https://via.placeholder.com/1260x950" className="img-fluid" alt="" />
              </div>
              <div className="pos-absolute b-0 l-0 tx-12 tx-center">

              </div>
            </div>
            <div className="sign-wrapper mg-lg-l-50 mg-xl-l-60">
              <div className="wd-100p">
                <h3 className="tx-color-01 mg-b-5">Sign In</h3>
                <p className="tx-color-03 tx-16 mg-b-40">Welcome back! Please signin to continue.</p>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" onChange={this.onEmailChange} placeholder="yourname@yourmail.com" />
                </div>

                <div className="form-group">
                  <div className="d-flex justify-content-between mg-b-5">
                    <label className="mg-b-0-f">Password</label>
                    <a href="#" className="tx-13">Forgot password?</a>
                  </div>

                  <input type="password" className="form-control" onChange={this.onPasswordChange} placeholder="Enter your password" />

                </div>
                <button className="btn btn-brand-02 btn-block" type="submit" id='ladda-label' data-style="expand-right" onClick={this.login}>Sign In</button>
                <div className="tx-13 mg-t-20 tx-center">Don't have an account? <a href="#">Create an Account</a></div>

              </div>
            </div>
          </div>
        </div>
      </div>
        :
      <Redirect to="/"/>
    )
  }
}

function mapStateToProps(state) {
  return{
    auth: state.auth,
  }
}

function matchDispatchToProps(dispatch){
  return {
    onLogin(email, password){
      dispatch(auth.login(email, password))
    }

  }
}


export default connect(mapStateToProps, matchDispatchToProps)(Login);
