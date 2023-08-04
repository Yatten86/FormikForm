import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

// const validate = (values) => {
//   //values.name values.email values.channel
//   //errors.name errors.email errors.channel
//   //errors.name = 'This field is required'
//   let errors = {};
//
//   if (!values.name) {
//     errors.name = "This field is required";
//   }
//
//   if (!values.email) {
//     errors.email = "This field is required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email format";
//   }
//
//   if (!values.channel) {
//     errors.channel = "This field is required";
//   }
//
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("This field is required"),
  channel: Yup.string().required("This field is required"),
});

function YoutubeForm() {
  let formik = useFormik({
    initialValues,
    onSubmit,
    //validate
    validationSchema,
  });

  console.log("Visited fields", formik.touched);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/*  Name input area */}
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {/*if visited and empty error will be printed*/}
          {formik.touched.name && formik.errors.name ? (
            <div className={"error"}>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          {/*  E-mail input area */}
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {/*if visited and empty error will be printed*/}
          {formik.touched.email && formik.errors.email ? (
            <div className={"error"}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          {/*  Channel input area */}
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {/*if visited and empty error will be printed*/}
          {formik.touched.channel && formik.errors.channel ? (
            <div className={"error"}>{formik.errors.channel}</div>
          ) : null}
        </div>

        {/*  Submit button*/}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;
