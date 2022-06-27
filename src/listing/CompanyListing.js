import './CompanyListing.css';
import NavBar from '../navbar/NavBar';
import {useCompanyContainer} from '../CompanyListingContext';

function CompanyListing() {
    let {companyData,setCompanyData} = useCompanyContainer();
 
    return (
        <div>
            <NavBar/>
            <div class='company-listing-container'>
                <table>
                    <tr>
                        <th>CIN</th>
                        <th>Company Name</th>
                   </tr>
                   {
                    companyData.map((companyData)=>{
                        
                        return (<tr>
                            <td>
                            {companyData.cin}
                            </td>
                            <td>
                            {companyData.name}
                            </td>
                        </tr>)

                    })
                   }
                </table>
            </div>
        </div>


    );
}
  
  export default CompanyListing;
  