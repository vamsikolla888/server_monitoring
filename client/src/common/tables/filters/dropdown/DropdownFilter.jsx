import PropTypes from "prop-types";
import { checkboxLabelTypes } from "../../../form/checkbox/CommonCheckbox";
import CommonCheckbox from "../../../form/checkbox/CommonCheckbox";

/**
 * 
 * @props
 * @control
 * @column
 * 
 */


const propTypes = {
control: PropTypes.object,
column: PropTypes.shape({ 
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
})
}
  
  
const defaultProps = {
control: null,
column: { name: "" }
}

export const DropdownFilter = ({ control, column }) => {
    return (
      <CommonCheckbox
        control={control}
        {...{
          ...column,
          showLabel: false,
          layout: 'column',
          labelStyle: checkboxLabelTypes.BADGE,
        }}
        options={column.options}
        optionLabel="label"
        optionValue={'value'}
      />
    );
};


DropdownFilter.propTypes = propTypes;
DropdownFilter.defaultProps = defaultProps;
  