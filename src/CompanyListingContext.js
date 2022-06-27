import {useState,createContext,useEffect, useContext} from 'react';


const CompanyListingContext = createContext([]);


const CompanyProvider = ({children})=>{

    const [companyData,setCompanyData] = useState([])
    return (
        <CompanyListingContext.Provider value={{companyData,setCompanyData}}>
            {children}
        </CompanyListingContext.Provider>
    )

}

const useCompanyContainer = ()=>useContext(CompanyListingContext);

export {useCompanyContainer,CompanyProvider};