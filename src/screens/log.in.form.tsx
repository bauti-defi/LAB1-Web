import { Button, Container, TextField } from "@material-ui/core";
import { isEmail, isEmpty } from "class-validator";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { logIn } from "../requests/portal.requests";

const LogInForm = () => {
  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          const jwt = await logIn(values.email, values.password)
            .then((res) => {
              if (!isEmpty(res.data)) {
                return res.data;
              }
            })
            .catch((error) => console.log(error));

          setSubmitting(false);
        }}
        validate={(values) => {
          const errors: any = {};

          if (isEmpty(values.email)) {
            errors.email = "Falta Email";
          } else if (!isEmail(values.email)) {
            errors.email = "Email invalido";
          } else if (isEmpty(values.password)) {
            errors.password = "Falta contraseña";
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              placeholder="Email"
              name="email"
              type="input"
              as={TextField}
            />
            <ErrorMessage name="email" component="div" />
            <div>
              <Field
                placeholder="Contraseña"
                name="password"
                type="password"
                as={TextField}
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Ingresar
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LogInForm;
