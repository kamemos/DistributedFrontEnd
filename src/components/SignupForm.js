import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import {FormGroup,FormControl,ControlLabel,Button,Grid,Row} from 'react-bootstrap';

class SignupForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleName = this.handleName.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      username:'',
      password:'',
      name:'',
      success:false,
      mes:''
    };
  }

  submitForm(e) {
    fetch('http://localhost:1111/signup',{
      method:'post',
      body:JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" }
    }).then((res)=>{
        if(res.status === 200){
          this.setState({success:true});
        }
        else {
          res.json().then((res)=>{
            this.setState({mes:res.message})
          });
        }
    });
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleName(e) {
    this.setState({ name : e.target.value });
  }

  render() {
    if (this.state.success) return <Redirect to="/login"/>;
    return (
    <Grid style={{width:'400px',padding:'20px',background:'#f2f2f2',borderRadius:'25px',borderWidth:'0.5px'}}>
    <Row style={{display: 'flex', justifyContent: 'center',padding:'20px'}}>
      <form>
        <p style={{color:'red'}}>{this.state.mes}</p>
        <FormGroup style={{width:'300px'}}>
          <ControlLabel>Spartan's name</ControlLabel>
          <FormControl 
            type="text"
            value={this.state.name} 
            placeholder="Enter text"
            onChange={this.handleName}/>
          <FormControl.Feedback />
        </FormGroup>
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
        <Button bsStyle="primary" style={{float:'right'}} onClick={this.submitForm}>Become a sparta</Button>
        <Link to="/">
          <Button bsStyle="warning" style={{float:'right',marginRight:'5px'}}>Cancel</Button>
        </Link>
      </form>
    </Row>
    </Grid>
    );
  }
}

export default SignupForm;