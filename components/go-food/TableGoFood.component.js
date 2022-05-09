import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

function createData(restaurants) {
  const result = []

  restaurants.forEach((item) => {
    result.push({
      restaurant: item.restaurant,
      quantity: item.menus.length,
      totalPrice: item.menus.reduce((acc, cur) => acc + cur.price, 0),
      history: item.menus.map((menu) => ({
        date: new Date().toISOString().split('T')[0],
        menuQuantity: 1,
        name: menu.name,
        price: menu.price,
        status: menu.status,
      })),
    })
  })

  return result
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.restaurant}
        </TableCell>
        <TableCell align='left'>{row.quantity}</TableCell>
        <TableCell align='left'>{row.totalPrice}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Selected Menus
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align='left'>Menu Name</TableCell>
                    <TableCell align='left'>Price</TableCell>
                    <TableCell align='center'>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.menuQuantity}</TableCell>
                      <TableCell align='left'>{historyRow.name}</TableCell>
                      <TableCell align='left'>{historyRow.price}</TableCell>
                      <TableCell align='center'>
                        <span
                          className={`px-2 py-0.5 rounded text-white ${
                            historyRow.status === 'pending'
                              ? 'bg-yellow-500'
                              : historyRow.status === 'paid'
                              ? 'bg-lime-500'
                              : 'bg-rose-500'
                          }`}
                        >
                          {historyRow.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    restaurant: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        menuQuantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default function CollapsibleTable({ restaurants }) {
  const [rows] = React.useState(() => createData(restaurants))

  return (
    <div className='table-no-shadow'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Restaurant</TableCell>
              <TableCell align='left'>Order Quantity</TableCell>
              <TableCell align='left'>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.restaurant} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
