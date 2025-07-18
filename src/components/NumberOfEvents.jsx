import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = { numberOfEvents: 32 };

  handleInputChanged = (e) => {
    const value = e.target.value;

    if (isNaN(value) || value <= 0) {
      if (this.props.setErrorAlertText) {
        this.props.setErrorAlertText('Please enter a valid number of events.');
      }
    } else {
      const parsedValue = parseInt(value);
      this.setState({ numberOfEvents: parsedValue });

      if (this.props.setNumberOfEvents) {
        this.props.setNumberOfEvents(parsedValue);
      }

      if (this.props.setErrorAlertText) {
        this.props.setErrorAlertText('');
      }
    }
  };

  render() {
    return (
      <div className="number-events">
        <label htmlFor="number-of-events">Number of Events:</label>
        <input
          type="number"
          id="number-of-events"
          role="textbox"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
