import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { loginUser } from '../actions/sessionActions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onLogin = event => {
    event.preventDefault();

    this.props.loginUser(this.state)
    this.props.history.push('/forecast');
  }

  render() {
    if (this.props.user.id) {
      return (
        <Redirect push to="/forecast" />
      )
    } else {
      return (
        <div style={{ marginTop: '50px' }}>
          <form>
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

            <button type="submit" className="btn btn-outline-dark btn-margin" onClick={this.onLogin}>Log In</button>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user
  }
}

export default withRouter(connect(mapStateToProps, { loginUser })(Login));
