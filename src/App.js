import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

const getRepositories = async () => {
  return await api.get("repositories");
};

const addRepository = async (repo) => {
  return await api.post("repositories", repo);
};

const removeRepository = async (id) => {
  return await api.delete(`repositories/${id}`);
}

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async function loadData() {
      const response = await getRepositories();
      setRepositories(response.data);
    })();

  },[]);

  async function handleAddRepository() {
    const repo = {
      title: "Repo de teste",
      url: "url/test",
      techs: ["js", "react", "node"],
    };

    const response = await addRepository(repo);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await removeRepository(id);
      setRepositories([...repositories.filter(e => e.id !== id)]);
    } catch (error) {
      console.error("Something is wrong")
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
