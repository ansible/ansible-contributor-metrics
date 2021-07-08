import { gql } from "@apollo/client";
import { USERS } from "../data/users";
import moment from "moment";

/*
Query structure that is built dynamically:

query {
    OVERALL_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    OVERALL_NON_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    OVERALL_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    OVERALL_NON_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }


    LAST_MONTH_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_MONTH_NON_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_MONTH_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_MONTH_NON_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }


    LAST_SIX_MONTHS_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_SIX_MONTHS_NON_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_SIX_MONTHS_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_SIX_MONTHS_NON_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }


    LAST_YEAR_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_YEAR_NON_COMMUNITY_PRS: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_YEAR_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} author:{__author-list__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }

    LAST_YEAR_NON_COMMUNITY_ISSUES: search(query: "repo:{__org__/__repo__} created:{__date-range__})", type: ISSUE) {
      issueCount
    }
}
*/

const pr_non_community = (
  selectedRepository,
  authorString,
  dateString = `<=${moment().format("YYYY-MM-DD")}`
) =>
  `"repo:${selectedRepository} ${authorString} type:pr created:${dateString}"`;

const pr_all = (
  selectedRepository,
  dateString = `<=${moment().format("YYYY-MM-DD")}`
) => `"repo:${selectedRepository} type:pr created:${dateString}"`;

const issue_non_community = (
  selectedRepository,
  authorString,
  dateString = `<=${moment().format("YYYY-MM-DD")}`
) =>
  `"repo:${selectedRepository} ${authorString} type:issue created:${dateString}"`;

const issue_all = (
  selectedRepository,
  dateString = `<=${moment().format("YYYY-MM-DD")}`
) => `"repo:${selectedRepository} type:issue created:${dateString}"`;

const MEMBERS = () => {
  let authors = "";
  USERS.forEach((user) => {
    authors += `author:${user} `;
  });

  return authors.trim();
};

const DATE_RANGE = (month) => {
  let today = moment().format("YYYY-MM-DD");
  let fromDate = moment().subtract(month, "months").format("YYYY-MM-DD");

  return `${fromDate}..${today}`;
};

const queryGenerator = (selectedRepository) => {
  let finalQuery = `
          OVERALL_NON_COMMUNITY_PRS: search(query: ${pr_non_community(
            selectedRepository,
            MEMBERS()
          )},
          type: ISSUE) {
            issueCount
          }

          OVERALL_ALL_PRS: search(query: ${pr_all(selectedRepository)},
          type: ISSUE) {
            issueCount
          }

          OVERALL_NON_COMMUNITY_ISSUES: search(query: ${issue_non_community(
            selectedRepository,
            MEMBERS()
          )},
          type: ISSUE) {
            issueCount
          }

          OVERALL_ALL_ISSUES: search(query: ${issue_all(selectedRepository)},
          type: ISSUE) {
            issueCount
          }


        LAST_MONTH_NON_COMMUNITY_PRS: search(query: ${pr_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(1)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_MONTH_ALL_PRS: search(query: ${pr_all(
          selectedRepository,
          DATE_RANGE(1)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_MONTH_NON_COMMUNITY_ISSUES: search(query: ${issue_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(1)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_MONTH_ALL_ISSUES: search(query: ${issue_all(
          selectedRepository,
          DATE_RANGE(1)
        )},
        type: ISSUE) {
          issueCount
        }


        LAST_SIX_MONTHS_NON_COMMUNITY_PRS: search(query: ${pr_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(6)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_SIX_MONTHS_ALL_PRS: search(query: ${pr_all(
          selectedRepository,
          DATE_RANGE(6)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_SIX_MONTHS_NON_COMMUNITY_ISSUES: search(query: ${issue_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(6)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_SIX_MONTHS_ALL_ISSUES: search(query: ${issue_all(
          selectedRepository,
          DATE_RANGE(6)
        )},
        type: ISSUE) {
          issueCount
        }


        LAST_YEAR_NON_COMMUNITY_PRS: search(query: ${pr_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(12)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_YEAR_ALL_PRS: search(query: ${pr_all(
          selectedRepository,
          DATE_RANGE(12)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_YEAR_NON_COMMUNITY_ISSUES: search(query: ${issue_non_community(
          selectedRepository,
          MEMBERS(),
          DATE_RANGE(12)
        )},
        type: ISSUE) {
          issueCount
        }

        LAST_YEAR_ALL_ISSUES: search(query: ${issue_all(
          selectedRepository,
          DATE_RANGE(12)
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
