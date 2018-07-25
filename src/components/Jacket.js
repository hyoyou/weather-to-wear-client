import React, { Component } from 'react'
import { connect } from 'react-redux';

class Jacket extends Component {
  render() {
    const { temperature, user, cold } = this.props;

    return (
      <div style={{ marginBottom: '50px' }}>
        <h2>Jacket Recommended?</h2>
        { user.id && cold ?
          parseInt(temperature, 10) < 60 ? <h1>YES</h1> : <h1>NO</h1>
          :
          parseInt(temperature, 10) < 55 ? <h1>YES</h1> : <h1>NO</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    cold: state.session.user.cold_sensitivity
  }
}

export default connect(mapStateToProps)(Jacket);
