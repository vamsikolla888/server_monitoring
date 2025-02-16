import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Calendar } from 'primereact/calendar';
import CommonLucideIcon from '../../Icons/CommonLucideIcon';

const calendarPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  showLabel: PropTypes.bool,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  className: PropTypes.string,
  panelClassName: PropTypes.string,
  errors: PropTypes.object,
  selectionMode: PropTypes.string,
};

const defaultProps = {
  showLabel: true,
  showIcon: false,
  selectionMode: 'single',
};

const CommonCalendarPropTypes = {
  ...calendarPropTypes,
  control: PropTypes.func.isRequired,
};

/**@ClassNames */
const baseClassName =
  'w-full rounded-lg py-[.9rem] border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary';

const PrimeCalendar = ({
  name,
  label,
  placeholder,
  type,
  field,
  selectionMode,
  className,
  panelClassName,
  showLabel,
  errors,
}) => {
  const inputClassName = classNames(baseClassName, className, {
    'border-red-600': errors?.[name],
  });
  return (
    <div className="relative z-9999">
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <Calendar
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        className={'w-full'}
        inputClassName={inputClassName}
        panelClassName={panelClassName}
        dateFormat="mm-dd-yy"
        hideOnRangeSelection={selectionMode === 'range' ? true : false}
        selectionMode={selectionMode}
      />
      <small className="text-red-600 mx-2 font-medium">
        {errors?.[name]?.message}
      </small>
    </div>
  );
};

const CommonCalendar = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeCalendar {...props} field={field} />}
    />
  );
};

CommonCalendar.propTypes = CommonCalendarPropTypes;
PrimeCalendar.propTypes = calendarPropTypes;
PrimeCalendar.defaultProps = defaultProps;

export default CommonCalendar;
