import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { signupUser } from '../actions/sessionActions';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  onInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSignup = event => {
    event.preventDefault();

    this.props.signupUser(this.state)
  }

  render() {
    if (this.props.user.id) {
      return (
        <Redirect to='/settings' />
      )
    }

    return (
      <div style={{ marginTop: '50px' }}>
        <form>
          <label className="col-sm-2 col-form-label" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={(event) => this.onInput(event)}
          />
          <br />

          <label className="col-sm-2 col-form-label" htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={(event) => this.onInput(event)}
          />
          <br />

          <label className="col-sm-2 col-form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(event) => this.onInput(event)}
          />
          <br />

          <button type="submit" className="btn btn-outline-dark btn-margin" onClick={this.onSignup}>Sign Up</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user
  }
}

export default withRouter(connect(mapStateToProps, { signupUser })(SignUp));
