import {configureStore, createSlice} from '@reduxjs/toolkit'

let item = createSlice({
    name : 'item',
    initialState : [
        { id : 0, category:"의류", title :"(새상품)꼼데가르송 가디건", price:25000,
          date:"2023-08-13", content:"꼼데가르송 가디건 블랙색상 XS사이즈 새상품입니다. 저렴한 가격에드려요. 쪽지주세요", state:"판매중" },
          { id : 1, category:"의류", title :"나이키 에어포스 275팝니다", price:70000,
          date:"2023-08-27", content:"나이키에어포스275팝니다. 품질좋아요", state:"판매중"},
          { id : 2, category:"의류", title :"lee리 볼캡 모자", price:20000,
          date:"2023-08-27", content:"lee리 볼캡모자 상태 좋습니다.", state:"판매중"}
    ],
    reducers : {
        additem(state,a ){
            let temp  = {
                id : 4,
                title : "임시데이터",
                price : 1,
                date : "2023-08-31",
                state : "판매중"
            };
            return state.concat(a.payload);
        }
    }
})

export let {additem} = item.actions

export default configureStore({
    reducer:{
        item : item.reducer
    }
})

