import React from "react";
import ReactDOM from "react-dom";
import ReactDvrUi from "./ReactDvrUi";

const defaultOptions = {
  toggleKeyCode: "Backquote",
  localStorageKey: "__react-dvr-props__"
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
          isShowingUI: !state.isShowingUI
        }));
      }
    };

    handleAddState = name => {
      if (!name) {
        return;
      }

      this.setLocalStorageState(state => ({
        ...state,
        states: (state.states || []).concat([{ name, props: this.props }])
      }));
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
      return { states: [], ...localStorageState };
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

      const {
        isShowingUI,
        isOverriding,
        states,
        activeState
      } = this.getLocalStorageState();

      if (!this.overlayTarget) {
        this.overlayTarget = document.createElement("div");
        document.body.appendChild(this.overlayTarget);
      }

      ReactDOM.render(
        <ReactDvrUi
          isShowing={isShowingUI}
          isOverriding={isOverriding}
          activeState={activeState}
          states={states}
          onSetActiveState={this.handleSetActiveState}
          onAddState={this.handleAddState}
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
