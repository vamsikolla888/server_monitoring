import classNames from 'classnames';
import { InputText } from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import CommonLucideIcon from '../../Icons/CommonLucideIcon';

const inputPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  className: PropTypes.string,
  errors: PropTypes.object,
};

const defaultProps = {
  showLabel: true,
  showIcon: false,
};

const primeInputPropTypes = {
  ...inputPropTypes,
  control: PropTypes.func.isRequired,
};

/**@ClassNames */
const baseClassName =
  'w-full rounded-lg py-[.9rem] border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary';

const Input = ({
  name,
  label,
  placeholder,
  type,
  field,
  className,
  showLabel,
  showIcon,
  iconName,
  errors,
}) => {
  const inputClassName = classNames(baseClassName, className, {
    'border-red-600': errors?.[name],
  });
  return (
    <div className="relative">
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <InputText
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        name={name}
        id={name}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
      />
      <small className="text-red-600 mx-2 font-medium">
        {errors?.[name]?.message}
      </small>
      {showIcon && (
        <span className="absolute center_absolute__item right-4">
          <CommonLucideIcon name={iconName} size={16} />
        </span>
      )}
    </div>
  );
};

const PrimeInput = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...props} field={field} />}
    />
  );
};

PrimeInput.propTypes = primeInputPropTypes;
Input.propTypes = inputPropTypes;
Input.defaultProps = defaultProps;

export default PrimeInput;
