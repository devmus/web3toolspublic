import React, { useEffect, useState } from 'react'
import { calcTotalGMT, calcTotalGMTEnergy, calcTotalGMTRuns, calcTotalGST, calcTotalGSTEnergy, calcTotalGSTRuns, getRunLogs, updateRun } from '../../services/runlogs'
import { IconEdit } from '@tabler/icons-react'
import { sortDateAsc, sortDateDesc } from '../../services/sorting'

export const Logslist = ({setRefresh, refresh, gstPrice, gmtPrice}) => {

  const [runLogList, setRunLogList] = useState([])
  const [totalValue, setTotalValue] = useState("")
  const [maxValue, setMaxValue] = useState(0)
  const [editRun, setEditRun] = useState(0)
  const [runFormEdit, setRunFormEdit] = useState("")
  const [rewardAmount, setRewardAmount] = useState(0);

  const tokenValue = (token) => {
    
    // const value = token.price * token.rewardAmount[tierList] * boost * 1.3 / 100;
    // if(token.boosted === true) {
    //   return value * 2
    // }
    
    // return value;
  }

  const listRunLogs = async () => {

    try {
      const response = await getRunLogs();
      
      
      const sortedArray = sortDateDesc(response.data)

      setRunLogList(sortedArray)
    //   setMaxValue(Math.max(...activeArray.map(token => tokenValue(token))))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listRunLogs();
  }, [editRun, refresh]);

  // useEffect(() => {

  //   if(runLogList){
  //     const activeArray = runLogList.filter(token => token.active === true)
  //     const valueArray = activeArray.map(token => tokenValue(token))
  //     setTotalValue(valueArray.reduce((total, val) => total + val, 0))
  //   }

  // }, [runLogList])

  const handleEditRun = (e, run) => {
    e.preventDefault();
    
    setEditRun(run._id)

    setRunFormEdit({
      _id: run._id,
      index: run.index,
      date: run.date,
      time: run.time,
      token: run.token,
      gains: run.gains,
      energy: run.energy
    })
  }

  const handleFormEdit = (e) => {
    const { name, value } = e.target
    setRunFormEdit(prev => ({...prev, [name]: value}))
  }

  const handleCancelEditToken = (e) => {
    e.preventDefault();

    setEditRun(null)
  }

  const handleChangeToken = async (e, runIndex) => {
    e.preventDefault();
    const data = runFormEdit;

    try {
      await updateRun(runIndex, data);
      setEditRun(null)
    } catch (error) {
      console.log(error);
    }
  }


  const calcAmount = (token) => {
    // const reward = token.rewardAmount[tierList] * boost / 100
    
    // if(token.boosted === true){
    //   return reward * 1.5
    // }

    // return reward;
  }

  const calcPrice = (run) => {
    if (run.token === "GST"){
      const price = gstPrice * run.gains

      return price;
    }

    if (run.token === "GMT"){
      const price = gmtPrice * run.gains

      return price;
    }
  }

  const calcPriceEnergy = (run) => {
    if (run.token === "GST"){
      const price = gstPrice * run.gains / run.energy

      return price;
    }

    if (run.token === "GMT"){
      const price = gmtPrice * run.gains / run.energy

      return price;
    }
  }


  

  return (
    <>
    {/* HEADER */}
    <div className="rewardlist">
      <div className="headline">
        {/* <div className="token-cell-header">#</div> */}
        <div className="token-cell-header">Date and time</div>
        <div className="token-cell-header">Token</div>
        <div className="token-cell-header">Tokens gained</div>
        <div className="token-cell-header">Energy spent</div>
        <div className="token-cell-header">$</div>
        <div className="token-cell-header">$/E</div>
      </div>

      {/* LIST */}

      {runLogList &&
      runLogList.map((run, index) => {

        const isFirstEntryForDate = index === 0 || run.date !== runLogList[index - 1].date;

        return (

        <div className="token-wrapper" key={run._id}>

          {isFirstEntryForDate && (
            <>
          <div className="token-cell tc-date">{run.date}</div>
          <div className="overlay"></div>
          </>
          )}

          <div className="token-row">

            {/* <div className="token-cell tc-index"><span>{run.index}</span></div> */}
            <div className="token-cell tc-time">{run.time}</div>
            <div className="token-cell">{run.token}</div>
            <div className="token-cell">{run.gains}</div>
            <div className="token-cell">{run.energy}</div>
            <div className="token-cell"> {calcPrice(run).toFixed(3)} $
            </div>
            <div className="token-cell">{calcPriceEnergy(run).toFixed(3)} $</div>

          </div>

          {isFirstEntryForDate ? (
          <button className="edit-token tc-firstline" onClick={(e) => handleEditRun(e, run)}><IconEdit/></button>
          ) : (
          <button className="edit-token" onClick={(e) => handleEditRun(e, run)}><IconEdit/></button>
          )}


        {/* EDIT */}

        {editRun === run._id &&
        <form className="edit-wrapper" onSubmit={(e) => handleChangeToken(e, run._id)}>
          <div className="edit-row">
            Index number:
            <input onChange={handleFormEdit} name="index" placeholder={`Index number: ${run.index}`} value={runFormEdit.index || ''}/>
            Date:
            <input onChange={handleFormEdit} name="date" placeholder={`Date: ${run.date}`} value={runFormEdit.date || ''}/>
            Time:
            <input onChange={handleFormEdit} name="time" placeholder={`time: ${run.time}`} value={runFormEdit.time || ''}/>
            Token:
            <input onChange={handleFormEdit} name="token" placeholder={`Token: ${run.token}`} value={runFormEdit.token || ''}/>
            Gains:
            <input onChange={handleFormEdit} name="gains" placeholder={`Gains: ${run.gains}`} value={runFormEdit.gains || ''}/>
            Energy:
            <input onChange={handleFormEdit} name="energy" placeholder={`Energy: ${run.energy}`} value={runFormEdit.energy || ''}/>
            <div>
              <button type="submit">Submit</button>
              <button onClick={(e) => handleCancelEditToken(e)}>Cancel</button>
            </div>
            <div>
              <button onClick={(e) => {e.preventDefault(); deleteRewardToken(run._id)}}>Delete</button>
            </div>

          </div>
        </form>
        }

        </div>)})}

      {/* FOOTER */}

      <div className="summary summary-row1">
        <div className="token-cell-header">Runs: {runLogList.length}</div>
        <div className="token-cell">Total</div>
        <div className="token-cell"></div>
        <div className="token-cell">{runLogList && (calcTotalGSTEnergy(runLogList) + calcTotalGMTEnergy(runLogList)).toFixed(1)}</div>
        <div className="token-cell">{runLogList && Number((calcTotalGST(runLogList) * gstPrice).toFixed(0)) + Number((calcTotalGMT(runLogList) * gmtPrice).toFixed(0))} $</div>
        <div className="token-cell tc-value">{runLogList && ((Number((calcTotalGST(runLogList) * gstPrice).toFixed(0)) + Number((calcTotalGMT(runLogList) * gmtPrice).toFixed(0))) / Number((calcTotalGSTEnergy(runLogList) + calcTotalGMTEnergy(runLogList)))).toFixed(3)} $  / E</div>
      </div>
      <div className="summary summary-row2">
        <div className="token-cell-header">Runs: {runLogList && calcTotalGSTRuns(runLogList)}</div>
        <div className="token-cell">GST</div>
        <div className="token-cell">{runLogList && calcTotalGST(runLogList).toFixed(1)}</div>
        <div className="token-cell">{runLogList && calcTotalGSTEnergy(runLogList).toFixed(1)}</div>
        <div className="token-cell">{runLogList && (calcTotalGST(runLogList) * gstPrice).toFixed(0)} $</div>
        <div className="token-cell tc-value">{runLogList && ((calcTotalGST(runLogList) * gstPrice).toFixed(0) / calcTotalGSTEnergy(runLogList)).toFixed(3)} $ / E</div>
      </div>
      <div className="summary summary-row3">
        <div className="token-cell-header">Runs: {runLogList && calcTotalGMTRuns(runLogList)}</div>
        <div className="token-cell">GMT</div>
        <div className="token-cell">{runLogList && calcTotalGMT(runLogList).toFixed(1)}</div>
        <div className="token-cell">{runLogList && calcTotalGMTEnergy(runLogList).toFixed(1)}</div>
        <div className="token-cell">{runLogList && (calcTotalGMT(runLogList) * gmtPrice).toFixed(0)} $</div>
        <div className="token-cell tc-value">{runLogList && ((calcTotalGMT(runLogList) * gmtPrice).toFixed(0) / calcTotalGMTEnergy(runLogList)).toFixed(3)} $ / E</div>
      </div>
      </div>
      </>
  )
}
