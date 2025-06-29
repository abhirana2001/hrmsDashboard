import React, { useEffect } from "react";
import "./EmployeePage.css";
import DropdownComponent from "../../components/dropdown/DropdownComponent";
import { employeePositions, position } from "../../features/dropDownValues";
import SearchInput from "../../components/searchinput/SearchInput";
import Button from "../../components/button/Button";
import { useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import { axiosInstance } from "../../features/axiosInstance";
import DotDropdown from "../../components/dotdropdown/DotDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { pageHeadings } from "../../features/pageHeading";
import { employeeOnSubmitFunction } from "../../features/modalOnSubmitFunction";
import { employeeSchema } from "../../validation/employeeValidation";

function EmployeePage() {
  const [open, setOpen] = useState({
    isOpen: false,
    payload: "",
  });
  const [employee, setEmployee] = useState([]);
  const [openConfirm, setOpenConfirm] = useState({
    isOpen: false,
    payload: "",
  });
  const [filter, setFilter] = useState({
    fullName: "",
    position: "",
  });

  const handleFilter = async (newfilter) => {
    try {
      const queryParams = new URLSearchParams();

      if (newfilter.fullName)
        queryParams.append("fullName", newfilter.fullName);
      if (newfilter.position)
        queryParams.append("position", newfilter.position);

      const res = await axiosInstance.get(
        `/filter/employee?${queryParams.toString()}`
      );

      setEmployee(res.data.data);
    } catch (err) {
      console.log(err);
    }
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
  const employeeInitialValue = {
    fullName: open.payload?.fullName || "",
    email: open.payload?.email || "",
    phoneNo: open.payload?.phoneNo || "",
    department: open.payload?.department || "",
    position: open.payload?.position || "",
    dateOfJoining:
      `${new Date(open.payload?.dateOfJoining).getFullYear()}-${String(
        new Date(open.payload?.dateOfJoining).getMonth() + 1
      ).padStart(2, "0")}-${String(
        new Date(open.payload?.dateOfJoining).getDate()
      ).padStart(2, "0")}` || "",
  };

  const pageHeading = pageHeadings();

  async function deleteEmployee(id) {
    try {
      const res = await axiosInstance.delete(`/employee/${id}`);

      setOpenConfirm((pre) => ({
        isOpen: !pre.isOpen,
        payload: pre.payload,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  function handelConfirmModel(data) {
    setOpenConfirm((pre) => ({
      isOpen: !pre.isOpen,
      payload: data,
    }));
  }

  function handleModel(data) {
    setOpen((pre) => ({
      isOpen: !pre.isOpen,
      payload: data,
    }));
  }
  useEffect(() => {
    async function getEmployee() {
      const res = await axiosInstance.get("/employee");

      setEmployee(res.data);
    }
    getEmployee();
  }, [open, openConfirm.isOpen]);

  return (
    <div className="employee__container">
      <ModalComponent
        currentType={pageHeading}
        isOpen={open.isOpen}
        id={open?.payload?._id}
        initialValues={employeeInitialValue}
        submitFunc={employeeOnSubmitFunction}
        onClose={handleModel}
        validationSchema={employeeSchema}
      />
      <ConfirmationModal
        title="Are you sure you want to delete employee"
        data={openConfirm.payload}
        onConfirm={deleteEmployee}
        no={"No"}
        yes={"Yes"}
        onCancel={handelConfirmModel}
        isOpen={openConfirm.isOpen}
      />
      <div className="employee__filter__container">
        <div className="employee__filter_options">
          <DropdownComponent
            name={"position"}
            onSelect={handleFilterChange}
            dropTitle={"Position"}
            content={employeePositions}
          />
        </div>
        <div className="employee__filter__Search">
          <SearchInput setFunc={setFilter} />
        </div>
      </div>
      <div className="employee__box">
        <table className="employee__box__table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Employees Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee?.map((item, index) => {
              const sNo = index + 1 >= 10 ? index + 1 : `0${index + 1}`;
              const month = String(
                new Date(item?.dateOfJoining).getMonth() + 1
              ).padStart(2, "0");
              const date = String(
                new Date(item?.dateOfJoining).getDate()
              ).padStart(2, "0");
              const year = String(
                new Date(item?.dateOfJoining).getFullYear()
              ).slice(2);
              const doj = `${month}/${date}/${year}`;

              return (
                <tr key={index}>
                  <td>{sNo}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNo}</td>
                  <td>{item.position}</td>
                  <td>{item.department}</td>
                  <td>{doj}</td>
                  <td>
                    <DotDropdown
                      onClick={handleModel}
                      currentType={pageHeading}
                      _id={item._id}
                      data={item}
                      fileUrl={item?.resumeUrl}
                      confirmModal={handelConfirmModel}
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

export default EmployeePage;
