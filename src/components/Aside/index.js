import React from 'react'
import Logo from '../../assets/images/td-logo.svg'
class Aside extends React.Component{

  render(){
    return (
      <aside className="aside aside-fixed">
        <div className="aside-header">
          <a href="#" className="aside-logo"> <img src={Logo} alt="" style={{width: '85%'}}/></a>
          <a href="#" className="aside-menu-link">
            <i data-feather="menu" />
            <i data-feather="x" />
          </a>
        </div>
        <div className="aside-body">
          <div className="aside-loggedin">
            <div className="aside-loggedin-user">
              <a href="#loggedinMenu" className="d-flex align-items-center justify-content-between mg-b-2" data-toggle="collapse">
                <h6 className="tx-semibold mg-b-0">Kadismile</h6>
                <i data-feather="chevron-down" />
              </a>
              <p className="tx-color-03 tx-12 mg-b-0">Administrator</p>
            </div>
            <div className="collapse" id="loggedinMenu">
              <ul className="nav nav-aside mg-b-0">
                <li className="nav-item"><a href="#" className="nav-link"><i data-feather="edit" /> <span>Edit Profile</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i data-feather="user" /> <span>View Profile</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i data-feather="settings" /> <span>Account Settings</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i data-feather="help-circle" /> <span>Help Center</span></a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i data-feather="log-out" /> <span>Sign Out</span></a></li>
              </ul>
            </div>
          </div>
          <ul className="nav nav-aside">
            <li className="nav-label">Dashboard</li>
            <li className="nav-item active"><a href="#" className="nav-link"><i data-feather="shopping-bag" /> <span>Sales Monitoring</span></a></li>
            <li className="nav-item"><a href="#" className="nav-link"><i data-feather="globe" /> <span>Fulfillment</span></a></li>
          </ul>
        </div>
      </aside>
    )
  }

}
export default Aside