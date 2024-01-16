import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Search from './components/Search';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



const App = () => {
  const [progress, setProgress] = useState(0);
  const pageSize = 6;
  const ApiKey ="8d61e2d5acea4035a2e9ff6852da9d5e";
  // state ={
  //   progress:0
  // }
  // setProgress = (progress) =>{
  //   setState({progress:progress})
  // }
  return (
    <div>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />

        <Routes>
          <Route path='/' element={<News ApiKey={ApiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route path='/business' element={<News ApiKey={ApiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" />} />
          <Route path='/entertainment' element={<News ApiKey={ApiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route path='/sports' element={<News ApiKey={ApiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route path='/technology' element={<News ApiKey={ApiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />} />
          <Route path='/health' element={<News ApiKey={ApiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
          <Route path='/science' element={<News ApiKey={ApiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route path='/search' element ={<Search ApiKey={ApiKey} setProgress={setProgress} pageSize={pageSize} country="in"/>} />
        </Routes>

      </Router>

    </div>
  )
};

export default App


