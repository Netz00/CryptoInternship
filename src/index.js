import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';
import './index.css';


import { Helmet } from 'react-helmet'

const TITLE = 'ScamTrade'

class Application extends React.Component {

    handleLogin(adr){

        
    }
    render () {
      return (
          <div className="application">
              <Helmet>
                  <title>{ TITLE }</title>
                  <style>{'html, body{min-height:100%;} body {  height:100vh;   background: #4DA0B0;  /* fallback for old browsers */background: -webkit-linear-gradient(to bottom, #D39D38, #4DA0B0);  /* Chrome 10-25, Safari 5.1-6 */background: linear-gradient(to bottom, #D39D38, #4DA0B0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ }; height=100%'}</style>
              </Helmet>
              ...
              <SignIn 
              onSuccessfullLogin={(adr) => this.handleLogin(adr)}
              />
          </div>
      );
    }
  };

ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );
