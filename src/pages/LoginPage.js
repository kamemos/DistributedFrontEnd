import React from 'react';
import LoginForm from '../components/LoginForm';
<<<<<<< HEAD
=======
import {Grid,Col,Row,Jumbotron} from 'react-bootstrap'
import '../styles/LoginPage.css';
>>>>>>> origin/master

class LoginPage extends React.Component{
    render(){
        return(
            <div>
<<<<<<< HEAD
                <div style={{height:'120px'}}/>  
                <LoginForm />
=======
            <div id='bg'>
                <img src={require('../imgs/spartabg.jpg')} />
            </div>
            <Grid style={{zIndex:'2',position:'relative'}}>
                <div style={{height:'120px'}}/>  
                <LoginForm />
            </Grid>
>>>>>>> origin/master
            </div>
        );
    }

}

export default LoginPage;