import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormAdmin from '../components/FormAdmin';
import ListArticles from '../components/ListArticles';
import { useSnackbar } from "notistack";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
class Tabs extends React.Component{
  state ={
    activeTab: this.props.children[0].props.label
  }
  changeTab = (tab) => {

    this.setState({ activeTab: tab });
  };
  render(){
    
    let content;
    let buttons = [];
    return (
      <div className='viewTab'>
        {React.Children.map(this.props.children, child =>{
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab) content = child.props.children
        })}
         
        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
        <div className="tab-content">{content}</div>
        
      </div>
    );
  }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  return(
    <div className="tab-buttons">
    {buttons.map((button, index) =>{
       return <button key = {index} className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
    })}
    </div>
  )
}

const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}


function Admin({verifyToken}) {
  const navigate = useNavigate();
  const id = Number(sessionStorage.getItem("id"));
  const token = sessionStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    verifyToken(id, token, navigate);
}, [navigate]);

const handleAccueil = async () => {
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('token');
  navigate("/");
};

  return (
   <div className='AdminDiv'>
    <FontAwesomeIcon icon={faArrowRightFromBracket} className='iconExit' onClick={handleAccueil}/>
    <div style={{height: "200px", display:"flex", alignItems: "center"}}>
      <img src='/img/logo1.png' alt='logo'/>
    </div>
    <Tabs>
      <Tab label="Création">
        <FormAdmin token={token} id={id} enqueueSnackbar={enqueueSnackbar}/>
      </Tab>
      <Tab label="Modification/suppression">
        <ListArticles/>
      </Tab>
    </Tabs>
   </div>
  );
}

export default Admin;