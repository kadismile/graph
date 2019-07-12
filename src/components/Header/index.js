import React from 'react'

class Header extends React.Component{

  render(){
    return (
        <div className="content-header">
          <div className="content-search">
            <i data-feather="search" />
            <input type="search" className="form-control" placeholder="Search..." />
          </div>
          <nav className="nav">
            <a href className="nav-link"><i data-feather="help-circle" /></a>
            <a href className="nav-link"><i data-feather="grid" /></a>
            <a href className="nav-link"><i data-feather="align-left" /></a>
          </nav>
        </div>
      )
  }

}

export default Header