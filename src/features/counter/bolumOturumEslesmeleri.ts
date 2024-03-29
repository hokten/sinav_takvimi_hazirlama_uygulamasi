import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { AsyncThunkConfig } from '../../commonTypes';


interface Eslesme {
	salonId : string,
	salonAdi : string,
	oturumId : string,
	oturumTarihSaat : string,
	bolumId : string,
	bolumAdi : string,
}

interface EslesmeState {
	eslesmeler : Eslesme[]
}

export const bolumOturumEslesmeleriniCek = createAsyncThunk(
    "bolumOturumEslesmeleriniCek",
    async () => {
        const response = await fetch('/eslesmeler');
	console.log(response);
	return (await response.json()) as Eslesme[]
    }
);
type IstekHucre = Pick<Eslesme, 'salonId' | 'oturumId' | 'bolumId'> 
export const bolumOturumEslesmesiGonder = createAsyncThunk<Array<Eslesme>, IstekHucre,  AsyncThunkConfig>(
    "bolumOturumEslesmesiGonder",
    async (hucreBilgileri, thunkAPI) => {
    try {
    const { data }: AxiosResponse<Eslesme[]> = await axios.post('/salonoturumhucreguncelle', hucreBilgileri)
    /*
      const response = await fetch(
        '/salonoturumhucreguncelle',
        {
	mode: 'cors',

          method: 'POST',
          headers: {
            Accept: 'application/json',
	            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hucreBilgileri),
        }
      )
      */
	return data

      } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Registration failed';
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
  );











const initialState: EslesmeState = {eslesmeler : [] as Eslesme[]}


export const bolumOturumEslesmeSlice = createSlice({
name: 'bolumoturumeslesme',
initialState : initialState as EslesmeState,
reducers: {
},

extraReducers: (builder) => {
builder.addCase(bolumOturumEslesmeleriniCek.fulfilled, (state, action) => {
console.log(action.payload)
		state.eslesmeler = action.payload
		})
		.addCase(bolumOturumEslesmesiGonder.fulfilled, (state, action) => {
		state.eslesmeler=action.payload

		console.log(action.payload)
      })
},


  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
 });
export const selectBolumOturumEslesmeleri = (state: RootState) => state.bolumoturumeslesmeleri




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default bolumOturumEslesmeSlice.reducer
