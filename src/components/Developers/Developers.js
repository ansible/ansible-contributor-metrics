import {
  CaretLeftOutlined,
  CloseOutlined,
  ImportOutlined,
  LeftCircleOutlined,
  UnorderedListOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { Button, Card, Drawer } from "antd";
import { useState } from "react";
import { USERS } from "../../data/users";
import DeveloperDetails from "./DeveloperDetails";
import DeveloperList from "./DevelopersList";

const Developers = () => {
  // Default user is the first user in the USERS list
  const [selectedDeveloper, setSelectedDeveloper] = useState(
    localStorage.getItem("user") || USERS[0]
  );
  const developerCallback = (selectedDeveloper) => {
    setSelectedDeveloper(selectedDeveloper);
  };

  localStorage.setItem("user", selectedDeveloper);

  // console.log(selectedDeveloper);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="developers">
      <div className="developers-content">
        {/* <div className="mobile-hidden"> */}
        <Card className="dev-list">
          <DeveloperList developerCallback={developerCallback} />
        </Card>
        {/* </div> */}
        <div className="mobile-visible">
          <Button
            icon={<UnorderedListOutlined />}
            size="small"
            onClick={showDrawer}
          ></Button>
          <Drawer
            placement="left"
            closable={true}
            onClose={onClose}
            visible={visible}
            getContainer={false}
            drawerStyle={{ backgroundColor: "#3d5861" }}
          >
            <div className="dev-list-mobile">
              <DeveloperList
                developerCallback={developerCallback}
                drawerClose={onClose}
              />
            </div>
          </Drawer>
        </div>
        <div className="dev-details">
          {!selectedDeveloper && (
            <p> &lt;-- Click on a developer for more details</p>
          )}
          {selectedDeveloper && (
            <DeveloperDetails selectedDeveloper={selectedDeveloper} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;
