import React from 'react';
import SignupForm from '../components/SignupForm';
<<<<<<< HEAD
=======
import {Grid,Col,Row,Jumbotron} from 'react-bootstrap'
>>>>>>> origin/master

class SignupPage extends React.Component{
    render(){
        return(
            <div>
<<<<<<< HEAD
                <div style={{height:'120px'}}/>  
                <SignupForm />
=======
            <Grid style={{zIndex:'2',position:'relative'}}>
                <div style={{height:'120px'}}/>  
                <SignupForm />
            </Grid>
>>>>>>> origin/master
            </div>
        );
    }

}

export default SignupPage;