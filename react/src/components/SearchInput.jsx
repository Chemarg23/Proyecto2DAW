import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchInput(){

    const [search, setSearch] = useState();
    const navigate = useNavigate()
    const research = (e) => e.key === 'Enter' && navigate(`/search/${search.replace(/ /g,'-')}`)
    
    return (
        <div className="search-container">
            <input
              type="text"
              className="py-2 px-3 rounded-xl dark:bg-gray-700 bg-gray-100 focus:ring-blue-500"
              placeholder="Search..."
              onChange={(e)=>setSearch(e.target.value)}
              onKeyUp={research}
            />
            <i
              className="bi bi-search search-icon cursor-pointer p-3"
              onClick={() => navigate(`/search/${search.replace(/ /g,'-')}`)}
            ></i>
          </div>
    )

}