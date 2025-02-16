import classNames from 'classnames';
import { badgeColor, dialogTypes } from '../../constants/constants';
import { formatDate } from '../../utils/date.util';
import CommonLucideIcon from '../Icons/CommonLucideIcon';
import CommonTags from '../tags/CommonTags';
import { useDispatch } from 'react-redux';
import { showDeleteToast } from '../../redux/reducers/apiThunkSlice';
import { showDialog } from '../../redux/reducers/dialogSlice';
import { setFormData } from '../../redux/reducers/Uislice';
import { useNavigate } from 'react-router-dom';

const DeviceTypes = {
  SMARTTV: 'Smart TV',
  THERMOSTAT: 'Smart Thermostat',
  SMARTSPEAKER: 'Smart Speaker',
  SMARTWATCH: 'Smart Watch',
  SMARTBULB: 'Smart Light Bulb',
};
const DeviceIcons = {
  [DeviceTypes.SMARTTV]: 'tv-minimal',
  [DeviceTypes.THERMOSTAT]: 'thermometer-snowflake',
  [DeviceTypes.SMARTSPEAKER]: 'speaker',
  [DeviceTypes.SMARTWATCH]: 'watch',
  [DeviceTypes.SMARTBULB]: 'lightbulb',
};

const bageColorCodes = {
  [badgeColor.GRAY]: { color: 'text-gray-700', bgColor: 'bg-slate-100' },
  [badgeColor.CYAN]: { color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  [badgeColor.BLUE]: { color: 'text-blue-600', bgColor: 'bg-blue-100' },
  [badgeColor.INDIGO]: { color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  [badgeColor.VIOLET]: { color: 'text-voilet-600', bgColor: 'bg-violet-100' },
  [badgeColor.PURPLE]: { color: 'text-purple-600', bgColor: 'bg-purple-100' },
  [badgeColor.PINK]: { color: 'text-pink-600', bgColor: 'bg-pink-100' },
  [badgeColor.RED]: { color: 'text-red-600', bgColor: 'bg-red-100' },
  [badgeColor.ROSE]: { color: 'text-rose-600', bgColor: 'bg-rose-100' },
  [badgeColor.ORANGE]: { color: 'text-orange-600', bgColor: 'bg-orange-100' },
  [badgeColor.YELLOW]: { color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
};

const Link = (row, columnProps, column) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[250px]" onClick={() => navigate(`${row._id}`)}>
      <div
        className={`font-satoshi font-medium whitespace-nowrap overflow-hidden text-ellipsis`}
        style={{ display: 'block', width: '100%' }}
      >
        {row[column.searchKey]}
      </div>
    </div>
  );
};

const badgeStyle = (options, value) => {
  let badgeColor = null;
  let findOption = null;
  if (options?.length > 0) {
    findOption = options.find((option) => option.value === value);
    if (findOption) {
      badgeColor = bageColorCodes[findOption.badgeColor] || badgeColor;
    }
  }
  badgeColor = badgeColor || {
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  };
  return (
    <div
      className={`flex justify-center items-center rounded-sm min-w-[70px] max-w-[100px] px-2 py-[0.1rem] ${badgeColor.bgColor}`}
    >
      <span className={`text-sm font-bold ${badgeColor.color}`}>
        {findOption?.label || value}
      </span>
    </div>
  );
};

const Actions = (row, columnProps, column) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    column?.onRowSelect({ value: [row] });
    dispatch(showDialog({ type: dialogTypes.DELETECONFIRMATION }));
  };
  const handleEdit = () => {
    dispatch(showDialog({ type: dialogTypes.COMMONDIALOG }));
    dispatch(setFormData({ isEditMode: true, formData: row }));
  };
  return (
    <div className="flex justify-center gap-3">
      <CommonLucideIcon
        name="pencil"
        className={'text-blue-500'}
        size={18}
        onClick={handleEdit}
      />
      <CommonLucideIcon
        name="trash"
        className={'text-red-700 cursor-pointer'}
        size={18}
        onClick={handleDelete}
      />
    </div>
  );
};

const DeviceStyle = (device) => {
  return (
    <div className="flex items-center gap-3 px-3">
      <CommonLucideIcon name={DeviceIcons[device]} />
      <div className="font-semibold">{device}</div>
    </div>
  );
};

const BooleanStyle = (value, type = 'YES/NO') => {
  value = value ? 'Yes' : 'No';
  return (
    <div className="text-center">
      <CommonTags value={value} />
    </div>
  );
};

export const tableColumnBody = (row, columnProps, column) => {
  if (column?.customColumnStyle) {
    return column.customColumnStyle(row[column.searchKey]);
  } else if (column?.tableColumnStyle === 'Link') {
    return Link(row, columnProps, column);
  } else if (column?.tableColumnStyle == 'Badge') {
    return badgeStyle(column.options, row[column.searchKey]);
  } else if (column?.tableColumnStyle == 'Actions') {
    return Actions(row, columnProps, column);
  } else if (column?.tableColumnStyle == 'Date')
    return formatDate(row[column.searchKey]);
  else {
    return (
      <div className="max-w-[250px]">
        <div
          className={`font-satoshi font-medium whitespace-nowrap overflow-hidden text-ellipsis`}
          style={{ display: 'block', width: '100%' }}
        >
          {row[column.searchKey]}
        </div>
      </div>
    );
  }
};

export const customColumnStyles = {
  DEVICES: DeviceStyle,
  BOOLEANTAG: BooleanStyle,
};
