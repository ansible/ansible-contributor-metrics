import { Layout } from "antd";
import { useLocation } from "react-router-dom";
import { CollectionSider } from "./CollectionsSider";
import RepositoryList from "../Analytics/RepositoryList";
import DeveloperList from "../Developers/DevelopersList";

const { Sider } = Layout;

export const RootSider = () => {
  const location = useLocation();
  return (
    <Sider>
      {/*<CollectionSider />*/}
      {location.pathname === "/analytics" ? (
        <RepositoryList />
      ) : location.pathname === "/developers" ? (
        <DeveloperList />
      ) : null}
    </Sider>
  );
};
