import React, { useEffect, useState } from 'react'
import classes from './AdminPage.module.scss'
import Navbar from '../components/main/Navbar'
import Footer from '../components/main/Footer'
import Table from '../components/ui/Table'
import Button from '../components/ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Modal, Typography } from '@mui/material';
import { adminDeleteOrder, deleteCustomer, deleteMessage, deleteOrder, getCustomers, getMessages, getOrders, getSuppliers } from '../store/slices/mainReducer'
import { FaCheck } from 'react-icons/fa'
const AdminPage = () => {
  const [current,setCurrent] = useState('orders')
  const [showMessage,setShowMessage] = useState(false)
  const [message,setMessage] = useState(null)
  const [successMessage,setSuccessMessge] = useState(null)
  const {
    customersLoading,customersError,customersData,
    ordersData,ordersLoading,ordersError,
    suppliersData,suppliersLoading,suppliersError,
    messagesData,messageLoading,messageError,
    deleteMessageLoading,deleteMessageError,
    adminDeleteOrderLoading,adminDeleteOrderError,
    deleteCustomerLoading,deleteCustomerError,
  } = useSelector(state => state.main)
  const dispatch = useDispatch()

  const handleDeleteCustomer = (id) => {
    dispatch(deleteCustomer(id)).then((res) => {
      res?.payload?.message && setSuccessMessge(res?.payload?.message)
      dispatch(getCustomers())
    })
  }
  const handleDeletSupplier = (id) => {
    dispatch(deleteCustomer(id)).then((res) => {
      res?.payload?.message && setSuccessMessge(res?.payload?.message)
      dispatch(getSuppliers())
    })
  }
  const handleDeleteOrder = (id) => {
    dispatch(adminDeleteOrder(id)).then((res) => {
      res?.payload?.message && setSuccessMessge(res?.payload?.message)
      dispatch(getOrders())
    })
  }
  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id)).then((res) => {
      res?.payload?.message && setSuccessMessge(res?.payload?.message)
      dispatch(getMessages())
    })
  } 

  const handleOpenMessage = (message) => {
    setShowMessage(true)
    setMessage(message)
  }


  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getOrders())
    dispatch(getSuppliers())
    dispatch(getCustomers())
    dispatch(getMessages())
    customersError && console.log(customersError)
    ordersError && console.log(ordersError)
    suppliersError && console.log(suppliersError)
    messageError && console.log(messageError)
    deleteMessageError && console.log(deleteMessageError)
    adminDeleteOrderError && console.log(adminDeleteOrderError)
    deleteCustomerError && console.log(deleteCustomerError)
  }, [])
  


  const orders = [
    {
      name: 'Order Number',
      selector: row => <p>{row?.id}</p>,
      
    },
    {
      name: 'Customer',
      selector: row => <p>{row?.customer_name}</p>,
    },
    {
      name: 'Supplier',
      selector: row => <p>{row?.supplier_name}</p>,
    },
    {
      name: 'Transport Type',
      selector: row => <p>{row?.moving_type}</p>,
    },
    {
      name: 'Distanse',
      selector: row => <p>{row?.distance}KM</p>,
    },
    {
      name: 'Price',
      selector: row => <p>{row?.price}</p>,
    },
    {
      name: 'Status',
      selector: row => <p className={classes.status}>Status: <span style={{color: row?.status === 'pending' ? 'var(--blueColor)' : row?.status === 'accepted' ? 'var(--greenColor)' : 'var(--redColor)'}}>{row?.status}</span></p>,
    },
    {
      name: 'Action',
      selector: row =>  <Button text={'Delete'} sm onClick={() => handleDeleteOrder(row?.id)} loading={adminDeleteOrderLoading} warning disabled={adminDeleteOrderLoading || row?.status !== 'pending' }/>,
    },
  ];
  
  const suppliers = [
    {
      name: 'First Name',
      selector: row => <p>{row?.first_name}</p>,
    },
    {
      name: 'Last Name',
      selector: row => <p>{row?.last_name}</p>,
    },
    {
      name: 'Email',
      selector: row => <p>{row?.email}</p>,
    },
    {
      name: 'Company Name',
      selector: row => <p>{row?.company}</p>,
    },
    {
      name: 'Action',
      selector: row =>  <Button text={'Delete'} sm onClick={() => handleDeletSupplier(row?.id)} loading={deleteCustomerLoading} warning disabled={deleteCustomerLoading}/>,
    },
  ];
  const customers = [
    {
      name: 'First Name',
      selector: row => <p>{row?.first_name}</p>,
    },
    {
      name: 'Last Name',
      selector: row => <p>{row?.last_name}</p>,
    },
    {
      name: 'Phone Number',
      selector: row => <p>{row?.phone}</p>,
    },
    {
      name: 'Email',
      selector: row => <p>{row?.email}</p>,
    },
    {
      name: 'Address',
      selector: row => <p>{row?.address}</p>,
    },
    {
      name: 'Action',
      selector: row =>  <Button text={'Delete'} sm onClick={() => handleDeleteCustomer(row?.id)} loading={deleteCustomerLoading} warning disabled={deleteCustomerLoading}/>,
    },
  ];
  const messages = [
    {
      name: 'Name',
      selector: row => <p>{row?.name}</p>,
    },
    {
      name: 'Email',
      selector: row => <p>{row?.email}</p>,
    },
    {
      name: 'Subject',
      selector: row => <p>{row?.subject}</p>,
    },
    {
      name: 'Message',
      selector: row => <p style={{cursor:'pointer',color:'var(--blueColor)'}} onClick={() => handleOpenMessage(row?.message)}>{row?.message?.slice(0,15)}..</p>,
    },
    {
      name: 'Action',
      selector: row =>  <Button text={'Delete'} sm onClick={() => handleDeleteMessage(row?.id)} loading={deleteMessageLoading} warning disabled={deleteMessageLoading}/>,
    },
  ];

  console.log(messagesData)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #ddd',
    boxShadow: 24,
    p: 4,
  };
 
  return (
    <section className={classes.container}>
     <Navbar admin/>
     <div className={classes.adminContent}>
        <h1>Admin Page</h1>
        <div className={classes.total}>
          <p onClick={() => setCurrent('orders')}>
            Total Orders: <span>{ordersData?.length}</span>
          </p>
          <p onClick={() => setCurrent('suppliers')}>
            Total Suppliers: <span>{suppliersData?.length}</span>
          </p>
          <p onClick={() => setCurrent('customers')}>
            Total Customers: <span>{customersData?.length}</span>
          </p>
          <p onClick={() => setCurrent('messages')}>
            Total Messages: <span>{messagesData?.length}</span>
          </p>
        </div>
        <div className={classes.adminHeader}>
          <button onClick={() => setCurrent('orders')} style={{borderBottomColor:current === 'orders' && '#1134ea',color: current === 'orders' && '#1134ea'}} className={classes.button}>Orders</button>
          <button onClick={() => setCurrent('suppliers')} style={{borderBottomColor:current === 'suppliers' && '#1134ea',color: current === 'suppliers' && '#1134ea'}} className={classes.button}>Suppliers</button>
          <button onClick={() => setCurrent('customers')} style={{borderBottomColor:current === 'customers' && '#1134ea',color: current === 'customers' && '#1134ea'}} className={classes.button}>Customers</button>
          <button onClick={() => setCurrent('messages')} style={{borderBottomColor:current === 'messages' && '#1134ea',color: current === 'messages' && '#1134ea'}} className={classes.button}>Messages</button>
        </div>
        {successMessage && <Alert icon={<FaCheck fontSize="inherit" />} severity="success" onClose={() => {setSuccessMessge(null)}}>
          {successMessage}
        </Alert>}
          {showMessage &&  <Modal
            open={showMessage}
            onClose={() => setShowMessage(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {message}
            </Typography>
          </Box>
           
        </Modal>}
        {current === 'orders' && (
          <Table
            columns={orders}
            data={ordersData}
            loading={ordersLoading}
            noData={"There's no orders available"}
          />
        )}
        {current === 'suppliers' && (
          <Table
            columns={suppliers}
            data={suppliersData}
            loading={suppliersLoading}
            noData={"There's no suppliers available"}
          />
        )}
        {current === 'customers' && (
          <Table
            columns={customers}
            data={customersData}
            loading={customersLoading}
            noData={"There's no customers available"}
          />
        )}
        {current === 'messages' && (
          <Table
            columns={messages}
            data={messagesData}
            loading={messageLoading}
            noData={"There's no messages available"}
          />
        )}
     </div>
     <Footer admin/>
    </section>
  )
}

export default AdminPage