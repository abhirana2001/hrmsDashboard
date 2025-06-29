import * as yup from "yup";

export const employeeSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters")
    .required("Full name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  phoneNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  position: yup.string().required("Position is required"),

  department: yup.string().required("Department is required"),

  dateOfJoining: yup
    .date()
    .typeError("Invalid date")
    .required("Date of joining is required")
    .max(new Date(), "Joining date can't be in the future"),
});
