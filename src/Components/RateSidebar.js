import React from "react";


class RateSidebar extends React.Component {

  sidebarHandler = (list) => {
    this.props.sidebarDoer(list)
  }
  render() {
    return (
      <>
        <div className="sidebar">
          <ul>
            <li className='link' onClick={() => this.sidebarHandler("1309")}>IMBD 250</li>

            <li className='link' onClick={() => this.sidebarHandler("7065199")}>TSPDT 1000</li>

            <li className='link' onClick={() => this.sidebarHandler("28")}>OSCAR BEST PICTURES</li>

            <li className='link' onClick={() => this.sidebarHandler("229")}>PALME D'OR WINNERS</li>

            <li className='link' onClick={() => this.sidebarHandler("10")}>HIGHEST GROSSING</li>

            <li className='link' onClick={() => this.sidebarHandler("7063685")}>HOLIDAY 2020</li>

            <li className='link' onClick={() => this.sidebarHandler("47")}>FANGORIA 101</li>
          </ul>
        </div>
      </>
    );
  }
}

export default RateSidebar;
