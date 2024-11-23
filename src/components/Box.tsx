interface BoxProps {
  title: string;
  value: string | number;
  unit?: string;
  onClick?: () => void;
}

const Box: React.FC<BoxProps> = ({ title, value, unit, onClick }) => {
  return (
    <div
      className="box-container"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <h2 className="box-title">{title}</h2>
      <p className="box-value">
        {value} {unit && <span className="box-unit">{unit}</span>}
      </p>
    </div>
  );
};

export default Box;