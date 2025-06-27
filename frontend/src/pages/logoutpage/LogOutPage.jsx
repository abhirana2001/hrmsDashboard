import React, { useState } from "react";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

function LogOutPage() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  function handleOpen(params) {
    setOpen((pre) => !pre);
    navigate("/candidate");
  }
  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div>
      <ConfirmationModal
        isOpen={open}
        onCancel={handleOpen}
        onConfirm={handleLogOut}
        no={"Cancel"}
        yes={"Logout"}
      />
    </div>
  );
}

export default LogOutPage;
