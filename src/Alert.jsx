// src/Alert.jsx
import React, { Component } from 'react';

class Alert extends Component {
  getStyle() {
    return {
      color: 'black',
      backgroundColor: '#f8f8f8',
      borderRadius: '5px',
      padding: '10px',
      margin: '10px 0',
      fontSize: '14px',
    };
  }

  render() {
    return (
      <div className="Alert" style={this.getStyle()}>
        {this.props.text}
      </div>
    );
  }
}

class InfoAlert extends Alert {
  getStyle() {
    return { ...super.getStyle(), color: 'blue' };
  }
}

class ErrorAlert extends Alert {
  getStyle() {
    return { ...super.getStyle(), color: 'red' };
  }
}

class WarningAlert extends Alert {
  getStyle() {
    return { ...super.getStyle(), color: 'orange' };
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };