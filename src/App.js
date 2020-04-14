import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    
    fetchData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "New repo",
      url: "http://www.github.com",
      techs: ['NodeJS, ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    let response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const repos = repositories;
      const repoIndex = repos.findIndex(repository => repository.id === id)
      setRepositories(repositories.filter((repository) => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>          
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
