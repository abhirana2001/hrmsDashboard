import React, { useEffect } from "react";
import "./AttendencePage.css";
import DropdownComponent from "../../components/dropdown/DropdownComponent";
import { attendanceStatus, position } from "../../features/dropDownValues";
import SearchInput from "../../components/searchinput/SearchInput";

import { useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import { axiosInstance } from "../../features/axiosInstance";
import DotDropdown from "../../components/dotdropdown/DotDropdown";

import { pageHeadings } from "../../features/pageHeading";
import { attendanceOnSubmitFunction } from "../../features/modalOnSubmitFunction";
import { attendanceSchema } from "../../validation/attendanceValidation";
function AttendancePage() {
  const [open, setOpen] = useState({
    isOpen: false,
    payload: "",
  });

  const [attendance, setAttendance] = useState([]);

  const [filter, setFilter] = useState({
    fullName: "",
    status: "",
  });

  const handleFilter = async (newfilter) => {
    try {
      const queryParams = new URLSearchParams();

      if (newfilter.fullName)
        queryParams.append("fullName", newfilter.fullName);
      if (newfilter.status) queryParams.append("status", newfilter.status);

      const res = await axiosInstance.get(
        `/filter/attendance?${queryParams.toString()}`
      );

      setAttendance(res.data.data);
    } catch (err) {}
  };

  const handleFilterChange = (value, payload, field) => {
    const newFilter = { ...filter, [field]: value };

    setFilter(newFilter);
    handleFilter(newFilter);
  };
  useEffect(() => {
    const delay = setTimeout(() => {
      handleFilter(filter);
    }, 200);

    return () => clearTimeout(delay);
  }, [filter.fullName]);

  const pageHeading = pageHeadings();
  async function updateAttendance(val, payload) {
    try {
      const res = await axiosInstance.patch(`/attendance/${payload._id}`, {
        status: val,
      });
    } catch (err) {}
  }
  const attendanceInitialValue = {
    task: open?.payload?.task,
    status: open?.payload?.status,
  };
  function handleModel(data) {
    setOpen((pre) => ({
      isOpen: !pre.isOpen,
      payload: data,
    }));
  }
  useEffect(() => {
    async function getAttendance() {
      const res = await axiosInstance.get("/attendance");

      setAttendance(res.data);
    }
    getAttendance();
  }, [open]);

  return (
    <div className="attendance__container">
      <ModalComponent
        currentType={pageHeading}
        isOpen={open.isOpen}
        id={open?.payload?._id}
        initialValues={attendanceInitialValue}
        submitFunc={attendanceOnSubmitFunction}
        onClose={handleModel}
        validationSchema={attendanceSchema}
      />

      <div className="attendance__filter__container">
        <div className="attendance__filter_options">
          <DropdownComponent
            name={"status"}
            onSelect={handleFilterChange}
            dropTitle={"Status"}
            content={attendanceStatus}
          />
        </div>
        <div className="attendance__filter__Search">
          <SearchInput setFunc={setFilter} />
        </div>
      </div>
      <div className="attendance__box">
        <table className="attendance__box__table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendance?.map((item, index) => {
              const sNo = index + 1 >= 10 ? index + 1 : `0${index + 1}`;

              return (
                <tr key={item._id}>
                  <td>{sNo}</td>
                  <td>{item?.fullName}</td>
                  <td>{item?.position}</td>
                  <td>{item?.department}</td>
                  <td>{item?.task}</td>
                  <td>
                    <DropdownComponent
                      payload={item}
                      onSelect={updateAttendance}
                      select={item.status}
                      content={attendanceStatus}
                    />
                  </td>
                  <td>
                    <DotDropdown
                      onClick={handleModel}
                      currentType={pageHeading}
                      _id={item._id}
                      data={item}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendancePage;
