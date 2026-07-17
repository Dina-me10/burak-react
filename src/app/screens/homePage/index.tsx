import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data
    const result = [
      
    {
        "_id": "6a397b81c44eef4ad383e59e",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "STEAK",
        "productPrice": 17,
        "productLeftCount": 50,
        "productSize": "LARGE",
        "productVolume": 1,
        "productDesc": "LARGE AMOUNT DISH",
        "productImages": [
            "uploads/products/b664ee97-b243-4ddb-809b-f3d9ef24cd61.jpg",
            "uploads/products/68256230-ddc4-455a-bb48-d95153ea37b5.jpg",
            "uploads/products/73bef6b1-d740-49b7-b590-9d18d056520f.jpg"
        ],
        "productViews": 0,
        "createdAt": "2026-06-22T18:14:25.936Z",
        "updatedAt": "2026-06-22T18:50:38.540Z",
        "__v": 0
    },
    {
        "_id": "6a397b40c44eef4ad383e59b",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "STEAK",
        "productPrice": 15,
        "productLeftCount": 100,
        "productSize": "NORMAL",
        "productVolume": 1,
        "productDesc": "THIS IS MOST DELICIOUS STEAK",
        "productImages": [
            "uploads/products/ac33a5af-d71a-42d5-8af5-d0344e4b5f21.jpg",
            "uploads/products/15894170-af4c-46e1-b278-40f62fe72483.jpg",
            "uploads/products/4b550730-fb52-40f1-ba46-c1d41ef0f6a3.jpg",
            "uploads/products/76b8df7b-4728-4d39-a727-0eca726e0696.jpg"
        ],
        "productViews": 1,
        "createdAt": "2026-06-22T18:13:20.282Z",
        "updatedAt": "2026-07-09T08:27:01.321Z",
        "__v": 0
    }

    ]
    // Slice: Data => Store
    setPopularDishes(result as unknown as Product[]);
  }, []);


  console.log("popularDishes:", popularDishes );
  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}