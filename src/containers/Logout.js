import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { logout } from '../actions/sessionActions';

class Logout extends Component {
  onLogout = event => {
    event.preventDefault();

    this.props.logout();
    this.props.history.push('/forecast')
  }

  render() {
    if (this.props.user.id) {
      return (
        <div style={{ marginTop: '50px' }}>
          <h2>Are you sure you want to log out?</h2>
          <button className="btn btn-outline-dark btn-margin" onClick={(event) => this.onLogout(event)}>Logout</button>
        </div>
      )
    }

    return (
      <Redirect to='/forecast' />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user
  }
}

export default withRouter(connect(mapStateToProps, { logout })(Logout));
