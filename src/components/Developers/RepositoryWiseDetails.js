import { REPOSITORIES } from "../../data/repositories";

// remove special characters from the repository name
const removeSpecialCharacters = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");

const RepositoryWiseDetails = ({ data }) => {
  const openIssue = "_OPEN_ISSUE";
  const closedIssue = "_CLOSED_ISSUE";
  const openPR = "_OPEN_PR";
  const mergedPR = "_MERGED_PR";
  return (
    <div className="repository-wise-details">
      <div className="repository-wise-details-inner">
        {REPOSITORIES.map(({ repo }, index) => {
          const name = removeSpecialCharacters(repo).toUpperCase();
          const openIssues = data[name + openIssue].issueCount;
          const closedIssues = data[name + closedIssue].issueCount;
          const openPRS = data[name + mergedPR].issueCount;
          const mergedPRS = data[name + openPR].issueCount;

          const totalContributions =
            openIssues + closedIssues + openPRS + mergedPRS;

          return totalContributions ? (
            <div key={index} className="repository-wise-issue-pr-data">
              <h2>{repo}</h2>
              <p>Issues opened: {openIssues}</p>
              <p>Issues closed: {closedIssues}</p>
              <p>Open PRs: {openPRS}</p>
              <p>Merged PRs: {mergedPRS}</p>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default RepositoryWiseDetails;
