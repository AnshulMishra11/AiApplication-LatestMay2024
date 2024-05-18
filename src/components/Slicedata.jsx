import React from 'react'

const Slicedata = ({data,showMore,handleShowMore}) => {
  return (
    <div id='sliceDataText'>
        {data.slice(0,500)}
        
        { data && !showMore && (
            <div>
                <button className=' text-center rounded p-3 bg-blue-200 my-1 text-red-500' onClick={handleShowMore}>More</button>
            </div>
        )}
        {showMore && (
            <div>
            {data.slice(501)}
            </div>
        )}
    </div>
  )
}

export default Slicedata