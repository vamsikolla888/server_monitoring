import React, { useState } from 'react';
import { MultiStateCheckbox } from 'primereact/multistatecheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../../redux/reducers/Uislice';

const CommonMultiStateCheckbox = () => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.Uislice);
  const [value, setValue] = useState(pagination?.rows);
  const options = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
    { value: 50 },
    { value: 100 },
    { value: 250 },
  ];

  // Function to handle value change
  const handleChange = (e) => {
    let value = e.value;
    if (e.value === null) value = options[0].value;
    setValue(value);
    dispatch(setPagination({ rows: value }));
  };

  return (
    <div>
      <MultiStateCheckbox
        value={value}
        onChange={handleChange}
        options={options}
        optionValue="value"
        className="w-10 hover:text-black"
        iconTemplate={Template}
      />
    </div>
  );
};

const Template = ({ option }) => {
  return (
    <div className="font-bold text-lg px-4 py-2 bg-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-200 rounded-md">
      {option?.value}
    </div>
  );
};

export default CommonMultiStateCheckbox;
