import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import { DEVELOPER_REPO_WISE_ISSUE_PR } from "../../queries/developer_repo_wise_issue_pr_query";
import RepositoryWiseDetails from "./RepositoryWiseDetails";

const SpiltUpInfo = ({ selectedDeveloper }) => {
  // Query for obtaining selected developer's repository-wise info
  const { loading, error, data } = useQuery(
    DEVELOPER_REPO_WISE_ISSUE_PR(selectedDeveloper)
  );

  return (
    <div className="splitup-info">
      <h2>Overall repository wise details of {selectedDeveloper}</h2>
      {loading && <Skeleton />}
      {error && <p>{error}</p>}
      {data && <RepositoryWiseDetails data={data} />}
    </div>
  );
};

export default SpiltUpInfo;
