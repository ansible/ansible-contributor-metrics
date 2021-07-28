import { GithubOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import logo from "../../assets/image.png";

const PageFooter = () => {
  return (
    <div>
      <div className="logo">
        <img src={logo} width="50" height="50" alt="Logo"></img>
        <p> Content Collection Metrics</p>
      </div>

      <div className="social">
        <a href="https://github.com/priyamsahoo/ansible-github-metrics">
          <GithubOutlined />
        </a>
      </div>
      <div className="copyright">Copyright &copy; 2021 </div>
      <BackTop></BackTop>
    </div>
  );
};

export default PageFooter;
