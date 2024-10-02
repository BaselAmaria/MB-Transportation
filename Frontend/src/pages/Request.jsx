import React, { useEffect, useState } from 'react'
import classes from './Request.module.scss'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getSuppliers } from '../store/slices/mainReducer'
import { uppercaseFirstLetter } from '../utils/HelperFunctions'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
const Request = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {suppliersData,suppliersLoading , suppliersError,orderCreateLoading,orderCreateError} = useSelector(state => state.main)
  const [current,setCurrent] = useState('select')
  
  const [shipInfo,setShipInfo] = useState({
    moving_type: null,
    full_name: null,
    tel_number: null,
    place_from: null,
    place_to: null,
    distance: null,
    boxes: null,
    which_date: null,
    supplier: null,
  })
  const [checkoutData,setCheckoutData] = useState({
    full_name: null,
    email: null,
    address: null,
    city: null,
    state:null,
    zip:null,
    name_on_card:null,
    card_number:null,
    expiry_month:null,
    expiry_year:null,
    cvv:null,
  })

  // will add to it the transport info
  const [disabled,setDisabled] = useState(true)
  const [disabled2,setDisabled2] = useState(true)
  const [totalPrice,setTotalPrice] = useState(0)
  // will add to it the total price
  const transportTypes = [
    {name: 'Appartment', value: 'apartment'},
    {name: 'Office', value: 'office'},
    {name: 'Construction', value: 'construction'},
    {name: 'Others', value: 'other'}
  ]


  const handleCreateOrder = () => {
    dispatch(createOrder(shipInfo)).then((res) => {
      if(res?.payload?.created_at) {
        setCurrent('ordered')
      }
    })
  }


  useEffect(() => {
    dispatch(getSuppliers())
    suppliersError && console.log(suppliersError)
    orderCreateError && console.log(orderCreateError)
  }, [])

  useEffect(() => {
    if(current === 'ordered') {
      setTimeout(() => {
        navigate('/profile')
      }, 4000)
    }
  }, [current])
  

  useEffect(() => {
    if(shipInfo?.moving_type && shipInfo?.full_name && shipInfo?.tel_number && shipInfo?.place_from && shipInfo?.place_to && shipInfo?.distance && shipInfo?.boxes && shipInfo?.which_date) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    if(shipInfo?.moving_type && shipInfo?.distance && shipInfo?.supplier) {
      if(shipInfo?.moving_type === 'apartment') {
        setTotalPrice(suppliersData?.find(supplier => supplier?.user_prices?.supplier === shipInfo?.supplier)?.user_prices?.apartment_price * shipInfo?.distance)
      }
      if(shipInfo?.moving_type === 'office') {
        setTotalPrice(suppliersData?.find(supplier => supplier?.user_prices?.supplier === shipInfo?.supplier)?.user_prices?.office_price * shipInfo?.distance)
      }
      if(shipInfo?.moving_type === 'construction') {
        setTotalPrice(suppliersData?.find(supplier => supplier?.user_prices?.supplier === shipInfo?.supplier)?.user_prices?.construction_price * shipInfo?.distance)
      }
      if(shipInfo?.moving_type === 'other') {
        setTotalPrice(suppliersData?.find(supplier => supplier?.user_prices?.supplier === shipInfo?.supplier)?.user_prices?.other_price * shipInfo?.distance)
      }
      }
    setTotalPrice((prevState) => prevState + ((suppliersData?.find(supplier => supplier?.user_prices?.supplier === shipInfo?.supplier)?.user_prices?.box_price * shipInfo?.boxes)))

  
  }, [shipInfo])

  
  

  useEffect(() => {
    if(checkoutData?.full_name && checkoutData?.email && checkoutData?.address && checkoutData?.city && checkoutData?.state && checkoutData?.zip && checkoutData?.name_on_card && checkoutData?.card_number && checkoutData?.expiry_month && checkoutData?.expiry_year && checkoutData?.cvv) {
      setDisabled2(false)
    } else {
      setDisabled2(true)
    }
  }, [checkoutData])
  


  const columns = [
    {
      name: 'Supplier',
      selector: row => <p>{row?.first_name	+ ' ' + row?.last_name}</p>,
    },
    {
      name: 'Company Name',
      selector: row => <p>{row?.company}</p>,
      minWidth: "200px",

    },
    {
      name: 'Box Price',
      selector: row => <p>{row?.user_prices?.box_price} / box</p>,
      minWidth: "100px",

    },
    {
      name: 'Apartment Price',
      selector: row => <p>{row?.user_prices?.apartment_price} / KM</p>,
      minWidth: "200px",

    },
    {
      name: 'Office Price',
      selector: row => <p>{row?.user_prices?.office_price} / KM</p>,
    },
    {
      name: 'Construction Price',
      selector: row => <p>{row?.user_prices?.construction_price} / KM</p>,
      minWidth: "200px",

    },
    {
      name: 'Other Price',
      selector: row => <p>{row?.user_prices?.other_price} / KM</p>,
    },
    {
      name: 'Action',
      selector: row =>  <Button text={'Order'} sm onClick={() => {setShipInfo({...shipInfo,supplier:row?.user_prices?.supplier}); setCurrent('ship')}}/>,
    },
  ];





  return (
    <section className={classes.container}>
      <h3>Order Transport</h3>
      {current === 'select' && (
        <div className={classes.tableContainer}> 
        <Table
          columns={columns}
          data={suppliersData}
          noData={"There's no suppliers available"}
          loading={suppliersLoading}
        />
        </div>
      )}
      {current === 'ship' && (
        <div className={classes.requestForm}>
        <div className={classes.formGroup}>
          <label htmlFor="transportType">Transport Type</label>
          <select name="transportType" id="transportType" onChange={(e) => setShipInfo({...shipInfo,moving_type:e.target.value})}>
            <option value="" disabled selected>Select type</option>
            {transportTypes?.map((type) => (
            <option value={type?.value}>{type?.name}</option>
            ))}
          </select>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="full_name">Full Name:</label>
          <input type="text" id="full_name" value={shipInfo?.full_name}  onChange={(e) => setShipInfo({...shipInfo,full_name:uppercaseFirstLetter(e.target.value)})} placeholder="Full Name" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="phone_number"  >Phone Number:</label>
          <input type="text" id="phone_number" value={shipInfo?.tel_number} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setShipInfo({...shipInfo,tel_number:e.target.value})}} placeholder="Phone Number"  />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="from">From:</label>
          <input type="text" id="from" value={shipInfo?.place_from} onChange={(e) => setShipInfo({...shipInfo,place_from:e.target.value})} placeholder="Enter Destination" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="to">To:</label>
          <input type="text" id="to"  value={shipInfo?.place_to} onChange={(e) => setShipInfo({...shipInfo,place_to:e.target.value})}  placeholder="Enter Destination" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="distance">Distance In KM:</label>
          <input type="text" id="to"  value={shipInfo?.distance} onChange={(e) => setShipInfo({...shipInfo,distance:e.target.value})}  placeholder="Distance" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="boxes">How Many Boxes:</label>
          <input type="text" id="to"  value={shipInfo?.boxes} onChange={(e) => setShipInfo({...shipInfo,boxes:e.target.value})}  placeholder="How Many Boxes" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date"  value={shipInfo?.which_date} onChange={(e) => setShipInfo({...shipInfo,which_date:e.target.value})}  />
        </div>
        <div className={classes.formGroup}>
          <Button sm onClick={() => setCurrent('checkout')} disabled={disabled}  text={'Submit'}/>
        </div>
      </div>
      )}
      {current === 'checkout' && (
        <div className={classes.requestForm2}>
        <div className={classes.billingForm}>
        <div className={classes.address}>
          <h4>Billing Address</h4>
        <div className={classes.formGroup}>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" id="full_name" value={checkoutData?.full_name}  onChange={(e) => setCheckoutData({...checkoutData,full_name:uppercaseFirstLetter(e.target.value)})} placeholder="Full Name" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={checkoutData?.email} onChange={(e) => setCheckoutData({...checkoutData,email:e.target.value})} placeholder="Email" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" value={checkoutData?.address} onChange={(e) => setCheckoutData({...checkoutData,address:e.target.value})} placeholder="Address" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" value={checkoutData?.city} onChange={(e) => setCheckoutData({...checkoutData,city:e.target.value})} placeholder="City" />
        </div>
        <div style={{display:'flex',gap:'1rem'}}>
        <div className={classes.formGroup} style={{flex:1}}>
          <label htmlFor="state">state:</label>
          <input type="text" id="state" value={checkoutData?.state} onChange={(e) => setCheckoutData({...checkoutData,state:e.target.value})} placeholder="State" />
        </div>
        <div className={classes.formGroup} style={{flex:1}}>
          <label htmlFor="zip"  >Zip:</label>
          <input type="text" id="zip" value={checkoutData?.zip} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setCheckoutData({...checkoutData,zip:e.target.value})}} placeholder="Zip"  />
        </div>
        </div>
        </div>
        <div className={classes.payment}>
        <h4>Payment</h4>
        <div className={classes.formGroup}>
          <label htmlFor="nameoncard">Name on Card:</label>
          <input type="text" id="nameoncard" value={checkoutData?.name_on_card} onChange={(e) => setCheckoutData({...checkoutData,name_on_card:e.target.value})} placeholder="Name on Card" />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="credit"  >Credit Card Number:</label>
          <input type="text" id="credit" value={checkoutData?.card_number} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setCheckoutData({...checkoutData,card_number:e.target.value})}} placeholder="Credit Card Number"  />
        </div>
        <div style={{display:'flex',gap:'1rem'}}>
          <div className={classes.formGroup} style={{flex:1}}>
            <label htmlFor="expmonth">Exp Month:</label>
            <input type="text" id="expmonth" value={checkoutData?.expiry_month} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setCheckoutData({...checkoutData,expiry_month:e.target.value})}} placeholder="Exp Month"  />
          </div>
          <div className={classes.formGroup} style={{flex:1}}>
            <label htmlFor="expyear">Exp Year:</label>
            <input type="text" id="expyear" value={checkoutData?.expiry_year} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setCheckoutData({...checkoutData,expiry_year:e.target.value})}} placeholder="Exp Year"  />
          </div>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" value={checkoutData?.cvv} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setCheckoutData({...checkoutData,cvv:e.target.value})}} placeholder="CVV"  />
        </div>
        <div className={classes.formGroup}>
        <h4 style={{marginTop:'2rem'}}>Total Price {totalPrice} $</h4>
        </div>
        </div>
       
        </div>
     
        <div className={classes.formGroup}>
          <Button sm onClick={handleCreateOrder} disabled={disabled2 || orderCreateLoading} loading={orderCreateLoading} text={'Order'}/>
        </div>
      </div>
      )}
      {current === 'ordered' && (
        <div className={classes.success}>
          <FaCheckCircle />
          <h4>Your Order has been placed successfully</h4>
        </div>
      )}
     
    </section>
  )
}

export default Request