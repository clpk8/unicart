import React from 'react';

function Sell() {
  return (
    <section id="sell">
      <form className="sell-form">
        <div className="row">
          <div className="title">
            Item For Sale
          </div>
        </div>

        <div className="row">
          <div className="five columns">
            <div className="grid-item">
              <label htmlFor="title">
                Title
                <input type="text" id="title" />
              </label>
              <label htmlFor="shortDescription">
                Price
                <input type="text" id="shortDescription" />
              </label>
              <label htmlFor="price">
                Category
                <input type="text" id="price" />
              </label>
              <label htmlFor="price">
                Condition
                <input type="text" id="price" />
              </label>
            </div>

            <div className="grid-item">
              <label htmlFor="fullDescription">
                Description
                <textarea type="text" id="fullDescription" />
              </label>
            </div>
          </div>

          <div className="seven columns">
            <div className="preview-box">
              <img src="/assets/book.jpg" alt="book" />
            </div>

            <div className="grid-container">
              <div className="post-button">
                <input type="submit" value="Post" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Sell;
