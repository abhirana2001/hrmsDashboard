import { axiosInstance } from "./axiosInstance";

export const candidateOnSubmitFunction = async (
  values,
  setMessage,
  onClose
) => {
  try {
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phoneNo", values.phoneNo);
    formData.append("resume", values.resume);
    formData.append("position", values.position);
    formData.append("experience", values.experience);

    const res = await axiosInstance.post(`/candidate`, formData);

    onClose();
  } catch (err) {
    console.log(err);

    setMessage({ message: err?.response?.data?.message, color: "red" });
  }
};

export const employeeOnSubmitFunction = async (
  values,
  setMessage,
  onClose,
  id
) => {
  try {
    console.log(id);

    const res = await axiosInstance.patch(`/employee/${id}`, values);

    onClose();
  } catch (err) {
    console.log(err);

    setMessage({ message: err?.response?.data?.message, color: "red" });
  }
};

export const attendanceOnSubmitFunction = async (
  values,
  setMessage,
  onClose,
  id
) => {
  try {
    console.log(id);

    const res = await axiosInstance.patch(`/attendance/${id}`, values);

    onClose();
  } catch (err) {
    console.log(err);

    setMessage({ message: err?.response?.data?.message, color: "red" });
  }
};

export const leaveOnSubmitFunction = async (values, setMessage, onClose) => {
  try {
    const formData = new FormData();
    formData.append("fullName", values?.fullName);
    formData.append("employeeId", values?.employeeId);
    formData.append("designation", values?.designation);
    formData.append("documentation", values?.documentation);
    formData.append("reason", values.reason);
    formData.append("leaveDate", values.leaveDate);
    console.log(formData, "formData");

    const res = await axiosInstance.post(`/leave`, formData);

    onClose();
  } catch (err) {
    console.log(err);

    setMessage({ message: err?.response?.data?.message, color: "red" });
  }
};
