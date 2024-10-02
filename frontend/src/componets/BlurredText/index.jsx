import styled from "@emotion/styled";
import PropTypes from "prop-types";

const BlurredDiv = styled.div`
  filter: blur(3px);
`;

const BlurredText = ({ children }) => {
  if (children.includes("˟")) {
    return <BlurredDiv>{children}</BlurredDiv>;
  }

  return children;
};

BlurredText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlurredText;
