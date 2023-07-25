import * as React from 'react';
import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";


function SearchBar(){
    return(
    <div className='App' style={{ margin: 20, padding: 20 }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {" "}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <NativeSelect
            defaultValue={"none"}
            inputProps={{
              name: "category",
              id: "uncontrolled-native",
            }}
          >
            <option value={"none"}>통합검색</option>
            <option value={"home-appliances"}>가전제품</option>
            <option value={"household-goods"}>생활용품</option>
            <option value={"musical-instruments"}>악기</option>
            <option value={"toy"}>완구</option>
            <option value={"etc"}>기타</option>
          </NativeSelect>
        </FormControl>

        <TextField id="standard-search" type="search" variant="standard" placeholder="무엇이 필요하세요?" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
    </div>
    )
}
export default SearchBar;


