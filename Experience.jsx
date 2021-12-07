/* Experience section */
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon, Tab } from "semantic-ui-react";
import moment from "moment";
import nextId from "react-id-generator";

const initialExperience = {
  id: nextId(),
  company: "",
  position: "",
  responsibilities: "",
  start: "",
  end: "",
};

export default class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: initialExperience,
      showAddSection: false,
      //showeditExperience:false,
      tableEditId: "",
      showTableData: true,
    };
    this.handleAddClick = this.handleAddClick.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.savenewExperience = this.savenewExperience.bind(this);

    this.closeEdit = this.closeEdit.bind(this);
    this.closeEditTable = this.closeEditTable.bind(this);
    this.editRecord = this.editRecord.bind(this);
    this.closeRecord = this.closeRecord.bind(this);
  }
  handleAddClick() {
    this.setState({
      showAddSection: true,
    });
  }
  handleChange(event) {
    event.preventDefault();
    const id = event.target.id;
    var data = this.state.experience;
    data[id] = event.target.value;
    this.setState({
      experience: data,
    });
    /*var data = this.state.experience
        data[event.target.name] = event.target.value
        data[id] = event.target.value
        this.setState({
            experience: data
        })*/
  }

  closeEdit() {
    this.setState({ showAddSection: false });
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
    var deleteExp = this.props.experienceData;
    deleteExp = deleteExp.filter((item) => id !== item.id);
    var updateData = {
      experience: [...deleteExp],
    };
    this.props.updateProfileData(updateData);
    this.setState({ showTableData: true });
  }

  savenewExperience(event) {
    event.preventDefault();
    if (
      this.state.experience.company === "" ||
      this.state.experience.position === "" ||
      this.state.experience.responsibilities === "" ||
      this.state.experience.start === "" ||
      this.state.experience.end === ""
    ) {
      TalentUtil.notification.show(
        "Please enter required fields",
        "error",
        null,
        null
      );
    } else {
      var arr = [this.state.experience];
      var data = [...arr, ...this.props.experienceData];
      var updateData = {
        experience: [...data],
      };
      this.props.updateProfileData(updateData);
      this.setState({
        showAddSection: false,
        experience: {
          id: "",
          company: "",
          position: "",
          start: "",
          end: "",
          responsibilities: "",
        },
      });
    }
  }
  renderAdd() {
    return (
      <div className="row">
        <div className="ui eight wide column" id="inputExperience">
          <h5>Company:</h5>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company"
            onChange={this.handleChange}
            maxLength={12}
          />
        </div>
        <div className="ui eight wide column">
          <h5>Position:</h5>
          <input
            type="text"
            name="position"
            id="position"
            onChange={this.handleChange}
            maxLength={50}
            placeholder="Position"
          />
        </div>
        <div className="ui eight wide column" style={{ marginTop: "10px" }}>
          <h5>Start Date:</h5>
          <input
            type="date"
            name="start"
            id="start"
            onChange={this.handleChange}
            placeholder="Start Date"
          />
        </div>
        <div className="ui eight wide column" style={{ marginTop: "10px" }}>
          <h5>End Date:</h5>
          <input
            type="date"
            name="end"
            id="end"
            onChange={this.handleChange}
            placeholder="End Date"
          />
        </div>
        <div className="ui sixteen wide column" style={{ marginTop: "10px" }}>
          <h5>Responsibilities:</h5>
          <input
            type="text"
            name="responsibilities"
            id="responsibilities"
            onChange={this.handleChange}
            maxLength={500}
            placeholder="Responsibilities"
          />
        </div>
        <div className="ui six wide column" style={{ marginTop: "10px" }}>
          <Button secondary onClick={this.savenewExperience}>
            Add
          </Button>
          <Button onClick={this.closeEdit}>Cancel</Button>
        </div>
      </div>
    );
  }
  closeEdit() {
    this.setState({ showAddSection: false });
  }
  handleUpdate(index, company, position, start, end, responsibilities, e) {
    e.preventDefault();
    var dataList = this.props.experienceData;
    //debugger
    const list = dataList.map((item, j) => {
      if (j === index) {
        item.company = this.state.experience.company
          ? this.state.experience.company
          : company;
        item.position = this.state.experience.position
          ? this.state.experience.position
          : position;
        item.start = this.state.experience.start
          ? this.state.experience.start
          : start;
        item.end = this.state.experience.end ? this.state.experience.end : end;
        item.responsibilities = this.state.experience.responsibilities
          ? this.state.experience.responsibilities
          : responsibilities;
        return item;
      } else {
        return item;
      }
    });
    this.props.updateProfileData(list);
    this.setState({ showTableData: true });
  }

  render() {
    const addExperience = this.state.showAddSection ? this.renderAdd() : "";

    return (
      <React.Fragment>
        {addExperience}
        <div className="ui sixteen wide column">
          <Table unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">
                  <button
                    type="button"
                    className="ui secondary button"
                    onClick={this.handleAddClick}
                  >
                    <Icon name="plus" />
                    Add New
                  </button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.experienceData.map((expList, index) =>
                !this.state.showTableData &&
                this.state.tableEditId == expList.id ? (
                  <React.Fragment key={expList.id}>
                    <Table.Row>
                      <Table.Cell colSpan="3" style={{ border: "none" }}>
                        <h5>Company:</h5>
                        <input
                          type="text"
                          name="company"
                          placeholder="Company"
                          maxLength={80}
                          onChange={this.handleChange}
                          id="company"
                          defaultValue={expList.company}
                        />
                      </Table.Cell>
                      <Table.Cell colSpan="3" style={{ border: "none" }}>
                        <h5>Position:</h5>
                        <input
                          type="text"
                          name="position"
                          placeholder="Position"
                          maxLength={50}
                          onChange={this.handleChange}
                          id="position"
                          defaultValue={expList.position}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell colSpan="3" style={{ border: "none" }}>
                        <h5>Start Date:</h5>
                        <div className="ui calendar">
                          <input
                            type="date"
                            name="start"
                            defaultValue={moment(expList.start).format(
                              "YYYY-MM-DD"
                            )}
                            onChange={this.handleChange}
                            id="start"
                          />
                        </div>
                      </Table.Cell>
                      <Table.Cell colSpan="3" style={{ border: "none" }}>
                        <h5>End Date:</h5>
                        <div className="ui calendar">
                          <input
                            type="date"
                            name="end"
                            defaultValue={moment(expList.end).format(
                              "YYYY-MM-DD"
                            )}
                            onChange={this.handleChange}
                            id="end"
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell colSpan="6" style={{ border: "none" }}>
                        <h5>Responsibilities:</h5>
                        <input
                          type="text"
                          name="responsibilities"
                          placeholder="Responsibilities"
                          maxLength={100}
                          onChange={this.handleChange}
                          id="responsibilities"
                          defaultValue={expList.responsibilities}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell colSpan="6" style={{ border: "none" }}>
                        <button
                          type="button"
                          className="ui teal button"
                          onClick={(e) =>
                            this.handleUpdate(
                              index,
                              expList.company,
                              expList.position,
                              expList.start,
                              expList.end,
                              expList.responsibilities,
                              e
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="ui button"
                          onClick={this.closeEditTable}
                        >
                          Cancel
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  </React.Fragment>
                ) : (
                  <Table.Row key={expList.id}>
                    <Table.Cell>{expList.company}</Table.Cell>
                    <Table.Cell>{expList.position}</Table.Cell>
                    <Table.Cell>{expList.responsibilities}</Table.Cell>
                    <Table.Cell>
                      {moment(expList.start).format("Do MMM, YYYY")}
                    </Table.Cell>
                    <Table.Cell>
                      {moment(expList.end).format("Do MMM, YYYY")}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Icon
                        name="pencil"
                        id={expList.id}
                        onClick={this.editRecord}
                      />
                      <Icon
                        name="close"
                        id={expList.id}
                        onClick={this.closeRecord}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
