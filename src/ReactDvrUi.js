import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AddStateForm from "./AddStateForm";

const Container = styled.div`
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 999999;
  padding: 12px 15px 15px;
  min-width: 240px;
  border-radius: 4px;
  border: 2px solid #000;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const StatesContainer = styled.div`
  margin: 0 -5px 10px;
`;

const StateRow = styled.div`
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const StateLabel = styled.label`
  flex-grow: 1;
`;

const Close = styled.div`
  opacity: 0;
  cursor: pointer;

  .rdvr-state-row:hover & {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

const GhostedButton = styled.div`
  display: block;
  text-align: center;
  border: 1px dashed #fff;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.2 : 0.6)};

  &:hover {
    opacity: ${props => (props.disabled ? 0.2 : 1)};
  }
`;

class ReactDvrUi extends React.Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    states: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        props: PropTypes.object.isRequired
      })
    ).isRequired,
    onAddState: PropTypes.func.isRequired,
    onRemoveState: PropTypes.func.isRequired,
    onSetActiveState: PropTypes.func.isRequired,
    activeState: PropTypes.string
  };

  state = { isAdding: false };

  handleClickAdd = () => {
    this.setState({ isAdding: true });
  };

  handleClickCancelAdd = () => {
    this.setState({ isAdding: false });
  };

  handleAddState = ({ name, onError }) => {
    const { states } = this.props;

    if (states.some(s => s.name === name)) {
      onError({ message: "Name is already used" });
      return;
    }

    this.props.onAddState(name);
    this.setState({ isAdding: false });
  };

  render() {
    const {
      isShowing,
      activeState,
      states,
      onSetActiveState,
      onRemoveState
    } = this.props;
    const { isAdding } = this.state;

    if (!isShowing) {
      return <noscript />;
    }

    return (
      <Container>
        <Title>React DVR</Title>
        <StatesContainer>
          <StateRow>
            <StateLabel>
              <input
                type="radio"
                checked={!activeState}
                onChange={() => {
                  onSetActiveState(null);
                }}
              />{" "}
              Don't use saved state
            </StateLabel>
          </StateRow>
          {states.map(({ name }) => (
            <StateRow key={name} className="rdvr-state-row">
              <StateLabel>
                <input
                  type="radio"
                  checked={activeState === name}
                  onChange={() => {
                    onSetActiveState(name);
                  }}
                />{" "}
                {name}{" "}
              </StateLabel>
              <Close
                onClick={() => {
                  onRemoveState(name);
                }}
              >
                &times;
              </Close>
            </StateRow>
          ))}
        </StatesContainer>

        {isAdding ? (
          <AddStateForm
            onSubmit={this.handleAddState}
            onCancel={this.handleClickCancelAdd}
          />
        ) : (
          <GhostedButton onClick={this.handleClickAdd} disabled={!!activeState}>
            Add State
          </GhostedButton>
        )}
      </Container>
    );
  }
}

export default ReactDvrUi;
