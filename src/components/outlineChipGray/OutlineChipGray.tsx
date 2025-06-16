import "./outlinechipgray.scss";

const OutlineChip = ({
  name,
  onClick,
  className,
}: {
  name: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <div className={`outline-chip-gray ${className}`} onClick={onClick}>
      <span className="f-caption">{`${name}냥이 남겼어요`}</span>
    </div>
  );
};

export default OutlineChip;
