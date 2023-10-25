import { myAxios } from "@/app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductsThunk=createAsyncThunk(
    "get product",
    async()=>{
        const {data}=await myAxios.get("products")
        return data
    }


)

export const getCategoryThunk=createAsyncThunk(
    "get category",
    async()=>{
        const {data}=await myAxios.get("products/categories")
        return data
    }
)

export const getProductByIdThunk=createAsyncThunk(
   "productbyid",
   async(id:number)=>{
    const{data}=await myAxios.get("products/"+id)
    return data
   } 
)

export const getProductsByLimitThunk=createAsyncThunk(
    'productslimit',
    async(limit:number)=>{
        const {data}=await myAxios.get("products?limit="+limit)
        return data
    }
)

export const getProductsByCategoryThunk=createAsyncThunk(
    'productcategory',
    async(text:string)=>{
        const {data}=await myAxios.get("products/category/"+text)
        return data
    }
    
)