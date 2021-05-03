import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ISSUES_AND_PR_AVERAGE,
  ISSUES_AND_PR_TOTAL_COUNT,
} from "../../queries/analytics_queries";
import { groupByMonth } from "../../utils/groupByMonth";
import LineGraph from "./LineGraph";
import { assembleData } from "../../utils/assemble-data";
import BarGraph from "./BarGraph";
import DoughnutGraph from "./DoughnutChart";
import { calculateAverageDays } from "../../utils/calculateAverageDays";
import { Row, Col, PageHeader, Empty, Skeleton } from "antd";
import AnalyticGraphs from "./AnalyticGraphs";
import { ISSUES_AND_PRS_MONTHLY } from "../../queries/analytics_monthwise_stats";
import { separateAndSplitData } from "../../utils/separateAndSplitData";
import { Spin, Alert } from "antd";

const RepositoryAnalytics = ({ owner, repository }) => {
  // ************************
  // ************************

  const {
    loading: totalCountDataLoading,
    error: totalCountDataError,
    data: totalCountDataData,
  } = useQuery(ISSUES_AND_PR_TOTAL_COUNT, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  if (totalCountDataData && !totalCountDataLoading) {
    var totalOpenIssueCount = totalCountDataData.OPEN_ISSUES.issues.totalCount;
    var totalCloseIssueCount =
      totalCountDataData.CLOSED_ISSUES.issues.totalCount;
    var totalOpenPRCount = totalCountDataData.OPEN_PR.pullRequests.totalCount;
    var totalMergePRCount =
      totalCountDataData.MERGED_PR.pullRequests.totalCount;
  }

  // ************************
  // ************************

  const {
    loading: averageDataLoading,
    error: averageDataError,
    data: averageDataData,
  } = useQuery(ISSUES_AND_PR_AVERAGE, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  if (averageDataData && !averageDataLoading) {
    var averageIssueCloseDate = calculateAverageDays(
      averageDataData.ISSUE_AVG.issues.nodes
    );
    var averagePRMergeDate = calculateAverageDays(
      averageDataData.PR_AVG.pullRequests.nodes
    );
    var averageDaysIssueClosed = averageIssueCloseDate;
    var averageDaysPRMerged = averagePRMergeDate;
  }

  // ************************
  // ************************

  const {
    loading: monthlyStatLoading,
    error: monthlyStatError,
    data: monthlyStatData,
  } = useQuery(ISSUES_AND_PRS_MONTHLY(`${owner}/${repository}`));

  if (monthlyStatData && !monthlyStatLoading) {
    var statData = separateAndSplitData(monthlyStatData);
  }

  // ************************
  // ************************

  return (
    <div className="repository-analytics">
      <PageHeader
        className="page-header"
        title="Analytics"
        subTitle={repository}
      />

      {(!totalCountDataData || !averageDataData || !monthlyStatData) && (
        <Skeleton />
      )}

      {totalCountDataData &&
        !totalCountDataLoading &&
        averageDataData &&
        !averageDataLoading &&
        monthlyStatData &&
        !monthlyStatLoading && (
          <AnalyticGraphs
            totalOpenIssueCount={totalOpenIssueCount}
            totalCloseIssueCount={totalCloseIssueCount}
            totalOpenPRCount={totalOpenPRCount}
            totalMergePRCount={totalMergePRCount}
            averageDaysIssueClosed={averageDaysIssueClosed}
            averageDaysPRMerged={averageDaysPRMerged}
            issuesStatData={statData.issuesStatSplit}
            prsStatData={statData.prsStatSplit}
          />
        )}
    </div>
  );
};

export default RepositoryAnalytics;
