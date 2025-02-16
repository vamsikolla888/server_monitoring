import classNames from 'classnames';
import CommonLucideIcon from '../../Icons/CommonLucideIcon';

const BASE_CLASSNAME = 'p-2 ms-2 rounded-full';
const filterIcon = (options, checkAppliedFilters) => {
  const isFilterApplied = checkAppliedFilters(options.props);
  const filterIconClassName = classNames(BASE_CLASSNAME, {
    'bg-zinc-200 text-black': isFilterApplied,
  });
  return (
    <div className={filterIconClassName}>
      <CommonLucideIcon name={'ellipsis-vertical'} size={14} />
    </div>
  );
};

export default filterIcon;
