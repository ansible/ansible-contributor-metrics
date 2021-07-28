import { useState } from "react";
import ACIssues from "./ACIssues";
import ACPullRequests from "./ACPullRequests";
import CollectionInsights from "./CollectionInsights";
import ReleasesAndTags from "./ReleasesAndTags";
import RepositoryDropdown from "./RepositoryDropdown";
import { REPOSITORIES } from "../../data/repositories";
import { Divider, PageHeader } from "antd";

const Collections = () => {
  // Default repository is the first repository object in REPOSITORIES list
  const [repository, setRepository] = useState(
    JSON.parse(localStorage.getItem("collectionsRepository")) || REPOSITORIES[0]
  );

  const repositoryCallback = (owner, repo) => {
    setRepository({ owner: owner, repo: repo });
  };

  localStorage.setItem("collectionsRepository", JSON.stringify(repository));

  return (
    <div className="collections">
      <div className="collection-contents">
        <div className="insights-and-release-info">
          <div>
            <RepositoryDropdown repositoryCallback={repositoryCallback} />
          </div>
          <div>
            <CollectionInsights
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
          <div>
            <ReleasesAndTags
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
        </div>
        <div className="tables">
          <PageHeader
            className="page-header"
            title="Tables"
            subTitle={repository.repo}
          />
          <div>
            <ACIssues owner={repository.owner} repository={repository.repo} />
          </div>
          <Divider plain style={{ backgroundColor: "#6f909d" }}></Divider>
          <div>
            <ACPullRequests
              owner={repository.owner}
              repository={repository.repo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
