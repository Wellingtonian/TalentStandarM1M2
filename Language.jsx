/* Language section */
import React from "react";
import { Table, Icon, Dropdown, Button } from "semantic-ui-react";

export class Language extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddSection: false,
      tableEditId: "",
      showTableData: true,
      options: {
        id: "",
        name: "",
        level: "",
      },
      languageLevel: [
        { key: "1", value: "Basic", text: "Basic" },
        { key: "2", value: "Conversational", text: "Conversational" },
        { key: "3", value: "Fluent", text: "Fluent" },
        { key: "4", value: "Native/Bilingual", text: "Native/Bilingual" },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.handleAddRecord = this.handleAddRecord.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.closeEditTable = this.closeEditTable.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.closeRecord = this.closeRecord.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
  }
  handleAddRecord() {
    this.setState({ showAddSection: true });
  }
  handleChange(event, objReference) {
    const id = event.target.id;
    var data = this.state.options;
    const name = objReference.name;
    let value = objReference.value;
    data["level"] = value;
    this.setState({
      options: data,
    });
  }
  handleChangeText(event) {
    const id = event.target.id;
    var data = this.state.options;
    data["name"] = event.target.value;
    this.setState({
      options: data,
    });
  }
  renderAdd() {
    const languageLevel = this.state.languageLevel;
    return (
      <div className="row">
        <div className="ui five wide column">
          <input
            type="text"
            name="language"
            placeholder="Add Language"
            maxLength={12}
            onChange={this.handleChangeText}
            id="name"
          />
        </div>
        <div className="ui five wide column">
          <Dropdown
            name="languageLevel"
            search
            selection
            options={languageLevel}
            onChange={this.handleChange}
            placeholder="Language Level"
            className="ui dropdown language"
            id="level"
          />
        </div>
        <div className="ui six wide column">
          <button
            type="button"
            className="ui teal button"
            onClick={this.addLanguage}
          >
            Add
          </button>
          <button type="button" className="ui button" onClick={this.closeEdit}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
  closeEdit() {
    this.setState({ showAddSection: false });
  }
  addLanguage() {
    if (this.state.options.name === "" || this.state.options.level === "") {
      TalentUtil.notification.show(
        "Please enter language and level",
        "error",
        null,
        null
      );
    } else {
      var arr = [this.state.options];
      var data = [...arr, ...this.props.languageData];
      var updateData = {
        languages: [...data],
      };
      this.props.updateProfileData(updateData);
      this.setState({
        showAddSection: false,
        options: { id: "", name: "", level: "" },
      });
    }
  }
  handleUpdate(index, enteredName, enteredLevel, e) {
    e.preventDefault();
    var dataList = this.props.languageData;
    const list = dataList.map((item, j) => {
      if (j === index) {
        item.name = this.state.options.name
          ? this.state.options.name
          : enteredName;
        item.level = this.state.options.level
          ? this.state.options.level
          : enteredLevel;
        return item;
      } else {
        return item;
      }
    });
    this.props.updateProfileData(list);
    this.setState({ showTableData: true });
  }
  closeEditTable() {
    this.setState({ showTableData: true });
  }
  editRecord(event) {
    var selectedId = event.target.id;
    this.setState({ showTableData: false, tableEditId: selectedId });
  }
  closeRecord(event) {
    event.preventDefault();
    var id = event.target.id;
    var deleteLang = this.props.languageData;
    deleteLang = deleteLang.filter((item) => id !== item.id);
    var updateData = {
      languages: [...deleteLang],
    };
    this.props.updateProfileData(updateData);
    this.setState({ showTableData: true });
  }
  render() {
    const addLanguage = this.state.showAddSection ? this.renderAdd() : "";
    const languageLevel = this.state.languageLevel;
    return (
      <React.Fragment>
        {addLanguage}
        <div className="ui sixteen wide column">
          <Table stackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <button
                    type="button"
                    className="ui secondary button"
                    onClick={this.handleAddRecord}
                  >
                    <Icon name="plus" />
                    Add New
                  </button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.languageData.map((langList, index) => (
                <Table.Row key={langList.id}>
                  <Table.Cell>
                    {!this.state.showTableData &&
                    this.state.tableEditId == langList.id ? (
                      <div className="ui sixteen wide column">
                        <input
                          type="text"
                          name="editlanguage"
                          defaultValue={langList.name}
                          maxLength={40}
                          onChange={this.handleChangeText}
                          id="editName"
                        />
                      </div>
                    ) : (
                      <div className="ui sixteen wide column">
                        {langList.name}
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {!this.state.showTableData &&
                    this.state.tableEditId == langList.id ? (
                      <div className="ui sixteen wide column">
                        <Dropdown
                          name="editlanguageLevel"
                          search
                          selection
                          options={languageLevel}
                          onChange={this.handleChange}
                          defaultValue={langList.level}
                          className="ui dropdown editLanguage"
                          id="editLevel"
                        />
                      </div>
                    ) : (
                      <div className="ui sixteen wide column">
                        {langList.level}
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {!this.state.showTableData &&
                    this.state.tableEditId == langList.id ? (
                      <div className="ui sixteen wide column" textalign="left">
                        <Button
                          basic
                          color="blue"
                          content="Update"
                          onClick={(e) =>
                            this.handleUpdate(
                              index,
                              langList.name,
                              langList.level,
                              e
                            )
                          }
                        />
                        <Button
                          basic
                          color="red"
                          content="Cancel"
                          onClick={this.closeEditTable}
                        />
                      </div>
                    ) : (
                      <div>
                        <Icon
                          name="pencil"
                          id={langList.id}
                          onClick={this.editRecord}
                        />
                        <Icon
                          name="close"
                          id={langList.id}
                          onClick={this.closeRecord}
                        />
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
