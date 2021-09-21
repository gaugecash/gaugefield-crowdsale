import React, { useState } from "react";
import PropTypes from "prop-types";
import { chakra, Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { throttle } from "lodash";

const GradientButton = styled(chakra.button)`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  appearance: none;
  background: #3d2c49;
  border: "none";
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  outline: unset;
  overflow: hidden;
  border-radius: 100px;
  span {
    position: relative;
    pointer-events: none;
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize}px;
  }
  &::before {
    --size: 0;
    content: "";
    position: absolute;
    left: ${(props) => props.x}px;
    top: ${(props) => props.y}px;
    width: var(--size);
    height: var(--size);
    background: radial-gradient(circle closest-side, #e666f6 14%, transparent);
    transform: translate(-50%, -50%);
  }
  &:hover::before {
    --size: ${(props) => (props.loading ? "0" : "300")}px;
  }
`;

const Component = ({
  fontSize,
  fontWeight,
  height,
  isLoading,
  label,
  onClick,
  width,
  type,
}) => {
  const [coordinates, setCoordinates] = useState({ x: null, y: null });

  const updateFromMouse = throttle((e) => {
    if (!isLoading) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      setCoordinates({ x, y });
    }
  }, 150);

  const { x, y } = coordinates;

  return (
    <GradientButton
      fontSize={fontSize}
      fontWeight={fontWeight}
      height={height}
      onClick={onClick}
      type={type}
      onMouseMove={updateFromMouse}
      width={width}
      x={x}
      y={y}
      // prevents not a valid html prop warning
      // ref: https://stackoverflow.com/questions/49784294/warning-received-false-for-a-non-boolean-attribute-how-do-i-pass-a-boolean-f
      loading={isLoading ? 1 : 0}
    >
      {!isLoading && <chakra.span>{label}</chakra.span>}
      {isLoading && <Spinner mt={2} label="" />}
    </GradientButton>
  );
};

Component.propTypes = {
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  height: PropTypes.number,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  type: PropTypes.string,
};
Component.defaultProps = {
  height: 56,
  width: 200,
  fontSize: 18,
  fontWeight: "bold",
  type: "button",
};
Component.displayName = "ActionButton";
export default Component;
