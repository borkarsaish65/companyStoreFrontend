import axios from 'axios';
import './search.css';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../navbar/NavBar';
import {useCompanyContainer} from '../CompanyListingContext';


function searchCompany(searchText,updateResult){

    if(searchText.length == 0)
    {
        updateResult('')
        return undefined;
    }


    var data = JSON.stringify({
        "search": searchText
      });
      
      var config = {
        method: 'post',
        url: 'https://company-store-backend.herokuapp.com/search-company',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

    axios(config)
    .then(function (response) {
        updateResult(response.data)
    })
    .catch(function (error) {
        console.log(error)
    });
    
}

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [currSelectedCompany, setCurrSelectedCompany] = useState({

    });

    let {setCompanyData} = useCompanyContainer();
        
    let navigate = useNavigate();

    function storeCompanyInDB(companyDetails,setCompanyData){

        let {
            companyCIN,
            companyName
        } = companyDetails;
    
        var data = JSON.stringify({
            "name":companyName,
            "cin": companyCIN
          });
          
          var config = {
            method: 'post',
            url: 'https://company-store-backend.herokuapp.com/store-company',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
        
        axios(config)
        .then(function (response) {
            
            if(response.data.response == 1)
            {
                setCompanyData((prevArr)=>{
                   return [...prevArr,{
                    'cin':companyCIN,
                    'name':companyName
                }]
                })
    

                navigate('/company-listing');
                console.log('company details added successfully!')
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    
    }
    
    useEffect(()=>{

        var config = {
            method: 'get',
            url: 'https://company-store-backend.herokuapp.com/list-company'
          };
          
          axios(config)
          .then(function (response) {
            setCompanyData(response.data.companyList)
          })
          .catch(function (error) {
            console.log(error)
          });

    },[])


    const [searchFieldText, setSearchFieldText] = useState('');

    function selectCompany(e){
        let companyCIN = e.target.id;
        let companyName = e.target.innerText;

        setCurrSelectedCompany({
            companyCIN,companyName
        })
        setSearchFieldText(companyName)
        setSearchResult([]);
    }

    function debounceSearch(){
        let timer;

        return (searchText,updateResult)=>{

            clearTimeout(timer);
            
            timer = setTimeout(()=>{
                searchCompany(searchText,updateResult)
            },1000)
        }

    }


    let debounceSearchSetup = debounceSearch();
    function updateResult(data){
        
        if(data == '')
        {
            setSearchResult([]);
            return;
        }

        let superDiv = document.createElement('div');
        superDiv.innerHTML = data;
        
        let classes = superDiv.querySelectorAll('.show');
        let resultSet = [];

        classes.forEach((eachResult)=>{
            let companyName = eachResult.innerText;
            let companyCIN = eachResult.id.split('/')[2];

            resultSet.push({
            companyName,
            companyCIN
            })
        })

       setSearchResult(resultSet)
    }

    return (
        <div>
         <NavBar/>
         <div class='container d-flex flex-direction-column center-everything'>
            <div className="Search">
            <form onSubmit={ (e)=>{
                e.preventDefault();
                storeCompanyInDB(currSelectedCompany,setCompanyData);
            } }>
                <input onKeyUp={(e)=>{debounceSearchSetup(e.target.value,updateResult)}}
                  className="searchBox" placeholder="search company"
                  type='text'   
                  value={searchFieldText}
                  onChange={e => setSearchFieldText(e.target.value)}/>
                <input onSubmit={storeCompanyInDB} type='submit' />
            </form>
            </div>
            <ul class='list-group'>
                {
                    searchResult.map((element)=>{
                        return <li onClick={(e)=>{
                            selectCompany(e)
                        }} id={element.companyCIN}>{element.companyName}</li>
                    })


                }
            </ul>
        </div>
        </div>


    );
}
  
  export default Search;
  