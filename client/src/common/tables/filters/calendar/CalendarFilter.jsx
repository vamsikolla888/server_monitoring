import PropTypes from "prop-types";
import CommonDropdown from './../../../form/dropdowns/CommonDropdown';
import CommonCalendar from './../../../form/calendar/CommonCalendar';



const propTypes = {
    form: PropTypes.shape({ control: PropTypes.object, watch: PropTypes.func }),
    column: PropTypes.shape({ 
      name: PropTypes.string.isRequired,
  
    })
  }
  
  
const defaultProps = {
    control: null,
    column: { name: "" }
}



export const CalendarFilter = ({ form, column }) => {
    const { control, watch } = form;
    const calendarContraints = watch(column.name + 'filter');
    const options = [
      { label: 'Date is', value: 'sw' },
      { label: 'Date is not', value: 'ew' },
      { label: 'Date is before', value: 'eq' },
      { label: 'Date is after', value: 'in' },
      { label: 'Date between', value: 'btw' },
    ];
    return (
      <div className="flex flex-col gap-4">
        <CommonDropdown
          name={column.name + 'filter'}
          control={control}
          options={options}
          optionLabel="label"
        />
        <CommonCalendar
          control={control}
          {...column}
          selectionMode={calendarContraints === 'btw' ? 'range' : 'single'}
          panelClassName={
            'z-9999 max-w-[300px] max-h-[300px] me-3 mt-10 border-slate-300 border-[1px]'
          }
        />
      </div>
    );
};

CalendarFilter.propTypes = propTypes;
CalendarFilter.defaultProps = defaultProps;