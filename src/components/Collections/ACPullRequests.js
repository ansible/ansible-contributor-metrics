import { useQuery } from "@apollo/client";
import moment from "moment";
import { Button, Tag, Typography, Card, Skeleton } from "antd";
import { useCallback } from "react";
import { PR } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { PR_COLUMNS } from "./PRColumns";
import {
  CalendarFilled,
  CalendarOutlined,
  CarryOutFilled,
  CheckCircleFilled,
  CloudDownloadOutlined,
  CloudServerOutlined,
  DownloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { DesktopDownloadIcon } from "@primer/octicons-react";

const ACPullRequests = ({ owner, repository }) => {
  // Query for obtaining pull requests
  const { loading, error, data, fetchMore } = useQuery(PR, {
    variables: { repositoryName: repository, ownerName: owner, cursor: null },
    fetchPolicy: "network-only",
  });
  // console.log(data);

  const handleClick = () => {
    const { hasNextPage, endCursor } = data.repository.pullRequests.pageInfo;
    // console.log(endCursor);

    if (hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          fetchMoreResult.repository.pullRequests.edges = [
            ...data.repository.pullRequests.edges,
            ...fetchMoreResult.repository.pullRequests.edges,
          ];

          return fetchMoreResult;
        },
      });
    }
  };

  const { Link } = Typography;

  return (
    <div className="ac-pull-requests">
      {error && <div>{error}</div>}
      {loading && (
        <div>
          <Skeleton />
        </div>
      )}
      {console.log("PR Data Rendered", data)}
      {data && !loading && (
        <>
          <h2>Pull Requests Table</h2>

          <div
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data.repository.pullRequests.totalCount ===
            data.repository.pullRequests.edges.length ? (
              <Card
                hoverable
                style={{
                  width: 200,
                  height: 70,
                  // flexGrow: 4,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <CheckCircleFilled
                    style={{ fontSize: 42, flexGrow: 1, color: "#3d5861" }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    Fetched all data:
                    <br />
                    {data.repository.pullRequests.totalCount} pullRequests
                  </div>
                </div>
              </Card>
            ) : null}

            <Card
              hoverable
              style={{
                width: 200,
                height: 70,
                // flexGrow: 4,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <CalendarFilled
                  style={{ fontSize: 42, flexGrow: 1, color: "#3d5861" }}
                />
                <div style={{ flexGrow: 1 }}>
                  From{" "}
                  <b>
                    {moment(
                      new Date(
                        data.repository.pullRequests.edges[
                          data.repository.pullRequests.edges.length - 1
                        ].node.createdAt
                      )
                    ).format("ll")}{" "}
                  </b>
                  to{" "}
                  <b>
                    {moment(
                      new Date(
                        data.repository.pullRequests.edges[0].node.createdAt
                      )
                    ).format("ll")}
                  </b>
                </div>
              </div>
            </Card>

            <Card
              className="fetch-more-card"
              style={{
                width: 200,
                height: 70,
                // flexGrow: 4,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                {/* <Tooltip title="Fetch more data" placement="bottom"> */}
                <Button
                  style={{ width: 44, height: 44 }}
                  shape="circle"
                  disabled={!data.repository.pullRequests.pageInfo.hasNextPage}
                  onClick={handleClick}
                >
                  <DesktopDownloadIcon />
                </Button>
                <div style={{ flexGrow: 1 }}>Fetch More Data</div>
              </div>
              {/* </Tooltip> */}
            </Card>
          </div>
          <DataTable
            title="Pull Requests Table"
            tag="Pull requests"
            repositoryName={data.repository.nameWithOwner}
            tableData={data.repository.pullRequests.edges}
            totalCount={data.repository.pullRequests.totalCount}
            tableColumns={PR_COLUMNS}
          />
        </>
      )}
    </div>
  );
};
export default ACPullRequests;
