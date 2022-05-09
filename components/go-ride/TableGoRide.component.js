import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'

function createData(orders) {
  const result = []

  orders.forEach((item) => {
    result.push({
      pickUpPoint: item.pickUpPoint.address,
      destination: item.destination.address,
      price: item.price,
      status: item.status,
    })
  })

  return result
}

export default function AcccessibleTable({ orders }) {
  const [rows] = React.useState(() => createData(orders))

  return (
    <div className='table-no-shadow rounded-b border-b'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='caption table'>
          <caption>
            Your <samp>go-ride</samp> order history
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Pick Up Location</TableCell>
              <TableCell align='left'>Destination Location</TableCell>
              <TableCell align='left'>Fee</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {row.pickUpPoint}
                </TableCell>
                <TableCell align='left'>{row.destination}</TableCell>
                <TableCell align='left'>{row.price}</TableCell>
                <TableCell align='center'>
                  <span
                    className={`px-2 py-0.5 rounded text-white ${
                      row.status === 'pending'
                        ? 'bg-yellow-500'
                        : row.status === 'paid'
                        ? 'bg-lime-500'
                        : 'bg-rose-500'
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
