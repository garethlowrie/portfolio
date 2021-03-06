import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import withState from "recompose/withState";
import lifecycle from "recompose/lifecycle";
import withHandlers from "recompose/withHandlers";
import withContext from "recompose/withContext";
import Flex from "components/Flex/Flex";
import classNames from "classnames";

import Job from "components/Job/Job";
import {
  MAP,
  HeaderSection,
  ProfessionalProfileSection,
  SkillsSection,
  EmploymentSection
} from "content/index";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer/Footer";
import me from "images/face.jpg";
import styles from "./Home.module.less";

const Home = ({ windowWidth }) => {
  const mobileBreakpoint = 860;
  const Component = MAP["PRO"];
  return (
    <Flex className="wrapper">
      <Helmet
        title="Gareth Lowrie | Software Developer"
        meta={[
          {
            name: "description",
            content:
              "Hey. I'm Gareth, an enthusiastic UX developer. I turn beautiful designs into stateful applications using HTML, CSS, JavaScript, ES6+, React and more. I'm a high flying guy with academic excellence and a real passion for the latest technologies."
          },
          {
            name: "keywords",
            content:
              "gareth, lowrie web developer, react, javascript, newcastle, north east, UX, UI, developer"
          }
        ]}
      />
      {windowWidth > mobileBreakpoint && (
        <Sidebar basis="30%" grow={0} shrink={0} className={styles.sidebar} />
      )}

      <Flex.Item
        basis="70%"
        grow={1}
        shrink={0}
        className={styles.bodyContainer}
      >
        <Flex direction="column" alignItems="center">
          {Object.values(MAP).map((Component, index) => (
            <Component key={index} />
          ))}
          <Footer />
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

export default compose(
  withState("windowWidth", "setWindowWidth", 0),
  withHandlers({
    updateWidth: ({ setWindowWidth }) => () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.updateWidth(window.innerWidth);
      window.addEventListener("resize", this.props.updateWidth);
    },
    componentWillMount() {
      this.props.updateWidth();
    },
    componentWillUnmount() {
      window.removeEventListener("resize", this.props.updateWidth);
    }
  }),
  withContext(
    {
      windowWidth: PropTypes.number
    },
    ({ windowWidth }) => ({
      windowWidth: windowWidth
    })
  )
)(Home);
