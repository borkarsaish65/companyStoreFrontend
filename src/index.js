import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {CompanyProvider,useCompanyContainer} from './CompanyListingContext';

import CompanyListing from './listing/CompanyListing';
import { BrowserRouter,Route,Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CompanyProvider><App/></CompanyProvider>} />
      <Route path="company-listing" element={<CompanyProvider><CompanyListing /></CompanyProvider>} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

