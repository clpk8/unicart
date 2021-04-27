import React, { Component } from 'react'
import image1 from '../book.jpg';
import '../App.css'
class Sell extends Component {
  render () {
    return (
      <form>
        <div class="title">
          Sell an Item
        </div>
        <div class="grid-container">
        <div class="grid-item"><img src={image1} /></div>
        <div class="grid-item">
            <label>
              Item Title:
              <input type="text" name="name" />
            </label>
            <label>
              Short Description:
              <input type="text" name="name" />
            </label>
            <label>
              price:
              <input type="text" name="name" />
            </label>
          
        </div>
        <div class="grid-item">
          <label>
            Full Description:
            <input type="text" name="name" />
          </label>
        </div>
        <div class="grid-item">
          <input type="submit" value="Post" />
        </div>
        </div>
      </form>
    )
  }
}

export default Sell