import React from "react";
import ReactDOM from "react-dom";
import sortBy from "lodash/sortBy";
import ReactDvrUi from "./ReactDvrUi";

const defaultOptions = {
  toggleKeyCode: "Backquote",
  localStorageKey: "__react-dvr__"
};

const defaultState = {
  activeState: null,
  states: [],
  showUI: true
};

const reactDvr = options => Target =>
  class extends React.Component {
    componentDidMount() {
      window.addEventListener("keyup", this.handleKeyUp);
      this.renderOverlay();
    }

    componentDidUpdate() {
      this.renderOverlay();
    }

    componentWillUnmount() {
      window.removeEventListener("keyup", this.handleKeyUp);
      ReactDOM.unmountComponentAtNode(this.overlayTarget);
    }

    options = { ...defaultOptions, ...options };

    handleKeyUp = event => {
      if (event.code === this.options.toggleKeyCode) {
        this.setLocalStorageState(state => ({
          ...state,
          showUI: !state.showUI
        }));
      }
    };

    handleAddState = name => {
      this.setLocalStorageState(state => ({
        ...state,
        states: sortBy(
          (state.states || []).concat([{ name, props: this.props }]),
          [({ name }) => name.toLowerCase()]
        )
      }));
    };

    handleEditStateName = ({ name, previousName }) => {
      this.setLocalStorageState(state => {
        const newStates = state.states.map(
          s => (s.name === previousName ? { ...s, name } : s)
        );

        return {
          ...state,
          activeState:
            state.activeState === previousName ? name : state.activeState,
          states: sortBy(newStates, [({ name }) => name.toLowerCase()])
        };
      });
    };

    handleRemoveState = name => {
      this.setLocalStorageState(state => ({
        ...state,
        states: state.states.filter(s => s.name !== name),
        activeState: state.activeState === name ? null : state.activeState
      }));
    };

    handleSetActiveState = name => {
      this.setLocalStorageState({ activeState: name });
    };

    getLocalStorageState = () => {
      const json = localStorage.getItem(this.options.localStorageKey);
      const localStorageState = json ? JSON.parse(json) : {};
      return { ...defaultState, ...localStorageState };
    };

    setLocalStorageState = updates => {
      const json = localStorage.getItem(this.options.localStorageKey);
      const currentState = json ? JSON.parse(json) : {};
      const newState =
        typeof updates === "function"
          ? updates(currentState)
          : { ...currentState, ...updates };

      localStorage.setItem(
        this.options.localStorageKey,
        JSON.stringify(newState)
      );

      this.forceUpdate();
    };

    renderOverlay = () => {
      if (!document.body) {
        return;
      }

      const { showUI, states, activeState } = this.getLocalStorageState();

      if (!this.overlayTarget) {
        this.overlayTarget = document.createElement("div");
        document.body.appendChild(this.overlayTarget);
      }

      ReactDOM.render(
        <ReactDvrUi
          isShowing={showUI}
          activeState={activeState}
          states={states}
          onSetActiveState={this.handleSetActiveState}
          onAddState={this.handleAddState}
          onEditStateName={this.handleEditStateName}
          onRemoveState={this.handleRemoveState}
        />,
        this.overlayTarget
      );
    };

    render() {
      const { states, activeState } = this.getLocalStorageState();
      const propsOverride = activeState
        ? states.find(({ name }) => name === activeState).props
        : {};

      return <Target {...this.props} {...propsOverride} />;
    }
  };

export default reactDvr;
