var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(["\n  position: fixed;\n  bottom: 15px;\n  left: 15px;\n  z-index: 999999;\n  padding: 12px 15px 15px;\n  min-width: 240px;\n  border-radius: 4px;\n  border: 2px solid #000;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n  -webkit-font-smoothing: antialiased;\n"], ["\n  position: fixed;\n  bottom: 15px;\n  left: 15px;\n  z-index: 999999;\n  padding: 12px 15px 15px;\n  min-width: 240px;\n  border-radius: 4px;\n  border: 2px solid #000;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n  -webkit-font-smoothing: antialiased;\n"]),
    _templateObject2 = _taggedTemplateLiteralLoose(["\n  font-weight: bold;\n  font-size: 16px;\n  margin-bottom: 5px;\n"], ["\n  font-weight: bold;\n  font-size: 16px;\n  margin-bottom: 5px;\n"]),
    _templateObject3 = _taggedTemplateLiteralLoose(["\n  margin: 0 -5px 10px;\n"], ["\n  margin: 0 -5px 10px;\n"]),
    _templateObject4 = _taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 0 5px;\n  justify-content: space-between;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"], ["\n  display: flex;\n  padding: 0 5px;\n  justify-content: space-between;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"]),
    _templateObject5 = _taggedTemplateLiteralLoose(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"]),
    _templateObject6 = _taggedTemplateLiteralLoose(["\n  display: flex;\n"], ["\n  display: flex;\n"]),
    _templateObject7 = _taggedTemplateLiteralLoose(["\n  opacity: 0;\n  cursor: pointer;\n\n  & + & {\n    margin-left: 5px;\n  }\n\n  .rdvr-state-row:hover & {\n    opacity: 0.5;\n    &:hover {\n      opacity: 1;\n    }\n  }\n"], ["\n  opacity: 0;\n  cursor: pointer;\n\n  & + & {\n    margin-left: 5px;\n  }\n\n  .rdvr-state-row:hover & {\n    opacity: 0.5;\n    &:hover {\n      opacity: 1;\n    }\n  }\n"]),
    _templateObject8 = _taggedTemplateLiteralLoose(["\n  padding-left: 8px;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"], ["\n  padding-left: 8px;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"]),
    _templateObject9 = _taggedTemplateLiteralLoose(["\n  padding-left: 20px;\n"], ["\n  padding-left: 20px;\n"]),
    _templateObject10 = _taggedTemplateLiteralLoose(["\n  display: block;\n  text-align: center;\n  border: 1px dashed #fff;\n  border-radius: 4px;\n  cursor: ", ";\n  opacity: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"], ["\n  display: block;\n  text-align: center;\n  border: 1px dashed #fff;\n  border-radius: 4px;\n  cursor: ", ";\n  opacity: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"]);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "@fortawesome/react-fontawesome";
import faTrashAlt from "@fortawesome/fontawesome-free-regular/faTrashAlt";
import faEdit from "@fortawesome/fontawesome-free-regular/faEdit";
import faPlusSquare from "@fortawesome/fontawesome-free-regular/faPlusSquare";
import faMinusSquare from "@fortawesome/fontawesome-free-regular/faMinusSquare";
import AddStateForm from "./AddStateForm";

var groupStatesByFolder = function groupStatesByFolder(states) {
  return states.filter(function (state) {
    return state.name.indexOf("/") > -1;
  }).reduce(function (folders, state) {
    var folderName = state.name.split("/")[0];
    var displayName = state.name.split("/")[1];
    var existingFolder = folders.find(function (folder) {
      return folder.name === folderName;
    });

    if (existingFolder) {
      existingFolder.states.push(_extends({}, state, { displayName: displayName }));
    } else {
      folders.push({
        name: folderName,
        states: [_extends({}, state, { displayName: displayName })]
      });
    }

    return folders;
  }, []);
};

var getStatesOutsideFolders = function getStatesOutsideFolders(states) {
  return states.filter(function (state) {
    return state.name.indexOf("/") === -1;
  });
};

var Container = styled.div(_templateObject);

var Title = styled.div(_templateObject2);

var StatesContainer = styled.div(_templateObject3);

var StateRow = styled.div(_templateObject4);

var StateLabel = styled.label(_templateObject5);

var Actions = styled.div(_templateObject6);

var Action = styled.div(_templateObject7);

var FolderName = styled.div(_templateObject8);

var FolderStates = styled.div(_templateObject9);

var GhostedButton = styled.div(_templateObject10, function (props) {
  return props.disabled ? "default" : "pointer";
}, function (props) {
  return props.disabled ? 0.2 : 0.6;
}, function (props) {
  return props.disabled ? 0.2 : 1;
});

var ReactDvrUi = function (_React$Component) {
  _inherits(ReactDvrUi, _React$Component);

  function ReactDvrUi() {
    var _temp, _this, _ret;

    _classCallCheck(this, ReactDvrUi);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { isAdding: false, editingState: null }, _this.handleClickAdd = function () {
      _this.setState({ isAdding: true });
    }, _this.handleClickCancelAdd = function () {
      _this.setState({ isAdding: false });
    }, _this.handleAddState = function (_ref) {
      var name = _ref.name,
          onError = _ref.onError;
      var _this$props = _this.props,
          states = _this$props.states,
          onAddState = _this$props.onAddState;


      if (states.some(function (s) {
        return s.name === name;
      })) {
        onError({ message: "Name is already used" });
        return;
      }

      onAddState(name);
      _this.setState({ isAdding: false });
    }, _this.handleClickEdit = function (name) {
      _this.setState({ editingState: name });
    }, _this.handleCancelEdit = function () {
      _this.setState({ editingState: null });
    }, _this.handleEditName = function (_ref2) {
      var name = _ref2.name,
          previousName = _ref2.previousName,
          onError = _ref2.onError;
      var _this$props2 = _this.props,
          states = _this$props2.states,
          onEditStateName = _this$props2.onEditStateName;


      if (states.some(function (s) {
        return s.name === name;
      })) {
        onError({ message: "Name is already used" });
        return;
      }

      onEditStateName({ name: name, previousName: previousName });
      _this.setState({ editingState: null });
    }, _this.setActive = function (name) {
      _this.props.onSetActiveState(name);
      _this.setState({ isAdding: false });
    }, _this.renderState = function (_ref3) {
      var name = _ref3.name,
          displayName = _ref3.displayName;
      var _this$props3 = _this.props,
          onRemoveState = _this$props3.onRemoveState,
          activeState = _this$props3.activeState;
      var editingState = _this.state.editingState;


      if (editingState === name) {
        return React.createElement(AddStateForm, {
          key: name,
          initialName: name,
          onCancel: _this.handleCancelEdit,
          onSubmit: function onSubmit(arg) {
            _this.handleEditName(_extends({}, arg, { previousName: name }));
          }
        });
      }

      return React.createElement(
        StateRow,
        { key: name, className: "rdvr-state-row" },
        React.createElement(
          StateLabel,
          null,
          React.createElement("input", {
            type: "radio",
            checked: activeState === name,
            onChange: function onChange() {
              _this.setActive(name);
            }
          }),
          " ",
          displayName || name,
          " "
        ),
        React.createElement(
          Actions,
          null,
          React.createElement(
            Action,
            {
              onClick: function onClick() {
                _this.handleClickEdit(name);
              }
            },
            React.createElement(Icon, { icon: faEdit })
          ),
          React.createElement(
            Action,
            {
              onClick: function onClick() {
                onRemoveState(name);
              }
            },
            React.createElement(Icon, { icon: faTrashAlt })
          )
        )
      );
    }, _this.renderFolder = function (_ref4) {
      var name = _ref4.name,
          states = _ref4.states;
      var _this$props4 = _this.props,
          minimizedFolders = _this$props4.minimizedFolders,
          onToggleFolder = _this$props4.onToggleFolder;

      var isMinimized = minimizedFolders.includes(name);

      return React.createElement(
        React.Fragment,
        { key: name },
        React.createElement(
          FolderName,
          { onClick: function onClick() {
              return onToggleFolder(name);
            } },
          React.createElement(Icon, { icon: isMinimized ? faPlusSquare : faMinusSquare }),
          "\xA0\xA0",
          name
        ),
        !isMinimized && React.createElement(
          FolderStates,
          null,
          states.map(_this.renderState)
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ReactDvrUi.prototype.render = function render() {
    var _props = this.props,
        isShowing = _props.isShowing,
        activeState = _props.activeState,
        states = _props.states,
        onSetActiveState = _props.onSetActiveState;
    var isAdding = this.state.isAdding;

    var folders = groupStatesByFolder(states);
    var statesOutsideFolders = getStatesOutsideFolders(states);

    if (!isShowing) {
      return React.createElement("noscript", null);
    }

    return React.createElement(
      Container,
      null,
      React.createElement(
        Title,
        null,
        "React DVR"
      ),
      React.createElement(
        StatesContainer,
        null,
        React.createElement(
          StateRow,
          null,
          React.createElement(
            StateLabel,
            null,
            React.createElement("input", {
              type: "radio",
              checked: !activeState,
              onChange: function onChange() {
                onSetActiveState(null);
              }
            }),
            " ",
            "No state applied"
          )
        ),
        folders.map(this.renderFolder),
        statesOutsideFolders.map(this.renderState)
      ),
      isAdding ? React.createElement(AddStateForm, {
        onSubmit: this.handleAddState,
        onCancel: this.handleClickCancelAdd
      }) : React.createElement(
        GhostedButton,
        { onClick: this.handleClickAdd, disabled: !!activeState },
        "Add State"
      )
    );
  };

  return ReactDvrUi;
}(React.Component);

ReactDvrUi.propTypes = process.env.NODE_ENV !== "production" ? {
  isShowing: PropTypes.bool.isRequired,
  minimizedFolders: PropTypes.arrayOf(PropTypes.string).isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired
  })).isRequired,
  onAddState: PropTypes.func.isRequired,
  onEditStateName: PropTypes.func.isRequired,
  onRemoveState: PropTypes.func.isRequired,
  onSetActiveState: PropTypes.func.isRequired,
  onToggleFolder: PropTypes.func.isRequired,
  activeState: PropTypes.string
} : {};


export default ReactDvrUi;