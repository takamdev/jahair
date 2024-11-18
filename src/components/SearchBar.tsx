import { useState } from "react";
import { FaSearch } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
function SearchBar() {
  const [value,setValue]=useState("")
  const navigateTo = useNavigate()
    const searchToggle = ()=>{
       if(value.trim().length!==0) window.location.href=`/search/results?value=${value.split(" ").join('+')}`
    }
  return (
      <div className="search-holder text-black inline -mt-2">
        <input type="text" value={value} onChange={(e)=>{setValue(e.target.value)}} className='search-input focus:ring-0  roboto-regular' placeholder='type to search'/>
        <button className='text-[#ff66c4da] absolute top-[3px]  lg:top-[10px] right-[10px]' onClick={searchToggle}>
            <span>
              <FaSearch className="font-bold" />
            </span>
        </button>
      </div>
  )
}

export default SearchBar
