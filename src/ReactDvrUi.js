import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlusSquare, faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import AddStateForm from "./AddStateForm";
import AnimateHeight from "react-animate-height-auto";

const groupStatesByFolder = states =>
  states
    .filter(state => state.name.indexOf("/") > -1)
    .reduce((folders, state) => {
      const folderName = state.name.split("/")[0];
      const displayName = state.name.split("/")[1];
      const existingFolder = folders.find(folder => folder.name === folderName);

      if (existingFolder) {
        existingFolder.states.push({ ...state, displayName });
      } else {
        folders.push({
          name: folderName,
          states: [{ ...state, displayName }]
        });
      }

      return folders;
    }, []);

const getStatesOutsideFolders = states =>
  states.filter(state => state.name.indexOf("/") === -1);

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
  font-size: 13px;
  line-height: 22px;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
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

const FolderName = styled.div`
  padding-left: 8px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FolderStates = styled.div`
  padding-left: 20px;
`;

const GhostedButton = styled.button`
  display: block;
  width: 100%;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

class ReactDvrUi extends React.Component {
  static propTypes = {
    isShowing: PropTypes.bool.isRequired,
    minimizedFolders: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    onToggleFolder: PropTypes.func.isRequired,
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

  renderState = ({ name, displayName }) => {
    const { onRemoveState, activeState } = this.props;
    const { editingState } = this.state;

    if (editingState === name) {
      return (
        <AddStateForm
          key={name}
          initialName={name}
          onCancel={this.handleCancelEdit}
          onSubmit={arg => {
            this.handleEditName({ ...arg, previousName: name });
          }}
        />
      );
    }

    return (
      <StateRow key={name} className="rdvr-state-row">
        <StateLabel>
          <input
            type="radio"
            checked={activeState === name}
            onChange={() => {
              this.setActive(name);
            }}
          />{" "}
          {displayName || name}{" "}
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
    );
  };

  renderFolder = ({ name, states }) => {
    const { minimizedFolders, onToggleFolder } = this.props;
    const isMinimized = minimizedFolders.includes(name);

    return (
      <React.Fragment key={name}>
        <FolderName onClick={() => onToggleFolder(name)}>
          <Icon icon={isMinimized ? faPlusSquare : faMinusSquare} />&nbsp;&nbsp;{name}
        </FolderName>
        <AnimateHeight isExpanded={!isMinimized}>
          <FolderStates>{states.map(this.renderState)}</FolderStates>
        </AnimateHeight>
      </React.Fragment>
    );
  };

  render() {
    const { isShowing, activeState, states, onSetActiveState } = this.props;
    const { isAdding } = this.state;
    const folders = groupStatesByFolder(states);
    const statesOutsideFolders = getStatesOutsideFolders(states);

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
              No state applied
            </StateLabel>
          </StateRow>
          {folders.map(this.renderFolder)}
          {statesOutsideFolders.map(this.renderState)}
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
