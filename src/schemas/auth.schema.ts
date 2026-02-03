import z from "zod";

// Sign Up Schema
export const signUpSchema = z
  .object({
    firstName: z.string().min(2, "Too short").trim(),
    lastName: z.string().min(2, "Too short").trim(),
    email: z.email("Enter a valid email").trim(),
    password: z
      .string()
      .min(6, "Atleast 6 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignUpFormError = Partial<Record<keyof SignUpSchema, string[]>>;

// Sign up Verify Email code Schema
export const verifyEmailScema = z.string().min(6, "Please fill up this field");

export type VerifyEmailScema = z.infer<typeof verifyEmailScema>;

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").trim().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
export type SignInSchema = z.infer<typeof signInSchema>;
export type SignInFormError = Partial<Record<keyof SignInSchema, string[]>>;

// Sign in Verify Email code Schema
export const verifyEmailScema2 = z.string().min(6, "Please fill up this field");

export type VerifyEmailScema2 = z.infer<typeof verifyEmailScema2>;

//Forgot Password Schema
export const forgotPassSchema = z
  .object({
    code: z.string().min(6, "Please fill up this field"),
    password: z
      .string()
      .min(6, "Atleast 6 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPassSchema = z.infer<typeof forgotPassSchema>;

export type ForgotPassError = Partial<Record<keyof ForgotPassSchema, string[]>>;
