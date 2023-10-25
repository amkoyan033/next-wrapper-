import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type } from "os";


export type Product={id:number,title:string,price:number,category:string,description:string,image:string}
const initialState:{arr:Product[],prod:Product,catArr:string[]}={
    arr:[],prod:{} as Product,catArr:[]
}

const prodSlice=createSlice({
    name:"prod",
    initialState,
    reducers:{
        getProduct:(state,action)=>{
            state.arr=action.payload

        },
        getProductById:(state,action)=>{
            state.prod=action.payload

        },

        getCategory:(state,action)=>{
            state.catArr=action.payload

        }
        
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
          console.log('HYDRATE', state, action.payload);
          return {
            ...state,
            ...action.payload.prod,
          };
        },
      },
    
})

export const selectProduct=(st:RootState)=>st.prod
export const {getProduct,getProductById,getCategory}=prodSlice.actions
export default prodSlice.reducer