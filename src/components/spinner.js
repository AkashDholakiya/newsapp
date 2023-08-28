import React, { Component } from 'react'
import Spinner from './Spinner.gif'
 
export default class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={Spinner} alt="loading"/>
      </div>
    )
  }
}
