import React from 'react';
import LoginForm from '../components/LoginForm';
import {Grid,Col,Row,Jumbotron} from 'react-bootstrap'
import '../styles/LoginPage.css';

class LoginPage extends React.Component{
    render(){
        return(
            <div>
            <div id='bg'>
                <img src={require('../imgs/spartabg.jpg')} />
            </div>
            <Grid style={{zIndex:'2',position:'relative'}}>
                <div style={{height:'120px'}}/>  
                <LoginForm />
            </Grid>
            </div>
        );
    }

}

export default LoginPage;