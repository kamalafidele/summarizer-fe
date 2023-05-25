import { useState } from 'react';
import axios from 'axios';

import '../styles/summarizer.css';
import { API_URL } from "../utils/constants";
import APP_LOGO from '../assets/app-logo.jpg';
import Loader from './loader';


function Summarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post(`${API_URL}/summarize`, { text })
     .then(({ data }) => setSummary(data.summary))
     .catch((e) => setSummary("ChatGPT failed to to summarize the text"))
     .finally(() => setIsLoading(false));
  }

  return (
    <div className='container'>
      <div className='logo-container'>
          <h1 style={{ textAlign: 'center' }}>TV Scripts Summarizer</h1>
          <img src={APP_LOGO} className='img'/>
      </div>
      <div className="wrapper">
      <div className='content'>
        <div className="row">
        <label htmlFor="script" style={{ display: 'block', marginBottom: 10 }}>TV Script</label>
        <textarea rows={19} cols={80} placeholder='Enter the script' onChange={(e) => setText(e.target.value)}></textarea>
        </div>
        <div className="row">
          <button onClick={(e) => handleSubmit(e)}>Summarize</button>
        </div>
      </div>
      <div className="output-container">
      <label htmlFor="script" style={{ display: 'block', marginBottom: 10 }}>Generated summary</label>
        <div className='output'>
          <Loader isLoading={isLoading}/>
        { !isLoading && <p>{summary}</p>}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Summarizer;