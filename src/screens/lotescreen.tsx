import React, { useState } from 'react';
import {withCookies, useCookies} from 'react-cookie'
import { Redirect } from 'react-router-dom';
import { useTable } from 'react-table';
const axios = require('axios').default;

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })
    // We render the UI table (lo de arriba la setea)
    return(
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                </tr>
            )
            })}
      </tbody>
        </table>
    )
    }

    function LoteTable() {
        const columns = React.useMemo(
            () => [
                {
                Header: 'Número',
                accesor: 'num',
                },
                {
                    Header: ''
                }
            ])
        
          const data = React.useMemo(() => makeData(20), [])
        
          return (
              <Table columns={columns} data={data} />
          )
    }
