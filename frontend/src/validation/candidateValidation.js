import * as yup from "yup";

export const candidateSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  email: yup.string().email("Invalid email").required("Email is required"),

  phoneNo: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),

  position: yup.string().required("Please select a position"),
  experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(0, "Cannot be negative")
    .max(50, "Too much experience 🤔"),
  resume: yup.mixed().required("Resume is required"),

  agree: yup.bool().oneOf([true], "You must accept the terms"),
});
