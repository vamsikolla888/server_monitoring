import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from 'antd';
import { tableColumnBody } from './TableColumnStyles';
import CommonButton from '../button/CommonButton';
import CommonDialog from '../dialog/CommonDialog';
import { useDispatch, useSelector } from 'react-redux';
import { clearPagination, DialogTypes,setPagination } from '../../redux/reducers/Uislice';
import { showDialog, hideDialog } from '../../redux/reducers/dialogSlice';
import { useEffect } from 'react';
import { PrimeInput } from '../form/Inputs';
import { useForm } from 'react-hook-form';
import CommonLucideIcon from '../Icons/CommonLucideIcon';
import CommonPaginator from '../paginator/CommonPaginator';
import { useGetAllDetailsQuery } from '../../redux/Apislice';
import {
  buttonVariants,
  dialogTypes,
  htmlComponentTypes,
} from '../../constants/constants';
import DeleteConfirmationDialog from '../dialog/DeleteConfirmationDialog';
import CommonMenu from '../menu/CommonMenu';
import CommonForm from '../form/CommonForm';
import { multiDelete } from '../../redux/reducers/apiThunkSlice';
import Spinner from '../spinner/Spinner';
import TableFilters from '../filters/TableFilters';
import filterIcon from './filters/filterIcon';
import CommonCheckbox, { checkboxLabelTypes } from '../form/checkbox/CommonCheckbox';
import HeadlessMenu from '../menu/HeadlessMenu';
import classNames from 'classnames';
import ReactIcons, { REACT__ICON__TYPES } from '../Icons/ReactIcons';
import { useUiContext } from '../../hooks/useUiContext';
import { uiReducerActions } from '../../reducers/uireducer';
// import { PrimeDatatable1 } from './PrimeDatatable1';

