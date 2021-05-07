import logo from "../../assets/image.png";
import { Anchor, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Link } = Anchor;

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="navbar">
      <div className="header">
        <div className="logo">
          <img src={logo}></img>
          <h2 style={{ fontWeight: "bold" }}> Content Collection Metrics</h2>
        </div>
        <div className="mobile-hidden">
          <Anchor targetOffset="50">
            <Link href="/collections" title="Collections" />
            <Link href="/developers" title="Developers" />
            <Link href="/analytics" title="Analytics" />
          </Anchor>
        </div>
        <div className="mobile-visible">
          <Button
            size="small"
            icon={<MenuOutlined />}
            size="small"
            onClick={showDrawer}
          ></Button>
          <Drawer
            placement="right"
            title="Navigate"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="50">
              <Link href="/collections" title="Collections" />
              <Link href="/developers" title="Developers" />
              <Link href="/analytics" title="Analytics" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
