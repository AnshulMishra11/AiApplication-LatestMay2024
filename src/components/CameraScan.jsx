import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import pdfToText from 'react-pdftotext';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import DocumentScanner from './DocumentScanner';
import Copy from './Copy';
import DownloadAndData from './DownloadAndData';
import Head from './Head';

const CameraScan = () => {
  const [answer, setAnswer] = useState('');
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [extractedTextFromDocument, setExtractedTextFromDocument] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const extractText = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);

    pdfToText(file)
      .then((text) => {
        setExtractedTextFromDocument(text);
      })
      .catch((error) => console.error('Failed to extract text from PDF', error));
  };

  const generateAnswerForDocument = async (e) => {
    e.preventDefault();
    setGeneratingAnswer(true);
    setLoading(true);
    setAnswer('Loading your answer... \n It might take up to 10 seconds');
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD8uJt1aT7etsqL7Ixw9l4TBOdwhy6v3B0`,
        method: 'post',
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Craft a comprehensive and detailed summary of the given text, thoroughly exploring each key point, analyzing critical arguments, and providing all necessary context and nuances to effectively address various question types, including multiple-choice, short answer, and essay-style questions for ${extractedTextFromDocument}`,
                },
              ],
            },
          ],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer('Sorry - Something went wrong. Please try again!');
    }

    setGeneratingAnswer(false);
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div id="cameraScanbg" className={darkMode ? 'dark-mode ' : 'light-mode justify-center'}>
      <div className='mt-0 relative '>
      <Head/>
      </div>
      
      <div className="h-screen p-3">
        <form className="w-full md:w-2/3 m-auto text-center rounded py-2">
          <div className={darkMode ? 'darkChatAI' : 'lightChatAI'}>
            <div className="mt-12" style={{ position: 'relative' }}>
              <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                Back To Home
              </Link>
            </div>
            <h1 className="text-3xl text-center flex flex-row justify-center mt-2">
              <div id="chatTitle" className="mt-3">
                Chat AI &nbsp;
              </div>
              <div className="mb-0 py-2" onClick={toggleDarkMode}>
                <div className="mb-1 flex flex-row">
                  {darkMode ? (
                    <div className="py-2">
                      <WbSunnyIcon />
                    </div>
                  ) : (
                    <div className="py-2">
                      <NightsStayIcon />
                    </div>
                  )}
                </div>
              </div>
            </h1>
          </div>
        </form>
        <div className="w-full md:w-2/3 m-auto text-center  rounded bg-gray-200 my-1">
        <div className={darkMode ? 'darkCamera' : 'lightCamera'}>
                <form
                  onSubmit={generateAnswerForDocument}
                  className="w-full md:w-2/3 m-auto text-center rounded mb-4 py-2"
                >
                  {/* {extractedTextFromDocument && ( */}
                    <div >
                      <textarea
                        required
                        className="border rounded w-11/12 my-2 min-h-fit p-3"
                        value={extractedTextFromDocument}
                        onChange={(e) => setExtractedTextFromDocument(e.target.value)}
                        placeholder="Ask anything"
                      ></textarea>

                      <button
                        type="submit"
                        className="bg-blue-300 p-3 width-100 rounded-md hover:bg-blue-400 transition-all duration-300"
                        disabled={generatingAnswer}
                      >
                        Generate answer
                      </button>
                    </div>

                  {/* )} */}
                </form>

              </div>


          {extractedTextFromDocument && (
            <div className=' justify-center mb-4'>
              <img
              
                style={{ height: '300px', width: '300px', margin: '30% auto 0' }}
                src={capturedImage}
                alt=""
              />

            </div>
            
          )}   
          
          {loading ? (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" width={210} height={60} />
              <Skeleton variant="rounded" width={210} height={60} />
            </Stack>
          ) : (
            <>
              {/* {extractedTextFromDocument && (
                <DownloadAndData filename={fileName} answer={answer} />
              )} */}
              <div className={ darkMode ? 'darkCamera justify-center' : 'lightCamera  align-middle  '}>
                <DocumentScanner
                  extractedTextFromDocument={extractedTextFromDocument}
                  setExtractedTextFromDocument={setExtractedTextFromDocument}
                  capturedImage={capturedImage}
                  setCapturedImage={setCapturedImage}
                />


              </div>
              
              <div className={darkMode ? 'darkCamera' : 'lightCamera'}>
                <Copy answer={answer} />
              </div>
              
             
              {extractedTextFromDocument.length > 0 && (
                <DownloadAndData filename={fileName} answer={answer} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraScan;
