import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { InputFilter } from "./input/index";
import { DropdownFilter } from "./dropdown/index";
// import { CalendarFilter } from "./calendar/index";

/**@FormInputConstants */
import { htmlComponentTypes } from '../../../constants/constants';




const propTypes = {
    options: PropTypes.array.isRequired,
    column: PropTypes.object.isRequired,
    form: PropTypes.shape({
      control: PropTypes.object,
      watch: PropTypes.func,
      handleSubmit: PropTypes.func,
      formState: PropTypes.object,
      setValue: PropTypes.func,
      reset: PropTypes.func,
    }),
    applyFilter: PropTypes.func.isRequired,
}

const defaultProps = {
    options: [], 
    column: {},
    form: { 
    },
    applyFilter: () => {},
}

const PrimeFilterElement = forwardRef(
  ({ options, column, form, applyFilter }, ref) => {
    const { control } = form;
    console.log('OPTIONS', options);
    console.log('COLUMN', column);

    const renderFilterComponent = (option) => {
      switch (option.type) {
        case htmlComponentTypes.INPUT:
          return <InputFilter control={control} column={column} />;
        case htmlComponentTypes.DROPDOWN:
          return <DropdownFilter control={control} column={column} />;
        case htmlComponentTypes.CALENDAR:
          return <CalendarFilter form={form} column={column} />;
        default:
          return <InputFilter control={control} column={column} />;
      }
    };

    const keyDownEnter = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyFilter();
        ref.current.offsetParent.hidden = true;
      }
    };
    return (
      <div className="w-full" onKeyDown={keyDownEnter} ref={ref}>
        {renderFilterComponent(column)}
      </div>
    );
  }
);


PrimeFilterElement.propTypes = propTypes;
PrimeFilterElement.defaultProps = defaultProps;



PrimeFilterElement.displayName = 'Table Filters';

export default PrimeFilterElement;
