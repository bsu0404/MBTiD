import "./titleHeader.scss";
import arrowLeft from "../../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";

interface BackHeaderProps {
  title: string;
  onClose?: () => void;
}
const TitleHeader = ({ title, onClose }: BackHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="title-header-container">
      <img
        className="back"
        src={arrowLeft}
        alt="back"
        onClick={() => {
          if (onClose) {
            onClose();
          } else {
            navigate(-1);
          }
        }}
      />
      <div className="f-body1">{title}</div>
      <div className="back"></div>
    </div>
  );
};

export default TitleHeader;
