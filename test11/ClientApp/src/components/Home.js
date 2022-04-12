import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
  
  constructor(props){
      super(props);
      document.title = "Main Page"
  }

  render () {
    return (
      <div>
        <h1>Patient registration system</h1>
        <code>v0.1</code>
        <h2>Changelog</h2>
        <ul>
            <li>
                <p>v0.1</p>
                <ul>
                    <li>Implemented basic CRUD operations for Patient entity</li>
                    <li>Implemented validation for each form fields (both on client and server side)</li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}
