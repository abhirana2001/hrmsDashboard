import React, { useEffect } from "react";
import "./candidatePage.css";
import DropdownComponent from "../../components/dropdown/DropdownComponent";
import { candidateStatus, position } from "../../features/dropDownValues";
import SearchInput from "../../components/searchinput/SearchInput";
import Button from "../../components/button/Button";
import { useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";
import { axiosInstance } from "../../features/axiosInstance";
import DotDropdown from "../../components/dotdropdown/DotDropdown";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
function CandidatePage() {
  const [open, setOpen] = useState(false);
  const [candidate, setCandidate] = useState([]);
  const [openConfirm, setOpenConfirm] = useState({
    isOpen: false,
    payload: "",
  });

  async function updateCandidate(val, payload) {
    try {
      const res = await axiosInstance.patch(`/candidate/${payload._id}`, {
        status: val,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCandidate(id) {
    const res = await axiosInstance.delete(`/candidate/${id}`);
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
    async function getCandidate() {
      const res = await axiosInstance.get("/candidate");
      setCandidate(res.data);
    }
    getCandidate();
  }, [open, openConfirm.isOpen]);

  return (
    <div className="candidate__container">
      <ModalComponent isOpen={open} onClose={handleModel} />
      <ConfirmationModal
        title="Are you sure you want to delete candidate"
        data={openConfirm.payload}
        onConfirm={deleteCandidate}
        no={"No"}
        yes={"Yes"}
        onCancel={handelConfirmModel}
        isOpen={openConfirm.isOpen}
      />
      <div className="filter__container">
        <div className="filter_options">
          <DropdownComponent dropTitle={"status"} content={candidateStatus} />
          <DropdownComponent dropTitle={"position"} content={position} />
        </div>
        <div className="filter__Search">
          <SearchInput />
          <Button func={handleModel} btnName={"Add Candidate"} />
        </div>
      </div>
      <div className="box">
        <table className="box__table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Candidates Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {candidate?.map((item, index) => {
              const sNo = index + 1 >= 10 ? index + 1 : `0${index + 1}`;
              console.log(item);
              return (
                <tr key={index}>
                  <td>{sNo}</td>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNo}</td>
                  <td>{item.position}</td>
                  <td>
                    <DropdownComponent
                      payload={item}
                      onSelect={updateCandidate}
                      select={item.status}
                      content={candidateStatus}
                    />
                  </td>
                  <td>{item.experience}</td>
                  <td>
                    <DotDropdown
                      fileUrl={item.resumeUrl}
                      _id={item._id}
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

export default CandidatePage;
