import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import NavBarUser from './NavBarUser';

class Header extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title"><a href="/">Weather to Wear &#9730;</a></h1>
          { this.props.session ? <NavBarUser /> : <NavBar /> }
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session.session
  }
}

export default connect(mapStateToProps)(Header);
