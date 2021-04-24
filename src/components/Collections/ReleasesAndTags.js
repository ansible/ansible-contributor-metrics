import { useQuery } from "@apollo/client";
import { RELEASES_AND_TAGS } from "../../queries/collections_queries";
import moment from "moment";
// import { Card } from "reactstrap";
import { Card, Empty, Skeleton } from "antd";
import { LoadingOutlined, TagsOutlined } from "@ant-design/icons";

const ReleasesAndTags = ({ owner, repository }) => {
  // Query for obtaining release-tags info
  const { loading, error, data } = useQuery(RELEASES_AND_TAGS, {
    variables: { repositoryName: repository, ownerName: owner },
  });

  // console.log("RELEASE DATA", data);

  return (
    <Card className="releases-and-tags">
      <h2>Release Tags</h2>
      {error && <p>{error}</p>}
      {loading && <Skeleton />}
      {data && !loading && (
        <div className="information">
          <div className="tags-info">
            <h3>
              Total <TagsOutlined />: {data.tags.refs.totalCount}
            </h3>
            <h3>Latest Tag Information: </h3>
            {data.tags.refs.edges && data.tags.refs.totalCount ? (
              <div>
                <p>Name: {data.tags.refs.edges[0].node.target.name}</p>
                <p>
                  Tag message: {data.tags.refs.edges[0].node.target.message}
                </p>
                <p>
                  Published on:{" "}
                  {data.tags.refs.edges[0].node.target.tagger &&
                    moment(
                      new Date(data.tags.refs.edges[0].node.target.tagger.date)
                    ).format("ll")}
                </p>
                <p>
                  Author:{" "}
                  {data.tags.refs.edges[0].node.target.tagger &&
                    data.tags.refs.edges[0].node.target.tagger.name}
                </p>
              </div>
            ) : (
              <Empty description={"No latest release info available"} />
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ReleasesAndTags;
