import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Copy = ({answer,copyContent,setcopyContent}) => {
  return (
    <div className='relative'>
        {answer && (
            <button onClick = {()=> {
                navigator.clipboard.writeText(answer);
                // alert("Copied !")
                setcopyContent(true);
            }}>
            <div className="absolute top-90 right-22 mr-1 ml-3 mt-1">
                <ContentCopyIcon className={`text-gray-500  ${copyContent ? "opacity-15 bg-green-200" : "hover:text-blue-500 "}`}/>
            </div>
            {copyContent && (
                <span className='text-green-500'> Copied ! </span>
            )}

                
            </button>
            )}
    </div>
  )
}

export default Copy