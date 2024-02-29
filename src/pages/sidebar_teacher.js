/* eslint-disable no-restricted-globals */
import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  const logout = () => {
    if(confirm("Are you sure you want to logout ?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("id");
      localStorage.removeItem("userId");
      window.location.reload(true)
    }
  }

  return (
    <div style={{ display: 'flex', overflow: 'scroll initial' }}>
      <CDBSidebar toggled={true} textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            π-Academy
          </a>
        </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content" style={{ height: '82vh' }}>
                  <CDBSidebarMenu>
                      {/* <NavLink exact to="/profile" activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                      </NavLink> */}
                      <NavLink exact to="/" activeClassName="activeClicked">
                          <CDBSidebarMenuItem icon="sticky-note">Assignments</CDBSidebarMenuItem>
                      </NavLink>
                      <NavLink exact to="/" >
                          <CDBSidebarMenuItem icon="sign-out-alt" onClick={logout}>Logout</CDBSidebarMenuItem>
                      </NavLink>
                  </CDBSidebarMenu>
              </CDBSidebarContent>

       {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>*/}
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;