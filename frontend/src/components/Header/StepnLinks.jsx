import React from 'react'
import { useNavigate } from 'react-router-dom'

export const StepnLinks = ({setShowProjectLinks}) => {
  const navigate = useNavigate();

	const handleNavigate = (url, e) => {
		e.preventDefault();
		navigate(url)
		setShowProjectLinks(false)
	}

  return (
    <nav className="header-nav">
      <ul>
        <li><button onClick={(e) => handleNavigate("/web3tools/stepn/logs", e)}>Run logs</button></li>
        <li className="header-divider"> | </li>
        <li><button onClick={(e) => handleNavigate("/web3tools/stepn/compare", e)}>Compare</button></li>
      </ul>
    </nav>
  )
}
