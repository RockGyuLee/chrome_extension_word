import React, {useMemo, useState, useEffect, forwardRef, useRef} from "react";
import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch } from "react-redux"

//modules
import { BButton} from "./Button";


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
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
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

function WTable({ccolumns, items, updateMyData, ...props}){
    if(items.length == 0){
        return (
            <PuffLoader color={"black"} loading={true} size={100}/>
        );
    }

  const dispatch = useDispatch();

   const data = useMemo(
     () => items,
     [items]
   )
 
   const columns = useMemo(
     () => [
       {
         Header: '단어',
         accessor: 'spelling', // accessor is the "key" in the data
       },
       {
         Header: '설명',
         accessor: 'description',
       },
      //  {
      //   Header: '제거',
      //   accessor: '',
      // },
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
     selectedFlatRows,
     state: { selectedRowIds },
   } = useTable({ 
     columns, data, updateMyData, defaultColumn 
    },useRowSelect
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
    console.log("ids",ids);

    ids.map( item => {
      delete items[item]
    })

    let updateWordList = items.filter(i => i);

    dispatch( {
      type : "DELETE",
      data : updateWordList,
    });
  }

  return (
    <Styles>
      {
        selectedFlatRows != 0  && <BButton text={"remove"} onClick={handleRemove} />
      }
      <table {...getTableProps()} style={{ 
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
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
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
          })}
        </tbody>
      </table>
    </Styles>
   )
 }

export default WTable;