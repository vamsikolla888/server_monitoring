import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { MultiSelect } from 'primereact/multiselect';

const PrimeSelect = ({
  name,
  label,
  placeholder,
  field,
  options,
  optionLabel,
}) => {
  return (
    <div>
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <MultiSelect
        className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        placeholder={placeholder}
        name={name}
        id={name}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        options={options}
        optionLabel={optionLabel}
        display="chip"
      />
    </div>
  );
};
const CommonSelect = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeSelect {...props} field={field} />}
    />
  );
};

CommonSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  ...PrimeSelect.propTypes,
};

PrimeSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  optionLabel: PropTypes.string.isRequired,
};

export default CommonSelect;
