import React from 'react';
import { useSelector } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';

import Header from "./components/Header";
import WebcamComponent from './components/Webcam';
import Form from './components/Form';
import Footer from './components/Footer'
import Dimensions from './components/Dimensions';


function App () {
  const loading = useSelector(state => state.showLoadingState);
  const showForm = useSelector(state => state.showForm);
  return (
    <div className="App">
    <Header/>
     {!showForm && <LoadingOverlay
        active={loading}
        spinner
        text='Please wait...'
      >
        <Dimensions />
        <WebcamComponent />
      </LoadingOverlay>}
      {
        showForm &&
        <Form />
      }
      <Footer />
    </div>
  );
}

export default App;
