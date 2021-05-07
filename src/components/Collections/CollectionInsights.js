import { useQuery } from "@apollo/client";
import { COLLECTION_INSIGHTS } from "../../queries/collections_queries";
import { Row, Col, Statistic, Card, Divider, Tooltip, Skeleton } from "antd";
import { ArrowUpOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  IssueOpenedIcon,
  IssueClosedIcon,
  GitPullRequestIcon,
  GitMergeIcon,
} from "@primer/octicons-react";

const CollectionInsights = ({ owner, repository }) => {
  // Query for obtaining collection insight info
  const { loading, error, data } = useQuery(COLLECTION_INSIGHTS, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  // console.log(data);

  const displayDetails = () => {
    return (
      <div className="information">
        <Divider orientation="center" plain>
          Issues
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title={
                <Tooltip title="Open Issues">
                  <span style={{ color: "#3c6d0e" }}>
                    <IssueOpenedIcon />
                  </span>
                </Tooltip>
              }
              value={data.repository.openIssues.totalCount}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title={
                <Tooltip title="Closed Issues">
                  <span style={{ color: "#bf0000" }}>
                    <IssueClosedIcon />
                  </span>
                </Tooltip>
              }
              value={data.repository.closedIssues.totalCount}
            />
          </Col>
        </Row>

        <Divider orientation="center" plain>
          Pull Requests
        </Divider>

        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title={
                <Tooltip title="Open PRs">
                  <span style={{ color: "#3c6d0e" }}>
                    <GitPullRequestIcon />
                  </span>
                </Tooltip>
              }
              value={data.repository.openPRs.totalCount}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={
                <Tooltip title="Closed PRs">
                  <span style={{ color: "#bf0000" }}>
                    <GitPullRequestIcon />
                  </span>
                </Tooltip>
              }
              value={data.repository.closedPRs.totalCount}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={
                <Tooltip title="Merged PRs">
                  <span style={{ color: "	#6b4f78" }}>
                    <GitMergeIcon />
                  </span>
                </Tooltip>
              }
              value={data.repository.mergedPRs.totalCount}
            />
          </Col>
        </Row>

        <Divider orientation="center" plain>
          Percentage
        </Divider>

        <div className="site-statistic-demo-card">
          <Row gutter={6}>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Closed Issues"
                  value={
                    (data.repository.closedIssues.totalCount /
                      (data.repository.openIssues.totalCount +
                        data.repository.closedIssues.totalCount)) *
                      100 || 0
                  }
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title="Merged PRs"
                  value={
                    (data.repository.mergedPRs.totalCount /
                      (data.repository.openPRs.totalCount +
                        data.repository.mergedPRs.totalCount)) *
                    100
                  }
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  return (
    <Card className="collection-insights">
      <h2>Collection Insights</h2>
      {error && <div>{error}</div>}
      {loading && <Skeleton />}
      {data && !loading && displayDetails()}
    </Card>
  );
};

export default CollectionInsights;
