import React, { Component } from 'react'

export default class AuthenticatedComponent extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
            user: null
        }
    }

  
    render() {
        return (
        <div>
            Hello World from auth;
        </div>
        )
    }
}
