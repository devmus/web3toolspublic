import React, { useEffect, useState } from 'react'
import { createRewardToken, getRewardTokens } from '../../services/swaprewards';

export const RewardForm = ({tierList, setRefresh, refresh}) => {

  const [showTokenFormInput, setShowTokenFormInput] = useState(false);
  const [tokenFormInput, setTokenFormInput] = useState({index: 0, ca: "", ticker: "", rewardAmount: {tier0: 0}, active: true, boosted: false});
  const [rewardAmount, setRewardAmount] = useState(0);
  const [tokenListLength, setTokenListLength] = useState(0);


  const listTokenRewards = async () => {

    try {
      const response = await getRewardTokens();

      setTokenListLength(response.data.length)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listTokenRewards();
  }, [refresh]);

  const handleFormChange = (e) => {
    const { name, value } = e.target
    if(name !== "rewardAmount"){
      setTokenFormInput(prev => ({...prev, [name]: value}))
    } else {
      setRewardAmount(value)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = tokenFormInput
    data.index = tokenListLength + 1
    data.rewardAmount = {[tierList]: rewardAmount}
    tokenFormInput.active = "true";

    if(tokenFormInput.active === "true"){
      data.active = true
    } else {
      data.active = false
    }

    try {
      const response = await createRewardToken(data);
      if(response.statusCode === 201) {
      console.log(response);
      document.getElementById("token-form").reset();
      setRefresh(response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    setShowTokenFormInput(prevState => !prevState)
    tokenFormInput.index = tokenListLength + 1
  }

  return (
    <>
    {showTokenFormInput &&
    <form onSubmit={handleSubmitForm} id="token-form">
    <div className="form-control">
      <label htmlFor="swapreward-form-index">Index: </label>
      <input type="text" autoComplete="off" id="swapreward-form-index" name="index" onChange={handleFormChange} placeholder={tokenListLength + 1}></input>
    </div>
    <div className="form-control">
      <label htmlFor="swapreward-form-address">Contract Address: </label>
      <input type="text" autoComplete="off" id="swapreward-form-address" name="ca" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="swapreward-form-ticker">Ticker: </label>
      <input type="text" autoComplete="off" id="swapreward-form-ticker" name="ticker" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="swapreward-form-rewardAmount">Reward amount:</label>
      <input type="text" autoComplete="off" id="swapreward-form-rewardAmount" name="rewardAmount" onChange={handleFormChange}></input>
    </div>
    <div className="radio-control">
      <label>
        Active
        <input type="radio" name="active" value="true" onChange={handleFormChange} defaultChecked/>
      </label>
      <label>
        Inactive
        <input type="radio" name="active" value="false" onChange={handleFormChange}/>
      </label>
    </div>
    <div className="button-control">
      <button type="submit">Submit</button>
    </div>
  </form>
  }
  <div className="button-control appendix">
    <button onClick={handleClick}>{showTokenFormInput ? "Cancel" : "Add token"}</button>
  </div>
  </>
  )
}
