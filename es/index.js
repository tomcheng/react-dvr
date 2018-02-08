var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import ReactDOM from "react-dom";
import sortBy from "lodash/sortBy";
import ReactDvrUi from "./ReactDvrUi";

var defaultOptions = {
  toggleKeyCode: "Backquote",
  localStorageKey: "__react-dvr__"
};

var defaultState = {
  activeState: null,
  states: [],
  showUI: true
};

var reactDvr = function reactDvr(options) {
  return function (Target) {
    return function (_React$Component) {
      _inherits(_class2, _React$Component);

      function _class2() {
        var _temp, _this, _ret;

        _classCallCheck(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.options = _extends({}, defaultOptions, options), _this.handleKeyUp = function (event) {
          if (event.code === _this.options.toggleKeyCode) {
            _this.setLocalStorageState(function (state) {
              return _extends({}, state, {
                showUI: !state.showUI
              });
            });
          }
        }, _this.handleAddState = function (name) {
          _this.setLocalStorageState(function (state) {
            return _extends({}, state, {
              states: sortBy((state.states || []).concat([{ name: name, props: _this.props }]), [function (_ref) {
                var name = _ref.name;
                return name.toLowerCase();
              }])
            });
          });
        }, _this.handleEditStateName = function (_ref2) {
          var name = _ref2.name,
              previousName = _ref2.previousName;

          _this.setLocalStorageState(function (state) {
            var newStates = state.states.map(function (s) {
              return s.name === previousName ? _extends({}, s, { name: name }) : s;
            });

            return _extends({}, state, {
              activeState: state.activeState === previousName ? name : state.activeState,
              states: sortBy(newStates, [function (_ref3) {
                var name = _ref3.name;
                return name.toLowerCase();
              }])
            });
          });
        }, _this.handleRemoveState = function (name) {
          _this.setLocalStorageState(function (state) {
            return _extends({}, state, {
              states: state.states.filter(function (s) {
                return s.name !== name;
              }),
              activeState: state.activeState === name ? null : state.activeState
            });
          });
        }, _this.handleSetActiveState = function (name) {
          _this.setLocalStorageState({ activeState: name });
        }, _this.getLocalStorageState = function () {
          var json = localStorage.getItem(_this.options.localStorageKey);
          var localStorageState = json ? JSON.parse(json) : {};
          return _extends({}, defaultState, localStorageState);
        }, _this.setLocalStorageState = function (updates) {
          var json = localStorage.getItem(_this.options.localStorageKey);
          var currentState = json ? JSON.parse(json) : {};
          var newState = typeof updates === "function" ? updates(currentState) : _extends({}, currentState, updates);

          localStorage.setItem(_this.options.localStorageKey, JSON.stringify(newState));

          _this.forceUpdate();
        }, _this.renderOverlay = function () {
          if (!document.body) {
            return;
          }

          var _this$getLocalStorage = _this.getLocalStorageState(),
              showUI = _this$getLocalStorage.showUI,
              states = _this$getLocalStorage.states,
              activeState = _this$getLocalStorage.activeState;

          if (!_this.overlayTarget) {
            _this.overlayTarget = document.createElement("div");
            document.body.appendChild(_this.overlayTarget);
          }

          ReactDOM.render(React.createElement(ReactDvrUi, {
            isShowing: showUI,
            activeState: activeState,
            states: states,
            onSetActiveState: _this.handleSetActiveState,
            onAddState: _this.handleAddState,
            onEditStateName: _this.handleEditStateName,
            onRemoveState: _this.handleRemoveState
          }), _this.overlayTarget);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _class2.prototype.componentDidMount = function componentDidMount() {
        window.addEventListener("keyup", this.handleKeyUp);
        this.renderOverlay();
      };

      _class2.prototype.componentDidUpdate = function componentDidUpdate() {
        this.renderOverlay();
      };

      _class2.prototype.componentWillUnmount = function componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyUp);
        ReactDOM.unmountComponentAtNode(this.overlayTarget);
      };

      _class2.prototype.render = function render() {
        var _getLocalStorageState = this.getLocalStorageState(),
            states = _getLocalStorageState.states,
            activeState = _getLocalStorageState.activeState;

        var propsOverride = activeState ? states.find(function (_ref4) {
          var name = _ref4.name;
          return name === activeState;
        }).props : {};

        return React.createElement(Target, _extends({}, this.props, propsOverride));
      };

      return _class2;
    }(React.Component);
  };
};

export default reactDvr;