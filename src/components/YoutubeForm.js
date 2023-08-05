import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

let engLang = require("../lang/english.json");
let roLang = require("../lang/romanian.json");

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Field is required";
  }
  return error;
};

function YoutubeForm() {
  let [lang, setLang] = useState(engLang);

  let changeLanguage = () => {
    setLang(lang === engLang ? roLang : engLang);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(lang.form.label.errors.required),
    email: Yup.string()
      .email(lang.form.label.errors.invalid_format)
      .required(lang.form.label.errors.required),
    channel: Yup.string().required(lang.form.label.errors.required),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      // validateOnMount
    >
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <button type="button" onClick={changeLanguage}>
              {lang.form.label.buttons.lang}
            </button>

            <div className="form-control">
              <label htmlFor="name">{lang.form.label.name}</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder={lang.form.label.placeholder.name}
              />
              {/*if visited and empty error will be printed*/}
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">{lang.form.label.email}</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder={lang.form.label.placeholder.email}
              />
              {/*if visited and empty error will be printed*/}
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">{lang.form.label.channel}</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder={lang.form.label.placeholder.channel}
              />
              {/*if visited and empty error will be printed*/}
              <ErrorMessage name="channel" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">{lang.form.label.address}</label>
              <Field type="text" id="address" name="address">
                {(props) => {
                  let { field, form, meta } = props;
                  // console.log("Render props", props);
                  return (
                    <div>
                      <input
                        type="text"
                        id="address"
                        {...field}
                        placeholder={lang.form.label.placeholder.address}
                      />
                      {meta.touched && meta.error ? (
                        <div>{meta.error} </div>
                      ) : null}
                    </div>
                  );
                }}
              </Field>
              {/*if visited and empty error will be printed*/}
              <ErrorMessage name="address" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">{lang.form.label.comments}</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
                placeholder={lang.form.label.placeholder.comments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">{lang.form.label.fb}</label>
              <Field
                type="text"
                id="facebook"
                name="social.facebook"
                placeholder={lang.form.label.placeholder.fb}
              />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">{lang.form.label.tw}</label>
              <Field
                type="text"
                id="twitter"
                name="social.twitter"
                placeholder={lang.form.label.placeholder.tw}
              />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">{lang.form.label.prim_ph}</label>
              <Field
                type="text"
                id="primaryPh"
                name="phoneNumbers[0]"
                placeholder={lang.form.label.placeholder.prim_ph}
              />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">{lang.form.label.sec_ph}</label>
              <Field
                type="text"
                id="secondaryPh"
                name="phoneNumbers[1]"
                placeholder={lang.form.label.placeholder.sec_ph}
              />
            </div>

            <div className="form-control">
              <label>{lang.form.label.list_ph}</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  // console.log("fieldArrayProps", fieldArrayProps);
                  let { push, remove, form } = fieldArrayProps;
                  let { values } = form;
                  let { phNumbers } = values;
                  // console.log("Form errors", form.errors);
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field type="text" name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}

                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/*<button*/}
            {/*  type="button"*/}
            {/*  onClick={() => formik.validateField("comments")}*/}
            {/*>*/}
            {/*  Validate comments*/}
            {/*</button>*/}
            {/*<button type="button" onClick={() => formik.validateForm()}>*/}
            {/*  Validate all*/}
            {/*</button>*/}
            {/*  Submit button*/}
            {/* Submit button is disabled until user interact with the form*/}
            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
