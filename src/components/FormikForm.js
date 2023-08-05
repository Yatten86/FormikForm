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

let onSubmit = (values, onSubmitProps) => {
  console.log("Form data", values);
  onSubmitProps.resetForm();
};

function FormikForm() {
  let [lang, setLang] = useState(engLang);

  let changeLanguage = () => {
    setLang(lang === engLang ? roLang : engLang);
  };

  let validationSchema = Yup.object({
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
    >
      {(formik) => {
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
                  let { field, meta } = props;
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
                  let { push, remove, form } = fieldArrayProps;
                  let { values } = form;
                  let { phNumbers } = values;
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
                            {lang.form.label.buttons.add}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button type="submit" disabled={!formik.dirty && formik.isValid}>
              {lang.form.label.buttons.submit}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikForm;
