import { Button, Container, TextField } from "@material-ui/core";
import { isEmail, isEmpty } from "class-validator";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";

const RegisterForm = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
        }}
        validate={(values) => {
          const errors: any = {};

          if (isEmpty(values.email)) {
            errors.email = "Falta Email";
          } else if (!isEmail(values.email)) {
            errors.email = "Email invalido";
          } else if (
            isEmpty(values.password) ||
            isEmpty(values.confirmPassword)
          ) {
            errors.password = "Falta contraseña";
          } else if (values.password !== values.confirmPassword) {
            errors.password = "Contraseñas distintas";
          } else if (isEmpty(values.name)) {
            errors.name = "Falta un Nombre";
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
            <div />
            <Field
              placeholder="Contraseña"
              name="password"
              type="password"
              as={TextField}
            />
            <div />
            <Field
              placeholder="Confirma Contraseña"
              name="confirmPassword"
              type="password"
              as={TextField}
            />
            <ErrorMessage name="password" component="div" />
            <div />
            <Field
              placeholder="Nombre de Organizacion"
              name="name"
              type="input"
              as={TextField}
            />
            <ErrorMessage name="name" component="div" />
            <div />
            <Button type="submit" disabled={isSubmitting}>
              Crear
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterForm;
