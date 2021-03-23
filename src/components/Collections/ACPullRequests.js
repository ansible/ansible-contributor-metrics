import { useQuery } from "@apollo/client";
import { PR } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { PR_COLUMNS } from "./PRColumns";

const ACPullRequests = ({ owner, repository }) => {
  // Query for obtaining pull requests
  const { loading, error, data } = useQuery(PR, {
    variables: { repositoryName: repository, ownerName: owner },
  });
  // console.log(data);

  return (
    <div className="ac-pull-requests">
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {data && (
        <DataTable
          title="Pull Requests Table"
          tag="Pull requests"
          tableData={data.repository.pullRequests.edges}
          tableColumns={PR_COLUMNS}
        />
      )}
    </div>
  );
};
export default ACPullRequests;
