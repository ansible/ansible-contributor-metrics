import { Divider, PageHeader } from "antd";
import OverallInfo from "./OverallInfo";
import SpiltUpInfo from "./SplitUpInfo";

const DeveloperDetails = ({ selectedDeveloper }) => {
  // console.log(data);

  return (
    <div className="developer-details">
      <PageHeader
        className="page-header"
        title="Developer"
        subTitle={selectedDeveloper}
      />

      <OverallInfo selectedDeveloper={selectedDeveloper} />
      <Divider plain style={{ backgroundColor: "#6f909d" }} />
      <SpiltUpInfo selectedDeveloper={selectedDeveloper} />
    </div>
  );
};

export default DeveloperDetails;
