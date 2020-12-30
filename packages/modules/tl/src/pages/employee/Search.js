import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "@egovernments/digit-ui-react-components";

import DesktopInbox from "../../components/DesktopInbox";
import MobileInbox from "../../components/MobileInbox";
import useInboxData from "../../hooks/useInboxData";
import { fetchTradelicences } from "../../redux/actions";
import { response } from "../../constants/tl";

const Search = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { t } = useTranslation();
  const getFilteredComplaints = useCallback((params) => dispatch(fetchTradelicences(params)), [dispatch]);
  const [searchParams, setSearchParams] = useState({ filters: {}, search: "", sort: {} });
  let complaints = (state && state.tl && state.tl.tradelicence && state.tl.tradelicence.response) || JSON.parse(response);

  const handleFilterChange = (filterParam) => {
    setSearchParams({ ...searchParams, filters: filterParam });
  };

  const onSearch = (params = "") => {
    console.log("onSubmit--------", params);
    // setSearchParams({ ...searchParams, search: params,mobileNumber:'9965664222' });
    getFilteredComplaints({ params });
  };

  complaints = JSON.parse(response);

  useEffect(() => {
    getFilteredComplaints();
  }, [getFilteredComplaints]);

  let isMobile = window.mobileCheck();
  console.log("window.mobileCheck:", isMobile);
  console.log("searchParams:::::>", searchParams);
  if (complaints.length !== null) {
    if (isMobile) {
      return <MobileInbox data={complaints} onFilterChange={handleFilterChange} />;
    } else {
      return <DesktopInbox data={complaints} onFilterChange={handleFilterChange} onSearch={onSearch} />;
    }
  } else {
    return <Loader />;
  }
};

export default Search;
