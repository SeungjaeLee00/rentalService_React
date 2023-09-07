import {configureStore, createSlice} from '@reduxjs/toolkit'

let item = createSlice({
    name : 'item',
    initialState : [
        { id : 0, category:"의류", title :"(새상품)꼼데가르송 가디건", price:25000,
          date:"2023-08-13", content:"꼼데가르송 가디건 블랙색상 XS사이즈 새상품입니다. 저렴한 가격에드려요. 쪽지주세요", state:"대여중" },
          { id : 1, category:"의류", title :"나이키 에어포스 275팝니다", price:70000,
          date:"2023-08-27", content:"나이키에어포스275팝니다. 품질좋아요", state:"대여중"},
          { id : 2, category:"의류", title :"lee리 볼캡 모자", price:20000,
          date:"2023-08-27", content:"lee리 볼캡모자 상태 좋습니다.", state:"대여중"},
          { id : 3, category:"가전제품", title :"에코맘스 공기청정기", price:280000,
          date:"2023-09-05", content:"거의 새거입니다", state:"대여중"},
          { id : 4, category:"생활용품", title :"스타벅스 크리스마스파티 스터드 콜드컵 710ml 새상품", price:25000,
          date:"2023-09-05", content:"국내 매장에서 구입한, 미사용 제품입니다", state:"대여중"},
          { id : 5, category:"완구", title :"(미사용)원목 독일 만년필", price:30000,
          date:"2023-09-05", content:"한 자루당 가격입니다. ", state:"대여중"},
    ],
    reducers : {
        additem(state,a ){
            let temp  = {
                id : 4,
                title : "임시데이터",
                price : 1,
                date : "2023-08-31",
                state : "대여중"
            };
            return state.concat(a.payload);
        }
    }
})

let category = createSlice({
    name : 'category',
    initialState : ["전체", "가전제품", "생활용품", "완구", "운동기구", "차량,오토바이",
 "악기", "책", "공구", "의류"]
})

export let {additem} = item.actions

export default configureStore({
    reducer:{
        item : item.reducer,
        category : category.reducer
    }
})

