import React, { Component } from 'react'

class Banner extends Component {
  render () {
    return (
      <header id='home'>
        <div className='row banner'>
          <div className='banner-text'>
            <h1 className='responsive-headline'>College Buy & Sell</h1>
            <h1 className='responsive-headline'>Made Simple</h1>
            <hr />
            <button type='button' className='btn btn-success'><a href='/signup'>Sign Up</a></button>
          </div>
        </div>
      </header>
    )
  }
}

export default Banner
