import React from 'react';
import {Redirect} from 'react-router-dom';
import StatusPanel from '../components/StatusPanel'
import '../styles/custom.css'

class GroupBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logout:false,
            user:[],
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        fetch('http://localhost:1111/logout',{method:'post'}).then((res)=>{
            if (res.status === 200){
                this.setState({logout:true});
                res.json().then((data)=>{console.log(data)})
            }
        });
    }


    render(){
        if (this.state.logout) return <Redirect to='/'/>
        return (
            <div className="groupbox">
          
                <button className="logout" onClick={this.handleLogout}>Leave the battle</button> 
            </div>
        );
    }
}

export default GroupBox;