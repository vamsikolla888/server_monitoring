// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { Controller } from "react-hook-form";
// import { RadioButton } from "primereact/radiobutton";

// const defaultProps = {
//     showLabel: true,
//     className: "",
//     layout: "row",
// }

// const baseClassName = "w-5 h-5 cursor border-2 rounded-full transition duration-200 ease-in-out border-zinc-400 focus:outline-none outline-none opacity-95 transform scale-100 visible"
// const PrimeRadio = ( { name, label, className, field, options, optionLabel, showLabel, layout } ) => {
//     const layoutClassName = classNames("flex-wrap gap-2", {
//         "flex flex-col gap-3": layout === "column",
//         "flex items-center": layout === "row" || !layout
//     })
//   return (
//     <div>
//         {showLabel && <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label> }
//         <div className={layoutClassName}>
//             {
//                 options.map((option,index) => {
//                     return <div key={index} className={"flex items-center"}>
//                         <RadioButton
//                             key={option}
//                             className={classNames(baseClassName, {"border-white": field?.value === option[optionLabel]}, className)}
//                             name={name}
//                             id={name}
//                             value={option[optionLabel]}
//                             inputId={option[optionLabel]}
//                             onChange={ e => { console.log(e.target), field.onChange(e.value)}}
//                             checked={field?.value === option[optionLabel]}

//                         />
//                         <label className="block font-medium text-black dark:text-white mr-2">{option[optionLabel]}</label>
//                     </div>
//             })
//             }
//         </div>
//     </div>
//   )
// }

// const CommonRadio = (props) => {
//     const { name, control } = props;
//     return (
//         <Controller
//             name={name}
//             control={control}
//             render={({ field}) => (
//                 <PrimeRadio {...props} field={field}/>
//             )}
//         />
//     )
// }

// CommonRadio.propTypes = {
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     control: PropTypes.func.isRequired,
//     placeholder: PropTypes.string,
//     ...PrimeRadio.propTypes
// }

// PrimeRadio.defaultProps = defaultProps;

// PrimeRadio.propTypes = {
//     name: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     type: PropTypes.string.isRequired,
//     field: PropTypes.object.isRequired,
//     options: PropTypes.array.isRequired,
//     optionLabel: PropTypes.string.isRequired,
//     showLabel: PropTypes.bool,
//     className: PropTypes.string,
//     layout: PropTypes.string
// }

// export default CommonRadio

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Controller } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';

const defaultProps = {
  showLabel: true,
  className: '',
  optionValue: 'value',
  layout: 'row', // default to 'row'
};

const baseClassName =
  'w-5 h-5 cursor-pointer border-2 m-0 p-0 rounded-full transition duration-200 ease-in-out border-zinc-400 focus:outline-none opacity-95 transform scale-100 visible';

const PrimeRadio = ({
  name,
  label,
  className,
  field,
  options,
  optionLabel,
  optionValue,
  showLabel,
  layout,
}) => {
  const layoutClassName = classNames({
    'flex flex-wrap items-center gap-4': layout === 'row', // Ensure flex-wrap and consistent gap for row layout
    'flex flex-col gap-3': layout === 'column', // Apply column layout if specified
  });

  return (
    <div>
      {showLabel && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className={layoutClassName}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <RadioButton
              className={classNames(
                baseClassName,
                {
                  'border-[#4F46E5] bg-[#4F46E5]':
                    field?.value === option[optionValue],
                },
                className
              )}
              name={name}
              id={option[optionValue]}
              value={option[optionValue]}
              onChange={(e) => field.onChange(e.value)}
              checked={field?.value === option[optionValue]}
            />
            {/* Ensure consistent width for labels */}
            <label
              htmlFor={option[optionValue]}
              className="block font-medium text-black dark:text-white min-w-[150px]"
            >
              {option[optionLabel]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommonRadio = (props) => {
  const { name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <PrimeRadio {...props} field={field} />}
    />
  );
};

CommonRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  ...PrimeRadio.propTypes,
};

PrimeRadio.defaultProps = defaultProps;

PrimeRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  optionLabel: PropTypes.string.isRequired,
  optionValue: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['row', 'column']),
};

export default CommonRadio;
