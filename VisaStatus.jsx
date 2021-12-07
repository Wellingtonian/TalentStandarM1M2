import React from "react";
import moment from "moment";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visaData: {
        visaStatus: "",
        visaExpiryDate: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.saveVisaData = this.saveVisaData.bind(this);
  }
  handleDateChange(visaExpiryDate, event) {
    this.setState({
      visaExpiryDate,
    });
  }

  handleChange(event) {
    let data = this.state.visaData;
    data[event.target.name] = event.target.value;
    if (
      event.target.value == "Citizen" ||
      event.target.value == "Permanent Resident"
    ) {
      data["visaExpiryDate"] = "";
      this.props.controlFunc(this.props.componentId, data);
    }

    if (
      event.target.value == "Work Visa" ||
      event.target.value == "Student Visa"
    ) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      this.props.controlFunc(this.props.componentId, data);
    }

    this.setState({
      visaData: data,
      visaExpiryDate: "",
    });
  }

  saveVisaData() {
    if (this.state.visaData.visaExpiryDate === "") {
      TalentUtil.notification.show(
        "Please enter visa expiry date",
        "error",
        null,
        null
      );
    } else {
      const data = this.state.visaData;
      //console.log(data)
      this.props.controlFunc(this.props.componentId, data);
    }
  }

  render() {
    let visaStatus = this.props.visaStatus ? this.props.visaStatus : "";
    let visaExpiryDate = this.props.visaExpiryDate
      ? this.props.visaExpiryDate
      : "";

    return (
      <div className="row">
        <div className="ui six wide column">
          <h5>Visa type:</h5>
          <select
            placeholder="Select your visa status"
            onChange={this.handleChange}
            name="visaStatus"
            value={visaStatus || ""}
          >
            <option value="Citizen">Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Student Visa">Student Visa</option>
          </select>
        </div>

        {this.props.visaStatus == "Student Visa" ||
        this.props.visaStatus == "Work Visa" ? (
          <React.Fragment>
            <div className="ui six wide column">
              <h5>Visa expiry date:</h5>
              <div className="ui calendar">
                <input
                  type="date"
                  name="visaExpiryDate"
                  defaultValue={moment(visaExpiryDate).format("YYYY-MM-DD")}
                  onChange={this.handleChange}
                  maxLength={20}
                  placeholder="Expiry Date"
                  errormessage="Please enter expiry date"
                />
              </div>
            </div>
            <div className="ui three wide column" style={{ marginTop: "15px" }}>
              <h5></h5>
              <button
                type="button"
                className="ui right floated teal button"
                onClick={this.saveVisaData}
              >
                Save
              </button>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}
