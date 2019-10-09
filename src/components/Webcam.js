import React, { useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import Modal from "./Modal";

import { useSelector, useDispatch } from 'react-redux';
const WebcamComponent = () => {

    const loading = useSelector(state => state.showLoadingState);
    const dimensions = useSelector(state => state.dimensions);

    const [webcam, setWebcam] = useState('');
    const [screenShot, setScreenshot] = useState('');
    const [showPicture, setShowPicture] = useState(false);
    const dispatch = useDispatch();

    const setRef = webcam => {
      setWebcam(webcam);
    };

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/json',
        'Host':'53fd1a1drd.execute-api.us-east-2.amazonaws.com',
        'Content-Length':'118881',
        'X-Amz-Date':'20190822T123535Z',
        'Authorization':'AWS4-HMAC-SHA256 Credential=AKIASMVIAGAQZUJVWX6O/20190822/us-east-2/lambda/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-date, Signature=042659ed1cecb0291af796f8a4e46ecc0611ee70edcdc7e2e79be8bf9ae6baed'
      }
    };

    const callService = (imageSrc) => {
      dispatch({type: 'LOADING', payload: true});
      const actualString = imageSrc.substring(23);
      console.log(actualString);
      axios.put('/ocr/detecttext', {
        "base64Img": actualString
      },config)
      .then((res) => {
        axios.post('/ocr/categorize', res.data, {
          headers: {
            'Content-Type':'application/json'
          }
        })
        .then(res => {
          console.log(res, "response nakul");
          dispatch({type: 'LOADING', payload: false});
          dispatch({type: 'DATA', payload: res.data});
          dispatch({type: 'SHOWFORM', payload: true});
        })
      })
      .catch(err => console.log(err));
    }
   
    const capture = () => {
      console.log(webcam);
      const imageSrc = webcam.getScreenshot();
      setShowPicture(true);
      setScreenshot(imageSrc);
      console.log(loading, "showLoading");
    };
   
    const videoConstraints = {
      width: dimensions.width,
      height: dimensions.height,
      facingMode: "user"
    };

    const onSubmit = () => {
      callService(screenShot);
    }
  
    return (
      <div>
        { !showPicture && 
          <div id = 'webcam' className = 'center-align'>
            <Webcam
              audio={false}
              height={dimensions.height}
              imageSmoothing={true}
              ref={setRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.8}
              width={dimensions.width}
              videoConstraints={videoConstraints}
            />
          </div>
        }
        {
          showPicture && 
          <div className = 'center-align'>
            <img src={screenShot} alt={"xyz"}/>
          </div>
        }
        {/* <Modal /> */}
        <div class = "row">
          <div className = 'center-align'>
            <button id = 'capture-image' className="btn waves-effect waves-light" onClick={capture} disabled={showPicture}>Capture Image</button>
            <button id = 'retake-image' className="btn waves-effect waves-light" onClick = {() => setShowPicture(false)}>Retake Image</button>
            {showPicture && <button id = 'submit-image' className="btn waves-effect waves-light" onClick = {onSubmit}>Submit Image</button>}
          </div>
        </div>   
      </div>
    );
    
  }

  export default WebcamComponent;