import type {Category , SubCategory } from "../mocks/categories";

export interface Product {
    _id : string;
    name : string;
    description : string;
    image : string[];
    category : Category;
    subCategory: SubCategory;
    date: number;
    bestseller:boolean;
    
}