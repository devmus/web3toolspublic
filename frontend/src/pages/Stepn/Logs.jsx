import React, { useEffect, useState } from 'react'
import { Logsform } from '../../components/Stepn/Logsform'
import { Logslist } from '../../components/Stepn/Logslist';
import { IconRefresh } from '@tabler/icons-react';
import { getTokenPrice } from '../../services/runlogs';


export const Logs = () => {

  const [refresh, setRefresh] = useState(0);
  const [gstPrice, setGstPrice] = useState(0)
  const [gmtPrice, setGmtPrice] = useState(0)

  const handleRefreshPrice = async () => {

    try {
      
      const responseGST = await getTokenPrice("AFbX8oGjGpmVFywbVouvhQSRmiW2aR1mohfahi4Y2AdB")    
      saveGstPrice(responseGST)

      const responseGMT = await getTokenPrice("7i5KKsX2weiTkry7jA4ZwSuXGhs5eJBEjY8vVxR4pfRx")    
      saveGmtPrice(responseGMT)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    const gstPrice = localStorage.getItem("gst")
    const gmtPrice = localStorage.getItem("gmt")

    if(gstPrice) {
      const gst = +gstPrice
      setGstPrice(gst)
    }
    if(gmtPrice) {
      const gmt = +gmtPrice
      setGmtPrice(gmt)
    }
  }, [])

  const saveGstPrice = (responseGST) => {
    localStorage.setItem("gst", responseGST)
    setGstPrice(responseGST)
  }

  const saveGmtPrice = (responseGMT) => {
    localStorage.setItem("gmt", responseGMT)
    setGmtPrice(responseGMT)
  }

  return (
    <div className="logs-wrapper">

      <div className="token-price-wrapper">
        <div className="token-price-row">
          <div>
          Token prices
          <button className="refresh-button" onClick={(e) => handleRefreshPrice(e)}><IconRefresh/></button>
          </div>
          <span>GST price: {gstPrice.toFixed(3)}</span>
          <span>GMT price: {gmtPrice.toFixed(3)}</span>
        </div>
      </div>

      <div className="form-wrapper floating-wrapper">
        <Logsform setRefresh={setRefresh} refresh={refresh} />
      </div>

      <div className="reward-list-wrapper">
        <Logslist setRefresh={setRefresh} refresh={refresh} gstPrice={gstPrice} gmtPrice={gmtPrice}/>
      </div>
    </div>
  )
}
