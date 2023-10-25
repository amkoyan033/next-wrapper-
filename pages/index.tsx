import Image from "next/image";
import { Inter } from "next/font/google";
import { store, wrapper } from "@/app/store";
import {
  getCategoryThunk,
  getProductsByCategoryThunk,
  getProductsThunk,
  getProductsByLimitThunk
} from "@/features/Product/productApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getCategory,
  getProduct,
  selectProduct,
} from "@/features/Product/productSlice";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { arr, catArr } = useAppSelector(selectProduct);
  console.log(arr, catArr);
  const dispatch=useAppDispatch()
  return (
    <div>
      <select onChange={async (e)=>{
        const data=await dispatch(getProductsByCategoryThunk(e.target.value)).unwrap()
        console.log(data);
        dispatch(getProduct(data))        
      }}>
        {catArr.map((elm, i) => {
          return (
            <option key={i} value={elm}>
              {elm}
            </option>
          );
        })}
      </select>
      <input onChange={async(e)=>{
        const data=await dispatch(getProductsByLimitThunk(+e.target.value)).unwrap()
        console.log(data);
        dispatch(getProduct(data))   
      }} />
      <table>
        <thead>
        <tr>
          <th>title</th>
          <th>category</th>
          <th>image</th>
          <th>see</th>
        </tr>
        </thead>
        <tbody>
          {arr.map((elm)=>{
            return(
              <tr key={elm.id}>
                <td>{elm.title}</td>
                <td>{elm.category}</td>
                <td><img src={elm.image} width={180}/></td>
                <td><Link href={'/product/'+elm.id}>See</Link></td>
                <td>
                <button></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store): any =>
    async () => {
      const data = await store.dispatch(getProductsThunk()).unwrap();
      const data1 = await store.dispatch(getCategoryThunk()).unwrap();
      store.dispatch(getProduct(data));
      store.dispatch(getCategory(data1));
    }
);
