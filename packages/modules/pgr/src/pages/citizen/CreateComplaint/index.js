import React, { useState, useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import UserOnboarding from "../UserOnboarding/index";
import SubType from "./SubType";
import LocationSearch from "./LocationSearch";
import Pincode from "./Pincode";
import Address from "./Address";
import Landmark from "./Landmark";
import UploadPhotos from "./UploadPhotos";
import Details from "./Details";
import Response from "../Response";
import { createComplaint } from "../../../redux/actions/index";
import ComplaintType from "./ComplaintType";
import { PgrRoutes, getRoute } from "../../../constants/Routes";

const CreateComplaint = ({ match, history }) => {
  const SessionStorage = Digit.SessionStorage;
  const dispatch = useDispatch();
  const appState = useSelector((state) => state)["common"];
  console.log("appstate", appState);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState(null);
  const [locality, setLocality] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [details, setDetails] = useState("");
  const [complaintType, setComplaintType] = useState(null);
  const [toSubmitComplaint, setToSubmitComplaint] = useState(false);
  const [uploadedImageIds, setUploadedImageIds] = useState([]);
  const citAuth = Digit.SessionStorage.get("citizen.token");
  console.log(citAuth);
  const [adressList, setAddressList] = useState({});

  const complaintParams = {
    cityCode: appState.cityCode,
    complaintType: complaintType,
    description: details,
    landmark: landmark !== null ? landmark : "",
    city: city,
    district: city,
    region: city,
    state: appState.stateInfo.name,
    pincode: pincode,
    localityCode: locality !== null ? locality.code : "",
    localityName: locality !== null ? locality.name : "",
    uploadedImages: uploadedImageIds.map((url) => {
      return {
        documentType: "PHOTO",
        fileStore: url,
        documentUid: "",
        additionalDetails: {},
      };
    }),
  };

  // const [createComplaintParams, setComplaintParams] = useState(complaintParams);

  useEffect(() => {
    if (appState.complaints && appState.complaints.responseInfo) {
      history.push("/create-complaint/response");
    }
  }, [appState.complaints]);

  useEffect(() => {
    (async () => {
      if (toSubmitComplaint) {
        await dispatch(createComplaint(complaintParams));
        setToSubmitComplaint(false);
      }
    })();
  }, [toSubmitComplaint]);

  useEffect(() => {
    if (pincode) {
      setAddressList({ city: "Amritsar", localities: Digit.PincodeMap[pincode] });
    }
  }, [pincode]);

  const savePincode = (val) => {
    setPincode(val);
  };

  const saveAddress = (city, locality) => {
    setCity(city);
    setLocality(locality);
    console.log(city, locality, complaintParams);
  };

  const saveLandmark = (landmark) => {
    setLandmark(landmark);
  };

  const submitComplaint = async (details) => {
    details && details !== "" ? setDetails(details) : null;
    setToSubmitComplaint(true);
  };

  const saveComplaintType = (type) => {
    setComplaintType(type);
  };

  const saveImagesUrl = (imageUrls) => {
    imageUrls === null ? setUploadedImageIds([]) : setUploadedImageIds(imageUrls);
  };
  return (
    <Switch>
      {/* <Route
        path={match.url + "/onboarding"}
        component={(props) => <UserOnboarding />}
      /> */}
      <Route
        exact
        path={getRoute(match, PgrRoutes.CreateComplaintStart)}
        component={(props) => <ComplaintType save={saveComplaintType} match={match} />}
        // component={(props) => <ComplaintTypeConfig />}
      />
      <Route path={getRoute(match, PgrRoutes.SubType)} component={(props) => <SubType save={saveComplaintType} match={match} />} />
      <Route
        path={getRoute(match, PgrRoutes.LocationSearch)}
        component={(props) => <LocationSearch save={(val) => savePincode(val)} skip={true} match={match} />}
      />
      <Route
        path={getRoute(match, PgrRoutes.Pincode)}
        component={(props) => <Pincode save={(val) => savePincode(val)} skip={true} match={match} pincode={pincode} />}
      />
      <Route path={getRoute(match, PgrRoutes.Address)} component={(props) => <Address list={adressList} save={saveAddress} match={match} />} />
      <Route path={getRoute(match, PgrRoutes.Landmark)} component={(props) => <Landmark save={saveLandmark} match={match} />} />
      <Route path={getRoute(match, PgrRoutes.UploadPhotos)} component={(props) => <UploadPhotos save={saveImagesUrl} skip={true} match={match} />} />
      <Route
        path={getRoute(match, PgrRoutes.Details)}
        component={(props) => <Details submitComplaint={submitComplaint} skip={false} match={match} />}
      />
      <Route path={getRoute(match, PgrRoutes.CreateComplaintResponse)} component={(props) => <Response match={match} />} />
    </Switch>
  );
};

export { CreateComplaint };
