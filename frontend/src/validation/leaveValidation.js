import * as yup from "yup";

export const leaveSchema = yup.object({
  fullName: yup.string().trim().required("Employee name is required"),

  designation: yup.string().trim().required("Designation is required"),

  leaveDate: yup
    .date()
    .typeError("Please pick a valid date")
    .required("Leave date is required")

    .min(new Date(), "Leave date cannot be in the past"),

  documentation: yup.mixed().required("Documentation is required"),

  reason: yup
    .string()
    .trim()
    .max(500, "Reason must be 500 characters or fewer")
    .required("Reason is required"),
});
