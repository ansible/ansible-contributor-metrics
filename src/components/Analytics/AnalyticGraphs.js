import { Row, Col, Empty } from "antd";
import LineGraph from "./LineGraph";
import BarGraph from "./BarGraph";
import DoughnutGraph from "./DoughnutGraph";
const AnalyticGraphs = ({
  mergedIssueData,
  mergedPRData,
  totalOpenIssueCount,
  totalCloseIssueCount,
  totalOpenPRCount,
  totalMergePRCount,
  averageDaysIssueClosed,
  averageDaysPRMerged,
}) => {
  return (
    <>
      <div className="analytic-graphs">
        <Row>
          <Col span={12}>
            {mergedIssueData && (
              <LineGraph
                dataGroupedByMonth={mergedIssueData}
                label="Issues closed %"
                heading="Issues Trend"
              />
            )}
          </Col>
          <Col span={12}>
            <Row>
              <Col span={12}>
                {totalOpenIssueCount || totalCloseIssueCount ? (
                  <DoughnutGraph
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
                  <DoughnutGraph
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
          <Col span={12}>
            {mergedIssueData && (
              <BarGraph
                dataGroupedByMonth={mergedIssueData}
                label1="Open Issue"
                label2="Closed Issue"
                heading="Issue Categories"
              />
            )}
          </Col>
          <Col span={12}>
            {mergedPRData && (
              <BarGraph
                dataGroupedByMonth={mergedPRData}
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
            {mergedIssueData && (
              <LineGraph
                dataGroupedByMonth={mergedIssueData}
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
                  <DoughnutGraph
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
                  <DoughnutGraph
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
            {mergedIssueData && (
              <BarGraph
                dataGroupedByMonth={mergedIssueData}
                label1="Open Issue"
                label2="Closed Issue"
                heading="Issue Categories"
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {mergedPRData && (
              <BarGraph
                dataGroupedByMonth={mergedPRData}
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
