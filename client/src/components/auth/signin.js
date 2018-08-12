import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { signInUser } from "./../../actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signInUser({ email, password }, this.props.history);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form
          className="form-signin"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          {this.props.errorMessage && (
            <p className="alert alert-danger">{this.props.errorMessage}</p>
          )}
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <Field
            component="input"
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            name="email"
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <Field
            component="input"
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            required
          />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

Signin = connect(
  mapStateToProps,
  { signInUser }
)(withRouter(Signin));

export default reduxForm({
  form: "signin"
})(Signin);
