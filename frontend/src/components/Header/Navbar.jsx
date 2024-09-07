import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = ({setShowLinks, setShowProjectLinks}) => {
	const navigate = useNavigate();

	const handleNavigate = (url, e) => {
		e.preventDefault();
		navigate(url)
		setShowLinks(false)
		setShowProjectLinks(true)
	}

  return (
<nav className="header-main-nav header-nav">
	<ul>
		<li><button onClick={(e) => handleNavigate("/web3tools/assetdash/", e)}>Assetdash</button></li>
		<li className="header-divider"> | </li>
		<li><button onClick={(e) => handleNavigate("/web3tools/stepn/", e)}>Stepn</button></li>
	</ul>
</nav>
  )
}
