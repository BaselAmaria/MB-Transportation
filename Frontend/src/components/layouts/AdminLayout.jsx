import React from 'react'
import classes from './AdminLayout.module.scss'
import AdminPage from '../../pages/AdminPage'
const AdminLayout = () => {
  return (
    <main className={classes.main}>
      <AdminPage/>
  </main>
  )
}

export default AdminLayout