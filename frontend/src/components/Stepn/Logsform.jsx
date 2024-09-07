import React, { useEffect, useState } from 'react'
import { createRunLog, getRunLogs } from '../../services/runlogs';

export const Logsform = ({setRefresh, refresh}) => {

  const [showFormInput, setShowFormInput] = useState(false);
  const [logsFormInput, setLogsFormInput] = useState({index: 0, date: "", token: "", gains: 0, energy: 0});
  const [logListLength, setLogListLength] = useState(0);


  const listRunLogs = async () => {

    try {
      const response = await getRunLogs({sortField: 'date', sortOrder: 'asc'});
      setLogListLength(response.data.length)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listRunLogs();
  }, [refresh]);

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setLogsFormInput(prev => ({...prev, [name]: value}))   
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const data = logsFormInput
    data.index = logListLength + 1

    try {
      const response = await createRunLog(data);
      if(response.statusCode === 201) {
      document.getElementById("token-form").reset();
      setRefresh(response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    setShowFormInput(prevState => !prevState)    
    logsFormInput.index = logListLength + 1
  }

  return (
    <>
    {showFormInput &&
    <form onSubmit={handleSubmitForm} id="token-form">
    <div className="form-control">
      <label htmlFor="runlog-form-index">Index: </label>
      <input type="text" autoComplete="off" id="runlog-form-index" name="index" onChange={handleFormChange} placeholder={logListLength + 1}></input>
    </div>
    <div className="form-control">
      <label htmlFor="runlog-form-date">Date: </label>
      <input type="text" autoComplete="off" id="runlog-form-date" name="date" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="runlog-form-time">Time: </label>
      <input type="text" autoComplete="off" id="runlog-form-time" name="time" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="runlog-form-token">Token type: </label>
      <input type="text" autoComplete="off" id="runlog-form-token" name="token" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="runlog-form-gains">Tokens gained:</label>
      <input type="text" autoComplete="off" id="runlog-form-gains" name="gains" onChange={handleFormChange}></input>
    </div>
    <div className="form-control">
      <label htmlFor="runlog-form-energy">Energy spent:</label>
      <input type="text" autoComplete="off" id="runlog-form-energy" name="energy" onChange={handleFormChange}></input>
    </div>
    <div className="button-control">
      <button type="submit">Submit</button>
    </div>
  </form>
  }
  <div className="button-control appendix">
    <button onClick={handleClick}>{showFormInput ? "Cancel" : "Add run"}</button>
  </div>
  </>
  )
}
