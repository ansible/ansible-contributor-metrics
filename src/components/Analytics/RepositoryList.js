import { useState, useEffect } from "react";
import { Input } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const RepositoryList = ({ repositoryCallback, drawerClose }) => {
  const [searchRepository, setSearchRepository] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const repositories = REPOSITORIES;
  // console.log(repositories);

  const handleSearch = (e) => {
    // console.log(e);
    setSearchRepository(e);
  };
  // console.log(searchRepository);
  useEffect(() => {
    const results = repositories.filter((repository) =>
      repository["repo"].toLowerCase().includes(searchRepository.toLowerCase())
    );
    setSearchResults(results);
  }, [searchRepository, repositories]);

  return (
    <div className="repository-list">
      <h2>Repositories:</h2>
      <Input
        size="small"
        placeholder={`Search (${searchResults.length})`}
        allowClear={true}
        value={searchRepository}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchResults.map((item, index) => (
        <p
          key={index}
          value={item}
          onClick={(e) => {
            repositoryCallback(item);
            drawerClose();
          }}
        >
          {item.repo}
        </p>
      ))}
    </div>
  );
};

RepositoryList.defaultProps = {
  drawerClose: () => {},
};

export default RepositoryList;
