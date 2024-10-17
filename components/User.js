import React from 'react'
import { Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { selectUserid } from '../store/userSlice'
import { Login } from './Login'
import { Userprofile } from './Userprofile'

export const User = ({close}) => {
    const userid=useSelector(selectUserid)
  return (
    <Modal
    animationType='fade'
    onRequestClose={()=>close(false)}
    >
       {userid ? <Userprofile close={close}/> : <Login close={close}/>}
    </Modal>
  )
}
