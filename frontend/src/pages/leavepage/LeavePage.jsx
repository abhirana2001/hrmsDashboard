import React, { useEffect } from "react";
import "./LeavePage.css";
import DropdownComponent from "../../components/dropdown/DropdownComponent";
import { leaveStatus, position } from "../../features/dropDownValues";
import SearchInput from "../../components/searchinput/SearchInput";
import Button from "../../components/button/Button";
import { useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import { axiosInstance } from "../../features/axiosInstance";
import DotDropdown from "../../components/dotdropdown/DotDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import CalenderComponent from "../../components/calender/CalenderComponent";
import { pageHeadings } from "../../features/pageHeading";
import { leaveSchema } from "../../validation/leaveValidation";
import { leaveInitalValue } from "../../features/modelInitialValues";
import { leaveOnSubmitFunction } from "../../features/modalOnSubmitFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import ApprovedLeaveComponent from "../../components/approvedleave/ApprovedLeaveComponent";
function LeavePage() {
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState([]);
  const [approvedLeaves, setApprovedLeave] = useState([]);
  const pageHeading = pageHeadings();

  const handleDownload = (url) => {
    window.open(`${import.meta.env.VITE_BASE_URL}/upload/${url}`, "_blank");
  };

  async function updateLeave(val, payload) {
    try {
      const res = await axiosInstance.patch(`/leave/${payload._id}`, {
        status: val,
      });
    } catch (err) {}
  }
  const [filter, setFilter] = useState({
    fullName: "",
    position: "",
  });

  const handleApprovedLeaves = async (date) => {
    try {
      const res = await axiosInstance.get(`/filter/leave?date=${date}`);

      setApprovedLeave(res?.data?.data);
    } catch (err) {}
  };

  const handleFilter = async (newfilter) => {
    try {
      const queryParams = new URLSearchParams();

      if (newfilter.fullName)
        queryParams.append("fullName", newfilter.fullName);
      if (newfilter.status) queryParams.append("status", newfilter.status);

      const res = await axiosInstance.get(
        `/filter/leave?${queryParams.toString()}`
      );

      setLeave(res.data.data);
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

  function handleModel(data) {
    setOpen((pre) => ({
      isOpen: !pre.isOpen,
      payload: data,
    }));
  }

  useEffect(() => {
    async function getLeave() {
      const res = await axiosInstance.get("/leave");

      setLeave(res.data.data);
    }
    getLeave();
  }, [open]);

  return (
    <div className="leave__leave__container">
      <ModalComponent
        currentType={pageHeading}
        isOpen={open.isOpen}
        id={open?.payload?._id}
        onClose={handleModel}
        initialValues={leaveInitalValue}
        validationSchema={leaveSchema}
        submitFunc={leaveOnSubmitFunction}
      />

      <div className="leave__filter__container">
        <div className="leave__filter_options">
          <DropdownComponent
            name={"status"}
            onSelect={handleFilterChange}
            dropTitle={"Status"}
            content={leaveStatus}
          />
        </div>
        <div className="leave__filter__Search">
          <SearchInput setFunc={setFilter} />
          <Button func={handleModel} btnName={"Add Leave"} />
        </div>
      </div>
      <div className="leave__calander__wrapper">
        <div className="leave__box">
          <table className="leave__box__table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employees Name</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Docs</th>
              </tr>
            </thead>
            <tbody>
              {leave?.map((item, index) => {
                const sNo = index + 1 >= 10 ? index + 1 : `0${index + 1}`;
                const month = String(
                  new Date(item?.date).getMonth() + 1
                ).padStart(2, "0");
                const date = String(new Date(item?.date).getDate()).padStart(
                  2,
                  "0"
                );
                const year = String(new Date(item?.date).getFullYear()).slice(
                  2
                );
                const leaveDate = `${month}/${date}/${year}`;
                return (
                  <tr key={index}>
                    <td>{sNo}</td>
                    <td>{item.fullName}</td>
                    <td>{leaveDate}</td>
                    <td>{item.reason}</td>
                    <td>
                      {" "}
                      <DropdownComponent
                        payload={item}
                        onSelect={updateLeave}
                        select={item.status}
                        content={leaveStatus}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        onClick={() => handleDownload(item.docUrl)}
                        className="doc__icon__leave"
                        icon={faFile}
                        style={{ color: "#4d007d" }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="calender__employee__box">
          <h2 className="clender__box__title">Leave Calender</h2>
          <div className="calender__employee__calender">
            <div className="calender__box">
              <CalenderComponent handleApprovedLeaves={handleApprovedLeaves} />
            </div>
            <div className="empoyee__leave_box">
              <ApprovedLeaveComponent approvedLeaves={approvedLeaves} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
