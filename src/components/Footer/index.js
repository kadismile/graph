import React from 'react'

class Footer extends React.Component{

  render() {
    let date = new Date().getFullYear();
    return (
      <footer className="footer">
        <div>
          <span>©  {date} Tradedepot. </span>
        </div>
        <div>
          <nav className="nav">
            <a href="#" className="nav-link">Licenses</a>
            <a href="#" className="nav-link">Change Log</a>
            <a href="#" className="nav-link">Get Help</a>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;