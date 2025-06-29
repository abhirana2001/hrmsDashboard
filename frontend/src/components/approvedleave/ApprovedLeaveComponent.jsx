import "./ApprovedLeaveComponent.css";

function ApprovedLeaveComponent({ approvedLeaves }) {
  return (
    <div className="approved__leave__container">
      <h2 className="approved__leave__title">Approved leave</h2>
      <div className="approved__wrapper">
        {approvedLeaves?.map((item) => {
          return (
            <>
              <div className="approved__leave__box">
                <div className="approved__leave__info">
                  <div className="approved__leave__img">
                    <img src="" alt="" />
                  </div>
                  <div className="approved__name__desgination">
                    <div className="approved__leave__name">
                      {item?.fullName}
                    </div>
                    <div className="approved__leave__designation">
                      {item?.designation}
                    </div>
                  </div>
                </div>
                <div className="approved__leave__date">
                  {item?.date.split("T")[0]}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ApprovedLeaveComponent;
