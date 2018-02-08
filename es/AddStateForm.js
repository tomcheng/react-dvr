var _templateObject = _taggedTemplateLiteralLoose(["\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.9);\n  border: 1px solid #000;\n  padding: 0 5px;\n  line-height: 24px;\n  border-radius: 3px;\n  margin-bottom: 5px;\n"], ["\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.9);\n  border: 1px solid #000;\n  padding: 0 5px;\n  line-height: 24px;\n  border-radius: 3px;\n  margin-bottom: 5px;\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: flex-end;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  order: 2;\n  margin-left: 5px;\n"], ["\n  order: 2;\n  margin-left: 5px;\n"]),
    _templateObject4 = _taggedTemplateLiteralLoose(["\n  order: 1;\n"], ["\n  order: 1;\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

var StyledInput = styled.input(_templateObject);

var Actions = styled.div(_templateObject2);

var SaveButton = styled.button(_templateObject3);

var CancelButton = styled.button(_templateObject4);

var AddStateForm = function (_React$Component) {
  _inherits(AddStateForm, _React$Component);

  function AddStateForm(props) {
    _classCallCheck(this, AddStateForm);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleChange = function (event) {
      var _this$setState;

      _this.setState((_this$setState = {}, _this$setState[event.target.name] = event.target.value, _this$setState));
    };

    _this.handleSubmit = function (event) {
      event.preventDefault();

      var onSubmit = _this.props.onSubmit;

      var name = _this.state.name.trim();

      if (name === "") {
        _this.setState({ error: "Name is required" });
        return;
      }

      onSubmit({
        name: name,
        onError: function onError(_ref) {
          var message = _ref.message;

          _this.setState({ error: message });
        }
      });
    };

    _this.state = { name: props.initialName || "", error: null };
    return _this;
  }

  AddStateForm.prototype.render = function render() {
    var onCancel = this.props.onCancel;
    var _state = this.state,
        name = _state.name,
        error = _state.error;


    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit },
      React.createElement(StyledInput, {
        type: "text",
        name: "name",
        placeholder: "Name this State",
        value: name,
        onChange: this.handleChange,
        autoFocus: true
      }),
      error && React.createElement(
        "div",
        null,
        error
      ),
      React.createElement(
        Actions,
        null,
        React.createElement(
          SaveButton,
          null,
          "Save State"
        ),
        React.createElement(
          CancelButton,
          { onClick: onCancel },
          "Cancel"
        )
      )
    );
  };

  return AddStateForm;
}(React.Component);

AddStateForm.propTypes = process.env.NODE_ENV !== "production" ? {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialName: PropTypes.string
} : {};


export default AddStateForm;