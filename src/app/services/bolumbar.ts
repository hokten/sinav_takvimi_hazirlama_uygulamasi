import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import moment from 'moment-timezone';
type SegmentedControl = { label: string, value: string, renk: string } | null

type Bolumler = SegmentedControl[]
const BOL_TAG = "bol" as const

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [BOL_TAG],
  endpoints: (build) => ({
    listBolumler: build.query<Bolumler, void>({
      query: () => 'bolumler',
      providesTags: [BOL_TAG]

        }),
      }),
})

export const {
  useListBolumlerQuery
} = api
