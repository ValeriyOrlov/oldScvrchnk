import { useState } from "react";
import { isString, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [authFailed, setAuthFailed] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    onSubmit: async (values) => {
        await login(values);
        navigate("/");
    }
  });


  return (
    <div className="form-box">
      <div className="form-box-img__container">
        <img
          className="form-box__img"
          alt="login_form_img"
        />
      </div>
      <div className="form-box__container">
        <h1 className="form-box__header">Registration</h1>
        <form className="form-box__form" onSubmit={formik.handleSubmit}>
          <div className="form-input__container">
            <input
              className="form-input"
              type="text"
              name="name"
              autoComplete="off"
              {...formik.getFieldProps("name")}
            />
            <label className="form-label" htmlFor="email">
              username
            </label>
          </div>
          <div className="form-input__container">
            <input
              className="form-input"
              type="text"
              name="email"
              autoComplete="off"
              {...formik.getFieldProps("email")}
            />
            <label className="form-label" htmlFor="email">
              email
            </label>
          </div>
          <div className="form-input__container">
            <input
              className="form-input"
              type= "password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            <label className="form-label" htmlFor="password">
              password
            </label>
          </div>
          <button className="form-button" type="submit">
          go
          </button>
        </form>
      </div>
      <footer className="form-box__footer">
        <span>Already have acc?</span>
        <a className="form-box__link" href="/login">
          login
        </a>
      </footer>
    </div>
  )
}

export default RegistrationForm;