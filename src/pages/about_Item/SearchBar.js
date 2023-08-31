import * as React from 'react';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useState } from 'react';
import Posts from './Posts';


function SearchBar(props){
  const [UserInput, setUserInput] = useState();
  const [Searched,setSearched] = useState();
  console.log(Searched);
    return(
    <div className='Search-Bar'>
      <form>
        <input type="text" maxLength='20' className='search_input' name='search' placeholder="검색어를 입력해주세요"/>
        <input type="submit" value="검색" className='search_submit'/>
      </form>      
    </div>
    )
}
export default SearchBar;


