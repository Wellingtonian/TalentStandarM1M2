import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.status,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const data = Object.assign({}, this.state.status);
    data[event.target.name] = event.target.value;
    console.log(data);
    //const jobStatus=this.state.jobStatus
    this.setState({
      status: event.target.value,
      status: data,
    });
    this.props.controlFunc(this.props.componentId, data);
  }

  render() {
    const { status } = this.props.status ? this.props.status : "";
    return (
      <div className="ui sixteen wide column">
        <h5>Current Status</h5>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="status"
              value="Actively looking for a job"
              checked={status === "Actively looking for a job"}
              onChange={this.handleChange}
            />
            <label>Actively looking for a job</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="status"
              value="Not looking for a job at the moment"
              checked={status === "Not looking for a job at the moment"}
              onChange={this.handleChange}
            />
            <label>Not looking for a job at the moment</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="status"
              value="Currently employed but open to offers"
              checked={status === "Currently employed but open to offers"}
              onChange={this.handleChange}
            />
            <label>Currently employed but open to offers</label>
          </div>
        </div>

        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="status"
              value="Will be available on later date"
              checked={status === "Will be available on later date"}
              onChange={this.handleChange}
            />
            <label>Will be available on later date</label>
          </div>
        </div>
      </div>
    );
  }
}
