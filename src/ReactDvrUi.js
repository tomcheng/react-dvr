import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "@fortawesome/react-fontawesome";
import faTrashAlt from "@fortawesome/fontawesome-free-regular/faTrashAlt";
import faEdit from "@fortawesome/fontawesome-free-regular/faEdit";
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

const Actions = styled.div`
  display: flex;
`;

const Action = styled.div`
  opacity: 0;
  cursor: pointer;

  & + & {
    margin-left: 5px;
  }

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
    onEditStateName: PropTypes.func.isRequired,
    onRemoveState: PropTypes.func.isRequired,
    onSetActiveState: PropTypes.func.isRequired,
    activeState: PropTypes.string
  };

  state = { isAdding: false, editingState: null };

  handleClickAdd = () => {
    this.setState({ isAdding: true });
  };

  handleClickCancelAdd = () => {
    this.setState({ isAdding: false });
  };

  handleAddState = ({ name, onError }) => {
    const { states, onAddState } = this.props;

    if (states.some(s => s.name === name)) {
      onError({ message: "Name is already used" });
      return;
    }

    onAddState(name);
    this.setState({ isAdding: false });
  };

  handleClickEdit = name => {
    this.setState({ editingState: name });
  };

  handleCancelEdit = () => {
    this.setState({ editingState: null });
  };

  handleEditName = ({ name, previousName, onError }) => {
    const { states, onEditStateName } = this.props;
    
    if (states.some(s => s.name === name)) {
      onError({ message: "Name is already used" });
      return;
    }
    
    onEditStateName({ name, previousName });
    this.setState({ editingState: null });
  };

  setActive = name => {
    this.props.onSetActiveState(name);
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
    const { isAdding, editingState } = this.state;

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
          {states.map(
            ({ name }) =>
              editingState === name ? (
                <AddStateForm
                  key={name}
                  initialName={name}
                  onCancel={this.handleCancelEdit}
                  onSubmit={arg => {
                    this.handleEditName({ ...arg, previousName: name });
                  }}
                />
              ) : (
                <StateRow key={name} className="rdvr-state-row">
                  <StateLabel>
                    <input
                      type="radio"
                      checked={activeState === name}
                      onChange={() => {
                        this.setActive(name);
                      }}
                    />{" "}
                    {name}{" "}
                  </StateLabel>
                  <Actions>
                    <Action
                      onClick={() => {
                        this.handleClickEdit(name);
                      }}
                    >
                      <Icon icon={faEdit} />
                    </Action>
                    <Action
                      onClick={() => {
                        onRemoveState(name);
                      }}
                    >
                      <Icon icon={faTrashAlt} />
                    </Action>
                  </Actions>
                </StateRow>
              )
          )}
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
