import { FaSearch } from "react-icons/fa"; 
function SearchBar() {

    const searchToggle = ()=>{

    }
  return (
      <div className="search-holder text-black inline -mt-2">
        <input type="text" className='search-input focus:ring-0  roboto-regular' placeholder='type to search'/>
        <button className='text-[#ff66c4da] absolute top-[3px]  lg:top-[10px] right-[10px]' onClick={searchToggle}>
            <span>
              <FaSearch className="font-bold" />
            </span>
        </button>
      </div>
  )
}

export default SearchBar