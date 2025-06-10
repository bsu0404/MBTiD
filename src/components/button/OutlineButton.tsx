import { ButtonSize } from "./type";
import "./outlineButton.scss";

interface Props {
  children: React.ReactNode;
  size: ButtonSize;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
}

const OutlineButton = ({
  children,
  size,
  type,
  disabled,
  onClick,
  color = "#6C60C6",
}: Props) => {
  return (
    <button
      data-size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`ouline-button ${disabled ? "disabled" : ""} ${size == "small" ? "f-caption" : "f-body1"}`}
      style={{ color: color }}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
