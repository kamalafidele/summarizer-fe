import { useState } from 'react';
import axios from 'axios';

import '../styles/summarizer.css';
import { API_URL } from '../utils/constants';
import APP_LOGO from '../assets/app-logo.jpg';
import Loader from './loader';

const messageError = 'An issue occurred with ChatGPT integration';

function Summarizer() {
  const [script, setScript] = useState('');
  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState('');
  const [entities, setEntities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [paste, setPaste] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    setEntities([]);
    setSummary('');

    if (file) {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      axios.post(`${API_URL}/summarize`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
       .then(({ data }) => {
        setSummary(data.summary);
        setEntities(data.entities);
       })
       .catch((e) => setSummary(messageError))
       .finally(() => setIsLoading(false));

      return;
    }

    if (script != "") {
      setIsLoading(true);

      axios.post(`${API_URL}/summarize`, { script })
       .then(({ data }) => {
        setSummary(data.summary);
        setEntities(data.entities)
       })
       .catch((e) => {
        setSummary(messageError)
       })
       .finally(() => setIsLoading(false));
    }
  }

  return (
    <div className='container'>
      <div className='logo-container'>
          <h1 style={{ textAlign: 'center' }}>TV Scripts Summarizer</h1>
          <img src={APP_LOGO} className='img'/>
      </div>
      <div className='wrapper'>
      <div className='content'>
        
        <div className="row" id='choices-btn-container'>
          <button 
          style={{ backgroundColor: paste ? 'green' : 'white', color: paste ? 'white' : 'black'}} 
          onClick={() => setPaste(true) }>
            By Pasting Script
          </button>
          <button 
          style={{ backgroundColor: !paste ? 'green' : 'white', marginLeft: 10, color: !paste ? 'white' : 'black' }} 
          onClick={() => setPaste(false) }>
            By Uploading Script
          </button>
        </div>

        <div className='row' style={{ display: !paste ? 'block' : 'none' }}>
          <input type='file' onChange={(e) => setFile(e.target.files[0])}/>
        </div>

        <div className='row' style={{ display: paste ? 'block' : 'none' }}>
        <label htmlFor='script' style={{ display: 'block', marginBottom: 10 }}>TV Script</label>
        <textarea rows={19} cols={80} placeholder='Enter the script' onChange={(e) => setScript(e.target.value)}></textarea>
        </div>

        <div className="row">
          <button onClick={(e) => handleSubmit(e)} className='submitBtn'>Summarize</button>
        </div>

      </div>
      <div className='output-container'>
      <label htmlFor='script' style={{ display: 'block', marginBottom: 10 }}>Generated summary</label>
        <div className='output'>
          <Loader isLoading={isLoading}/>
        <h3 style={{ display: entities.length > 0 ? 'block' : 'none' }}>Summary: </h3>
        { !isLoading && <p>{summary}</p>}
        <h3 style={{ display: entities.length > 0 ? 'block' : 'none' }}>Entities: </h3>
        <p>{entities.map((entity, index) => (<span key={index}>{entity}, </span>))}</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Summarizer;
