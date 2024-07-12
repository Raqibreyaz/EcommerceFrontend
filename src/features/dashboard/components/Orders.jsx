import React, { memo } from 'react';
import { useTable } from 'react-table';
import { useFetchAllOrdersQuery } from '../../orders/orderSlice';
import { Container } from '../../../components/index';
import { Link } from 'react-router-dom';

const TableComponent = memo(({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    console.log(rows);

    return (
        <table {...getTableProps()} className="min-w-full bg-white ">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="py-2 px-4 border">
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr key={row.getRowProps().key} role={row.getRowProps().role} className='border-y'>
                            {row.cells.map(cell => {
                                // have to give select elem for changing status
                                console.log(cell)
                                return <td key={cell.getCellProps().key} role={cell.getCellProps().role} className="py-2 px-4 border">
                                    {cell.render('Cell')}
                                </td>
                            })}
                            <td><Link to={`/order-details/${row.original?._id}`} className='text-blue-500 text-sm'>See Details</Link></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
})


function Orders() {

    // {
    //     _id: new ObjectId('667c49fac351c68d6dae7f8b'),
    //         totalAmount: 3345.6,
    //             deliveryStatus: 'pending',
    //                 createdAt: 2024-06 - 26T17:03: 54.611Z,
    //                     customer_name: 'raqib',
    //                         noOfProducts: 2
    // }

    const statusColors = {
        delivered: 'text-green-600',
        pending: 'text-yellow-600',
        cancelled: 'text-red-600',
        returned: 'text-gray-600'
    };

    const columns = React.useMemo(
        () => [
            { Header: 'Customer Name', accessor: 'customer_name' },
            { Header: 'Total Amount', accessor: 'totalAmount' },
            { Header: 'No Of Products', accessor: 'noOfProducts' },
            { Header: 'Placed At', accessor: 'createdAt' },
            {
                Header: 'Delivery Status', accessor: 'deliveryStatus',
                Cell: ({ value }) => (
                    <select value={value} className={statusColors[value]}>
                        <option value='pending' className={statusColors['pending']}>pending</option>
                        <option value='delivered' className={statusColors['delivered']}>delivered</option>
                        <option value='cancelled' className={statusColors['cancelled']}>cancelled</option>
                        <option value='returned' className={statusColors['returned']}>returned</option>
                    </select>
                )
            },
        ],
        []
    );

    const { data: { orders } = {}, isLoading: isLoadingOrders } = useFetchAllOrdersQuery()

    return (
        <Container
            RenderingConditions={[!!orders, !!orders?.length > 0]}
            LoadingConditions={[!!isLoadingOrders]}
        >
            <TableComponent data={orders} columns={columns} />
        </Container>
    )
}


export default Orders
