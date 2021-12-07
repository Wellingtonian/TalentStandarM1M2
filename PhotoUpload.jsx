import React, { Component } from "react";
import Cookies from "js-cookie";
import { Image, Icon, Button } from "semantic-ui-react";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      newFile: "",
      newFileUrl: "",
      uploadButton: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.fileselectedHandler = this.fileselectedHandler.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  handleClick() {
    this.refs.fileUploader.click();
  }

  fileselectedHandler(event) {
    event.preventDefault();
    let acceptedExt = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    let selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (this.state.newFile) {
      URL.revokeObjectURL(newFile);
    }
    //console.log(this.state.newFile)
    if (acceptedExt.includes(selectedFile.type)) {
      this.setState({
        uploadButton: true,
        newFileUrl: URL.createObjectURL(event.target.files[0]),
        newFile: event.target.files[0],
      });
    }
  }
  fileUpload() {
    let file = this.state.newFile;
    console.log(file);
    const form = new FormData();
    form.append("file", file);

    var cookies = Cookies.get("talentAuthToken");

    $.ajax({
      url: this.props.savePhotoUrl,
      headers: {
        Authorization: "Bearer " + cookies,
      },
      type: "POST",
      data: form,
      cache: false,
      processData: false,
      contentType: false,
      success: function (res) {
        console.log(res);
        if (res.success == true) {
          this.setState({
            uploadButton: false,
          });
          TalentUtil.notification.show(
            "Profile updated sucessfully",
            "success",
            null,
            null
          );
        } else {
          TalentUtil.notification.show(
            "Profile did not update successfully",
            "error",
            null,
            null
          );
        }
      }.bind(this),
      error: function (res, a, b) {
        console.log(res);
        console.log(a);
        console.log(b);
      },
    });
  }

  render() {
    let photoUrl = this.props.imageId
      ? this.props.imageId
      : this.state.newFileUrl;
    return (
      <div className="ui sixteen wide column" style={{ textAlign: "center" }}>
        {photoUrl === "" || null ? (
          <span>
            <Icon
              className="huge circular camera retro icon"
              onClick={this.handleClick}
            />
            <input
              type="file"
              name="file"
              ref="fileUploader"
              style={{ display: "none" }}
              onChange={this.fileselectedHandler}
            />
          </span>
        ) : (
          <span>
            <Image
              src={photoUrl}
              style={{ height: 112, width: 112, borderRadius: 55 }}
              className="ui small"
              alt="Image Not Found"
            />
            <div>
              {this.state.uploadButton ? (
                <button
                  type="button"
                  className="ui secondary button"
                  style={{ marginTop: "10px" }}
                  onClick={this.fileUpload}
                >
                  <Icon name="upload" />
                  Upload
                </button>
              ) : (
                ""
              )}
            </div>
          </span>
        )}
      </div>
    );
  }
}
