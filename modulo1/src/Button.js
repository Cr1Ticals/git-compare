import React from "react";
import PropTypes from "prop-types";

const Button = (props) => (
  <button href="" onClick={props.onClick}>
    {props.children}
  </button>
);

Button.defaultProps = {
    children: "Salvar",
  };

Button.propTypes = {
    onLick: PropTypes.func.isRequired,
    children: PropTypes.string,
  };

export default Button;