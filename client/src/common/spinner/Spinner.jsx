import { ProgressSpinner } from 'primereact/progressspinner';
const Spinner = () => {
  return (
    <ProgressSpinner
      style={{ width: '50px', height: '50px' }}
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      className="spinner__card"
    />
  );
};

export default Spinner;
