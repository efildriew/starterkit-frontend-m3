import React, { Component } from 'react';

class RouterForwarder extends Component {
  componentDidMount() {
    const getChildContext = () => {
      return this.props.context;
    };
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}

export default RouterForwarder;
