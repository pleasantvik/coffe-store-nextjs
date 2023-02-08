import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_API,
  //...other fetch options
});

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 1,
  });

  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const getCoffeeUrl = (latLong, query, limit) =>
  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
export const fetchCoffeeStore = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.API_KEY,
    },
  };

  const res = await fetch(
    getCoffeeUrl([43.653833032607096, -79.37896808855945], "coffee", 6),
    options
  );

  const data = await res.json();
  console.log(data);

  return data.results;
};
