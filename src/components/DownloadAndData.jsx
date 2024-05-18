import React from 'react'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ReactMarkdown from "react-markdown";
import { usePDF } from 'react-to-pdf';

const DownloadAndData = ({fileName,answer,setGeneratedText}) => {

  const { toPDF, targetRef } = usePDF({filename: fileName});
  
  return (
    <div>
        <button onClick={() => toPDF()}>
            <DownloadForOfflineIcon />
        </button>
        <div id='dataStyle' ref={targetRef}>
            <ReactMarkdown className="p-3">
                {answer}
                
              
            </ReactMarkdown>
        </div>
    </div>
  )
}

export default DownloadAndData