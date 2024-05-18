import React from 'react'
import '../App.css'
const DragandDrop = ({extractText,droppedFromPDF,droppedFromDrag,dropped,handleDrop,handleDragOver,handleDragEnter,fileNamefromDrag,darkMode}) => {
  return (
   
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>  
        <div id='dragColor' className="bg-red-400 p-3 rounded-md hover:bg-red-400 transition-all duration-300">
                
                
        <div className={darkMode ? 'darkModeDragText' : 'lightModeDragTexty'}> 
            <input type="file"  accept="application/pdf"  onChange={extractText} />
        {/* </div> */}
        {/** when you choose from "Choose File" */}
        {
            droppedFromPDF || droppedFromDrag ? (<div className=''> Or </div>) : (<div>You chosen...</div>)
        }
        
        

        {/** when you choose from "Drag and Drop File " */}
        {/* <div className={darkMode ? 'dark-mode' : 'light-mode'}>  */}
            {dropped ? (
                <p id="dragFont" >Done Uploaded </p>
            ) : (
                <p id="dragFont">Drop a PDF file here</p>
            )}
        </div>
                
        
            <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter}>
            {fileNamefromDrag ? (
                <p id="dragFontName">File name: {fileNamefromDrag}</p>
            ) : (
                <p></p>
            )}
            </div>

        
        </div>
        
    </div>
  )
}

export default DragandDrop