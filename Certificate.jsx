/* Certificate section */
import React from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
export default class SocialMediaLinkedAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      linkedAccounts: { linkedIn: "", github: "" },
      showEditSection: false,
    };
    this.openEdit = this.openEdit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this);
    this.openLinkedIn = this.openLinkedIn.bind(this);
    this.openGithub = this.openGithub.bind(this);
  }

  componentDidMount() {
    $(".ui.button.social-media").popup();
  }

  openEdit() {
    const newlinkedAccounts = Object.assign({}, this.props.linkedAccounts);
    console.log(newlinkedAccounts);
    this.setState({
      showEditSection: true,
      linkedAccounts: newlinkedAccounts,
    });
  }
  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }
  handleChange(event) {
    const data = Object.assign({}, this.state.linkedAccounts);
    console.log(data);
    data[event.target.name] = event.target.value;
    console.log(data);
    this.setState({
      linkedAccounts: data,
    });
  }

  saveLinkedAccounts() {
    if (
      this.state.linkedAccounts.linkedIn === "" ||
      this.state.linkedAccounts.github === ""
    ) {
      TalentUtil.notification.show(
        "Please enter linkedIn and github accounts",
        "error",
        null,
        null
      );
    } else {
      console.log(this.state.linkedAccounts);
      const data = Object.assign({}, this.state.linkedAccounts);
      this.props.controlFunc(this.props.componentId, data);
      //this.props.saveProfileData(data)
      this.closeEdit();
    }
  }
  openLinkedIn(event) {
    event.preventDefault();
    window.open(this.props.linkedAccounts.linkedIn, "_blank"); //to open new page
  }
  openGithub(event) {
    event.preventDefault();
    window.open(this.props.linkedAccounts.github, "_blank");
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    return (
      <div className="ui sixteen wide column">
        <ChildSingleInput
          inputType="text"
          label="LinkedIn"
          name="linkedIn"
          value={this.state.linkedAccounts.linkedIn || ""}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your LinkedIn Url"
          errorMessage="Please enter a valid LinkedIn Url"
        />
        <ChildSingleInput
          inputType="text"
          label="GitHub"
          name="github"
          value={this.state.linkedAccounts.github || ""}
          controlFunc={this.handleChange}
          maxLength={80}
          placeholder="Enter your GitHub Url"
          errorMessage="Please enter a valid GitHub Url"
        />
        <button
          type="button"
          className="ui teal button"
          onClick={this.saveLinkedAccounts}
        >
          Save
        </button>
        <button type="button" className="ui button" onClick={this.closeEdit}>
          Cancel
        </button>
      </div>
    );
  }

  renderDisplay() {
    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <button
            className="ui linkedin button"
            style={{ width: "200px" }}
            onClick={this.openLinkedIn}
          >
            <i aria-hidden="true" className="linkedin icon"></i>
            LinkedIn
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="ui teal button"
            style={{ width: "200px" }}
            onClick={this.openGithub}
          >
            <i aria-hidden="true" className="github icon"></i>
            GitHub
          </button>
          <button
            type="button"
            className="ui right floated secondary button"
            onClick={this.openEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}
