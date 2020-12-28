import { useEffect, useState } from "react";

const useInboxData = (searchParams) => {
  console.log("searchParams--------:", searchParams);
  const [complaintList, setcomplaintList] = useState([]);
  //let serviceReqIds = "";
  const tenantId = "pb.amritsar";
  let serviceIds = [];
  let filters = { start: 1, end: 10, ...searchParams.filters, ...searchParams.search };
  useEffect(() => {
    let complaintDetailsResponse = null;
    let getComplaintResponse = async () => {
      complaintDetailsResponse = await Digit.PGRService.search(tenantId, filters);
      console.log("complaintDetailsResponse", complaintDetailsResponse, filters);
      complaintDetailsResponse.ServiceWrappers.forEach((service) => serviceIds.push(service.service.serviceRequestId));
      const serviceIdParams = serviceIds.join();
      const workflowInstances = await Digit.WorkflowService.getByBusinessId(tenantId, serviceIdParams, filters, false);
      //console.log("serviceIdParams:", serviceIdParams, "workflowInstances:", workflowInstances);
      let combinedRes = combineResponses(complaintDetailsResponse, workflowInstances).map((data) => ({
        ...data,
        sla: Math.round(data.sla / (24 * 60 * 60 * 1000)),
      }));
      setcomplaintList(combinedRes);
    };
    getComplaintResponse();
  }, [searchParams]);
  return complaintList;
};

const mapWfBybusinessId = (wfs) => {
  return wfs.reduce((object, item) => {
    return { ...object, [item["businessId"]]: item };
  }, {});
};

const combineResponses = (complaintDetailsResponse, workflowInstances) => {
  let wfMap = mapWfBybusinessId(workflowInstances.ProcessInstances);
  return complaintDetailsResponse.ServiceWrappers.map((complaint) => ({
    serviceRequestId: complaint.service.serviceRequestId,
    complaintSubType: complaint.service.serviceCode,
    locality: complaint.service.address.locality.code,
    status: complaint.service.applicationStatus,
    taskOwner: wfMap[complaint.service.serviceRequestId].assigner.name,
    sla: wfMap[complaint.service.serviceRequestId].businesssServiceSla,
  }));
};

export default useInboxData;