import { Layout } from "antd";
import Navbar from "../components/Navbar";
import type { CSSProperties } from "react";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const headerStyle: CSSProperties = {
    padding: "0 1rem",
    margin: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    height: "64px",
  };

  const contentStyle: CSSProperties = {
    position: "relative",
    padding: "1rem",
    minHeight: "calc(100% - 64px - 48px)",
  };

  const layoutStyle: CSSProperties = {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  };

  const titleStyle: CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  };

  const footerStyle: CSSProperties = {
    textAlign: "center",
    backgroundColor: "#001529",
    color: "#fff",
    padding: "1rem 0",
    height:"48px"
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <h1 className="logo" style={titleStyle}>E-Commerce App</h1>
        <Navbar />
      </Header>
      <Content style={contentStyle}>{children}</Content>
      <Footer style={footerStyle}>
        © {new Date().getFullYear()} Fake E-Commerce. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default MainLayout;