const PrimeDatatable = ({
  tableFields,
  formFields,
  formSchema,
  url,
  responseKey,
  displayDetails,
}) => {
  /**@ReduxStates */
  const dialogState = useSelector((state) => state.dialogSlice);
  const { pagination } = useSelector((state) => state.Uislice);
  const dispatch = useDispatch(); // dispatcher

  /**@Refs */
  const menuRef = useRef(null);
  const filterMenuRef = useRef(null);

  /**@ReactHOOKForm */
  const filterForm = useForm({
    defaultValues: tableFields.reduce((acc, cur) => {
      if (cur.type === htmlComponentTypes.INPUT)
        acc[cur.name + 'filter'] = 'sw';
      else if (cur.type === htmlComponentTypes.CALENDAR)
        acc[cur.name + 'filter'] = 'sw';
      return acc;
    }, {}),
  });

  const { control, getValues } = filterForm;

  /**@States */
  const [showMenu, setShowMenu] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [filter, setFilter] = useState({
    criteria: [],
    sortField: 'created',
    direction: 'desc',
    limit: pagination?.rows ?? 10,
    page: pagination?.page ?? 1,
  });

  /**@DataFetching */
  const { data, isLoading, refetch, isFetching } = useGetAllDetailsQuery(
    url + `?filter=${JSON.stringify(filter)}`
  );

  /**@UseCallbacks */

  console.log('DATA', data);

  /**@FilterApply */
  const filterApply = () => {
    console.log('REFETCH SUCCESSFULLY');
    const filterFormValues = filterForm.watch();
    let criteria = [];
    tableFields.forEach((field) => {
      if (filterFormValues[field.name]) {
        let type = filterFormValues[field.name + 'filter'];
        if (field.type === htmlComponentTypes.DROPDOWN) type = 'in';
        criteria.push({
          key: field.name,
          value: filterFormValues[field.name],
          type,
        });
      }
    });
    setFilter((prev) => ({ ...prev, criteria: criteria }));
    // options.filterApplyCallback();
  };

  const checkAppliedFilter = useCallback(
    ({ column }) => {
      if (filterMenuRef.current)
        filterMenuRef.current.applyFilter = filterApply;
      const filterValue = filterForm.getValues(column?.props?.field);
      return !!filterValue;
    },
    [tableFields]
  );


  /**@ContextApis */
  const { uiDispatcher } = useUiContext();


  /**@UseEffects Sections */

  useEffect(() => {

    uiDispatcher({ type: uiReducerActions.ADD_AND_UPDATE_TABLE_FIELDS, tableFields: tableFields  })
    return () => {
      // cleanup your state here
      dispatch(clearPagination());
    };
  }, []);

  useEffect(() => {
    dispatch(setPagination({ totalCount: data?.pagination?.totalCount ?? 0 }));
    // refetch();
  }, [data, dispatch]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.page ?? 1,
      limit: pagination.rows ?? 10,
      totalCount: pagination.totalCount ?? 0,
    }));
    // setTimeout(() => {
    //   refetch();
    // },500);
    refetch();
  }, [pagination]);

  /**@Functions */
  const onRowSelect = (event) => {
    setSelectedRows(event.value);
    setSelectedRowIds(event.value.map((row) => row._id));
  };

  const cancelDeleteConfirmation = () => {
    setSelectedRows([]);
    setSelectedRowIds([]);
    dispatch(hideDialog({ type: dialogTypes.DELETECONFIRMATION }));
  };

  /**@MultiDelete */
  const handleMultiDelete = async () => {
    dispatch(
      multiDelete({
        url: `${url}/multiDelete`,
        body: { selectedIds: selectedRowIds },
        refetch: refetch,
      })
    );
  };

  const tableMenuOptions = [
    {
      name: 'Delete',
      icon: 'MdDelete',
      iconType: REACT__ICON__TYPES.MATERIALDESIGN,
      className: 'text-red-700',
      onClick: () => {
        setShowMenu(false),
          dispatch(showDialog({ type: dialogTypes.DELETECONFIRMATION }));
      },
    },
    {
      name: 'Settings',
      icon: 'MdOutlineSettingsSuggest',
      iconType: REACT__ICON__TYPES.MATERIALDESIGN,
      className: 'text-black',
      onClick: () => { console.log("STATE UDPATED"), dispatch(showDialog({ type: dialogTypes.TABLESETTINGS }))},
    },
  ];

  const TableHeader = (options) => {
    const filterFormValues = getValues();

    const RenderHtml = ({ type, column }) => {
      const [showDrop, setShowDrop] = useState(false);
      switch (type) {
        case htmlComponentTypes.INPUT:
          return (
            <PrimeInput
              {...column}
              showLabel={false}
              control={control}
              className={'py-[4px] m-0'}
            />
          );
        case htmlComponentTypes.DROPDOWN:
          return (
            <CommonMenu setShowMenu={setShowDrop}>
              <div className="flex items-center border-zinc-300 border-[1px] rounded px-2 gap-2">
                <span className="rounded-full px-1 bg-pink-100 text-pink-600">
                  {filterFormValues[column.name]?.length}
                </span>
                <span>Selected</span>
                <span>
                  <CommonLucideIcon
                    name={'arrow-down'}
                    size={12}
                    onClick={() => setShowDrop((prev) => !prev)}
                  />
                </span>
                {showDrop && (
                  <div
                    className={`z-999999 absolute top-[30px] menu-sub ${showDrop ? 'menu-sub-visible' : ''} bg-white w-max-[250px] px-3 py-5 border-zinc-200 border-[1px] shadow rounded`}
                  >
                    <CommonCheckbox
                      {...column}
                      showLabel={false}
                      control={control}
                      className={'py-[1px] px-[2px] m-0'}
                      layout={'column'}
                      optionLabel="label"
                      optionValue="value"
                      labelStyle={checkboxLabelTypes.BADGE}
                    />
                  </div>
                )}
              </div>
            </CommonMenu>
          );
        default:
          return (
            <PrimeInput {...column} showLabel={false} control={control} />
          );
      }
    };
    return (
      <div className="text-sm font-medium w-full flex items-center gap-5 px-6 py-2 overflow-x-scroll no-scrollbar">
        {tableFields.map((field, index) => {
          if (filterFormValues[field.name])
            return (
              <div
                key={index}
                className="flex gap-2 px-3 py-1 items-center border-zinc-300 border-[1px] rounded-lg w-[250px]"
              >
                <span className="font-semibold">{field.header}</span>
                <RenderHtml type={field.type} column={field} />
                {/* {renderHtml(field.type, field)} */}
                <CommonLucideIcon name="x" size={18} />
              </div>
            );
        })}
      </div>
    );
  };

  return (
    <div className="datatable__container relative h-[calc(100vh-120px)]">
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <div className="dark:bg-boxdark dark:text-white bg-white border-2 border-slate-200 shadow-lg rounded-md">
          <div className="flex items-center justify-between h-16 w-full shadow-xl">
            {/**@LEFT */}
            <div className="w-1/2 flex justify-start gap-10">
              <div className="flex gap-3 mx-5 items-center">
                <CommonLucideIcon
                  name={displayDetails?.iconName}
                  className={'text-cancel'}
                  size={20}
                />
                <span className="uppercase font-bold text-boxdark text-lg tracking-wide">
                  {displayDetails?.title}
                </span>
              </div>
              <div className="flex gap-3">
                <CommonButton className="px-3 py-3">
                  <CommonLucideIcon name="file-chart-column" size={16} />
                </CommonButton>
                <CommonButton
                  className="px-3 py-2"
                  onClick={() =>
                    dispatch(showDialog({ type: dialogTypes.COMMONDIALOG }))
                  }
                >
                  <CommonLucideIcon name="cloud-upload" size={16} />
                </CommonButton>
                <CommonButton
                  className="px-3 py-2"
                  onClick={(e) => menuRef.current?.toggle(e)}
                >
                  <CommonLucideIcon name="download" size={16} />
                </CommonButton>
                <CommonButton
                  className="px-3 py-2"
                  onClick={() =>
                    dispatch(showDialog({ type: DialogTypes.COMMONDIALOG }))
                  }
                >
                  <CommonLucideIcon name="plus" size={16} />
                </CommonButton>
                <CommonButton
                  className="px-3 py-2"
                  variant={buttonVariants.CANCEL}
                  onClick={() => refetch()}
                >
                  <CommonLucideIcon
                    name="refresh-ccw"
                    size={16}
                    className="text-white"
                  />
                </CommonButton>
              </div>
            </div>
            {/**@RIGHT */}
            <div className="flex items-center me-5 gap-3">
              <form>
                <PrimeInput
                  control={control}
                  name="search"
                  showIcon={true}
                  iconName={'search'}
                  placeholder={'Search'}
                  className={'py-[.5rem]'}
                  showLabel={false}
                />
              </form>
              <HeadlessMenu
                MenuButtonTemplate={() => (
                  <div className="py-2">
                    <CommonLucideIcon name="ellipsis-vertical" size={22} />
                  </div>
                )}
                menuButtonClassName={'flex h-full items-center'}
                menuItems={tableMenuOptions}
                menuItemOptionValue={'name'}
                menuItemsClassName={'py-4'}
                MenuItemTemplate={(
                  props,
                  item,
                  optionValue,
                  menuItemClassName
                ) => (
                  <div
                    className={classNames(
                      'flex items-center gap-3 py-3 ps-5 cursor-pointer',
                      menuItemClassName,
                      { 'bg-indigo-100': props.focus }
                    )}
                    onClick={item.onClick}
                  >
                    {/* <span><CommonLucideIcon name={item.icon} size={18} className={item.className}/></span> */}
                    <span>
                      {' '}
                      <ReactIcons
                        name={item.icon}
                        iconType={item.iconType}
                        className={item.className}
                        size={20}
                      />
                    </span>
                    <span>{item[optionValue]}</span>
                  </div>
                )}
              />
            </div>
          </div>
          <Divider plain className="m-0 bg-slate-100"></Divider>
          {/* <PrimeDatatable1
            results={data?.[responseKey]}
            tableFields={tableFields} 
          /> */}
          <DataTable
            className="dark:bg-boxdark dark:text-white"
            value={data && data?.[responseKey]}
            resizableColumns
            columnResizeMode="expand"
            scrollable
            scrollHeight="65vh"
            stripedRows
            rows={10}
            filterIcon={(options) => filterIcon(options, checkAppliedFilter)}
            rowsPerPageOptions={[5, 10, 25]}
            selectionMode={'checkbox'}
            selection={selectedRows}
            // header={TableHeader}
            // onSelectionChange={e => setSelectedRows(e.value)}
            onSelectionChange={onRowSelect}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3rem' }}
              headerClassName="text-center text-sm py-2 dark:bg-boxdark dark:text-white text-capitalize shadow-lg relative column__header border-b-[1px] border-slate-200 fixed"
            ></Column>
            {
              /**@COLUMNS */
              tableFields.map(
                (column) => (
                  (column.onRowSelect = onRowSelect),
                  (
                    <Column
                      key={column.name}
                      field={column.searchKey}
                      header={column.header}
                      style={{ width: '40px' }}
                      headerClassName="text-center text-sm m-0 py-2 dark:bg-boxdark dark:text-white text-capitalize shadow-lg relative column__header border-b-[1px] border-slate-200 w-[50px]"
                      className="dark:bg-boxdark dark:text-white text-sm w-[50px]"
                      showFilterMatchModes={false}
                      showFilterMenuOptions={false}
                      showApplyButton={false}
                      showClearButton={false}
                      filter
                      filterMenuClassName="shadow border-slate-200 border-[1px] max-w-[300px]"
                      filterElement={(options) => (
                        <TableFilters
                          options={options}
                          column={column}
                          form={filterForm}
                          ref={filterMenuRef}
                          applyFilter={filterApply}
                        />
                      )}
                      body={(row, columnProps) =>
                        tableColumnBody(row, columnProps, column)
                      }
                    />
                  )
                )
              )
            }
          </DataTable>
          <Divider plain className="m-0 bg-slate-100" />
          {/* <CommonPaginator totalCount={totalCount} first={first} rows={rows} setRows={setRows} onPageChange={paginatorOnchangeFunc}/> */}
          <CommonPaginator />

          <DeleteConfirmationDialog
            visible={dialogState[dialogTypes.DELETECONFIRMATION]?.show}
            onHide={cancelDeleteConfirmation}
            onSubmit={handleMultiDelete}
          />

          <CommonDialog
            className={'w-1/2 h-[85vh]'}
            visible={dialogState[dialogTypes.COMMONDIALOG]?.show}
            onHide={() =>
              dispatch(hideDialog({ type: dialogTypes.COMMONDIALOG }))
            }
          >
            <CommonForm
              schema={formSchema}
              formFields={formFields}
              url={url}
              refetch={refetch}
            ></CommonForm>
          </CommonDialog>
        </div>
      )}
    </div>
  );
};

PrimeDatatable.propTypes = {
  results: PropTypes.array.isRequired,
  tableFields: PropTypes.array.isRequired,
  formFields: PropTypes.array.isRequired,
  formSchema: PropTypes.object.isRequired,
  // isLoading: PropTypes.bool.isRequired,
  // totalCount: PropTypes.number.isRequired,
  // first: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  responseKey: PropTypes.string.isRequired,
  displayDetails: PropTypes.object,
};

export default PrimeDatatable;
