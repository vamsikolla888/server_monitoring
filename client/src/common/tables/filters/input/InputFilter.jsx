import PropTypes from "prop-types";
import CommonRadio from "../../../form/radio/CommonRadio";
import { PrimeInput } from "../../../form/Inputs";



const propTypes = {
  control: PropTypes.object,
  column: PropTypes.shape({ 
    name: PropTypes.string.isRequired,

  })
}


const defaultProps = {
  control: null,
  column: { name: "" }
}

export const InputFilter = ({ control, column }) => {
    const options = [
      { label: 'Starts With', value: 'sw' },
      { label: 'Ends With', value: 'ew' },
      { label: 'Equals To', value: 'eq' },
      { label: 'Contains', value: 'in' },
    ];
    console.log('CONTROLL', control);
    return (
      <div className="flex flex-col gap-4">
        <CommonRadio
          control={control}
          name={column.name + 'filter'}
          options={options}
          optionLabel="label"
          optionValue={'value'}
          showLabel={false}
          className={'ms-2'}
        />
        {/* <CommonDropdown name={column.name + "filter"} control={control} options={options} optionLabel="label" /> */}
        <PrimeInput control={control} {...column} showLabel={false} />
      </div>
    );
};


InputFilter.propTypes = propTypes;
InputFilter.defaultProps = defaultProps;


