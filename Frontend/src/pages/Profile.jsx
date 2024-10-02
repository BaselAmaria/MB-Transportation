import React, { useEffect, useState } from 'react'
import classes from './Profile.module.scss'
import { Link } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'
import Input from '../components/ui/Input'
import Search from '../components/ui/Search'
import { formatDate } from '../utils/HelperFunctions'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import { useDispatch, useSelector } from 'react-redux'
import { createReview, deleteOrder, editProfile, getUser } from '../store/slices/mainReducer'
import { Box, CircularProgress, Modal } from '@mui/material'
import StarRating from '../components/ui/StarRating'
import { FaCheckCircle } from 'react-icons/fa'


const Profile = () => {
  const dispatch = useDispatch()
  const {userData,userError,userLoading,editProfileLoading,editProfileError,deleteOrderLoading,deleteOrderError,addReviewLoading,addReviewError} = useSelector(state => state.main)
  const [current,setCurrent] = useState('profile')
  const [search,setSearch] = useState('')
  const [ordersList,setOrdersList] = useState(userData?.customer_orders)
  const [edit,setEdit] = useState(false)
  const [showReview,setShowReview] = useState(false)
  const [reviewDisabled,setReviewDisabled] = useState(true)
  const [reason,setReason] = useState('')
  const [showReason,setShowReason] = useState(false)
  const [review,setReview] = useState({
    stars: '',
    comment: '',
    order:null,
    customer:null
  })
  const [profile,setProfile] = useState({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    phone: userData?.phone,
    address: userData?.address,
  })

  const [reviewDone,setReviewDone] = useState(false)

  const handleEditProfile = () => {
    dispatch(editProfile(profile)).then((res) => {
      setProfile({
        first_name: res?.payload?.first_name,
        last_name: res?.payload?.last_name,
        phone: res?.payload?.phone,
        address: res?.payload?.address,
      })
      setEdit(false)
    })
  }

const handleReset = () => {
  setProfile({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    phone: userData?.phone,
    address: userData?.address,
  })
  setEdit(false)
}
  
const handleResetSearch = (e) => {
    setSearch('')
    // dispatch(getTransportHistory()).then((res) => {
    //   setTransportList(res?.payload)
    //     productsError && console.log(productsError)
    // })
}

const handleCancel = (id) => {
  dispatch(deleteOrder(id)).then((res) => {
    res.payload && console.log(res.payload)
    deleteOrderError && console.log(deleteOrderError)
    dispatch(getUser()).then((res) => {
      setOrdersList(res?.payload?.customer_orders)
    })
  })
}

const handleReason = (reason) => {
  setShowReason(true)
  setReason(reason)
}

const handleShowReview = (id) => {
  setShowReview(true)
  setReview({...review,order:id,customer:userData?.pk})
}

const handleAddReview = () => {
  dispatch(createReview(review)).then((res) => {
    res.payload && console.log(res.payload)
    addReviewError && console.log(addReviewError)
    dispatch(getUser())
    setShowReview(false)
    setReview({
      stars: '',
      comment: '',
      order:null,
      customer:null
    })
    setReviewDone(true)
  })
}

const closeReview = () => {
  setShowReview(false)
  setReview({
    stars: '',
    comment: '',
    order:null,
    customer:null
  })
}

useEffect(() => {
  dispatch(getUser()).then((res) => {
    setOrdersList(res?.payload?.customer_orders)
    setProfile({
      first_name: res?.payload?.first_name,
      last_name: res?.payload?.last_name,
      phone: res?.payload?.phone,
      address: res?.payload?.address,
    })
  })
  userError && console.log(userError)
  editProfileError && console.log(editProfileError)
}, []);

useEffect(() => {
  if(review?.stars && review?.comment){
    setReviewDisabled(false)
  } else {
    setReviewDisabled(true)
  }
}, [review])

useEffect(() => {
  if(reviewDone){
    setTimeout(() => {
      setReviewDone(false)
    }, 4000);
  }
}, [reviewDone])

useEffect(() => {
  if(search){
    const filteredData = userData?.customer_orders?.filter((item) => item?.id.toString().includes(search))
    setOrdersList(filteredData)
  } else {
    setOrdersList(userData?.customer_orders)
  }
}, [search])

const columns = [
  {
    name: 'Order Number',
    selector: row => <p>{row?.id}</p>,
    minWidth: "200px",
  },
  {
    name: 'Transport Type',
    selector: row => <p>{row?.moving_type}</p>,
  },
  {
    name: 'Distance',
    selector: row => <p>{row?.distance}KM</p>,
  },
  {
    name: 'Supplier Name',  // Added Supplier Name column
    selector: row => <p>{row?.supplier_name}</p>,  // Assuming you have supplier_name field in data
  },
  {
    name: 'Price',  // Added Price column
    selector: row => <p>{row?.price} $</p>,  // Assuming you have price field in data
  },
  {
    name: 'Status',
    selector: row => <p className={classes.status} style={{cursor: row?.status === 'canceled' && 'pointer'}} onClick={()=> {row?.status === 'canceled' && handleReason(row?.cancel_reason)}}>Status: <span style={{color: row?.status === 'pending' ? 'var(--blueColor)' : row?.status === 'completed' ? 'var(--greenColor)' : 'var(--redColor)'}}>{row?.status}</span></p>,
  },
  {
    name: 'Date',
    selector: row => <p className={classes.price}>{formatDate(row?.created_at)}</p>,
  },
  {
    name: 'Action',
    selector: row =>  row?.status === 'completed' ? <Button text={'Write A review'} sm onClick={() => handleShowReview(row?.id)} loading={addReviewLoading} disabled={addReviewLoading}/> : <Button text={'Cancel'} sm onClick={() => handleCancel(row?.id)} loading={deleteOrderLoading} warning disabled={row?.status !== 'pending' || deleteOrderLoading}/>,
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
  gap: 2,
  p: 4,
};

return (
    <section className={classes.container}>
      <div className={classes.profileHeader}>
        <button onClick={() => setCurrent('profile')} style={{borderBottomColor:current === 'profile' && '#1134ea',color: current === 'profile' && '#1134ea'}} className={classes.button}>Profile</button>
        <button onClick={() => setCurrent('orders')} style={{borderBottomColor:current === 'orders' && '#1134ea',color: current === 'orders' && '#1134ea'}} className={classes.button}>Transport History</button>
      </div>
      {showReview && <Modal
          open={showReview}
          onClose={closeReview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <p>Review this order</p>
          <StarRating onRatingSelected={(star) => setReview({...review,stars:star})}/>
          <textarea onChange={(e) => setReview({...review,comment:e.target.value})} placeholder='Review' />
          <Button text={'Add Review'} onClick={handleAddReview} disabled={reviewDisabled} loading={addReviewLoading}/>
        </Box>
      </Modal>}
      {showReason && <Modal
          open={showReason}
          onClose={() => {setShowReason(false); setReason('')}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <p style={{fontWeight:'bold'}}>Reason for Cancellation</p>
          <p>{reason}</p>
        </Box>
      </Modal>}
      {reviewDone && <Modal
          open={reviewDone}
          onClose={() => setReviewDone(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <FaCheckCircle style={{fontSize:'3rem',color:'var(--blueColor)'}} />
          <p>Thank you for your review.</p>
        </Box>
      </Modal>}
      {(current === 'profile' && edit) ?
     <div className={classes.profileContent} style={{backgroundColor:'transparent',padding:'0'}}>
        <p>First Name</p>
        <Input value={profile?.first_name} onChange={(e) => setProfile({...profile,first_name:e.target.value})}  placeholder="First Name" />
        <p>Last Name</p>
        <Input value={profile?.last_name} onChange={(e) => setProfile({...profile,last_name:e.target.value})}  placeholder="Last Name" />
        <p>Address</p>
        <Input value={profile?.address} onChange={(e) => setProfile({...profile,address:e.target.value})} placeholder="Address" />
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
      <p><span>Address:</span> {profile?.address}</p>
    </div>}
      {current === 'orders' && <div className={classes.orderHistory}>
        <Search search={search}  placeholder={'Search by Order Number:'} setSearch={setSearch} handleResetSearch={handleResetSearch} />
        
        <div className={classes.item}>
          {ordersList && ordersList?.length ? <Table
          columns={columns}
          data={ordersList}
          noData={"You don't have any Requests"}
          loading={userLoading}
        /> : <p className={classes.noReq}>You don't have any Orders</p>}
        </div>
      </div>}
    </section>
  )
}

export default Profile