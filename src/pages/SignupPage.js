import React from 'react';
import SignupForm from '../components/SignupForm';
import {Grid,Col,Row,Jumbotron} from 'react-bootstrap'

class SignupPage extends React.Component{
    render(){
        return(
            <div>
            <Grid style={{zIndex:'2',position:'relative'}}>
                <div style={{height:'120px'}}/>  
                <SignupForm />
            </Grid>
            </div>
        );
    }

}

export default SignupPage;