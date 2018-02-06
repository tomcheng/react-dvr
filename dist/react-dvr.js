(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types'), require('styled-components'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['react', 'prop-types', 'styled-components', 'react-dom'], factory) :
	(global.reactDvr = factory(global.React,global.PropTypes,global.styled,global.ReactDOM));
}(this, (function (React,PropTypes,styled,ReactDOM) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
styled = styled && styled.hasOwnProperty('default') ? styled['default'] : styled;
ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _taggedTemplateLiteralLoose(strings, raw) {
  strings.raw = raw;
  return strings;
}

var _templateObject = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.9);\n  border: 1px solid #000;\n  padding: 0 5px;\n  line-height: 24px;\n  border-radius: 3px;\n  margin-bottom: 5px;\n"], ["\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.9);\n  border: 1px solid #000;\n  padding: 0 5px;\n  line-height: 24px;\n  border-radius: 3px;\n  margin-bottom: 5px;\n"]);
var _templateObject2 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  display: flex;\n  justify-content: flex-end;\n"], ["\n  display: flex;\n  justify-content: flex-end;\n"]);
var _templateObject3 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  order: 2;\n  margin-left: 5px;\n"], ["\n  order: 2;\n  margin-left: 5px;\n"]);
var _templateObject4 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  order: 1;\n"], ["\n  order: 1;\n"]);

var StyledInput = styled.input(_templateObject);
var Actions = styled.div(_templateObject2);
var SaveButton = styled.button(_templateObject3);
var CancelButton = styled.button(_templateObject4);

var AddStateForm =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(AddStateForm, _React$Component);

  function AddStateForm() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.state = {
      name: "",
      error: null
    }, _this.handleChange = function (event) {
      var _this$setState;

      _this.setState((_this$setState = {}, _this$setState[event.target.name] = event.target.value, _this$setState));
    }, _this.handleSubmit = function (event) {
      event.preventDefault();
      var onSubmit = _this.props.onSubmit;

      var name = _this.state.name.trim();

      if (name === "") {
        _this.setState({
          error: "Name is required"
        });

        return;
      }

      onSubmit({
        name: name,
        onError: function onError(_ref) {
          var message = _ref.message;

          _this.setState({
            error: message
          });
        }
      });
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = AddStateForm.prototype;

  _proto.render = function render() {
    var onCancel = this.props.onCancel;
    var _state = this.state,
        name = _state.name,
        error = _state.error;
    return React.createElement("form", {
      onSubmit: this.handleSubmit
    }, React.createElement(StyledInput, {
      type: "text",
      name: "name",
      placeholder: "Name this State",
      value: name,
      onChange: this.handleChange,
      autoFocus: true
    }), error && React.createElement("div", null, error), React.createElement(Actions, null, React.createElement(SaveButton, null, "Save State"), React.createElement(CancelButton, {
      onClick: onCancel
    }, "Cancel")));
  };

  return AddStateForm;
}(React.Component);

AddStateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

var _templateObject$1 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  position: fixed;\n  bottom: 15px;\n  left: 15px;\n  z-index: 999999;\n  padding: 12px 15px 15px;\n  min-width: 240px;\n  border-radius: 4px;\n  border: 2px solid #000;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n  -webkit-font-smoothing: antialiased;\n"], ["\n  position: fixed;\n  bottom: 15px;\n  left: 15px;\n  z-index: 999999;\n  padding: 12px 15px 15px;\n  min-width: 240px;\n  border-radius: 4px;\n  border: 2px solid #000;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);\n  background-color: rgba(0, 0, 0, 0.8);\n  color: #fff;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 14px;\n  line-height: 24px;\n  -webkit-font-smoothing: antialiased;\n"]);
var _templateObject2$1 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  font-weight: bold;\n  font-size: 16px;\n  margin-bottom: 5px;\n"], ["\n  font-weight: bold;\n  font-size: 16px;\n  margin-bottom: 5px;\n"]);
var _templateObject3$1 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  margin: 0 -5px 10px;\n"], ["\n  margin: 0 -5px 10px;\n"]);
var _templateObject4$1 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  display: flex;\n  padding: 0 5px;\n  justify-content: space-between;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"], ["\n  display: flex;\n  padding: 0 5px;\n  justify-content: space-between;\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.1);\n  }\n"]);
var _templateObject5 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  flex-grow: 1;\n"], ["\n  flex-grow: 1;\n"]);
var _templateObject6 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  opacity: 0;\n  cursor: pointer;\n\n  .rdvr-state-row:hover & {\n    opacity: 0.5;\n    &:hover {\n      opacity: 1;\n    }\n  }\n"], ["\n  opacity: 0;\n  cursor: pointer;\n\n  .rdvr-state-row:hover & {\n    opacity: 0.5;\n    &:hover {\n      opacity: 1;\n    }\n  }\n"]);
var _templateObject7 = /*#__PURE__*/ _taggedTemplateLiteralLoose(["\n  display: block;\n  text-align: center;\n  border: 1px dashed #fff;\n  border-radius: 4px;\n  cursor: ", ";\n  opacity: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"], ["\n  display: block;\n  text-align: center;\n  border: 1px dashed #fff;\n  border-radius: 4px;\n  cursor: ", ";\n  opacity: ", ";\n\n  &:hover {\n    opacity: ", ";\n  }\n"]);

