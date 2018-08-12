import React, { Component } from "react";
import { Link, NavLink, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signOutUser } from "./../actions/";

class Header extends Component {
  isAuthenticated = () => this.props.auth.authenticated;
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <NavLink className="p-2 text-dark" to="/">
            Home
          </NavLink>
          {!this.isAuthenticated() && (
            <React.Fragment>
              <NavLink className="p-2 text-dark" to="/signin">
                Sign in
              </NavLink>
              <NavLink className="p-2 text-dark" to="/signup">
                Sign up
              </NavLink>
            </React.Fragment>
          )}
          {this.isAuthenticated() && (
            <NavLink
              className="p-2 text-dark"
              to="/logout"
              onClick={() => {
                this.props.signOutUser();
              }}
            >
              Log Out
            </NavLink>
          )}
          <NavLink className="p-2 text-dark" to="/about">
            About
          </NavLink>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  { signOutUser }
)(withRouter(Header));
