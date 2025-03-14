import { useContext, useRef } from 'react';
import { Paginator } from 'primereact/paginator';
import CommonButton from '../button/CommonButton';
import { TableContext } from '@/components/custom/tables/context/TableProvider';

const CommonPaginator = () => {
  const ref = useRef(null);
  const _context = useContext(TableContext);

  const onPageChange = (event) => {
    _context?.dispatch({ type: "SET_PAGINATION", payload: { page: event.page + 1 } });
  };

  const Template1 = {
    layout: `CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink`,
    PrevPageLink: (options) => (
      <div
        className="flex items-center justify-end bg-cancel mx-4 text-white cursor-pointer rounded-md left__point__clippath w-14 h-8"
        onClick={options.onClick}
      >
        <div className="text-xs font-semibold text-right me-2">Prev</div>
      </div>
    ),
    PageLinks: (options) => (
      <CommonButton
        className={`inline-flex px-3 py-2 text-sm font-bold mx-1 ${
          options.className && options.className.includes('p-highlight')
            ? 'text-white bg-sky-700'
            : '!text-boxdark bg-slate-200'
        }`}
        onClick={options.onClick}
      >
        <span className='text-xs'>{options.page + 1}</span>
      </CommonButton>
    ),
    NextPageLink: (options) => (
      <div
        className="flex items-center justify-start bg-boxdark mx-4 text-white cursor-pointer rounded-md right__point__clippath w-14 h-8"
        onClick={options.onClick}
      >
        <div className="text-xs font-semibold text-right ms-2">Next</div>
      </div>
    ),
    CurrentPageReport: (options) => (
      <div className="font-medium me-auto dark:text-neutral-400">
        <span className="font-bold text-lg mx-2 dark:text-neutral-400">
          {options.first} - {options.last}
        </span>{' '}
        <span className="text-black dark:text-slate-100">of</span>{' '}
        <span className="font-semibold mx-2 dark:text-neutral-400">{options.totalRecords}</span>{' '}
        Records.
      </div>
    ),
    RowsPerPageDropdown: (options) => (
      <div className="me-auto">
        {/* Add any additional controls here if needed */}
      </div>
    ),
  };

  return (
    <div className="w-full flex justify-center py-1 border-t-[0.5px]">
      <Paginator
        ref={ref}
        className="w-full ms-auto dark:bg-content_background"
        rows={_context.state.limit}
        totalRecords={_context.state.totalCount}
        first={(_context.state.page - 1) * _context.state.limit}
        onPageChange={onPageChange}
        template={Template1}
      />
    </div>
  );
};

export default CommonPaginator;

