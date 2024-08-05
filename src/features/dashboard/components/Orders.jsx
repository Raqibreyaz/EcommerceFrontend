import React, { memo, useCallback, useMemo } from 'react';
import { useTable } from 'react-table';
import { useFetchAllOrdersQuery, useUpdateOrderMutation } from '../../orders/orderSlice';
import { Container } from '../../../components/index';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';

const TableComponent = memo(({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="min-w-full bg-white ">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} >
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="py-2 px-4 border">
                                {/* telling react to render Header */}
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
                                return <td
                                    key={cell.getCellProps().key}
                                    {...cell.getCellProps()}
                                    className="py-2 px-4 border font-semibold capitalize">
                                    {/* telling react to render Cell */}
                                    {cell.render('Cell')}
                                </td>
                            })}
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

    const { data: { orders } = {}, isLoading: isLoadingOrders } = useFetchAllOrdersQuery()

    const [UpdateOrder, { isLoading: isUpdatingOrder }] = useUpdateOrderMutation()

    const statusColors = useMemo(() => (
        {
            delivered: 'text-green-600',
            pending: 'text-yellow-600',
            cancelled: 'text-red-600',
        }
    ), []);

    const changeStatus = useCallback(
        (deliveryStatus, orderId) => {
            catchAndShowMessage(UpdateOrder, { deliveryStatus, id: orderId })
        }
        ,
        [],
    )


    const columns = React.useMemo(
        // header specifies the header of that column
        // accessor specifies the key for getting the value corresponding to column and that row
        () => [
            { Header: 'Customer Name', accessor: 'customer_name' },
            {
                Header: 'Total Amount', accessor: 'totalAmount',
                Cell: ({ value }) =>
                    <span>₹{value}</span>
            },
            { Header: 'No Of Products', accessor: 'noOfProducts' },
            {
                Header: 'Placed At', accessor: 'createdAt',
                Cell: ({ value }) => (
                    <span>{new Date(value).toLocaleString()}</span>
                )
            },
            {
                Header: 'Delivery Status', accessor: 'deliveryStatus',
                // Cell will have info for that cell , which can use for customization
                Cell: ({ value, row: { original } }) => (
                    <select
                        value={value}
                        onChange={(e) => changeStatus(e.target.value, original._id)} className={`${statusColors[value]} capitalize`}
                    >
                        {
                            ['pending', 'delivered', 'cancelled']
                                .map((deliveryStatus, index) => (
                                    <option key={index} value={deliveryStatus} className={`${statusColors[deliveryStatus]} font-semibold`}>{deliveryStatus}</option>
                                ))
                        }
                    </select>
                )
            },
            {
                Header: 'Details', accessor: '_id',
                Cell: ({ value }) => (
                    <Link to={`/order-details/${value}`} className='text-blue-500  font-semibold'>See Details</Link>
                )

            }
        ],
        [orders]
    );

    return (
        <Container
            RenderingConditions={[!!orders, !!orders?.length > 0]}
            LoadingConditions={[!!isLoadingOrders, !!isUpdatingOrder]}
        >
            <h1 className='font-bold text-3xl max-sm:text-2xl mb-3 p-2 mx-auto '>All Orders</h1>
            <div className='overflow-x-auto max-sm:text-xs'>
                <TableComponent data={orders} columns={columns} />
            </div>
        </Container>
    )
}


export default Orders
