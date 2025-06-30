import React from "react";
import "./ModalComponent.css";
import FloatingLabelInput from "../floatinglabelinput/FloatingLabelInput";
import FloatingUploadInput from "../floatinguploadinput/FloatingUploadInput";
import FloatingDropdown from "../floatingdropdown/FloatingDropdown";
import Button from "../button/Button";
import { useState } from "react";
import { useFormik } from "formik";
import {
  attendanceStatus,
  employeePositions,
  position,
} from "../../features/dropDownValues";
import FloatingSearchInput from "../floatingsearchinput/FloatingSearchInput";
import { data } from "react-router-dom";

function ModalComponent({
  id,
  currentType,
  isOpen,
  onClose,
  submitFunc,
  initialValues,
  validationSchema,
}) {
  if (!isOpen) return null;
  console.log(currentType, "current");

  const [message, setMessage] = useState({});

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitFunc(values, setMessage, onClose, id);
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
            {["Candidate", "Employee"].includes(currentType) && (
              <>
                {" "}
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
                />{" "}
              </>
            )}

            {currentType == "Candidate" && (
              <>
                <FloatingDropdown
                  name="position"
                  label="Position*"
                  formik={formik}
                  options={position}
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
              </>
            )}

            {currentType == "Employee" && (
              <>
                <FloatingLabelInput
                  formik={formik}
                  label={"Department*"}
                  name={"department"}
                />
                <FloatingDropdown
                  options={employeePositions}
                  name="position"
                  label="Position*"
                  formik={formik}
                />
                <FloatingLabelInput
                  formik={formik}
                  label={"Date of joining*"}
                  name={"dateOfJoining"}
                  type="date"
                />
              </>
            )}
            {currentType == "Attendance" && (
              <>
                <FloatingLabelInput
                  formik={formik}
                  label={"Task*"}
                  name={"task"}
                />
                <FloatingDropdown
                  options={attendanceStatus}
                  name="status"
                  label="Status*"
                  formik={formik}
                />
              </>
            )}

            {currentType == "Leaves" && (
              <>
                <FloatingSearchInput
                  name={"fullName"}
                  label={"Search Employee Name"}
                  formik={formik}
                />
                <FloatingLabelInput
                  formik={formik}
                  label={"Designation*"}
                  name={"designation"}
                />
                <FloatingLabelInput
                  formik={formik}
                  label={"Leave Date*"}
                  name={"leaveDate"}
                  type="date"
                />
                <FloatingUploadInput
                  formik={formik}
                  name={"documentation"}
                  label={"Documentation*"}
                />
                <FloatingLabelInput
                  formik={formik}
                  label={"Reason*"}
                  name={"reason"}
                />
              </>
            )}
          </div>

          {currentType == "Candidate" && (
            <>
              <div className="checkbox__group">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  checked={formik?.values?.agree}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                />
                <label htmlFor="agree">
                  I hereby declare that the above information is true to the
                  best of my knowledge and belief
                </label>
                {formik.touched.agree && formik.errors.agree && (
                  <div style={{ color: "red" }}>{formik.errors.agree}</div>
                )}
              </div>
            </>
          )}

          <div className="btn_wrapper">
            <Button formik={formik} btnType="submit" btnName={"Save"} />
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
