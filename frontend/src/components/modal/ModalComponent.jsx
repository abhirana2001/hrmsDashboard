import React from "react";
import "./ModalComponent.css";
import FloatingLabelInput from "../floatinglabelinput/FloatingLabelInput";
import FloatingUploadInput from "../floatinguploadinput/FloatingUploadInput";

import FloatingDropdown from "../floatingdropdown/FloatingDropdown";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import { candidateSchema } from "../../validation/candidateValidation";
import { axiosInstance } from "../../features/axiosInstance";
import { position } from "../../features/dropDownValues";

function ModalComponent({ isOpen, onClose }) {
  if (!isOpen) return null;
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNo: "",
      position: "",
      experience: "",
      resume: null,
      agree: false,
    },
    validationSchema: candidateSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phoneNo", values.fullName);
        formData.append("resume", values.resume);
        formData.append("position", values.fullName);
        formData.append("experience", values.experience);

        const res = await axiosInstance.post(`/candidate`, formData);
        console.log(res);

        onClose();
      } catch (err) {
        console.log(err);

        setMessage({ message: err?.response?.data?.message, color: "red" });
      }
    },
  });

  return (
    <div className="modal__container">
      <div className="modal">
        <div className="modal__header">
          <h2>Add New Candidate</h2>
          <button className="close__btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="modal__body">
          <div className="modal__group">
            <FloatingLabelInput
              formik={formik}
              label={"Full Name*"}
              name={"fullName"}
            />

            <FloatingLabelInput
              formik={formik}
              type="email"
              label={"Email Address*"}
              name={"email"}
            />

            <FloatingLabelInput
              formik={formik}
              type="text"
              label={"Phone Number*"}
              name={"phoneNo"}
            />
            <FloatingLabelInput
              formik={formik}
              label={"Experience*"}
              name={"experience"}
            />
            <FloatingUploadInput
              formik={formik}
              name={"resume"}
              label={"Resume*"}
            />
            <FloatingDropdown
              name="position"
              label="Position*"
              formik={formik}
              options={position}
            />
          </div>

          <div className="checkbox__group">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formik.values.agree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="agree">
              I hereby declare that the above information is true to the best of
              my knowledge and belief
            </label>
            {formik.touched.agree && formik.errors.agree && (
              <div style={{ color: "red" }}>{formik.errors.agree}</div>
            )}
          </div>
          <div className="btn_wrapper">
            <Button btnType="submit" btnName={"Save"} />
          </div>
          {message.message && (
            <div className="message__container">
              <p style={{ color: message.color }}>{message.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalComponent;
