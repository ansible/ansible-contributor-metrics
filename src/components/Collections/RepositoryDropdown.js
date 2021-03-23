import { Select, Card } from "antd";
import { REPOSITORIES } from "../../data/repositories";

const RepositoryDropdown = ({ repositoryCallback }) => {
  const repositories = REPOSITORIES;
  // console.log(repositories);

  const { Option } = Select;

  return (
    <Card className="repository-dropdown">
      <label>Repositories: </label>
      <Select
        onChange={(e) => repositoryCallback(e[1], e[0])}
        defaultValue={
          JSON.parse(localStorage.getItem("collectionsRepository")).repo ||
          repositories[0].repo
        }
        style={{ width: "100%" }}
      >
        {repositories.map((repository, index) => (
          <Option key={index} value={[repository.repo, repository.owner]}>
            {repository.repo}
          </Option>
        ))}
      </Select>
    </Card>
  );
};

export default RepositoryDropdown;
