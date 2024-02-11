import StoreProvider from '@/app/StoreProvider'
import React, { ReactNode } from 'react'
import Navbar from '../Navbar/Navbar'
import RightBar from '../RightBar/RightBar'

type Props = {
    children:ReactNode
}

const Layer = ({children}: Props) => {
  return <>
  <StoreProvider>
    <RightBar/>
    <Navbar/>
    {children}
  </StoreProvider>
  </>
}

export default Layer