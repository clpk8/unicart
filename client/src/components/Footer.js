import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="twelve columns">
            <ul className="copyright">
              <li>&copy; 2021 Unicart. All rights reserved.</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
