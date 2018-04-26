import React from 'react';
import SignupForm from '../components/SignupForm';

class SignupPage extends React.Component{
    render(){
        return(
            <div>
                <div style={{height:'120px'}}/>  
                <SignupForm />
            </div>
        );
    }

}

export default SignupPage;