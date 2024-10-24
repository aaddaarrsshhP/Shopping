import React from 'react'
import { Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { Login } from './Login'
import { Userprofile } from './Userprofile'

export const User = ({close}) => {
    const username=useSelector(state=>state.user.username)
  return (
    <Modal
    animationType='fade'
    onRequestClose={()=>close(false)}
    >
       {username!=='Guest' ? <Userprofile close={close}/> : <Login close={close}/>}
    </Modal>
  )
}
