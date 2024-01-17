import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import moment from 'moment-timezone';
export interface Salon {
	id : string,
	salonAdi : string,
	kapasite : number
}
export interface Oturum {
	id : string,
	gun : number,
	ay: number,
	yil: number,
	saat: number,
	dakika: number
}

type Oturumm = {
	id : string;
   	gun: number ;
   	ay : number;
   	yil : number;
   	saat : number;
   	dakika : number;
} | null
export interface Bolum {
	id : string,
	bolumKisaltma: string,
	bolumAdi: string,
	bolumRenk: string
}

export interface OsbKayit {
	id : string,
	salon : Salon,
	oturum : Oturum,
	bolum : Bolum
}

interface Eslesme {
	salonId : string,
	salonAdi : string,
	oturumId : string,
	oturumTarihSaat : string,
	bolumId : string,
	bolumAdi : string,
}

type Tablo = {
	salonlar : Salon[] | null;
	oturumlar : Oturumm[] | null;
}

type SegmentedControl = { label: string, value: string, renk: string } | null

const BOL_TAG = "bol" as const



type UsersResponse = Salon[]
const POST_TAG = "foo" as const
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: [POST_TAG, BOL_TAG],
  endpoints: (build) => ({
    getPosts: build.query<Tablo, void>({
      query: () => 'users',
      providesTags: [POST_TAG]
        }),

    listBolumler: build.query<SegmentedControl[], void>({
      query: () => 'bolumler',
      providesTags: [BOL_TAG]

        }),






      }),
})

export const {
  useGetPostsQuery,  useListBolumlerQuery

} = api
