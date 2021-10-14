import React, {useMemo, } from "react";
import { useTable } from "react-table";
import PuffLoader from "react-spinners/PuffLoader";

function WTable({ccolumns, ...props}){
    if(props.items.length == 0){
        return (
            <PuffLoader color={"black"} loading={true} size={100}/>
        );
    }

    const { items } = props;

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
   } = useTable({ columns, data })
 
   return (
     <table {...getTableProps()} style={{ 
         border: 'solid 1px blue',
         width :'50%',
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
   )
 }

export default WTable;