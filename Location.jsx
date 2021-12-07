import React from "react";
import Cookies from "js-cookie";
import { default as Countries } from "../../../../util/jsonFiles/countries.json";
import { ChildSingleInput } from "../Form/SingleInput.jsx";

export class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressData: {
        number: "",
        street: "",
        suburb: "",
        country: "",
        city: "",
        postCode: "",
      },
      showEditSection: false,
    };

    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  openEdit() {
    const details = Object.assign({}, this.props.addressData);
    this.setState({
      showEditSection: true,
      addressData: details,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  handleChange(event) {
    const data = this.state.addressData;
    console.log(data);
    data[event.target.name] = event.target.value;

    this.setState({
      addressData: data,
    });
  }

  saveContact() {
    if (
      this.state.addressData.number === "" ||
      this.state.addressData.street === "" ||
      this.state.addressData.suburb === "" ||
      this.state.addressData.country === "" ||
      this.state.addressData.city === "" ||
      this.state.addressData.postCode === ""
    ) {
      TalentUtil.notification.show(
        "Please enter address details",
        "error",
        null,
        null
      );
    } else {
      const data = Object.assign({}, this.state.addressData);
      console.log(data);
      this.props.controlFunc(this.props.componentId, data);
      this.closeEdit();
    }
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }
  renderEdit() {
    let countriesOptions = [];
    let citiesOptions = [];
    let selectedCountry = this.state.addressData.country;
    let selectedCity = this.state.addressData.city;

    countriesOptions = Object.keys(Countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    //selectedCity=""
    if (selectedCountry != "" && selectedCountry != null) {
      var popCities = Countries[selectedCountry].map((y) => (
        <option key={y} value={y}>
          {" "}
          {y}
        </option>
      ));
      citiesOptions = (
        <select
          className="ui dropdown"
          placeholder="City"
          value={selectedCity}
          onChange={this.handleChange}
          name="city"
        >
          <option>Select a town or city</option>
          {popCities}
        </select>
      );
      //debugger
    } else {
      citiesOptions = (
        <select
          className="ui dropdown"
          placeholder="City"
          value={selectedCity || ""}
          onChange={this.handleChange}
          name="city"
        >
          <option value="">Select a town or city</option>
        </select>
      );
    }

    return (
      <div className="row">
        <div className="ui four wide column">
          <ChildSingleInput
            inputType="text"
            label="Number"
            name="number"
            value={this.state.addressData.number}
            controlFunc={this.handleChange}
            maxLength={10}
            placeholder="Enter your street number"
            errorMessage="Please enter a street number"
          />
        </div>
        <div className="ui eight wide column">
          <ChildSingleInput
            inputType="text"
            label="Street"
            name="street"
            value={this.state.addressData.street}
            controlFunc={this.handleChange}
            maxLength={40}
            placeholder="Enter street name"
            errorMessage="Please enter a street name"
          />
        </div>
        <div className="ui four wide column">
          <ChildSingleInput
            inputType="text"
            label="Suburb"
            name="suburb"
            value={this.state.addressData.suburb}
            controlFunc={this.handleChange}
            maxLength={20}
            placeholder="Enter suburb area"
            errorMessage="Please enter suburb area"
          />
        </div>
        <div className="ui six wide column" style={{ marginTop: "10px" }}>
          Country:
          <select
            placeholder="Country"
            value={selectedCountry}
            onChange={this.handleChange}
            name="country"
          >
            <option value="">Select a country</option>
            {countriesOptions}
          </select>
        </div>
        <div className="ui six wide column" style={{ marginTop: "10px" }}>
          City: {citiesOptions}
        </div>
        <div className="ui four wide column" style={{ marginTop: "10px" }}>
          <ChildSingleInput
            inputType="text"
            label="Post Code"
            name="postCode"
            value={this.state.addressData.postCode}
            controlFunc={this.handleChange}
            maxLength={20}
            placeholder="Enter your postcode"
            errorMessage="Please enter postcode"
          />
        </div>

        <div className="ui sixteen wide column" style={{ marginTop: "10px" }}>
          <button
            type="button"
            className="ui teal button"
            onClick={this.saveContact}
          >
            Save
          </button>
          <button type="button" className="ui button" onClick={this.closeEdit}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
  renderDisplay() {
    let address = this.props.addressData
      ? this.props.addressData.number +
        " " +
        this.props.addressData.street +
        " " +
        this.props.addressData.suburb +
        " " +
        this.props.addressData.postCode
      : " ";
    let city = this.props.addressData.city;
    let country = this.props.addressData.country;

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <p>Address: {address}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
          </React.Fragment>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.openEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}
export class Nationality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nationalityData: props.nationalityData,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const data = Object.assign({}, this.state.nationalityData);
    console.log(data);
    data[event.target.name] = event.target.value;
    this.setState({
      nationalityData: data,
    });
    this.props.controlFunc(this.props.componentId, data);
  }

  render() {
    let countriesOptions = [];
    let selectedCountry = this.props.nationalityData;
    countriesOptions = Object.keys(Countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    return (
      <div className="ui seven wide column">
        <select
          placeholder="Select your nationality"
          value={selectedCountry || ""}
          onChange={this.handleChange}
          name="nationality"
        >
          <option value="">Select your nationality</option>
          {countriesOptions}
        </select>
      </div>
    );
  }
}
