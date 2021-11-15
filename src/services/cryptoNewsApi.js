import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

const createRequest = (url)=> ({url, headers:cryptoNewsApiHeaders})
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
       getCryptoNewsApi: builder.query({
           query: ({category, count}) => createRequest(`/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&cc=`)
       })
    })
})

 export const {
    useGetCryptoNewsApiQuery
 } = cryptoNewsApi;