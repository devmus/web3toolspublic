import React from 'react'

export const ProjectLinks = ({handleShowLinks, handleSecondaryLinks, linkDisplay, handleTertiaryLinks, link2Display}) => {
  return (
    <>
      <button onClick={handleShowLinks}>Projects</button>
      {linkDisplay &&
        <>
        <div className="header-desc-divider"> | </div>
        <button className="header-desc-name" onClick={handleSecondaryLinks}>{linkDisplay}</button>
        </>
      }
      {link2Display &&
        <>
        <div className="header-desc-divider"> | </div>
        <button className="header-desc-name" onClick={handleTertiaryLinks}>{link2Display}</button>
        </>
      }
    </>
  )
}
