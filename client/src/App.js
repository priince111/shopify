import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/comp/Main';
function App() {
  console.log("hi there prince!")
  return (
    <div className="App">
      <BrowserRouter>
          <div className="App">
            <Main/>
          </div> 
        </BrowserRouter>
    </div>
  );
}

export default App;
