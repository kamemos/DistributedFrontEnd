import React from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/custom.css';
import SignupModal from './SignupModal';

class Header extends React.Component{
    constructor(props){
        super(props);   
    }
    render(){
        return (
            <div>          
                <ul className="mynavbar">
                    <li className="mynavitem"><a>Home</a></li>
                    <li className="mynavitem"><a>News</a></li>
                    <li className="mynavitem"><a>Contact</a></li>
                    <li className="mynavitem"><a>About</a></li>
                    <li classname="mynavitem"style={{float:"right",padding:"14px 16px;",marginTop:"5px",marginRight:"10px"}}><SignupModal/></li>
                </ul>
            </div>
        );
    }
}

export default Header;