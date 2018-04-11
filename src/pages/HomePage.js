import React from 'react';
import {Link} from 'react-router-dom';
import {Grid,Row,Col,Button} from 'react-bootstrap';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            progress : 0
        }
    }
    handleProgess
    render(){

        const Progress1 = () => (
            <Grid style={{width:'800px',padding:'20px',background:'#f2f2f2',borderRadius:'10px',borderWidth:'0.5px',textAlign:'center'}}>
                <Row>
                    <h1>WELCOME TO DIS SYS SPARTA</h1>
                </Row>
                <Row>
                    <p>Platform where everyone can become sparta</p>
                </Row>
                <Button onClick={()=>{this.setState({progress : 1})}}><i className="fas fa-arrow-right"/></Button>
            </Grid>
        )

        const Progress2 = () => (
            <Grid style={{width:'800px',padding:'20px',background:'#f2f2f2',borderRadius:'10px',borderWidth:'0.5px',textAlign:'center'}}>
                <Row>
                    <h1>  chose your choice  </h1>
                    <Link to="/signup"><Button bsStyle="success">Become Sparta</Button></Link>
                    <p>  or  </p>
                    <Link to="/login"><Button bsStyle="warning">Join the fight</Button></Link>
                </Row>
                <div style={{height:'10px'}}/>
                <Row>
                    <Button onClick={()=>{this.setState({progress : 0})}}><i className="fas fa-arrow-left"/></Button>
                </Row>
            </Grid>
        )

        if (this.state.progress == 0){
            return (
                <div>
                    <div style={{height:'200px'}}/>
                    <Progress1 />
                </div>
            )
        }
        else{
            return (
                <div>
                    <div style={{height:'200px'}}/>
                    <Progress2 />
                </div>
            )
        }
    }
}

export default HomePage;