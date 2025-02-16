import { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { Divider } from 'antd';
import CommonButton from '../button/CommonButton';
import CommonMultiStateCheckbox from '../form/multiStateCheckbox/CommonMultiStateCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { setPagination } from '../../redux/reducers/Uislice';
const CommonPaginator = ({ rows, setRows, first, onPageChange }) => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.Uislice);
  console.log('PAGINATION', pagination);
  const Template1 = {
    layout: `CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink`,
    PrevPageLink: (options) => {
      console.log('PREV PAGE', options);
      return (
        <div
          className="flex items-center justify-end bg-cancel mx-4 text-white cursor-pointer rounded-md left__point__clippath w-14 h-8"
          onClick={options.onClick}
        >
          <div className="text-sm font-semibold text-right me-2">Prev</div>
        </div>
      );
    },
    PageLinks: (options) => {
      console.log('PAGELINK OPTIONS', options);
      return (
        <CommonButton
          className={`inline-flex px-3 py-2 text-sm font-bold mx-1 ${
            options.className && options.className.includes('p-highlight')
              ? 'text-white bg-sky-700'
              : '!text-boxdark bg-slate-200'
          }`}
          onClick={options?.onClick}
        >
          {options.page + 1}
        </CommonButton>
      );
    },
    NextPageLink: (options) => {
      console.log('NEXT PAGE', options);
      return (
        <div
          className="flex items-center justify-start bg-boxdark mx-4 text-white cursor-pointer rounded-md right__point__clippath w-14 h-8"
          onClick={options.onClick}
        >
          <div className="text-sm font-semibold text-right ms-2">Next</div>
        </div>
      );
    },
    CurrentPageReport: (options) => {
      console.log('CURRENT PAGE REPORT', options);
      return (
        <div className="font-medium me-auto">
          <span className="font-bold text-lg mx-2">
            {options.first} - {options.last}
          </span>{' '}
          <span className="text-black">of</span>{' '}
          <span className="font-semibold mx-2">{options.totalRecords}</span>{' '}
          Records.
        </div>
      );
    },
    RowsPerPageDropdown: (options) => {
      return (
        <div className="me-auto">
          <CommonMultiStateCheckbox />
        </div>
      );
    },
  };

  return (
    <div className="w-full flex justify-center py-1">
      <Paginator
        className="w-full ms-auto"
        rows={pagination?.rows}
        totalRecords={pagination?.totalCount}
        first={pagination?.first}
        template={Template1}
        onPageChange={(e) =>
          dispatch(
            setPagination({ first: e.first, rows: e.rows, page: e.page + 1 })
          )
        }
      />
    </div>
  );
};

export default CommonPaginator;
