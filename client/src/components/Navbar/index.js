import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

//see https://www.geeksforgeeks.org/create-a-responsive-navbar-using-reactjs/ 
//for tutorial
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/buy' activeStyle>
            Buy
          </NavLink>
          <NavLink to='/sell' activeStyle>
            Sell
          </NavLink>
          <NavLink to='/transactions' activeStyle>
            Transactions
          </NavLink>
          <NavLink to='/forSale' activeStyle>
            For Sale
          </NavLink>
          <NavLink to='/account' activeStyle>
            Account
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;