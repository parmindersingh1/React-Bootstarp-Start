export const getInputClasses = (meta, isSubmitting = true, fieldname) => {
  let result = "form-control h-auto py-2 px-3 ";
  if (isSubmitting) {
    if (meta.touched && meta.error) {
      result += " is-invalid";
    }

    if (meta.touched && !meta.error) {
      result += " is-valid";
    }
  }

  return result;
};

export const getInputNoPaddingClasses = (
  meta,
  isSubmitting = true,
  fieldname
) => {
  let result = "form-control h-auto ";
  if (isSubmitting) {
    if (meta.touched && meta.error) {
      result += " is-invalid";
    }

    if (meta.touched && !meta.error) {
      result += " is-valid";
    }
  }

  return result;
};

export const getInputNoPaddClasses = (meta, isSubmitting = true, fieldname) => {
  let result = "form-control h-auto ";
  if (isSubmitting) {
    if (meta.error) {
      result += " is-invalid";
    }

    if (!meta.error) {
      result += " is-valid";
    }
  }

  return result;
};

export const isValidURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
export const allPrimitiveTypes = [
  "double",
  "float",
  "int32",
  "int64",
  "uint32",
  "uint64",
  "sint32",
  "sint64",
  "fixed32",
  "fixed64",
  "sfixed32",
  "number",
  "bool",
  "string",
  "bytes",
];

export const allMainTypes = {
  QtyNumeric: [
    "value",
    "double_value",
    "float_value",
    "uint32_value",
    "uint64_value",
    "sint32_value",
    "sint64_value",
  ],
  QtySymbolic: ["value"],
  QtyOrdinal: ["value"],
  QtySpatial: ["value"],
  QtyTemporal: ["value","date", "time", "date_time", "date_range", "time_range", "duration"],
  QtyMonetary: ["value","double_value"],
  QtyDemographic: ["value"],
};

export const allSubTypes = [
    "float_value",
    "double_value",
    "uint64_value",
    "uint32_value",
    "sint64_value",
    "sint32_value",
    "value",
    "date",
    "time",
    "date_time",
    "date_range",
    "time_range",
    "duration"
];

