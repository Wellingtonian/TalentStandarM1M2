/* Self introduction section */
import React, { Component } from "react";
import Cookies from "js-cookie";

export default class SelfIntroduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: { summary: "", description: "" },
      // description:props.description
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveIntro = this.saveIntro.bind(this);
  }
  handleChange(event) {
    const data = Object.assign({}, this.state.info);
    console.log(data);
    data[event.target.name] = event.target.value;
    console.log(data);
    this.setState({
      //summary:event.target.value
      info: data,
    });
  }

  saveIntro() {
    if (this.state.info.summary === "" || this.state.info.description === "") {
      TalentUtil.notification.show(
        "Please enter summary and description",
        "error",
        null,
        null
      );
    } else {
      console.log(this.props.componentId);
      console.log(this.state.info);
      //console.log(this.state.description)
      const data = Object.assign({}, this.state.info);
      const data1 = this.state.summary;
      //const data2 = this.state.description
      this.props.controlFunc(this.props.componentId, data);
    }
  }

  render() {
    let summary = this.props.info ? this.props.info.summary : "";
    let description = this.props.info ? this.props.info.description : "";
    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <div className="sixteen wide column">
            <div className="field">
              <input
                type="text"
                name="summary"
                maxLength={150}
                placeholder="Please provide a short summary about yourself"
                value={this.state.info.summary || ""}
                onChange={this.handleChange}
              ></input>
            </div>
            <p>Summary must be no more than 150 characters</p>
            <br />
          </div>
          <div className="sixteen wide column">
            <div className="field">
              <textarea
                name="description"
                minLength={150}
                maxLength={600}
                placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                value={this.state.info.description || ""}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <p>Description must be between 150-600 characters</p>
          </div>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.saveIntro}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
