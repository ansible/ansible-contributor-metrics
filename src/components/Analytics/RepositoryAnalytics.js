import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ISSUES_AND_PR_AVERAGE,
  ISSUES_AND_PR_SPLITUP,
} from "../../queries/analytics_queries";
import { groupByMonth } from "../../utils/groupByMonth";
import LineGraph from "./LineGraph";
import { assembleData } from "../../utils/assemble-data";
import BarGraph from "./BarGraph";
import DoughnutGraph from "./DoughnutGraph";
import { calculateAverageDays } from "../../utils/calculateAverageDays";
import { Row, Col, PageHeader, Empty } from "antd";
import AnalyticGraphs from "./AnalyticGraphs";

const RepositoryAnalytics = ({ owner, repository }) => {
  const [mergedIssueData, setMergedIssueData] = useState(null);
  const [mergedPRData, setMergedPRData] = useState(null);

  const [issuesGroupedByMonth, setIssuesGroupedByMonth] = useState(null);
  const [prsGroupedByMonth, setPRSGroupedByMonth] = useState(null);

  const [totalOpenIssueCount, setTotalOpenIssueCount] = useState(null);
  const [totalCloseIssueCount, setTotalCloseIssueCount] = useState(null);
  const [totalOpenPRCount, setTotalOpenPRCount] = useState(null);
  const [totalMergePRCount, setTotalMergePRCount] = useState(null);

  const [averageDaysIssueClosed, setAverageDaysIssueClosed] = useState(null);
  const [averageDaysPRMerged, setAverageDaysPRMerged] = useState(null);

  const {
    loading: splitupDataLoading,
    error: splitupDataError,
    data: splitupDataData,
  } = useQuery(ISSUES_AND_PR_SPLITUP, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  const {
    loading: averageDataLoading,
    error: averageDataError,
    data: averageDataData,
  } = useQuery(ISSUES_AND_PR_AVERAGE, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  useEffect(() => {
    let openIssuesGroupedByMonth,
      closedIssuesGroupedByMonth,
      openPRGroupedByMonth,
      mergedPRGroupedByMonth,
      averageIssueCloseDate,
      averagePRMergeDate,
      issuesGroupedByMonth,
      prGroupedByMonth;

    if (averageDataData) {
      // console.log(averageDataData);
      averageIssueCloseDate = calculateAverageDays(
        averageDataData.ISSUE_AVG.issues.nodes
      );
      averagePRMergeDate = calculateAverageDays(
        averageDataData.PR_AVG.pullRequests.nodes
      );
      setAverageDaysIssueClosed(averageIssueCloseDate);
      setAverageDaysPRMerged(averagePRMergeDate);
      // console.log("ISSUE AVG: ", averageIssueCloseDate);
      // console.log("PR AVG: ", averagePRMergeDate);
    }

    if (splitupDataData) {
      openIssuesGroupedByMonth = groupByMonth(
        splitupDataData.OPEN_ISSUES.issues.nodes
      );
      closedIssuesGroupedByMonth = groupByMonth(
        splitupDataData.CLOSED_ISSUES.issues.nodes
      );
      openPRGroupedByMonth = groupByMonth(
        splitupDataData.OPEN_PR.pullRequests.nodes
      );
      mergedPRGroupedByMonth = groupByMonth(
        splitupDataData.MERGED_PR.pullRequests.nodes
      );

      console.log(openIssuesGroupedByMonth);
      console.log(closedIssuesGroupedByMonth);

      if (!splitupDataLoading) {
        const resultForIssues =
          openIssuesGroupedByMonth.length > closedIssuesGroupedByMonth.length
            ? assembleData(
                openIssuesGroupedByMonth,
                closedIssuesGroupedByMonth,
                "open"
              )
            : assembleData(
                closedIssuesGroupedByMonth,
                openIssuesGroupedByMonth,
                "closed"
              );

        const resultForPRS =
          openPRGroupedByMonth.length > mergedPRGroupedByMonth.length
            ? assembleData(openPRGroupedByMonth, mergedPRGroupedByMonth, "open")
            : assembleData(
                mergedPRGroupedByMonth,
                openPRGroupedByMonth,
                "merged"
              );
        setIssuesGroupedByMonth(issuesGroupedByMonth);
        setPRSGroupedByMonth(prGroupedByMonth);
        setMergedIssueData(resultForIssues);
        setMergedPRData(resultForPRS);

        setTotalOpenIssueCount(splitupDataData.OPEN_ISSUES.issues.totalCount);
        setTotalCloseIssueCount(
          splitupDataData.CLOSED_ISSUES.issues.totalCount
        );
        setTotalOpenPRCount(splitupDataData.OPEN_PR.pullRequests.totalCount);
        setTotalMergePRCount(splitupDataData.MERGED_PR.pullRequests.totalCount);
        // console.log("TOTAL COUNT", splitupDataData);
      }
    }
  }, [
    splitupDataLoading,
    averageDataLoading,
    splitupDataData,
    averageDataData,
  ]);

  return (
    <div className="repository-analytics">
      <PageHeader
        className="page-header"
        title="Analytics"
        subTitle={repository}
      />
      <AnalyticGraphs
        mergedIssueData={mergedIssueData}
        mergedPRData={mergedPRData}
        totalOpenIssueCount={totalOpenIssueCount}
        totalCloseIssueCount={totalCloseIssueCount}
        totalOpenPRCount={totalOpenPRCount}
        totalMergePRCount={totalMergePRCount}
        averageDaysIssueClosed={averageDaysIssueClosed}
        averageDaysPRMerged={averageDaysPRMerged}
      />
    </div>
  );
};

export default RepositoryAnalytics;
