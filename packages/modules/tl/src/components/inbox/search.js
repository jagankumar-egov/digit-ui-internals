import React, { useState } from "react";
import { useForm } from "react-hook-form";
const { TextInput, Label, SubmitBar, LinkLabel, ActionBar, Dropdown } = require("@egovernments/digit-ui-react-components");

const SearchTradeLicence = ({ onSearch, type }) => {
  const [applicationNo, setApplicationNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [licenceNo, setLicenceNo] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const onSubmitInput = (data) => {
    console.log("data", data);
    if (data.applicationNo) {
      onSearch({ applicationNo: data.applicationNo });
    } else if (data.licenceNo) {
      onSearch({ licenceNo: data.licenceNo });
    } else {
      onSearch({ mobileNumber: data.mobileNo });
    }
  };

  function clearSearch() {
    reset();
    onSearch({});
    setLicenceNo("");
    setApplicationNo("");
    setMobileNo("");
  }

  const clearAll = () => {
    return (
      <LinkLabel style={{ color: "#F47738", cursor: "pointer" }} onClick={clearSearch}>
        Clear Search
      </LinkLabel>
    );
  };

  function setApplication(e) {
    setApplicationNo(e.target.value);
  }

  function setMobile(e) {
    setMobileNo(e.target.value);
  }

  function setLicence(e) {
    setLicenceNo(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitInput)}>
      <React.Fragment>
        <div className="search-container" style={{ width: "1024px" }}>
          <div className="search-complaint-container" style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
            <div className="tl-input-container">
              <span className="tl-input">
                <Label>Application No.</Label>
                <TextInput
                  name="applicationNo"
                  value={applicationNo}
                  onChange={setApplication}
                  inputRef={register}
                  style={{ width: "280px", marginBottom: "8px" }}
                ></TextInput>
              </span>
              <span className="tl-input">
                <Label>Licence No.</Label>
                <TextInput
                  name="serviceRequestId"
                  value={licenceNo}
                  onChange={setLicence}
                  inputRef={register}
                  style={{ width: "280px", marginBottom: "8px" }}
                ></TextInput>
              </span>
              <span className="tl-input">
                <Label>Mobile No.</Label>
                <TextInput name="mobileNumber" value={mobileNo} onChange={setMobile} inputRef={register} style={{ width: "280px" }}></TextInput>
              </span>
              <span className="tl-input">
                <Label>Application Type</Label>
                <Dropdown name="mobileNumber" value={mobileNo} onChange={setMobile} inputRef={register} style={{ width: "280px" }}></Dropdown>
              </span>
              <span className="tl-input">
                <Label>From Date</Label>
                <TextInput name="mobileNumber" value={""} onChange={(e) => console.log(e)} inputRef={register} style={{ width: "280px" }}></TextInput>
              </span>
              <span className="tl-input">
                <Label>To Date</Label>
                <TextInput name="mobileNumber" value={""} onChange={(e) => console.log(e)} inputRef={register} style={{ width: "280px" }}></TextInput>
              </span>
              <span className="tl-input">
                <Label>Application status</Label>
                <Dropdown name="mobileNumber" value={mobileNo} onChange={setMobile} inputRef={register} style={{ width: "280px" }}></Dropdown>
              </span>
            </div>
            {type === "desktop" && <SubmitBar style={{ marginTop: 32, marginLeft: 8 }} label="Search" submit />}
            {type === "desktop" && <span className="clear-search">{clearAll()}</span>}
          </div>
        </div>
      </React.Fragment>
    </form>
  );
};

export default SearchTradeLicence;
