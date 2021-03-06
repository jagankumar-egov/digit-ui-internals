export const newComplaintSteps = [
  {
    texts: {
      headerCaption: "",
      header: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      cardText: "CS_COMPLAINT_TYPE_TEXT",
      submitBarLabel: "PT_COMMONS_NEXT",
    },
  },
  {
    texts: {
      header: "CS_ADDCOMPLAINT_COMPLAINT_SUBTYPE_PLACEHOLDER",
      cardText: "CS_COMPLAINT_SUBTYPE_TEXT",
      submitBarLabel: "PT_COMMONS_NEXT",
    },
  },
  {
    texts: {
      headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
      header: "CS_ADDCOMPLAINT_PINCODE",
      cardText: "CS_ADDCOMPLAINT_CHANGE_PINCODE_TEXT",
      nextText: "PT_COMMONS_NEXT",
      skipText: "CORE_COMMON_SKIP_CONTINUE",
    },
    inputs: [
      {
        label: "CORE_COMMON_PINCODE",
        type: "text",
        name: "pincode",
        validation: {
          minLength: 6,
          maxLength: 7,
        },
        error: "CORE_COMMON_PINCODE_INVALID",
      },
    ],
  },
  {
    texts: {
      headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
      header: "CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS",
      cardText: "CS_ADDCOMPLAINT_CITY_MOHALLA_TEXT",
      nextText: "PT_COMMONS_NEXT",
    },
  },
  {
    texts: {
      headerCaption: "CS_ADDCOMPLAINT_COMPLAINT_LOCATION",
      header: "CS_ADDCOMPLAINT_PROVIDE_LANDMARK",
      cardText: "CS_ADDCOMPLAINT_PROVIDE_LANDMARK_TEXT",
      nextText: "PT_COMMONS_NEXT",
      skipText: "CORE_COMMON_SKIP_CONTINUE",
    },
    inputs: [
      {
        label: "CS_ADDCOMPLAINT_LANDMARK",
        type: "textarea",
        name: "landmark",
      },
    ],
  },
  {
    texts: {
      header: "CS_ADDCOMPLAINT_UPLOAD_PHOTO",
      cardText: "CS_ADDCOMPLAINT_UPLOAD_PHOTO_TEXT",
      nextText: "PT_COMMONS_NEXT",
      skipText: "CORE_COMMON_SKIP_CONTINUE",
    },
  },
  {
    texts: {
      header: "CS_ADDCOMPLAINT_PROVIDE_ADDITIONAL_DETAILS",
      cardText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_TEXT",
      nextText: "PT_COMMONS_NEXT",
    },
    inputs: [
      {
        label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
        type: "textarea",
        name: "details",
      },
    ],
  },
  {
    texts: {
      cardText: "CS_COMMON_TRACK_COMPLAINT_TEXT",
      nextText: "CORE_COMMON_GO_TO_HOME",
    },
  },
];
