import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import Iconify from "./Iconify";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/slices/userSlice";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Mail is required"),
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/,
        "Must Contain between 8  to 15 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(addUser(values));
      navigate("/Movies", { replace: true });
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    setSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <Paper elevation={3} className={"login-paper"}>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className={"login-form"}
        >
          <Stack spacing={3}>
            <TextField
              type={"email"}
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              label="Password"
              {...getFieldProps("password")}
              type={showPassword ? "text" : "password"}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Link
                variant="subtitle2"
                underline="hover"
                style={{ cursor: "pointer" }}
              >
                Forgot password?
              </Link>
              <Checkbox name="remember" aria-label="Remember me" />
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Login
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Paper>
  );
};

export default LoginForm;
