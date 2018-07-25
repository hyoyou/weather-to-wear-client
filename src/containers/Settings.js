import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from "react-router-dom";
import { updateUser, deleteUserCity } from '../actions/sessionActions';

class Settings extends Component {
  state = { user: this.props.user };

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user })
  }

  handleZipCodeInput = (id, event) => {
    const updatedCities = this.state.user.user_cities_attributes.map((city, cityId) => {
      if (id !== cityId) return city;
      return { ...city, city_attributes: {zip_code: event.target.value } };
    })

    this.setState({
      user: { ...this.state.user,
        user_cities_attributes: updatedCities
      }
    })
  }

  handleAddCity = event => {
    this.setState({
      user: { ...this.state.user,
        user_cities_attributes: this.state.user.user_cities_attributes.concat([{ city_attributes: {zip_code: '' }}])
      }
    })
  }

  handleRemoveCity = (id) => {
    const { user } = this.state;

    user.user_cities_attributes.filter((city, cid) => {
      if (id === cid) {
        if (city.id) {
          this.props.deleteUserCity(city.id);
        }
      }
    })

    this.setState({
      user: { ...user,
        user_cities_attributes: user.user_cities_attributes.filter((city, cid) => id !== cid)
      }
    })
  }

  onToggle = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      user: { ...this.state.user,
        [name] : value
      }
    })
  }

  onSave = event => {
    event.preventDefault();

    this.props.updateUser(this.state.user);
    this.props.history.push('/forecast');
  }

  onCancel = event => {
    event.preventDefault();

    this.props.history.push('/forecast');
  }

  render() {
    const { user } = this.state;

    if (!user.id) {
      return (
        <Redirect to='/login' />
      )
    }

    return (
      <div>
        <h2>{user.name}'s Settings</h2>
        <form>
          <fieldset>
            <legend>Cities</legend>
              {user.user_cities_attributes &&
              user.user_cities_attributes.map((city, id) => (
              <div className="city" key={id}>
                <input
                  type="text"
                  name="zipcode"
                  readOnly={city.id ? "readOnly" : ""}
                  placeholder={`City #${id + 1} Zip Code`}
                  value={city.city_attributes.zip_code}
                  onChange={(event) => this.handleZipCodeInput(id, event)}
                />
                <button type="button" className="btn btn-outline-dark btn-sm" onClick={(event) => this.handleRemoveCity(id)}>Remove City</button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-dark btn-margin" onClick={this.handleAddCity}>Add City</button>
          </fieldset>

          <fieldset>
            <legend>Preferences</legend>
            <input
              type="checkbox"
              id="jacket"
              name="cold_sensitivity"
              value={user.cold_sensitivity}
              checked={user.cold_sensitivity}
              onChange={(event) => this.onToggle(event)} />
            <label htmlFor="jacket">I cannot stand the cold!</label>
            <p>If checked, jacket will be recommended below 60&#8457; (Default recommendation is below 55&#8457;)</p>
            <br />
            <input
              type="checkbox"
              id="umbrella"
              name="opts_hands_free"
              value={user.opts_hands_free}
              checked={user.opts_hands_free}
              onChange={(event) => this.onToggle(event)} />
            <label htmlFor="umbrella">I do not like to carry things!</label>
            <p>If checked, umbrella will be recommended above 55% chance of rain (Default recommendation is above 50%)</p>
            <br />
          </fieldset>

          <button type="submit" className="btn btn-outline-dark" style={{ marginRight: '10px' }} onClick={this.onSave}>Save</button>
          <button type="submit" className="btn btn-outline-warning" style={{ marginLeft: '10px' }} onClick={this.onCancel}>Cancel</button>
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

export default withRouter(connect(mapStateToProps, { updateUser, deleteUserCity })(Settings));
