import { gql } from "@apollo/client";

const ISSUES_AND_PR_TOTAL_COUNT = gql`
  query totalCountQuery($repositoryName: String!, $ownerName: String!) {
    OPEN_ISSUES: repository(name: $repositoryName, owner: $ownerName) {
      issues(states: OPEN) {
        totalCount
      }
    }
    CLOSED_ISSUES: repository(name: $repositoryName, owner: $ownerName) {
      issues(states: CLOSED) {
        totalCount
      }
    }
    OPEN_PR: repository(name: $repositoryName, owner: $ownerName) {
      pullRequests(states: OPEN) {
        totalCount
      }
    }
    MERGED_PR: repository(name: $repositoryName, owner: $ownerName) {
      pullRequests(states: MERGED) {
        totalCount
      }
    }
  }
`;

const ISSUES_AND_PR_AVERAGE = gql`
  query MyQuery($repositoryName: String!, $ownerName: String!) {
    ISSUE_AVG: repository(name: $repositoryName, owner: $ownerName) {
      issues(states: CLOSED, last: 100) {
        nodes {
          createdAt
          closedAt
        }
      }
    }
    PR_AVG: repository(name: $repositoryName, owner: $ownerName) {
      pullRequests(states: MERGED, last: 100) {
        nodes {
          createdAt
          mergedAt
        }
      }
    }
  }
`;

export { ISSUES_AND_PR_TOTAL_COUNT, ISSUES_AND_PR_AVERAGE };
