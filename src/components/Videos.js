import React from 'react';
import './Videos.css';

function Videos() {
  return (
    <div className="videos">
      <h2>Learning Videos</h2>
      <iframe 
        title="Learning Video" 
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
        allow="fullscreen"
      ></iframe>
    </div>
  );
}

export default Videos;