var Container = styled.div(_templateObject$1);
var Title = styled.div(_templateObject2$1);
var StatesContainer = styled.div(_templateObject3$1);
var StateRow = styled.div(_templateObject4$1);
var StateLabel = styled.label(_templateObject5);
var Close = styled.div(_templateObject6);
var GhostedButton = styled.div(_templateObject7, function (props) {
  return props.disabled ? "default" : "pointer";
}, function (props) {
  return props.disabled ? 0.2 : 0.6;
}, function (props) {
  return props.disabled ? 0.2 : 1;
});

var ReactDvrUi =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ReactDvrUi, _React$Component);

  function ReactDvrUi() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.state = {
      isAdding: false
    }, _this.handleClickAdd = function () {
      _this.setState({
        isAdding: true
      });
    }, _this.handleClickCancelAdd = function () {
      _this.setState({
        isAdding: false
      });
    }, _this.handleAddState = function (_ref) {
      var name = _ref.name,
          onError = _ref.onError;
      var states = _this.props.states;

      if (states.some(function (s) {
        return s.name === name;
      })) {
        onError({
          message: "Name is already used"
        });
        return;
      }

      _this.props.onAddState(name);

      _this.setState({
        isAdding: false
      });
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = ReactDvrUi.prototype;

  _proto.render = function render() {
    var _props = this.props,
        isShowing = _props.isShowing,
        activeState = _props.activeState,
        states = _props.states,
        onSetActiveState = _props.onSetActiveState,
        onRemoveState = _props.onRemoveState;
    var isAdding = this.state.isAdding;

    if (!isShowing) {
      return React.createElement("noscript", null);
    }

    return React.createElement(Container, null, React.createElement(Title, null, "React DVR"), React.createElement(StatesContainer, null, React.createElement(StateRow, null, React.createElement(StateLabel, null, React.createElement("input", {
      type: "radio",
      checked: !activeState,
      onChange: function onChange() {
        onSetActiveState(null);
      }
    }), " ", "Don't use saved state")), states.map(function (_ref2) {
      var name = _ref2.name;
      return React.createElement(StateRow, {
        key: name,
        className: "rdvr-state-row"
      }, React.createElement(StateLabel, null, React.createElement("input", {
        type: "radio",
        checked: activeState === name,
        onChange: function onChange() {
          onSetActiveState(name);
        }
      }), " ", name, " "), React.createElement(Close, {
        onClick: function onClick() {
          onRemoveState(name);
        }
      }, "\xD7"));
    })), isAdding ? React.createElement(AddStateForm, {
      onSubmit: this.handleAddState,
      onCancel: this.handleClickCancelAdd
    }) : React.createElement(GhostedButton, {
      onClick: this.handleClickAdd,
      disabled: !!activeState
    }, "Add State"));
  };

  return ReactDvrUi;
}(React.Component);

ReactDvrUi.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  states: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired
  })).isRequired,
  onAddState: PropTypes.func.isRequired,
  onRemoveState: PropTypes.func.isRequired,
  onSetActiveState: PropTypes.func.isRequired,
  activeState: PropTypes.string
};

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
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inheritsLoose(_class2, _React$Component);

        function _class2() {
          var _temp, _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.options = _extends({}, defaultOptions, options), _this.handleKeyUp = function (event) {
            if (event.code === _this.options.toggleKeyCode) {
              _this.setLocalStorageState(function (state) {
                return _extends({}, state, {
                  showUI: !state.showUI
                });
              });
            }
          }, _this.handleAddState = function (name) {
            if (!name) {
              return;
            }

            _this.setLocalStorageState(function (state) {
              return _extends({}, state, {
                states: (state.states || []).concat([{
                  name: name,
                  props: _this.props
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
            _this.setLocalStorageState({
              activeState: name
            });
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
              onRemoveState: _this.handleRemoveState
            }), _this.overlayTarget);
          }, _temp) || _assertThisInitialized(_this);
        }

        var _proto = _class2.prototype;

        _proto.componentDidMount = function componentDidMount() {
          window.addEventListener("keyup", this.handleKeyUp);
          this.renderOverlay();
        };

        _proto.componentDidUpdate = function componentDidUpdate() {
          this.renderOverlay();
        };

        _proto.componentWillUnmount = function componentWillUnmount() {
          window.removeEventListener("keyup", this.handleKeyUp);
          ReactDOM.unmountComponentAtNode(this.overlayTarget);
        };

        _proto.render = function render() {
          var _getLocalStorageState = this.getLocalStorageState(),
              states = _getLocalStorageState.states,
              activeState = _getLocalStorageState.activeState;

          var propsOverride = activeState ? states.find(function (_ref) {
            var name = _ref.name;
            return name === activeState;
          }).props : {};
          return React.createElement(Target, _extends({}, this.props, propsOverride));
        };

        return _class2;
      }(React.Component)
    );
  };
};

return reactDvr;

})));
