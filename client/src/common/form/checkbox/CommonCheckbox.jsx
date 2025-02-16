import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { Checkbox } from 'primereact/checkbox';
import CommonBadge from '../../badge/CommonBadge';

export const checkboxLabelTypes = {
  NORMAL: 'normal',
  BADGE: 'badge',
};

const defaultProps = {
  layout: 'row',
  showLabel: true,
  labelStyle: checkboxLabelTypes.NORMAL,
};

const PrimeCheckbox = ({
  name,
  label,
  field,
  options,
  optionLabel,
  optionValue,
  showLabel,
  labelStyle,
  layout,
}) => {
  console.log('OPTIONS', options);

  const checkboxClassName = classNames('flex-wrap gap-2', {
    'flex flex-col gap-3': layout === 'column',
    'flex items-center': layout === 'row' || !layout,
  });
  const onChange = (event) => {
    console.log('EVENT', event);
    if (event.checked) {
      field.onChange(
        field.value
          ? Array.from(new Set([...field.value, event.value]))
          : [event.value]
      );
    } else
      field.onChange(field?.value.filter((checked) => checked !== event.value));
  };
  return (
    <div>
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className={checkboxClassName}>
        {options.map((option, index) => (
          <div key={index} className={'flex items-center'}>
            <Checkbox
              key={option}
              className={`box mr-2 h-5 w-5 items-center justify-center rounded-full`}
              name={name}
              id={name}
              value={option[optionValue]}
              inputId={option[optionValue]}
              onChange={onChange}
              checked={field?.value?.some(
                (value) => value === option[optionValue]
              )}
            />
            <CheckboxLabel
              option={option}
              options={options}
              labelStyle={labelStyle}
            >
              {option[optionLabel]}
            </CheckboxLabel>
          </div>
        ))}
      </div>
    </div>
  );
};

const CheckboxLabel = ({ children, options, labelStyle }) => {
  const renderLabel = () => {
    switch (labelStyle) {
      case checkboxLabelTypes.NORMAL:
        return (
          <label className="block font-medium text-black dark:text-white">
            {children}
          </label>
        );
      case checkboxLabelTypes.BADGE:
        return (
          <CommonBadge
            options={options}
            optionLabel={'label'}
            value={children}
            className={'text-xs'}
          >
            {children}
          </CommonBadge>
        );
      default:
        return (
          <label className="block font-medium text-black dark:text-white">
            {children}
          </label>
        );
    }
  };
  return renderLabel();
};

const CommonCheckbox = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeCheckbox {...props} field={field} />}
    />
  );
};

CommonCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  ...PrimeCheckbox.propTypes,
};

PrimeCheckbox.defaultProps = defaultProps;

PrimeCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  optionLabel: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  labelStyle: PropTypes.oneOf(Object.values(checkboxLabelTypes)),
  layout: PropTypes.oneOf('column', 'row'),
};

export default CommonCheckbox;
