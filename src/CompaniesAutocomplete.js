import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompaniesAutocomplete = (props) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState('hidden');

  const api_key = props.api_key

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://api.company-information.service.gov.uk/search/companies', {
        params: {
          q: term,
          start_index: 0,
          items_per_page: 10
        },
        headers: {
          Authorization: 'Basic ' + btoa(api_key),
        }
      });
      setResults(data.items);
      setVisible('visible');
      
    };

    const timeoutId = setTimeout(() => {
      if (term) {
        search();
      } else {
        setVisible('hidden')
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };

  }, [term, api_key]);

  const renderedResults = results.map((result) => {
    return (
        <a key={result.company_number} className="result">
          <div className="content">
            <div className="title"><h5>{result.title}</h5></div>
            {result.address_snippet}
          </div>
        </a>
    );
  });

  return (
    <div className="ui search" >
      <input 
        className="prompt"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="text" 
        placeholder="Company name..." 
        style={{width:'100%'}}
      />
      <div className={`results transition ${visible}`} style={{width:'100%'}} >
        {renderedResults}
      </div>
    </div>
  );
};
export default CompaniesAutocomplete;