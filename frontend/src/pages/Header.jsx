import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Header/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { AssetdashLinks } from '../components/Header/AssetdashLinks';
import { StepnLinks } from '../components/Header/StepnLinks';
import { ProjectLinks } from '../components/Header/ProjectLinks';

export const Header = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showProjectLinks, setShowProjectLinks] = useState(false);
  const [linkDisplay, setLinkDisplay] = useState(null)
  const [link2Display, setLink2Display] = useState(null)
  const [linkState, setLinkState] = useState(null)

  const navigate = useNavigate();

    useEffect(() => {

    const pathname = window.location.pathname;

    switch(pathname){
      case "/web3tools/":
      setLinkDisplay(null);
      setLink2Display(null);
      setLinkState(pathname)
      break;
      case "/web3tools/assetdash/":
      setLinkDisplay("Assetdash");
      setLink2Display(null);
      setShowProjectLinks(true)
      setLinkState(pathname)
      break;
      case "/web3tools/assetdash/swaprewards":
      setLinkDisplay("Assetdash");
      setLink2Display("Swap rewards");
      setLinkState(pathname)
      break;
      case "/web3tools/assetdash/auctions":
      setLinkDisplay("Assetdash");
      setLink2Display("Auctions");
      setLinkState(pathname)
      break;
      case "/web3tools/stepn/":
      setLinkDisplay("Stepn");
      setLink2Display(null);
      setShowProjectLinks(true)
      setLinkState(pathname)
      break;
      case "/web3tools/stepn/logs":
      setLinkDisplay("Stepn");
      setLink2Display("Logs");
      setLinkState(pathname)
      break;
      case "/web3tools/stepn/compare":
      setLinkDisplay("Stepn");
      setLink2Display("Compare");
      setLinkState(pathname)
      break;
      default:
        break;
    }
  })

  const handleShowLinks = () => {
    setShowLinks(prevState => !prevState);
  }

  const handleSecondaryLinks = () => {
    setShowLinks(false);
    setShowProjectLinks(true)
    navigate(linkState)
  }

  const handleTertiaryLinks = () => {
    setShowProjectLinks(false)
    navigate(linkState)
  }
  
  return (
    <div className="header-wrapper">
      <div className="header-top-wrapper">
        <div className="header-projects">
          <ProjectLinks handleShowLinks={handleShowLinks} handleSecondaryLinks={handleSecondaryLinks} linkDisplay={linkDisplay} handleTertiaryLinks={handleTertiaryLinks} link2Display={link2Display}/>
        </div>
        <div className="logo">
          <Link to={"/web3tools/"}><h1>web3tools</h1></Link>
        </div>
      </div>
      {showLinks &&
        <Navbar setShowLinks={setShowLinks} setShowProjectLinks={setShowProjectLinks}/>
      }
      {showProjectLinks && linkDisplay === "Assetdash" &&
        <AssetdashLinks setShowProjectLinks={setShowProjectLinks}/>
      }
      {showProjectLinks && linkDisplay === "Stepn" &&
        <StepnLinks setShowProjectLinks={setShowProjectLinks}/>
      }
    </div>
  )
}
