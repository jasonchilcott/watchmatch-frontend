import React from "react";


class RateSidebar extends React.Component {

  sidebarHandler = (type, id) => {
    this.props.sidebarDoer(type, id)
  }
  render() {
    return (
      <>
        <div className="sidebar">
          <ul className="nav flex-column"> 
            <li className='link' onClick={() => this.sidebarHandler("list", "1309")}>IMBD 250</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "7065199")}>TSPDT 1000</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "28")}>OSCAR BEST PICTURES</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "229")}>PALME D'OR WINNERS</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "10")}>HIGHEST GROSSING</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "7063685")}>HOLIDAY 2020</li>

            <li className='link' onClick={() => this.sidebarHandler("list", "47")}>FANGORIA 101</li>

            <li className='link' onClick={() => this.sidebarHandler("person", "2963")}>OUR GREATEST LIVING ACTOR</li>
          </ul>
        </div>
      </>
    );
  }
}

export default RateSidebar;
