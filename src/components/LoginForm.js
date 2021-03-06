import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {FormGroup,FormControl,ControlLabel,Button,Grid,Row} from 'react-bootstrap';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      username:'',
      password:'',
      mes:'',
      success:false
    };
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  submitForm(){
    fetch('/login',{
      method:'post',
      body:JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" },
      credentials:'same-origin'
    }).then((res)=>{
        if(res.status === 200){
          this.setState({success:false});
          res.json().then((res)=>{console.log(res)});
          this.setState({success:true})
        }
        else {
          res.json().then((res)=>{
            this.setState({mes:res.message})
          });
        }
    });
  }

  render() {
    if (this.state.success) return <Redirect to='/chat'/>;
    return (
    <Grid style={{width:'400px',padding:'20px',background:'#f2f2f2',borderRadius:'25px',borderWidth:'0.5px'}}>
    <Row style={{display: 'flex', justifyContent: 'center'}}>
        <img src={require('../imgs/sparta.png')} alt="spartaicon"/>
    </Row>
    <Row style={{display: 'flex', justifyContent: 'center',padding:'20px'}}>
      <form>
      <p style={{color:'red'}}>{this.state.mes}</p>
        <FormGroup style={{width:'300px'}}>
          <ControlLabel>Username</ControlLabel>
          <FormControl 
            type="text"
            value={this.state.username} 
            placeholder="Enter text"
            onChange={this.handleUsername}/>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup style={{width:'300px'}}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Enter text"
            onChange={this.handlePassword}
          />
          <FormControl.Feedback />
        </FormGroup>
        
        <Button bsStyle="primary" style={{float:'right'}} onClick={this.submitForm}>Engage</Button>
        <Link to="/">
          <Button bsStyle="warning" style={{float:'right',marginRight:'5px'}}>Cancel</Button>
        </Link>
        <Link to="/signup">register</Link>
      </form>
    </Row>
    </Grid>
    );
  }
}

export default LoginForm;
