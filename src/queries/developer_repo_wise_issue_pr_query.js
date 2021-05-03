import { gql } from "@apollo/client";
import { REPOSITORIES } from "../data/repositories";

/*
Query structure that is built dynamically:

query {
    REPOSITORY_OPEN_ISSUE: search(type: ISSUE, query: "repo:{__org__/__repo__} author:{__selectedDeveloper__} type:issue is:open", last: 100) {
      issueCount
    }
    REPOSITORY_CLOSED_ISSUE: search(type: ISSUE, query: "repo:{__org__/__repo__} author:{__selectedDeveloper__} type:issue is:closed", last: 100) {
      issueCount
    }
    REPOSITORY_OPEN_PR: search(type: ISSUE, query: "repo:{__org__/__repo__} author:{__selectedDeveloper__} type:pr is:open", last: 100) {
      issueCount
    }
    REPOSITORY_CLOSED_PR: search(type: ISSUE, query: "repo:{__org__/__repo__} author:{__selectedDeveloper__} type:pr is:merged", last: 100) {
      issueCount
    }
}
*/

const removeSpecialCharacters = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");

const open_pr_qs = (repo, owner, selectedDeveloper) =>
  `"repo:${owner}/${repo} type:pr is:open author:${selectedDeveloper}"`;

const merged_pr_qs = (repo, owner, selectedDeveloper) =>
  `"repo:${owner}/${repo} type:pr is:merged author:${selectedDeveloper}"`;

const open_issue_qs = (repo, owner, selectedDeveloper) =>
  `"repo:${owner}/${repo} type:issue is:open author:${selectedDeveloper}"`;

const closed_issue_qs = (repo, owner, selectedDeveloper) =>
  `"repo:${owner}/${repo} type:issue is:closed author:${selectedDeveloper}"`;

const queryGenerator = (name, owner, selectedDeveloper) => {
  return `
   ${removeSpecialCharacters(
     name
   ).toUpperCase()}_OPEN_PR: search(query: ${open_pr_qs(
    name,
    owner,
    selectedDeveloper
  )}, type: ISSUE, last: 100) {
                issueCount
            }

   ${removeSpecialCharacters(
     name
   ).toUpperCase()}_MERGED_PR: search(query: ${merged_pr_qs(
    name,
    owner,
    selectedDeveloper
  )}, type: ISSUE) {
                issueCount
            }

   ${removeSpecialCharacters(
     name
   ).toUpperCase()}_OPEN_ISSUE: search(query: ${open_issue_qs(
    name,
    owner,
    selectedDeveloper
  )}, type: ISSUE, last: 100) {
                issueCount
            }

   ${removeSpecialCharacters(
     name
   ).toUpperCase()}_CLOSED_ISSUE: search(query: ${closed_issue_qs(
    name,
    owner,
    selectedDeveloper
  )}, type: ISSUE, last: 100) {
                issueCount
            }


            `;
};

const innerQuery = (selectedDeveloper) => {
  let innerQuery = ``;
  for (let repository of REPOSITORIES) {
    innerQuery += queryGenerator(
      repository.repo,
      repository.owner,
      selectedDeveloper
    );
  }

  return innerQuery;
};

const DEVELOPER_REPO_WISE_ISSUE_PR = (selectedDeveloper) => {
  let query = `
        query {
            ${innerQuery(selectedDeveloper)}
        }

    `;

  console.log("Query String", innerQuery(selectedDeveloper));

  return gql`
    ${query}
  `;
};

export { DEVELOPER_REPO_WISE_ISSUE_PR };
