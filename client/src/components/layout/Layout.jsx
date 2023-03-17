import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Layout = ({ children, description, author, keywords, title }) => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>

      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "E-Com App:Shop now",
  description: "Mern Stack Project",
  keywords:
    "MERN,ReactJS,JS,HTML%,CSS3,MONGODB,Node,Express,Full-Stack,E-commerce website",
  author: "SolarFlare",
};

export default Layout;
