import classNames from 'classnames';
import { InputSwitch } from 'primereact/inputswitch';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

const inputSwitchPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  errors: PropTypes.object,
};

const inputSwitchDefaultProps = {
  showLabel: true,
};

/**@ClassNames */
const baseClassName = "";

const InputSwitchComponent = ({
  name,
  label,
  field,
  className,
  showLabel,
  errors,
}) => {
  const inputSwitchClassName = classNames(baseClassName, className, {
    'border-red-600': errors?.[name],
  });

  return (
    <div className="relative">
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <InputSwitch
        checked={field.value}
        className={inputSwitchClassName}
        name={name}
        id={name}
        onChange={(e) => field.onChange(e.value)}
      />
      <small className="text-red-600 mx-2 font-medium">
        {errors?.[name]?.message}
      </small>
    </div>
  );
};

const PrimeSwitch = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <InputSwitchComponent {...props} field={field} />}
    />
  );
};

PrimeSwitch.propTypes = {
    name: PropTypes.string.isRequired,
    control: PropTypes.object,
};
InputSwitchComponent.propTypes = inputSwitchPropTypes;
InputSwitchComponent.defaultProps = inputSwitchDefaultProps;

export default PrimeSwitch;
