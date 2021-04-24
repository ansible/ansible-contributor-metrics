import { useState, useEffect } from "react";
import { Input } from "antd";
import { USERS } from "../../data/users";

const DeveloperList = ({ developerCallback, drawerClose }) => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const users = developers.map((developer) => developer.name);
  //   console.log(users);

  const users = USERS;

  const handleSearch = (e) => {
    setSearchName(e);
  };

  useEffect(() => {
    const results = users.filter((user) =>
      user.toLowerCase().includes(searchName.toLowerCase())
    );
    setSearchResults(results);
  }, [searchName, users]);

  return (
    <div className="developer-list">
      <h2>Developers:</h2>
      <Input
        size="small"
        allowClear={true}
        placeholder={`Search (${users.length})`}
        value={searchName}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {searchResults.map((item, index) => (
        <p
          key={index}
          value={item}
          onClick={(e) => {
            developerCallback(item);
            drawerClose();
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

DeveloperList.defaultProps = {
  drawerClose: () => {},
};

export default DeveloperList;
