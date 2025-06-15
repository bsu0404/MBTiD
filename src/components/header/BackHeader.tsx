import { useNavigate } from "react-router-dom";
import arrowLeft from "@/assets/icon/chevron-left.svg";
import "./backHeader.scss";

const BackHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="back-header-container">
      <img
        className="back"
        src={arrowLeft}
        alt="back"
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default BackHeader;
