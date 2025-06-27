import React, { useEffect } from "react";
import "./EmployeePage.css";
import DropdownComponent from "../../components/dropdown/DropdownComponent";
import { position } from "../../features/dropDownValues";
import SearchInput from "../../components/searchinput/SearchInput";
import Button from "../../components/button/Button";
import { useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import { axiosInstance } from "../../features/axiosInstance";
import DotDropdown from "../../components/dotdropdown/DotDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
function EmployeePage() {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [openConfirm, setOpenConfirm] = useState({
    isOpen: false,
    payload: "",
  });

  async function updateEmployee(val, payload) {
    try {
      const res = await axiosInstance.patch(`/employee/${payload._id}`, {
        status: val,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteEmployee(id) {
    const res = await axiosInstance.delete(`/employee/${id}`);
    setOpenConfirm((pre) => ({
      isOpen: !pre.isOpen,
      payload: pre.payload,
    }));
  }

  function handelConfirmModel(data) {
    setOpenConfirm((pre) => ({
      isOpen: !pre.isOpen,
      payload: data,
    }));
  }

  function handleModel() {
    setOpen((pre) => !pre);
  }
  useEffect(() => {
    async function getEmployee() {
      const res = await axiosInstance.get("/employee");
      console.log(res.data);

      setEmployee(res.data);
    }
    getEmployee();
  }, [open, openConfirm.isOpen]);

  return (
    <div className="employee__container">
      <ModalComponent isOpen={open} onClose={handleModel} />
      <ConfirmationModal
        title="Are you sure you want to delete employee"
        data={openConfirm.payload}
        onConfirm={deleteEmployee}
        no={"No"}
        yes={"Yes"}
        onCancel={handelConfirmModel}
        isOpen={openConfirm.isOpen}
      />
      <div className="filter__container">
        <div className="filter_options">
          <DropdownComponent dropTitle={"position"} content={position} />
        </div>
        <div className="filter__Search">
          <SearchInput />
        </div>
      </div>
      <div className="box">
        <table className="box__table">
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
              console.log(item);

              return (
                <tr>
                  <td>{sNo}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNo}</td>
                  <td>{item.position}</td>
                  <td>{item.department}</td>
                  <td>{item.dateOfJoining}</td>
                  <td>
                    <DotDropdown
                      _id={item._id}
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
