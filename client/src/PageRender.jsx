import React from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "./components/index";

const genratePage = (pageName) => {
  // Capitalize the first letter
  const newPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  const component = () =>
    require(`./pages/${newPageName}`).default;

  try {
    // Return the component with the page name
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  let pageName = "";

  if (id) {
    pageName = `${page}/[id]`;
  } else {
    pageName = `${page}`;
  }

  return genratePage(pageName);
};

export default PageRender;
