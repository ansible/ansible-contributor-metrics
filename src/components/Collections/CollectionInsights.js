import { useQuery } from "@apollo/client";
import { COLLECTION_INSIGHTS } from "../../queries/collections_queries";
import { Row, Col, Statistic, Card, Divider } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

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
              title="Open"
              value={data.repository.openIssues.totalCount}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Closed"
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
              title="Open"
              value={data.repository.openPRs.totalCount}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Closed"
              value={data.repository.closedPRs.totalCount}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Merged"
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
      {loading && <div>Loading...</div>}
      {data && displayDetails()}
    </Card>
  );
};

export default CollectionInsights;
