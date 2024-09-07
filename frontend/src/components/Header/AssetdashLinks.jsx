import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AssetdashLinks = ({setShowProjectLinks}) => {
  const navigate = useNavigate();

	const handleNavigate = (url, e) => {
		e.preventDefault();
		navigate(url)
    setShowProjectLinks(false)
	}

  return (
<nav className="header-nav">
	<ul>
		<li><button onClick={(e) => handleNavigate("/web3tools/assetdash/swaprewards", e)}>Swap rewards</button></li>
		<li className="header-divider"> | </li>
		<li><button onClick={(e) => handleNavigate("/web3tools/assetdash/auctions", e)}>Auctions</button></li>
	</ul>
</nav>
  )
}
