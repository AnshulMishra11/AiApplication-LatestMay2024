import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@mui/material';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const DocumentScanner = ({ extractedTextFromDocument, setExtractedTextFromDocument }) => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    processImage(imageSrc);
  }, [webcamRef]);

  const processImage = async (imageSrc) => {
    const { data: { text } } = await Tesseract.recognize(imageSrc);
    setExtractedTextFromDocument(text);
  };

  const toggleCamera = () => {
    setIsCameraOpen((prevState) => !prevState);
    setCapturedImage(null); // Reset captured image when toggling camera
    setExtractedTextFromDocument(''); // Reset extracted text when toggling camera
  };

  return (
    <div>
      {isCameraOpen ? (
        <>
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
          />
          <Button variant="contained" color="success" onClick={capture}>
            Capture photo
          </Button>
          <img
            style={{ height: '300px', width: '300px', margin: '30% auto 0' }}
            src={capturedImage}
            alt=""
          />
          {extractedTextFromDocument}
        </>
      ) : (
        <button style={{ fontSize: '40px', height: '40px', width: '50px' }} onClick={toggleCamera}>
          <FontAwesomeIcon icon={faCamera} />
        </button>
      )}
    </div>
  );
};

export default DocumentScanner;
