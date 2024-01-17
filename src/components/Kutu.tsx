import React,{useRef, useState, useEffect} from 'react';
import logo from './logo.svg';
import { Box, Container, Table, Paper } from '@mantine/core';
import { Button, SegmentedControl } from '@mantine/core';
import { Badge } from '@mantine/core';
import axios, {isCancel, AxiosError} from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { RootState } from '../app/store';
import { createSelector } from 'reselect'
import { useStore } from 'react-redux'
import { selectBolumOturumEslesmeleri, bolumOturumEslesmesiGonder } from '../features/counter/bolumOturumEslesmeleri'
import { notifications } from '@mantine/notifications';
import useSelectorRef from '../hooks/useSelectorRef';
import { shallowEqual } from "react-redux"
import moment from 'moment-timezone';
import 'moment/locale/tr';
function logla(ev:any, renk:string) {
	const node : HTMLElement = ev.target as HTMLElement
	const parentNode = node.parentNode as HTMLElement
	const tablo = parentNode.closest("table") as HTMLElement
	const childrens = parentNode.children as HTMLCollection
	childrens[0].style.backgroundColor=renk
	const index = Array.from(childrens).indexOf(node)
	const theadtbody = tablo.children as HTMLCollection
	const thead = theadtbody[0] as HTMLElement
	const theadtr = thead.children[0] as HTMLElement
	const theadtrths = theadtr.children as HTMLCollection
	const hlTh = theadtrths[index] as HTMLElement


	//console.log(tbody)
	//const hlTh = theadtr[index] as HTMLElement
	//console.log(hlTh)
	hlTh.style.backgroundColor=renk
}



export const Kutu = ({oturumid, salonid} : {oturumid : string, salonid: string}) => {
const bolumler = useAppSelector((state : RootState) => state.bbar.bolumler)
const dispatch = useAppDispatch()
const selectAvailableItems = createSelector(
  [
    (state: RootState) => state.bolumoturumeslesmeleri.eslesmeler,
    (state: RootState, oturumid: string) => oturumid,
    (state: RootState, oturumid: string, salonid: string) => salonid
  ],
  (items, category, id) =>
  	items.filter(item => item.oturumId === oturumid && item.salonId === salonid)[0].bolumAdi
)
const items = useAppSelector((state : RootState) => selectAvailableItems(state, oturumid, salonid))
console.log(oturumid)
console.log(salonid)
console.log(items)
 const store = useStore()
 const blm = store.getState().bbar.etkin
//const blm = useSelectorRef<String>((state : RootState) => state.bbar.etkin)

console.log(blm)
let renk;
// borderStyle: 'solid', borderWidth:'1px', 
if(items !== null) 
renk = bolumler.filter((val) => val.label === items )[0].renk
else renk="white"
console.log({oturumId:oturumid, salonId:salonid, bolumId:blm})
	return (
	<Table.Td onClick={() => dispatch(bolumOturumEslesmesiGonder({oturumId:oturumid, salonId:salonid, bolumId:store.getState().bbar.etkin
}))} style={{ cursor: 'pointer', width: '50px', height:'50px', borderRightWidth:'2px', backgroundColor:renk }}  onMouseOver={(event)=>logla(event, "yellow")} onMouseOut={(event)=>logla(event, "white")}>{items}


			</Table.Td>)}



