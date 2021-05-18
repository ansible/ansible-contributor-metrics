import { InMemoryCache, useQuery } from "@apollo/client";
import { Button, Card, Divider, Skeleton, Space, Tag, Typography } from "antd";
import { useCallback } from "react";
import { ISSUES } from "../../queries/collections_queries";
import DataTable from "./DataTable";
import { ISSUE_COLUMNS } from "./IssueColumns";
import moment from "moment";
import { useEffect } from "react";
import { relayStylePagination } from "@apollo/client/utilities";
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
import { Tooltip } from "antd";
import { DesktopDownloadIcon } from "@primer/octicons-react";

const ACIssues = ({ owner, repository }) => {
  // Query for obtaining issues
  const { loading, error, data, fetchMore } = useQuery(ISSUES, {
    variables: { repositoryName: repository, ownerName: owner, cursor: null },
    fetchPolicy: "network-only",
  });
  console.log("Received data", data);

  const handleClick = () => {
    const { hasNextPage, endCursor } = data.repository.issues.pageInfo;
    // console.log(endCursor);

    if (hasNextPage) {
      fetchMore({
        variables: { cursor: endCursor },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          fetchMoreResult.repository.issues.edges = [
            ...data.repository.issues.edges,
            ...fetchMoreResult.repository.issues.edges,
          ];

          return fetchMoreResult;
        },
      });
    }
  };

  const { Link } = Typography;

  return (
    <div className="ac-issues">
      {error && <div>{error}</div>}
      {loading && (
        <div>
          <Skeleton />
        </div>
      )}
      {console.log("ISSUE Data Rendered", data)}
      {data && !loading && (
        <>
          <h2>Issues Table</h2>

          <div
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
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
                  style={{
                    fontSize: 42,
                    flexGrow: 1,
                    color: "#3d5861",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  From{" "}
                  <b>
                    {moment(
                      new Date(
                        data.repository.issues.edges[
                          data.repository.issues.edges.length - 1
                        ].node.createdAt
                      )
                    ).format("ll")}{" "}
                  </b>
                  to{" "}
                  <b>
                    {moment(
                      new Date(data.repository.issues.edges[0].node.createdAt)
                    ).format("ll")}
                  </b>
                </div>
              </div>
            </Card>

            {data.repository.issues.totalCount ===
            data.repository.issues.edges.length ? (
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
                    {data.repository.issues.totalCount} issues
                  </div>
                </div>
              </Card>
            ) : null}

            {data.repository.issues.pageInfo.hasNextPage ? (
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
                    // disabled={!data.repository.issues.pageInfo.hasNextPage}
                    onClick={handleClick}
                  >
                    <DesktopDownloadIcon />
                  </Button>
                  <div style={{ flexGrow: 1 }}>Fetch More Data</div>
                </div>
                {/* </Tooltip> */}
              </Card>
            ) : null}
          </div>

          <DataTable
            tag="Issues"
            repositoryName={data.repository.nameWithOwner}
            tableData={data.repository.issues.edges}
            totalCount={data.repository.issues.totalCount}
            tableColumns={ISSUE_COLUMNS}
          />
        </>
      )}
    </div>
  );
};
export default ACIssues;
