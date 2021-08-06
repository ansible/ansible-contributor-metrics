import { Row, Col, Empty, Tooltip } from "antd";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import DoughnutChart from "./DoughnutChart";
import { IssuesCloseOutlined, PullRequestOutlined } from "@ant-design/icons";
import { Equation } from "react-equation";
import HorizontalBarGraph from "./HorizontalBarGraph";
const AnalyticGraphs = ({
  totalOpenIssueCount,
  totalCloseIssueCount,
  totalOpenPRCount,
  totalMergePRCount,
  averageDaysIssueClosed,
  averageDaysPRMerged,
  issuesStatData,
  prsStatData,
  // nonCommunityIssues,
  // allIssues,
  // nonCommunityPRs,
  // allPRs,
  communityContributionData,
}) => {
  // console.log("FROMANALYTICS", issuesStatData);
  // console.log("FROMANALYTICS", prsStatData);

  // console.log("Non community Issues", nonCommunityIssues);
  // console.log("All Issues", allIssues);
  // console.log("Non community PRs", nonCommunityPRs);
  // console.log("All PRs", allPRs);

  const contentForPRInfo = (
    <div style={{ textAlign: "center" }}>
      <p>
        The card tells how much time it takes for a decision to be made on a
        submitted pull request. This performance indicator is calculated on the
        basis of last 100 pull requests that were merged/closed, as follows:
      </p>
      <Equation
        value={"(sum(pr, 1, PRs, (closed date - opened date)) / PRs)"}
      />
    </div>
  );

  const contentForIssueInfo = (
    <div style={{ textAlign: "center" }}>
      <p>
        The card tells how much time it takes to resolve an issue that users'
        open. This performance indicator is calculated on the basis of last 100
        issues that were closed, as follows:
      </p>
      <Equation
        value={"(sum(issue, 1, Issues, (closed date - opened date)) / Issues)"}
      />
    </div>
  );

  return (
    <>
      <div className="analytic-graphs">
        <Row>
          {/* <Col span={12}>
              // This space is reserved for a KPI (goes into the orientation with contribution kpi)
            </h3>
          </Col> */}
          <Col span={12}>
            {communityContributionData && (
              <HorizontalBarGraph
                heading={"Community contributions"}
                communityContributionData={communityContributionData}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {issuesStatData && (
              <LineGraph
                dataGroupedByMonth={issuesStatData}
                label="Issues closed %"
                heading="Issues Trend"
              />
            )}
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                {totalOpenIssueCount || totalCloseIssueCount ? (
                  <DoughnutChart
                    heading="Issue Chart"
                    label1="Open Issues"
                    data1={totalOpenIssueCount}
                    label2="Close Issues"
                    data2={totalCloseIssueCount}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "Issue chart" data available'}
                  />
                )}
              </Col>
              <Col span={12}>
                {totalOpenPRCount || totalMergePRCount ? (
                  <DoughnutChart
                    heading="Pull Request Chart"
                    label1="Open PRs"
                    data1={totalOpenPRCount}
                    label2="Merge PRs"
                    data2={totalMergePRCount}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "Pull request chart" data available'}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {averageDaysIssueClosed ? (
                  <div className="issue-close-average">
                    <Tooltip title={contentForIssueInfo}>
                      <IssuesCloseOutlined />
                    </Tooltip>
                    <h4>Avg. days to close an issue</h4>
                    <h2>{averageDaysIssueClosed}</h2>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      'No "avg. days to close an issue" data available'
                    }
                  />
                )}
              </Col>
              <Col span={12}>
                {averageDaysPRMerged ? (
                  <div className="pr-merge-average">
                    <Tooltip title={contentForPRInfo}>
                      <PullRequestOutlined />
                    </Tooltip>
                    <h4>Avg. days to merge a PR</h4>
                    <h2>{averageDaysPRMerged}</h2>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "avg. days to merge a PR" data available'}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {issuesStatData && (
              <BarGraph
                dataGroupedByMonth={issuesStatData}
                label1="Open Issue"
                label2="Closed Issue"
                heading="Issue Categories"
              />
            )}
          </Col>
          <Col span={12}>
            {prsStatData && (
              <BarGraph
                dataGroupedByMonth={prsStatData}
                label1="Open PR"
                label2="Merged PR"
                heading="Pull Request Categories"
              />
            )}
          </Col>
        </Row>
      </div>

      <div className="analytic-graphs-mobile">
        <Row>
          <Col span={24}>
            {communityContributionData && (
              <HorizontalBarGraph
                heading={"Community contributions"}
                communityContributionData={communityContributionData}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {issuesStatData && (
              <LineGraph
                dataGroupedByMonth={issuesStatData}
                label="Issues closed %"
                heading="Issues Trend"
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={12}>
                {totalOpenIssueCount || totalCloseIssueCount ? (
                  <DoughnutChart
                    heading="Issue Chart"
                    label1="Open Issues"
                    data1={totalOpenIssueCount}
                    label2="Close Issues"
                    data2={totalCloseIssueCount}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "Issue chart" data available'}
                  />
                )}
              </Col>
              <Col span={12}>
                {totalOpenPRCount || totalMergePRCount ? (
                  <DoughnutChart
                    heading="Pull Request Chart"
                    label1="Open PRs"
                    data1={totalOpenPRCount}
                    label2="Merge PRs"
                    data2={totalMergePRCount}
                  />
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "Pull request chart" data available'}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                {averageDaysIssueClosed ? (
                  <div className="issue-close-average">
                    <Tooltip title={contentForIssueInfo}>
                      <IssuesCloseOutlined />
                    </Tooltip>
                    <h4>Avg. days to close an issue</h4>
                    <h2>{averageDaysIssueClosed}</h2>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      'No "avg. days to close an issue" data available'
                    }
                  />
                )}
              </Col>
              <Col span={12}>
                {averageDaysPRMerged ? (
                  <div className="pr-merge-average">
                    <Tooltip title={contentForPRInfo}>
                      <PullRequestOutlined />
                    </Tooltip>
                    <h4>Avg. days to merge a PR</h4>
                    <h2>{averageDaysPRMerged}</h2>
                  </div>
                ) : (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No "avg. days to merge a PR" data available'}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {issuesStatData && (
              <BarGraph
                dataGroupedByMonth={issuesStatData}
                label1="Open Issue"
                label2="Closed Issue"
                heading="Issue Categories"
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {prsStatData && (
              <BarGraph
                dataGroupedByMonth={prsStatData}
                label1="Open PR"
                label2="Merged PR"
                heading="Pull Request Categories"
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AnalyticGraphs;
