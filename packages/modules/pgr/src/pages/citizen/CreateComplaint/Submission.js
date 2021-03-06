import React from "react";
import { SubmitBar, Card, Banner, CardText } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BannerPicker = ({ appState }) => {
  if (appState.complaints && appState.complaints.responseInfo) {
    return (
      <Banner message="Complaint Submitted" complaintNumber={appState.complaints.ServiceWrappers[0].service.serviceRequestId} successful={true} />
    );
  } else {
    return <Banner message="Complaint Not Submitted" successful={false} />;
  }
};

const Submission = (props) => {
  const appState = useSelector((state) => state)["common"];
  return (
    <Card>
      <BannerPicker appState={appState} />
      <CardText>
        The notification along with complaint number is sent to your registered mobile number. You can track the complaint status using mobile or web
        app.
      </CardText>
      <Link to="/digit-ui/">
        <SubmitBar label={`${LOCALIZATION_KEY.CORE_COMMON}_GO_TO_HOME`} />
      </Link>
    </Card>
  );
};

export default Submission;
