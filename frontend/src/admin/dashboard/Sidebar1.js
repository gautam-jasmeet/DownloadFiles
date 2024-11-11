import React, { useState } from 'react'
import GSolarLogo from "../../images/GSolarLogo.png"
import sidebar1 from '../dashboard/sidebar1.css'

function Sidebar1() {
    const [isOpen,setIsOpen] = useState(false)
    const departments =["HR","Store","Production","Machine","Maintance","SOP|WI","Logistics",
        "Quality","Calibration","EHS"]
  return (
    <section className="page sidebar-2-page">
    <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
      <div className="inner">
        <header>
          <button
            type="button"
            className="sidebar-2-burger"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">
              {isOpen ? <i class="bi bi-x-lg"></i> :<i class="bi bi-justify"></i>}
            </span>
          </button>
          <img src={GSolarLogo} />
        </header>
        <nav>
          {departments.map((item) => (
            <button key={item} type="button">
              <span className="material-symbols-outlined">{item}</span>
              {/* <p>{item}</p> */}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  </section>
  )
}

export default Sidebar1