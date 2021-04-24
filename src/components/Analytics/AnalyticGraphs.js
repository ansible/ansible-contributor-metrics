import { Row, Col, Empty, Tooltip } from "antd";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import PieChart from "./PieChart";
import { InfoCircleFilled, FundOutlined } from "@ant-design/icons";
const AnalyticGraphs = ({
  totalOpenIssueCount,
  totalCloseIssueCount,
  totalOpenPRCount,
  totalMergePRCount,
  averageDaysIssueClosed,
  averageDaysPRMerged,
  issuesStatData,
  prsStatData,
}) => {
  console.log("FROMANALYTICS", issuesStatData);
  console.log("FROMANALYTICS", prsStatData);

  const message = "Average stats component message";

  return (
    <>
      <div className="analytic-graphs">
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
                  <PieChart
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
                  <PieChart
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
                    <Tooltip title={message} placement={"rightTop"}>
                      <FundOutlined />
                    </Tooltip>
                    <h3>Avg. days to close an issue</h3>
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
                    <Tooltip title={message} placement={"rightTop"}>
                      <FundOutlined />
                    </Tooltip>
                    <h3>Avg. days to merge a PR</h3>
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
                  <PieChart
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
                  <PieChart
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
                    <h3>Avg. days to close an issue</h3>
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
                    <h3>Avg. days to merge a PR</h3>
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
