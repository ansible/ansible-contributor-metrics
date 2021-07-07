import { gql } from "@apollo/client";
import { USERS } from "../data/users";
import moment from "moment";

/*
Query structure that is built dynamically:

query {
    COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    NON_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    NON_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }
}
*/

const pr_community = (selectedRepository, authorString, dateString) =>
  `"repo:${selectedRepository} ${authorString} type:pr created:${dateString}"`;

const pr_non_community = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:pr created:${dateString}"`;

const issue_community = (selectedRepository, authorString, dateString) =>
  `"repo:${selectedRepository} ${authorString} type:issue created:${dateString}"`;

const issue_non_community = (selectedRepository, dateString) =>
  `"repo:${selectedRepository} type:issue created:${dateString}"`;

const MEMBERS = () => {
  let authors = "";
  USERS.forEach((user) => {
    authors += `author:${user} `;
  });

  return authors.trim();
};

const DATE_RANGE = () => {
  let today = moment().format("YYYY-MM-DD");
  let fromDate = moment().subtract(12, "months").format("YYYY-MM-DD");

  return `${fromDate}..${today}`;
};

const queryGenerator = (selectedRepository) => {
  let finalQuery = `
        COMMUNITY_PRS: search(query: ${pr_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE()
        )},
        type: ISSUE) {
          issueCount
        }

        NON_COMMUNITY_PRS: search(query: ${pr_non_community(
          selectedRepository,
          DATE_RANGE()
        )},
        type: ISSUE) {
          issueCount
        }

        COMMUNITY_ISSUES: search(query: ${issue_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE()
        )},
        type: ISSUE) {
          issueCount
        }

        NON_COMMUNITY_ISSUES: search(query: ${issue_non_community(
          selectedRepository,
          DATE_RANGE()
        )},
        type: ISSUE) {
          issueCount
        }
    `;

  return finalQuery;
};

const COMMUNITY_CONTRIBUTIONS = (selectedRepository) => {
  let query = `
            query {
                ${queryGenerator(selectedRepository)}
            }
    
        `;

  console.log("Query String", queryGenerator(selectedRepository));

  return gql`
    ${query}
  `;
};

export { COMMUNITY_CONTRIBUTIONS };
