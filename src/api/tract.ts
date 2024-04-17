import axios, { AxiosError } from "axios";

export const fetchTract = async (value: number, combinedState: string) => {
  let url = "http://localhost:1323/tract?";

  if (combinedState) {
    url = url + `state=${combinedState}&`;
  }
  if (value) {
    url = url + `tract=${value}&`;
  }
  return await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return false;
    });
};

export const fetchpostTract = async (state: string, tract: number) => {
  return await axios
    .post("http://localhost:1323/tract", {
      state: state,
      tract: tract,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      return false;
    });
};
