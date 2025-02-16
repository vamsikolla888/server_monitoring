import PropTypes from 'prop-types';
import { Tag } from 'antd';

const TagTypes = {
  MAGENTA: 'magenta',
  RED: 'red',
  VALCANO: 'volcano',
  ORANGE: 'orange',
  GOLD: 'gold',
  LIME: 'lime',
  GREEN: 'green',
  CYAN: 'cyan',
  BLUE: 'blue',
  GEEKBLUE: 'geekblue',
  PURPLE: 'purple',
  0: 'red',
  1: 'cyan',
};

const getColor = (value) => {
  if ((value === true) | (value === 'Yes') | (value === 1)) return 1;
  if ((value === false) | (value === 'No') | (value === 0)) return 0;
  else return value;
};
const CommonTags = ({ value }) => {
  return <Tag color={TagTypes[getColor(value)]}>{value}</Tag>;
};

CommonTags.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default CommonTags;
