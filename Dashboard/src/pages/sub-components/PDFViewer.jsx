// src/pages/sub-components/PDFViewer.jsx
import React from 'react';

const PDFViewer = ({ fileUrl }) => {

  return (
    <div className='w-full relative h-auto sm:w-72 sm:h-72 rounded-2xl'>
      {fileUrl ? (
        <embed
          src={fileUrl}
          className='w-full h-full absolute'
          
        />
      ) : (
        <p>No resume uploaded</p>
      )}
    </div>
  );
};

export default PDFViewer;
