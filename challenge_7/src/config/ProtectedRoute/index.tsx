import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Navigate, Routes } from 'react-router-dom';
import { RoleJwtPayload } from '../../models';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({children}) => {
  const getToken = localStorage.getItem('access_token') as string;

  if(!getToken) {
    return <Navigate to='/login'/>;
  }

  const decoded = jwtDecode(getToken) as RoleJwtPayload;
  const userTime: number = Number(decoded.exp) * 1000;
  const currentTime: number = new Date().getTime();

  if(currentTime > userTime) {
    localStorage.removeItem('access_token');
    return <Navigate to='/login'/>; 
  }

  return <Routes>{children}</Routes>
}

export default ProtectedRoutes