
import React from 'react';
import { Nav } from 'react-bootstrap';
import './index.css'; 

const VerticalMenu = ({ menuItems }) => {
  return (
    <Nav className="flex-column vertical-menu">
      {menuItems.map((item, index) => (
        <Nav.Link key={index} href={item.link} className="menu-item">
          {item.icon && <span className="me-2">{item.icon}</span>}
          {item.label}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default VerticalMenu;
