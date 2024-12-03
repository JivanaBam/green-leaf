import yup from "yup";

export const postValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Ttile is required.")
    .max(75, "Ttile must be at max 75 characters.")
    .min(5, "Title must be atleast 5 characters."),
  excerpt: yup
    .string()
    .trim()
    .required("Excerpt is required.")
    .max(250, "Excerpt must be at max 250 characters."),
  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .max(3000, "Description must be at max 3000 characters.")
    .min(100, "Description must be atleast 100 characters."),
  image: yup.string().nullable(),
  seoTitle: yup
    .string()
    .trim()
    .required("SEO title is required.")
    .max(1500, "SEO title must be at max 1500 characters."),
  seoKeywords: yup
    .array()
    .required("SEO keywords is required.")
    .max(500, "SEO keywords must be at max 500 characters."),
  seoDescription: yup
    .string()
    .trim()
    .required("SEO description is required.")
    .max(2000, "SEO description must be at max 2000 characters.")
    .min(100, "SEO description must be atleast 100 characters."),
  remark: yup.number().nullable(),
  status: yup.number().default(1),
});
