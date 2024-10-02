import React, { useEffect, useState } from 'react'
import classes from './Deals.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../store/slices/mainReducer'
import { formatDate } from '../utils/HelperFunctions'
const Deals = () => {
  const dispatch = useDispatch()
  const {salesLoading,salesError,salesData} = useSelector(state => state.main)
  const [deals, setDeals] = useState(salesData)

  useEffect(() => {
    dispatch(getSales()).then((res) => {
      setDeals(res?.payload)
    })
    salesError && console.log(salesError)
  }, [])
  

  return (
    <section className={classes.container}>
    <h3 className={classes.title}>Hot Sales</h3>
    <div className={classes.content}>
    {deals?.map((deal) => (
        <div key={deal?.id} className={classes.deal}>
          <h4>{deal?.supplier_name} {deal?.company_name}</h4>
          <p className={classes.date}>Created At {formatDate(deal?.created_at)}</p>
          <p className={classes.description}>{deal?.text}</p>
        </div>
      ))}
    </div>
     
    </section>
  )
}

export default Deals