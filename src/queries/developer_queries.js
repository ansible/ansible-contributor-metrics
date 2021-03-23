import { gql } from "@apollo/client";

const DEVELOPER_LIST = gql`
  {
    organization(login: "ansible-collections") {
      membersWithRole(last: 100) {
        nodes {
          login
          name
        }
      }
    }
  }
`;

const DEVELOPER_DETAILS = gql`
  query($userName: String!) {
    user(login: $userName) {
      name
      login
      email
      avatarUrl
      url
    }
  }
`;

const DEVELOPER_CONTRIBUTIONS = gql`
  query(
    $queryStringIssueOpen: String!
    $queryStringIssueClosed: String!
    $queryStringPROpen: String!
    $queryStringPRMerged: String!
    $queryStringTotal: String!
  ) {
    OPEN_ISSUES: search(query: $queryStringIssueOpen, type: ISSUE) {
      issueCount
    }
    CLOSED_ISSUES: search(query: $queryStringIssueClosed, type: ISSUE) {
      issueCount
    }
    OPEN_PR: search(query: $queryStringPROpen, type: ISSUE) {
      issueCount
    }
    MERGED_PR: search(query: $queryStringPRMerged, type: ISSUE) {
      issueCount
    }
    TOTAL_CONTRIBUTION: search(query: $queryStringTotal, type: ISSUE) {
      issueCount
    }
  }
`;

export { DEVELOPER_LIST, DEVELOPER_DETAILS, DEVELOPER_CONTRIBUTIONS };
