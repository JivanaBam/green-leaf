import yup from "yup";

export const registerAdminValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(50, "Name must be at max 50 characters.")
    .required("Name is required."),
  email: yup
    .string()
    .trim()
    .email("Email must be valid.")
    .required("Email is required.")
    .max(60, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be at max 20 characters.")
    .trim()
    .required("Password is required."),
  role: yup
    .string()
    .required("Role is required.")
    .trim()
    .oneOf(["admin", "user"], "Role must be either admin or user."),
});

export const loginAdminValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email must be valid.")
    .required("Email is required.")
    .max(60, "Email must be at max 60 characters.")
    .lowercase(),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be at max 20 characters.")
    .trim()
    .required("Password is required."),
});
