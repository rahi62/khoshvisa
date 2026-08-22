import {tours,visas,type Landing} from "./data";
const API=process.env.INTERNAL_API_URL||process.env.NEXT_PUBLIC_API_URL||"http://localhost:8000/api/v1";
async function safeFetch<T>(path:string,fallback:T):Promise<T>{try{const res=await fetch(`${API}${path}`,{next:{revalidate:300}});if(!res.ok)throw new Error();const data=await res.json();return (data.results??data) as T}catch{return fallback}}
export const getVisas=()=>safeFetch<Landing[]>("/visa-services/",visas);
export const getTours=()=>safeFetch<Landing[]>("/tours/",tours);
export async function getVisa(slug:string){return safeFetch<Landing|undefined>(`/visa-services/${slug}/`,visas.find(x=>x.slug===slug))}
export async function getTour(slug:string){return safeFetch<Landing|undefined>(`/tours/${slug}/`,tours.find(x=>x.slug===slug))}
