import { ButtonSize } from "./type";
import "./solidButton.scss";

interface Props {
  children: React.ReactNode;
  size: ButtonSize;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  color?: string;
}

const SolidButton = ({
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
      className={`solid-button ${disabled ? "disabled" : ""} ${size == "small" ? "f-caption" : "f-body1"}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
};

export default SolidButton;
