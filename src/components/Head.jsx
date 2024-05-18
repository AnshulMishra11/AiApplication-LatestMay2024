import React from 'react';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

const Head = () => {
  return (
    <div className="footer flex flex-row justify-between p-4 bg-gray-200">
      <div>Developed by Anshul Mishra [More changes will be done Soon ..] </div>
      <div>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <InfoIcon />
        </a>
      </div>
    </div>
  );
};

export default Head;
