import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PageFooter from "./components/Navbar/PageFooter";
import Collections from "./components/Collections/Collections";
import Developers from "./components/Developers/Developers";
import Analytics from "./components/Analytics/Analytics";
import Error404 from "./components/ErrorPage/Error404";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="main-layout">
        <Header>
          <Navbar />
        </Header>
        <Content>
          <Switch>
            <Route exact path={["/", "/collections"]}>
              <Collections />
            </Route>
            <Route exact path="/developers">
              <Developers />
            </Route>
            <Route exact path="/analytics">
              <Analytics />
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </Content>
        <Footer>
          <PageFooter />
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
