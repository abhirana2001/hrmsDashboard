import * as Yup from "yup";

export const candidateSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phoneNo: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),

  position: Yup.string().required("Please select a position"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(0, "Cannot be negative")
    .max(50, "Too much experience 🤔"),
  resume: Yup.mixed().required("Resume is required"),

  agree: Yup.bool().oneOf([true], "You must accept the terms"),
});
