import React from 'react';
import LoginForm from '../components/LoginForm';

class LoginPage extends React.Component{
    render(){
        return(
            <div>
                <div style={{height:'120px'}}/>  
                <LoginForm />
            </div>
        );
    }

}

export default LoginPage;