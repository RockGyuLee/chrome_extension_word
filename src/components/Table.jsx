import React, {useMemo, useState, useEffect, Fragment} from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import PuffLoader from "react-spinners/PuffLoader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//modules
import { BButton} from "./Button";

const iconTag = {
    cursor : "pointer",
    color : "#333333"
}

const PlusStyl = styled.div`
  display : flex;
  width : 100%;
  align-items : center;
  justify-content : center;
`

const Styles = styled.div`
  padding: 1rem;
  display : flex;
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

function PlusEditWord( { columns } ){

  const [isPush, setIsPush ] = useState(false);
  const [datas, setDatas ] = useState([{ 
    spelling : "입력해주세요.",
    description : "입력해주세요."
  }]);

  const insertHandle = () => {
    setIsPush(true);
  }

  console.log("columns",columns)


  return (
    <Fragment>
      {
        isPush 
        ? <table style={{ 
              border: 'solid 1px',
              width :'50%',
              }}>
            <thead>
              {columns.map(headerGroup => (
                <th>
                  {headerGroup["Header"]}
                </th>
              ))}
            </thead>
            <tbody>
                {
                  datas.map(item => {
                    return (
                      <tr>
                      <td>{item.spelling}</td>
                      <td>{item.description}</td>
                      </tr>
                    )
                  })
                }
                <tr>
                  <td colSpan={2} style={{textAlign : "center"}}>
                    <FontAwesomeIcon style={iconTag} icon={faPlusCircle} size={"lg"}/>
                  </td>
                </tr>
            </tbody>
          </table>
        : <PlusStyl>
            <BButton text={"추가"} onClick={insertHandle}/>
          </PlusStyl>
      }
    </Fragment>
  )
}


function WTable({ccolumns, items, updateMyData, ...props}){
    if(items.length == 0){
        return (
            <PuffLoader color={"black"} loading={true} size={100}/>
        );
    }

   const data = useMemo(
     () => items,
     []
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
     ],
     []
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ 
     columns, data, updateMyData, defaultColumn 
    })
 
   return (
     <Styles>
       <table {...getTableProps()} style={{ 
          border: 'solid 1px',
          width :'50%',
          marginRight : "5%",
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
      <PlusEditWord columns={columns}/>
     </Styles>
     
   )
 }

export default WTable;