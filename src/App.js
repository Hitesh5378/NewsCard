import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import NewsGrid from './components/NewsGrid';
import { useState } from 'react';
import { NewsProvider } from './context/NewsContext';

function App() {
  const [viewType, setViewType] = useState('list');

  return (
    <NewsProvider>
      <div style={{display:"flex", height: "100vh",backgroundColor: "#dfe5e7ff"}} >
        <Sidebar onViewChange={setViewType}/>
        <NewsGrid viewType={viewType} />
      </div>
    </NewsProvider>
  );
}

export default App;
