import React, {useMemo, useState, useEffect, forwardRef, useRef, Fragment} from "react";
import styled from "styled-components";
import { useTable, useRowSelect, usePagination, useGlobalFilter ,useFilters } from "react-table";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch } from "react-redux"

//modules
import { BButton} from "./Button";
import { updateCurrentUser } from "@firebase/auth";


const Styles = styled.div`
  padding: 1rem;
  width : 70%;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <input type="checkbox" ref={resolvedRef} {...rest} />
    )
  }
)

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  }) => {

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell,
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }

}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function WTable({ccolumns, items, updateMyData, setItemHook, ...props}){
  if(items === null){
      return (
          <PuffLoader color={"black"} loading={true} size={100}/>
      );
  }

   const data = useMemo(
     () => items,
     [items]
   )
 
   const columns = useMemo(
     () => [
       {
         Header: '단어',
         accessor: 'spelling',
         filter: null
       },
       {
         Header: '설명',
         accessor: 'description',
         filter: null
       },
       {
        Header: '품사',
        accessor: 'wordClass',
        Filter : SelectColumnFilter,
        filter: "includes"
        
      },
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     page,
     prepareRow,
     selectedFlatRows,
     canPreviousPage,
     canNextPage,
     pageOptions,
     pageCount,
     gotoPage,
     nextPage,
     previousPage,
     setPageSize,
     state: { pageIndex, pageSize },
   } = useTable({ 
     columns, data, updateMyData, defaultColumn ,
     initialState: { pageIndex: 0 }
    },
    useFilters,useGlobalFilter,
    usePagination,useRowSelect
    , hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()}/>
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    })

  const handleRemove = () => {
    let ids = selectedFlatRows.map(item => item.id);

    ids.map( item => {
      delete items[item]
    })

    let updateWordList = items.filter(i => i);

    setItemHook(updateWordList);

  }

  return (
    <Fragment>
      <Styles>
        {
          selectedFlatRows != 0  && <BButton width={"6vw"} height={"5vh"} text={"remove"} onClick={handleRemove} />
        }
        <table {...getTableProps()} style={{ 
          marginTop : '2%',
          border: 'solid 1px',
          width : '100%',
          }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 1px',
                    background: '#EBDBFA',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                  &nbsp;
                  {column.filter ? column.render("Filter") : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          {/* {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
              )
            })} */}
          </tbody>
        </table>
      </Styles>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          페이지{" "}
          <strong>
            {pageIndex + 1} 의 {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | 페이지 이동:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
             {pageSize} 펼치기
            </option>
          ))}
        </select>
      </div>
    </Fragment>
   )
 }

export default WTable;