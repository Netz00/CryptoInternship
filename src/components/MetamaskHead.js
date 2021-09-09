import { useEffect } from "react";

const ModelViewer = require("@metamask/logo");

// To render with fixed dimensions:
const viewer = ModelViewer({
  // Dictates whether width & height are px or multiplied
  pxNotRatio: true,
  width: 200,
  height: 160,
  // pxNotRatio: false,
  // width: 0.9,
  // height: 0.9,

  // To make the face follow the mouse.
  followMouse: false,

  // head should slowly drift (overrides lookAt)
  slowDrift: false,
});

const MetamaskHead = () => {
  useEffect(() => {
    // look at something on the page
    viewer.lookAt({
      x: 100,
      y: 100,
    });

    // enable mouse follow
    viewer.setFollowMouse(true);

    // deallocate nicely
    viewer.stopAnimation();
    console.log(viewer.container);

    // add viewer to DOM
    const container = document.getElementById("logoplace");
    container.appendChild(viewer.container);
  });

  return <div id="logoplace"></div>;
};

export default MetamaskHead;
