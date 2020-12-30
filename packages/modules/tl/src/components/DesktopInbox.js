import { CheckBox } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useRouteMatch } from "react-router-dom";
import ComplaintsLink from "./inbox/ComplaintLinks";
import ComplaintTable from "./inbox/ComplaintTable";
import Filter from "./inbox/Filter";
import SearchTradeLicence from "./inbox/search";
import { useHistory } from "react-router-dom";

const DesktopInbox = (props) => {
  const { t } = useTranslation();
  let { match } = useRouteMatch();
  const GetCell = (value) => <span style={{ color: "#505A5F" }}>{value}</span>;
  const GetSlaCell = (value) => {
    return value < 0 ? (
      <span style={{ color: "#D4351C", backgroundColor: "rgba(212, 53, 28, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
    ) : (
      <span style={{ color: "#00703C", backgroundColor: "rgba(0, 112, 60, 0.12)", padding: "0 24px", borderRadius: "11px" }}>{value}</span>
    );
  };
  const history = useHistory();

  function goTo(id) {
    console.log("id", id);
    history.push("/digit-ui/employee/pgr/complaint/details/" + id);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: t("CS_COMMON_COMPLAINT_NO"),
        Cell: (row) => {
          return (
            <div>
              <span className="link">
                <Link to={"/digit-ui/employee/pgr/complaint/details/" + row.row.original["serviceRequestId"]}>
                  {row.row.original["serviceRequestId"]}
                </Link>
              </span>
              {/* <a onClick={() => goTo(row.row.original["serviceRequestId"])}>{row.row.original["serviceRequestId"]}</a> */}
              <br />
              <span style={{ marginTop: "4px", color: "#505A5F" }}>{t(`SERVICEDEFS.${row.row.original["complaintSubType"].toUpperCase()}`)}</span>
            </div>
          );
        },
      },
      {
        Header: t("WF_INBOX_HEADER_LOCALITY"),
        Cell: (row) => {
          return GetCell(
            t(row.row.original["locality"].includes("_") ? row.row.original["locality"] : `PB_AMRITSAR_ADMIN_${row.row.original["locality"]}`)
          );
        },
      },
      {
        Header: t("CS_COMPLAINT_DETAILS_CURRENT_STATUS"),
        Cell: (row) => {
          return GetCell(t(`CS_COMMON_${row.row.original["status"]}`));
        },
      },
      {
        Header: t("WF_INBOX_HEADER_CURRENT_OWNER"),
        Cell: (row) => {
          return GetCell(row.row.original["taskOwner"]);
        },
      },
      {
        Header: t("WF_INBOX_HEADER_SLA_DAYS_REMAINING"),
        Cell: (row) => {
          return GetSlaCell(row.row.original["sla"]);
        },
      },
    ],
    []
  );

  return (
    <div className="inbox-container">
      <div className="employeeCard">
        <header class="card-header">Search Trade Licence Application</header>
        <p class="card-text">Please provide at least one parameter to search for an application.</p>
        <SearchTradeLicence onSearch={props.onSearch} type="desktop" />
      </div>
      <div style={{ marginTop: "24px", marginTop: "24px", width: "874px", marginLeft: "24px" }}>
        <ComplaintTable
          data={props.data}
          columns={columns}
          getCellProps={(cellInfo) => {
            return {
              style: {
                minWidth: cellInfo.column.Header === t("CS_COMMON_COMPLAINT_NO") ? "240px" : "",
                padding: "20px 18px",
                fontSize: "16px",
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default DesktopInbox;
