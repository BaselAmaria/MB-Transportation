import React, { useEffect, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import Input from '../components/ui/Input'
import classes from './SupplierProfile.module.scss'
import Button from '../components/ui/Button'
import { formatDate } from '../utils/HelperFunctions'
import { SiInternetcomputer } from 'react-icons/si'
import { MdApartment, MdConstruction, MdEdit } from 'react-icons/md'
import { ImOffice } from 'react-icons/im'
import { GiHouse } from 'react-icons/gi'
import { FaBox, FaRegStar, FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addSale, deleteOrder, editOrder, editProfile, editSupplierPrices, getUser } from '../store/slices/mainReducer'
import { Box, CircularProgress, Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Table from '../components/ui/Table'

const SupplierProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {userData,userLoading,userError,editProfileLoading,editProfileError,
    editSupplierPricesLoading,editSupplierPricesError,
    addSaleLoading,editOrderLoading,editOrderError
  } = useSelector(state => state.main)
  const [salesData,setSalesData] = useState({
    text: '',
    supplier:userData?.id
  })
  const [current,setCurrent] = useState('profile')
  const [edit,setEdit] = useState(false)
  const [editPrices,setEditPrices] = useState(false)
  const [profile,setProfile] = useState({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    phone: userData?.phone,
    company: userData?.company,
  })
  const [disabled,setDisabled] = useState(true)
  const [notification,setNotification] = useState(false)
  const [prices,setPrices] = useState({
      apartment_price: userData?.user_prices?.apartment_price,
      office_price: userData?.user_prices?.office_price,
      construction_price: userData?.user_prices?.construction_price,
      other_price: userData?.user_prices?.other_price,
      box_price: userData?.user_prices?.box_price,
      id: userData?.user_prices?.id
    })

    const [showDecline,setShowDecline] = useState({
      show: false,
      id: null,
      reason:''
    })
    const [disabledOrder,setDisabledOrder] = useState(true)

    const handleEditProfile = () => {
      dispatch(editProfile(profile)).then((res) => {
        setProfile({
          first_name: res?.payload?.first_name,
          last_name: res?.payload?.last_name,
          phone: res?.payload?.phone,
          company: res?.payload?.company,
        })
        setEdit(false)
      })
    }

  const handleReset = () => {
    setProfile({
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      phone: userData?.phone,
      company: userData?.company,
    })
    setEdit(false)
  }


  const handleAddSale = () => {
    dispatch(addSale(salesData)).then((res) => {
      if(res?.payload?.created_at){
        setSalesData({
          text: '',
          supplier:''
        })
        navigate('/sales')
      }
    })
  }

  const handleEditPrices = () => {
    dispatch(editSupplierPrices(prices)).then((res) => {
      setPrices({
        apartment_price: res?.payload?.apartment_price,
        office_price: res?.payload?.office_price,
        construction_price: res?.payload?.construction_price,
        other_price: res?.payload?.other_price,
        box_price: res?.payload?.box_price,
        id: res?.payload?.id
      })
      setEditPrices(false)
    })}

  const handleResetPrices = () => {
    setPrices({
      apartment_price: userData?.user_prices?.apartment_price,
      office_price: userData?.user_prices?.office_price,
      construction_price: userData?.user_prices?.construction_price,
      other_price: userData?.user_prices?.other_price,
      box_price: userData?.user_prices?.box_price,
      id: userData?.user_prices?.id
    })
    setEditPrices(false)
  }

  const handleAccept = (id) => {
    dispatch(editOrder({id,status:'completed'})).then(() => {
      dispatch(getUser())
    })
  }
  const handleDecline = (id) => {
    setShowDecline({...showDecline,show:true,id})
  }
  const handleDeleteOrder = () => {
    dispatch(editOrder({id:showDecline?.id,cancel_reason:showDecline?.reason,status:'canceled'})).then(() => {
      setShowDecline({
        show: false,
        id: null,
        reason:''
      })
      dispatch(getUser())
    })
  }

  useEffect(() => {
    if(salesData?.text?.length > 0){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [salesData])
  

  useEffect(() => {
      dispatch(getUser()).then((res) => {
        setProfile({
          first_name: res?.payload?.first_name,
          last_name: res?.payload?.last_name,
          phone: res?.payload?.phone,
          company: res?.payload?.company,
        })
        res?.payload?.supplier_orders?.map((order) => {
          if(order?.status === 'pending'){
            setNotification(true)
          }
        })
        setPrices({
          apartment_price: res?.payload?.user_prices?.apartment_price,
          office_price: res?.payload?.user_prices?.office_price,
          construction_price: res?.payload?.user_prices?.construction_price,
          other_price: res?.payload?.user_prices?.other_price,
          box_price: res?.payload?.user_prices?.box_price,
          id: res?.payload?.user_prices?.id
        })
      })
      userError && console.log(userError)
      editProfileError && console.log(editProfileError)
      editSupplierPricesError && console.log(editSupplierPricesError)
  }, []);

  useEffect(() => {
    if(showDecline?.reason?.length > 0){
      setDisabledOrder(false)
    } else {
      setDisabledOrder(true)
    }
  })


  const columns = [
    {
      name: 'Customer',
      selector: row => <p>{row?.full_name}</p>,
      width: '160px'
    },
    {
      name: 'Phone Number',
      selector: row => <p>{row?.tel_number}</p>,
      width: '160px'
    },
    {
      name: 'Transport Type',
      selector: row => <p>{row?.moving_type}</p>,
      width: '170px'
    },
    {
      name: 'From',
      selector: row => <p>{row?.place_from}</p>,
      width: '120px'
    },
    {
      name: 'To',
      selector: row => <p>{row?.place_to}</p>,
      width: '120px'
    },
    {
      name: 'Distance',
      selector: row => <p>{row?.distance}KM</p>,
      width: '120px'
    },
    {
      name: 'Box',
      selector: row => <p>{row?.boxes}</p>,
      width: '120px'
    },
    {
      name: 'Price',
      selector: row => <p>{row?.price}</p>,
      width: '120px'
    },
    {
      name: 'Date',
      selector: row => <p className={classes.price}>{formatDate(row?.which_date)}</p>,
      width: '120px'
    },
    {
      name: 'Status',
      selector: row => <p className={classes.status}><span style={{color: row?.status === 'pending' ? 'var(--blueColor)' : row?.status === 'completed' ? 'var(--greenColor)' : 'var(--redColor)'}}>{row?.status}</span></p>,
      width: '120px'
    },
    {
      name: 'Action',
      selector: row =>  <div style={{display:'flex',gap:'1rem'}}>
        <Button text={'Accept'} sm onClick={() => handleAccept(row?.id)} loading={editOrderLoading}  disabled={row?.status !== 'pending' || editOrderLoading}/>
        <Button text={'Decline'} sm onClick={() => handleDecline(row?.id)} loading={editOrderLoading} warning disabled={row?.status !== 'pending' || editOrderLoading}/>
      </div>,
    },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#f5f5f5',
    border: '1px solid #ddd',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    p: 4,
  };

  return (
    <section className={classes.container}>
    <div className={classes.profileHeader}>
      <button onClick={() => setCurrent('profile')} style={{borderBottomColor:current === 'profile' && '#1134ea',color: current === 'profile' && '#1134ea'}} className={classes.button}>Profile</button>
      <button onClick={() => setCurrent('requests')} style={{borderBottomColor:current === 'requests' && '#1134ea',color: current === 'requests' && '#1134ea'}} className={classes.button}>Requests {notification && <span></span>}</button>
      <button onClick={() => setCurrent('prices')} style={{borderBottomColor:current === 'prices' && '#1134ea',color: current === 'prices' && '#1134ea'}} className={classes.button}>Prices</button>
      <button onClick={() => setCurrent('feedbacks')} style={{borderBottomColor:current === 'feedbacks' && '#1134ea',color: current === 'feedbacks' && '#1134ea'}} className={classes.button}>Feedbacks</button>
      <button onClick={() => setCurrent('sales')} style={{borderBottomColor:current === 'sales' && '#1134ea',color: current === 'sales' && '#1134ea'}} className={classes.button}>Sales</button>
    </div>
    {(current === 'profile' && edit) ?
     <div className={classes.profileContent} style={{backgroundColor:'transparent',padding:'0'}}>
        <p>First Name</p>
        <Input value={profile?.first_name} onChange={(e) => setProfile({...profile,first_name:e.target.value})}  placeholder="First Name" />
        <p>Last Name</p>
        <Input value={profile?.last_name} onChange={(e) => setProfile({...profile,last_name:e.target.value})}  placeholder="Last Name" />
        <p>Company Name</p>
        <Input value={profile?.company} onChange={(e) => setProfile({...profile,company:e.target.value})} placeholder="Company Name" />
        <p>Phone Number</p>
        <Input value={profile?.phone} onChange={(e) => setProfile({...profile,phone:e.target.value})} placeholder="Phone Number" />
        <div className={classes.btns}>
          <button className={classes.btn} onClick={handleEditProfile}>{editProfileLoading ? <CircularProgress size={'12px'} color='#fff'/> : "Save"}</button>
          <button className={classes.btn2} onClick={handleReset} type="submit">Cancel</button>
        </div>
     </div> : current === 'profile' && !edit &&
     <div className={classes.profileContent}>
      <button className={classes.edit} onClick={() => setEdit(true)}><FiEdit2 /> Edit</button>
      <p><span>Name:</span> {profile?.first_name + ' ' + profile?.last_name}</p>
      <p><span>Email:</span> {userData?.email}</p>
      <p><span>Phone Number:</span> {profile?.phone}</p>
      <p><span>Company Name:</span> {profile?.company}</p>
    </div>}
    {current === 'requests' && <div className={classes.prices}>
     <div className={classes.pricesHeader}>
     <h3>Requests</h3>
     </div>
     <Table
        columns={columns}
        data={userData?.supplier_orders}
        loading={userLoading}
        noData={"There's no requests available"}
      />
    </div>}
    {showDecline?.show && <Modal
            open={showDecline?.show}
            onClose={() => setShowDecline({...showDecline,show:false})}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <p>Please type a reason why you decline this request</p>
            <Input onChange={(e) => setShowDecline({...showDecline,reason:e.target.value})} placeholder='Reason' />
           <Button text={'Decline Order'} onClick={handleDeleteOrder} disabled={disabledOrder} loading={editOrderLoading} warning/>
          </Box>
        </Modal>}
    {current === 'prices' && <div className={classes.prices}>
     <div className={classes.pricesHeader}>
     <h3>Price for:</h3>
      <button onClick={() => setEditPrices(true)} className={classes.editPrices}>
        <MdEdit /> Edit Prices
      </button>
     </div>
      {editPrices ? <div className={classes.editPricesContent}>
      <div className={classes.profileContent} style={{backgroundColor:'transparent',padding:'0'}}>
        <p>Box Price</p>
        <Input value={prices?.box_price} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setPrices({...prices,box_price:e.target.value})}} placeholder="Box Price" />
        <p>Apartment Price</p>
        <Input value={prices?.apartment_price} onChange={(e) => {if(/^\d*$/.test(e.target.value)){setPrices({...prices,apartment_price:e.target.value})}}}  placeholder="Apartment Price" />
        <p>Office Price</p>
        <Input value={prices?.office_price} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setPrices({...prices,office_price:e.target.value})}}  placeholder="Office Price" />
        <p>Construction Price</p>
        <Input value={prices?.construction_price} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setPrices({...prices,construction_price:e.target.value})}} placeholder="Construction Price" />
        <p>Other Price</p>
        <Input value={prices?.other_price} onChange={(e) => {if(/^\d*$/.test(e.target.value)) setPrices({...prices,other_price:e.target.value})}} placeholder="Other Price" />
       
        <div className={classes.btns}>
          <button className={classes.btn} onClick={handleEditPrices}>{editSupplierPricesLoading ? <CircularProgress size={'12px'} color='#fff'/> : 'Save'}</button>
          <button className={classes.btn2} onClick={handleResetPrices} type="submit">Cancel</button>
        </div>
     </div>
      </div> :
      <div className={classes.pricesContent}>
      <div className={classes.priceCard}>
        <FaBox />
        <h4>Box Price</h4>
        <p>{prices?.box_price}$ / 1 Box</p>
      </div>
      <div className={classes.priceCard}>
        <GiHouse />
        <h4>Apartments</h4>
        <p>{prices?.apartment_price}$ / 1KM</p>
      </div>
      <div className={classes.priceCard}>
      <ImOffice />
        <h4>Offices</h4>
        <p>{prices?.office_price}$ / 1KM</p>
      </div>
      <div className={classes.priceCard}>
      <MdConstruction />
        <h4>Construction materials</h4>
        <p>{prices?.construction_price}$ / 1KM</p>
      </div>
      <div className={classes.priceCard}>
      <SiInternetcomputer />
        <h4>Others</h4>
        <p>{prices?.other_price}$ / 1KM</p>
      </div>
      </div>
      }
    </div>}

    {current === 'feedbacks' && <div className={classes.feedbacks}>
      <h3>The rate of this supplier </h3>
      <div className={classes.feedbackContent}>
      {userData?.supplier_reviews?.length ? userData?.supplier_reviews?.map((feedback) => (
        <div key={feedback?.id} className={classes.feedback}>
          <h4>{feedback?.customer_name}</h4>
          <div className={classes.feedDetails}>
          <p className={classes.stars}>
              {Array.from({ length: 5 }, (v, i) => (
                  i < feedback?.stars ? <FaStar /> : <FaRegStar />
              ))}
          </p>
          <p>{feedback?.comment}</p>

          </div>
        </div>
      )) : 
        <p className={classes.noReq}>You don't have any feedback</p>
      }
      </div>
    </div>}
    {current === 'sales' && <div className={classes.feedbacks}>
      <h3>Add Sale</h3>
      <div className={classes.profileContent} style={{backgroundColor:'transparent',padding:'0'}}>
        <textarea onChange={(e) => setSalesData({...salesData,text:e.target.value,supplier:userData?.pk})} value={salesData?.text} placeholder='Sale'  />
        <div className={classes.btns}>
          <button className={classes.btn} onClick={handleAddSale} disabled={disabled}>{addSaleLoading ? <CircularProgress size={'12px'} color='#fff'/> : "Add"}</button>
        </div>
     </div>
    </div>}
  </section>
  )
}

export default SupplierProfile