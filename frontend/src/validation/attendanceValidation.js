import * as yup from "yup";

export const attendanceSchema = yup.object().shape({
  task: yup.string().required("Task is required"),
  status: yup
    .string()
    .oneOf(
      ["Present", "Absent", "Medical Leave", "Work from Home"],
      "Invalid status"
    )
    .required("Status is required"),
});
