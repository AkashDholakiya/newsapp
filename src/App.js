import './App.css';
import Navbar from './components/Navbar';
import News from './components/News'
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const App = () => {
  const apikey = process.env.REACT_APP_NEWS_API;
  const [progress, setprogress] = useState(0)
  
    return (
      <div>
          <Router>  
            <Navbar/>
            <LoadingBar
              height={4}
              color='#f11946'
              progress={progress}
            />
            <Routes>
              <Route exact path ="/" element={<News setProgress={setprogress} apikey={apikey} pageSize={6} key='general'  country='in' category='general'/>} />
              <Route exact path ="/business" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='business' country='in' category='business'/>} />
              <Route exact path ="/entertainment" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key = 'entertainment' country='in' category='entertainment'/>} />
              <Route exact path ="/general" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='general' country='in' category='general'/>} />
              <Route exact path ="/health" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='health' country='in' category='health'/>} />
              <Route exact path ="/science" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='science' country='in' category='science'/>} />
              <Route exact path ="/sports" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='sports' country='in' category='sports'/>} />
              <Route exact path ="/technology" element={<News setProgress={setprogress} apikey={apikey}  pageSize={6} key='technology' country='in' category='technology'/>} />
            </Routes>
          </Router>
      </div>
    )
}

export default App;