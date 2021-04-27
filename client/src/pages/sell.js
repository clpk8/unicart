import React, { Component } from 'react';
import image1 from './book.jpg';
import '../App.css';

// eslint-disable-next-line react/prefer-stateless-function
class Sell extends Component {
  render() {
    return (
      <form>
        <div className="title">
          Sell an Item
        </div>
        <div className="grid-container">
          <div className="grid-item-img">
            <div className="image-box">
              <img src={image1} alt="" />
            </div>
          </div>
          <div className="grid-item">
            <label htmlFor="title">
              Item Title:
              <input type="text" id="title" />
            </label>
            <label htmlFor="shortDescription">
              Short Description:
              <input type="text" id="shortDescription" />
            </label>
            <label htmlFor="price">
              Price:
              <input type="text" id="price" />
            </label>

          </div>
          <div className="grid-item">
            <label htmlFor="fullDescription">
              Full Description:
              <textarea type="text" id="fullDescription" />
            </label>
          </div>
          <div className="grid-item">
            <input type="submit" value="Post" />
          </div>
        </div>
      </form>
    );
  }
}

export default Sell;
