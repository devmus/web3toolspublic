import React, { useEffect, useState } from 'react'
import { deleteRewardToken, getRewardTokens, updateActiveToken, updateAllPrices, updateBoostedToken, updateRewardTokens } from '../../services/swaprewards'
import { IconBolt, IconCircleCheck, IconCircleDot, IconCircleDotFilled, IconEdit, IconPoint, IconRefresh } from '@tabler/icons-react';
import { sortTickerAsc } from '../../services/sorting';

export const RewardList = ({tierList, refresh, boost}) => {
  const [tokenList, setTokenlist] = useState([])
  const [inactiveTokenList, setInactiveTokenlist] = useState([])
  const [totalValue, setTotalValue] = useState("")
  const [maxValue, setMaxValue] = useState(0)
  const [editToken, setEditToken] = useState(0)
  const [tokenFormEdit, setTokenFormEdit] = useState("")
  const [rewardAmount, setRewardAmount] = useState(0);

  const tokenValue = (token) => {
    
    const value = token.price * token.rewardAmount[tierList] * boost * 1.3 / 100;
    if(token.boosted === true) {
      return value * 2
    }
    
    return value;
  }

  const listTokenRewards = async () => {

    try {
      const response = await getRewardTokens();

      const activeArray = response.data.filter(token => token.active === true)

      const sortedArray = sortTickerAsc(activeArray)

      const inactiveArray = response.data.filter(token => token.active === false)

      setTokenlist(sortedArray)
      setInactiveTokenlist(inactiveArray)
      setMaxValue(Math.max(...activeArray.map(token => tokenValue(token))))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listTokenRewards();
  }, [editToken, tierList, refresh]);

  useEffect(() => {

    if(tokenList){
      const activeArray = tokenList.filter(token => token.active === true)
      const valueArray = activeArray.map(token => tokenValue(token))
      setTotalValue(valueArray.reduce((total, val) => total + val, 0))
    }

  }, [tokenList])

  const handleEditToken = (e, token) => {
    e.preventDefault();
    
    setEditToken(token._id)
    setRewardAmount(token.rewardAmount[tierList])
    setTokenFormEdit({
      _id: token._id,
      index: token.index,
      ticker: token.ticker,
      active: token.active,
      ca: token.ca
    })
  }

  const handleFormEdit = (e) => {
    const { name, value } = e.target

    if(name !== "rewardAmount"){
      setTokenFormEdit(prev => ({...prev, [name]: value}))
    } else {
      setRewardAmount(value)
    }
  }

  const handleCancelEditToken = (e) => {
    e.preventDefault();

    setEditToken(null)
  }

  const handleChangeToken = async (e, tokenIndex) => {
    e.preventDefault();
    const data = tokenFormEdit;
    data.rewardAmount = {[tierList]: rewardAmount}

    try {
      await updateRewardTokens(tokenIndex, data);
      setEditToken(null)
    } catch (error) {
      console.log(error);
    }
  }

  const getGreenIntensity = (value) => {

    const intensity = (value / maxValue);

    return `linear-gradient(to left, rgba(0, 255, 0, ${intensity}) 0%, rgba(0, 255, 0, 0) 75%)`;
  };

  const updateAllPrice = async () => {
    console.log("Price update started");
    try {
      await updateAllPrices();
      listTokenRewards();
      console.log("All prices updated");
    } catch (error) {
      console.log(error);
    }
  }

  const updateBoosted = async (e, id) => {
    e.preventDefault();

    try {
      await updateBoostedToken(id);
      listTokenRewards();
    } catch (error) {
      console.log(error);
    }
  }

  const updateActive = async (e, id) => {
    e.preventDefault();

    try {
      await updateActiveToken(id);
      listTokenRewards();
    } catch (error) {
      console.log(error);
    }
  }

  const calcAmount = (token) => {
    const reward = token.rewardAmount[tierList] * boost / 100
    
    if(token.boosted === true){
      return reward * 1.5
    }

    return reward;
  }

  return (
    <>

    {/* HEADER */}

    <div className="rewardlist">
      <div className="headline">
        <div className="token-cell-header">#</div>
        <div className="token-cell-header">Ticker</div>
        <div className="token-cell-header tch-price">Price <button onClick={updateAllPrice}><IconRefresh/></button></div>
        <div className="token-cell-header">Amount</div>
        <div className="token-cell-header">Value</div>
      </div>

      {/* LIST */}

      {tokenList &&
      tokenList.map((token) => (
        <div className="token-wrapper" key={token._id}>
        <div className="token-row">
          <div className="token-cell tc-index">
            <span>{token.index}</span>
            <span>{token.active ? <IconCircleCheck/> : <IconCircleDot/>}</span>
          </div>
          <div className="token-cell"><a href={token.url} target="_blank">{token.ticker}</a></div>
          <div className="token-cell">{token.price.toFixed(10)} $</div>
          <div className="token-cell tc-amount">
            <span><button onClick={(e) => updateBoosted(e, token._id)}>{token.boosted ? <IconBolt/> : <IconPoint/>}</button></span>
            <span>{token.rewardAmount && calcAmount(token).toFixed(6) || 0} tokens</span>
          </div>
          <div className="token-cell tc-value" style={{ background: getGreenIntensity(tokenValue(token)) }}>{token.rewardAmount && token.active ? tokenValue(token).toFixed(5) : 0} $</div>
        </div>
        <button className="edit-token" onClick={(e) => handleEditToken(e, token)}><IconEdit/></button>

        {/* EDIT */}

        {editToken === token._id &&
        <form className="edit-wrapper" onSubmit={(e) => handleChangeToken(e, token._id)}>
          <div className="edit-row">
            <input onChange={handleFormEdit} name="index" placeholder={`Index number: ${token.index}`} value={tokenFormEdit.index || ''}/>
            <input onChange={handleFormEdit} name="ticker" placeholder={`Token ticker: ${token.ticker}`} value={tokenFormEdit.ticker || ''}/>
            <input onChange={handleFormEdit} name="ca" placeholder={`CA: ${token.ca}`} value={tokenFormEdit.ca || ''}/>
            <input onChange={(e) => setRewardAmount(e.target.value)} name="rewardAmount" placeholder={`Amount: ${token.rewardAmount && token.rewardAmount[tierList]}`} value={rewardAmount || ''}/>
            <div>
              <button type="submit">Submit</button>
              <button onClick={(e) => handleCancelEditToken(e)}>Cancel</button>
            </div>
            <div>
              <button onClick={(e) => {e.preventDefault(); deleteRewardToken(token._id)}}>Delete</button>
            </div>
            <input onChange={handleFormEdit} name="active" placeholder={`Active? ${token.active}`} value={tokenFormEdit.active || ''}/>
          </div>
        </form>
        }
        </div>
      )
      )
      }

      {/* FOOTER */}

      <div className="summary">
        <div className="token-cell-header">Total: {tokenList.length}</div>
        <div className="token-cell"></div>
        <div className="token-cell"></div>
        <div className="token-cell"></div>
        <div className="token-cell tc-value">Total: {totalValue && totalValue.toFixed(5)} $</div>
      </div>
    </div>

    {/* INACTIVE */}
    
    {inactiveTokenList.length > 0 &&
      <div className="rewardlist">
      
        {inactiveTokenList.map((token) => (
          <div className="token-wrapper" key={token._id}>
          <div className="token-row">
            <div className="token-cell tc-index">
              <span>
                {token.index}
              </span>
              <span><button onClick={(e) => updateActive(e, token._id)}>{token.active ? <IconCircleDotFilled/> : <IconCircleDot/>}</button></span>
            </div>
            <div className="token-cell"><a href={token.url} target="_blank">{token.ticker}</a></div>
            <div className="token-cell">
              {/* {token.price.toFixed(10)} $ */}
              </div>
            <div className="token-cell tc-amount">
              {/* <span>{token.rewardAmount && token.rewardAmount[tierList] || 0} tokens</span>
              <span><button onClick={(e) => updateBoosted(e, token._id)}>{token.boosted ? <IconCircleDotFilled/> : <IconCircleDot/>}</button></span> */}
            </div>
            <div className="token-cell tc-value" style={{ background: getGreenIntensity(token.value) }}>
              {/* {token.rewardAmount && token.active ? tokenValue(token.price, token.rewardAmount[tierList]).toFixed(5) : 0} $ */}
            </div>
          </div>
          </div>
        )
        )}
        </div>
        }
      </>
  )
}
