
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f97f25999dmsh517deb355eeeaaap133c7djsnea158bc13814',
    'x-access-token' : 'i-have-to-migrate-to-v2'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url)=> ({url, headers:cryptoApiHeaders})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
       getCryptos: builder.query({
           query: (count) => createRequest(`/coins?limit=${count}`)
       }),
       getCryptoDetails: builder.query({
           query: (coinId)=> createRequest(`/coin/${coinId}`)
       }),

       getExchanges: builder.query({
        query: () => createRequest(`/exchanges`)
    }),
       getCryptoHistory: builder.query({
        query: ({coinId, timePeriod})=> createRequest(`/coin/${coinId}/history/${timePeriod}`)
    })
    })
})

 export const {
     useGetCryptosQuery,
     useGetCryptoDetailsQuery,
     useGetCryptoHistoryQuery,
     useGetExchangesQuery

 } = cryptoApi;