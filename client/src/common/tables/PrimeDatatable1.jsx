import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { columnStyles, filterIcon } from "./index";
import PrimeFilterElement from './filters/PrimeFilterElement';

/**
 * @Props
 * @results
 * @tableFields
 */

const propTypes = {
  results: PropTypes.array.isRequired,
  tableFields: PropTypes.array.isRequired,
};

const defaultProps = {
  results: [],
  tableFields: [],
};

export const PrimeDatatable1 = ({ results, tableFields }) => {

  
  return (
    <div>
      <DataTable
        className="dark:bg-boxdark dark:text-white"
        value={results}
        resizableColumns
        columnResizeMode="expand"
        scrollable
        scrollHeight="65vh"
        stripedRows
        rows={10}
        // filterIcon={(options) => filterIcon(options, checkAppliedFilter)}
        rowsPerPageOptions={[5, 10, 25]}
        selectionMode={'checkbox'}
        // selection={selectedRows}
        // header={TableHeader}
        // onSelectionChange={e => setSelectedRows(e.value)}
        // onSelectionChange={onRowSelect}
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
                    <PrimeFilterElement
                      options={options}
                      column={column}
                      form={filterForm}
                      ref={filterMenuRef}
                      applyFilter={filterApply}
                    />
                  )}
                  body={(row, columnProps) =>
                    columnStyles(row, columnProps, column)
                  }
                />
              )
            )
          )
        }
      </DataTable>
    </div>
  );
};

PrimeDatatable1.propTypes = propTypes;
PrimeDatatable1.defaultProps = defaultProps;
