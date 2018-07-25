import React, { Component } from 'react';
import { connect } from 'react-redux';

class Umbrella extends Component {
  render() {
    const { precipitation, user, handsfree } = this.props ;

    return (
      <div>
        <h2>Umbrella Recommended?</h2>
        { user.id && handsfree ?
          parseInt(precipitation, 10) > 55 ? <h1>YES</h1> : <h1>NO</h1>
          :
          parseInt(precipitation, 10) > 50 ? <h1>YES</h1> : <h1>NO</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    handsfree: state.session.user.opts_hands_free
  }
}

export default connect(mapStateToProps)(Umbrella);
