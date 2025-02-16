import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { ApiStore, useGetAllDetailsQuery } from '../../../redux/Apislice';
import { get } from '../../../redux/reducers/apiThunkSlice';
import { useDispatch } from 'react-redux';

const dropdownPropTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  optionLabel: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
};
const commonDropdownPropTypes = {
  ...dropdownPropTypes,
  control: PropTypes.func.isRequired,
};

const defaultProps = {
  showLabel: true,
};
// const baseClassName = "w-full rounded-lg py-[.4rem] border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary focus:border-red-800";
// const baseClassName = "w-full font-satoshi rounded-lg py-[.4rem] border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary m-0";

const baseClassName =
  'w-full rounded-lg py-[.1rem] border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark';

const PrimeDropdown = ({
  name,
  label,
  placeholder,
  field,
  options,
  optionLabel,
  className,
  url,
  showLabel,
}) => {
  const dispatch = useDispatch();
  const primeDropClassName = classNames(baseClassName, className);
  const [dropdownOptions, setDropdownOptions] = useState(
    Array.isArray(options) ? options : null
  );

  useEffect(() => {
    if (options === 'fromAPI' && url) {
      // Fetch options from API
      const fetchOptions = async () => {
        try {
          // Dispatch the createAsyncThunk action and unwrap the result
          const data = await dispatch(get({ url })).unwrap();
          setDropdownOptions(data?.[url]); // Set fetched data to state
        } catch (err) {
          console.error('Failed to fetch options:', err);
        }
      };

      fetchOptions(); // Trigger the fetch
    }
  }, [url, dispatch, options]);

  const onChange = (event) => {
    console.log('DROPEVENT', event.target.value);
    field.onChange(event.target.value);
  };
  return (
    <div>
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <Dropdown
        className={primeDropClassName}
        placeholder={placeholder}
        name={name}
        id={name}
        value={field.value}
        onChange={onChange}
        options={dropdownOptions}
        optionLabel={optionLabel}
        optionValue={options === 'fromAPI' ? optionLabel : 'value'}
      />
    </div>
  );
};
const CommonDropdown = (props) => {
  const { name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeDropdown {...props} field={field} />}
    />
  );
};

CommonDropdown.propTypes = commonDropdownPropTypes;
PrimeDropdown.propTypes = dropdownPropTypes;
PrimeDropdown.defaultProps = defaultProps;

export default CommonDropdown;
