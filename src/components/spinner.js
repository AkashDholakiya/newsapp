import React, { Component } from 'react'
import Spinner from './Spinner.gif'
 
export default class spinnder extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={Spinner} alt="loading"/>
      </div>
    )
  }
}
