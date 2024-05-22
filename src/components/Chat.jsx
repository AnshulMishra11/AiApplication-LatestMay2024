import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import ReactMarkdown from "react-markdown";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import pdfToText from 'react-pdftotext';
import { usePDF } from 'react-to-pdf';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Slicedata from './Slicedata';
import DragandDrop from './DragandDrop';
import Copy from './Copy';
import DownloadAndData from './DownloadAndData';
import '../App.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LaunchIcon from '@mui/icons-material/Launch';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Head from './Head';



const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [fileName, setFileName] = useState("");
  const [copyContent, setCopyContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [droppedFromPDF, setDroppedFromPDF] = useState(true);
  const [droppedFromDrag, setDroppedFromDrag] = useState(true);
  const [data, setData] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [fileNameFromDrag, setFileNameFromDrag] = useState(null);
  const [dropped, setDropped] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: fileName });

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  const extractText = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFileName(file.name);

    pdfToText(file)
      .then((text) => {
        setData(text);
        setDroppedFromPDF(false);
        console.log(text);
      })
      .catch((error) => console.error('Failed to extract text from PDF'));
  };

  // const handleShowMore = () => {
  //   setShowMore(true);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   const droppedFile = e.dataTransfer.files[0];
  //   if (!droppedFile.name.toLowerCase().endsWith('.pdf')) {
  //     alert('Please upload a PDF file.');
  //     return;
  //   }

  //   setFileNameFromDrag(droppedFile.name);
  //   setDropped(true);
  //   extractTextDrag(droppedFile);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const handleDragEnter = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  // };

  // const extractTextDrag = (file) => {
  //   pdfToText(file)
  //     .then((text) => {
  //       console.log("Extracted text:", text);
  //       setData(text);
  //     })
  //     .catch((error) => console.error('Failed to extract text from PDF:', error));
  // };

  const generateAnswer = async (e) => {
    e.preventDefault();
    setGeneratingAnswer(true);
    setLoading(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="YOUR_KEY"`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: `Craft a comprehensive summary that delves into the nuances and intricacies of the given text, ensuring each key point is thoroughly explored and articulated for detailed note-taking purposes for ${data}` }] }]
        }
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
      setLoading(false);
    }

    setGeneratingAnswer(false);
    setLoading(false);
    // droppedFrom("You choose from 'Choose File' ");
    setDroppedFromPDF(false);
    setDroppedFromPDF(false);
  };


   
  async function generateAnswerForDocument(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setLoading(true);
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyD8uJt1aT7etsqL7Ixw9l4TBOdwhy6v3B0`,
        method: "post",
        data: {
          contents: [{ parts: [
            { text: `Craft a comprehensive and detailed summary of the given text, thoroughly exploring each key point, analyzing critical arguments, and providing all necessary context and nuances to effectively address various question types, including multiple-choice, short answer, and essay-style questions.for ${question} `}] }],
        },
      });

       setAnswer(response.data.candidates[0].content.parts[0].text);
      // setAnswer(
        
      //   response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      // );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
      setLoading(false);
    }

    setGeneratingAnswer(false);
    setLoading(false);
    // droppedFrom("You choose from 'Choose File' ");
    setDroppedFromPDF(false);
    setDroppedFromPDF(false);
   }




  const handleShowMore = () => {
    setShowMore(true);
  };




  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening PDF in a new window
    e.dataTransfer.dropEffect = 'copy'; // Indicate copy operation

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file.');
      return;
    }

    setFileNameFromDrag(droppedFile.name);
    setDropped(true);
    extractTextDrag(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening PDF in a new window
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening PDF in a new window
  };

  // Add event listeners to prevent opening PDF in a new window
  document.addEventListener('dragover', handleDragOver);
  document.addEventListener('drop', handleDrop);



  const extractTextDrag = (file) => {
    pdfToText(file)
      .then((text) => {
        console.log("Extracted text:", text); // Add this line to check extracted text
        setData(text);
      })
      .catch((error) => console.error('Failed to extract text from PDF:', error)); // Add this line to log errors
  };

  const toggleDarkMode = () =>{
    setDarkMode(!darkMode);
  }
  
  const [extractedTextFromDocument, setExtractedTextFromDocument] = useState('');

  return (

    <div className={darkMode ? 'dark-mode' : 'light-mode'}>  

      <Head/>
    <div id='chatScreen' className=" h-screen p-3">
       
       <div className='mt-12 flex-grow '>

          <form
            onSubmit={generateAnswer}
            className="w-full md:w-2/3 m-auto text-center rounded  py-2"
          >
            <a>
              <div className={darkMode ? 'darkChatAI' : 'lightChatAI'}>
                <h1 className="text-3xl text-center flex flex-row justify-center mt-10">
                  <div id='chatTitle' className='mt-4'>Chat AI &nbsp;</div>
                  {/* <button className='py-2' onClick={toggleDarkMode}> */}
                  <div className=' py-2' onClick={toggleDarkMode}>
                    <div className='flex flex-row'>
                      {darkMode ? (
                        <div className='py-2 ' >
                            <WbSunnyIcon/> &nbsp; 
                          </div>
                      ) 
                      : 
                      (
                          <div className='py-2' >
                            <NightsStayIcon/> &nbsp; 
                          </div>
                        )
                      
                      }

                    </div>
                  </div>
                  <div className='mt-4' style={{ position: 'relative',hover:'bg-red-900'  }}>
                    <Link to={'/camera'} style={{ fontSize:'12px',position: 'absolute', bottom: 9, left: 3 }}>
                      <FontAwesomeIcon icon={faCamera} />
                    </Link>
                    <Link to={'/camera'} style={{  position: 'absolute', top: 0, left: 0 }}>
                      <LaunchIcon/>
                    </Link>
                    
                  </div>

                </h1>
                </div>
            </a>
            <div className={darkMode ? 'dark-mode' : 'light-mode'}> 
                <div>

                </div>
                <textarea
                  id='textareaChat'
                  required
                  className="border rounded w-11/12 my-2 min-h-fit p-3"
                  // value={data ? `${data.slice(0, 5000)}` : question}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  placeholder="Ask anything"
                ></textarea>

                <button
                  id='genButton'
                  type="submit"
                  className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
                  disabled={generatingAnswer}
                >
                
                  Generate answer
                </button>
              &nbsp; &nbsp;
              <br />
              <br />
              <br />
            </div>

            <DragandDrop extractText={extractText} droppedFromPDF={droppedFromPDF} droppedFromDrag={droppedFromDrag} dropped={dropped} handleDrop={handleDrop} handleDragEnter={handleDragEnter} fileNameFromDrag={fileNameFromDrag} 
            darkMode = {darkMode}
            />

            <div className={darkMode ? 'darkExtract' : 'lightExtract'}>  
              <Slicedata data={data} showMore={showMore} handleShowMore={handleShowMore} />
            </div>
          </form>
        </div>

        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-200 my-1">
              {loading ? (
                <Stack spacing={1}>
                  {/* For variant="text",adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
          ) : (
            <>
              <Copy answer={answer} copyContent={copyContent} setCopyContent={setCopyContent} />
              {data.length > 0  ?(
                <DownloadAndData filename={fileName} answer={answer}/>
              ) 
              
              : (
                <div></div>
              )}
            </>
          )}
        </div>
        
      </div>
      
    </div>
    
  );


};

export default Chat;
