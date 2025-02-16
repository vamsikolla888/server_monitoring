import { forwardRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { PrimeInput } from '../form/Inputs';
import CommonDropdown from '../form/dropdowns/CommonDropdown';
import { htmlComponentTypes } from '../../constants/constants';
import CommonCheckbox, {
  checkboxLabelTypes,
} from '../form/checkbox/CommonCheckbox';
import CommonCalendar from '../form/calendar/CommonCalendar';
import CommonRadio from '../form/radio/CommonRadio';

const TableFilters = forwardRef(
  ({ options, column, form, applyFilter }, ref) => {
    const {
      control,
      watch,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = form;
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
        console.log('REFFFFFFFFFF', ref);
        event.preventDefault();
        // ref.current.applyFilter();
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

const InputFilter = ({ control, column }) => {
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

const DropdownFilter = ({ control, column }) => {
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

const CalendarFilter = ({ form, column }) => {
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

CalendarFilter.propTypes = {
  form: propTypes.shape({
    control: propTypes.object,
    getValues: propTypes.func,
    watch: propTypes.func,
  }),
  column: propTypes.shape({ name: propTypes.string }),
};

DropdownFilter.propTypes = {
  control: propTypes.func.isRequired,
  column: propTypes.object,
};

TableFilters.displayName = 'Table Filters';

export default TableFilters;
