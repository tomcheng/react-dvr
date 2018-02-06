import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #000;
  padding: 0 5px;
  line-height: 24px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  order: 2;
  margin-left: 5px;
`;

const CancelButton = styled.button`
  order: 1;
`;

class AddStateForm extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialName: PropTypes.string
  };

  constructor(props) {
    super();

    this.state = { name: props.initialName || "", error: null };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    const name = this.state.name.trim();

    if (name === "") {
      this.setState({ error: "Name is required" });
      return;
    }

    onSubmit({
      name,
      onError: ({ message }) => {
        this.setState({ error: message });
      }
    });
  };

  render() {
    const { onCancel } = this.props;
    const { name, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <StyledInput
          type="text"
          name="name"
          placeholder="Name this State"
          value={name}
          onChange={this.handleChange}
          autoFocus
        />
        {error && <div>{error}</div>}
        <Actions>
          <SaveButton>Save State</SaveButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </Actions>
      </form>
    );
  }
}

export default AddStateForm;
