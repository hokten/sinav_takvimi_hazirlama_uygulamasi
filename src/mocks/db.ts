import { factory, primaryKey, manyOf, oneOf  } from '@mswjs/data'
import { http, HttpResponse  } from 'msw'
import { nanoid } from '@reduxjs/toolkit'
import moment from 'moment-timezone';
import 'moment/locale/tr';

console.log(moment.locale()); // en
moment.locale("tr");

interface IBolumCubuk {
	bolumler : SegmentedControl[]
	etkin : string
}

export type SegmentedControl = { label : string, value: string, renk:string }
export interface Salon {
	id : string,
	salonAdi : string,
	kapasite : number
}
export class Oturum {
	id : string;
   	gun: number;
   	ay : number;
   	yil : number;
   	saat : number;
   	dakika : number;
	getOturumTarihSaat() : string {
		return  moment.tz([this.yil, this.ay, this.gun, this.saat, this.dakika], "Europe/Istanbul").format("DD-MM-YYYY dddd HH:mm")
	}
	getUnix() : number {
		return moment.tz([this.yil, this.ay, this.gun, this.saat, this.dakika], "Europe/Istanbul").unix()
 	}

}
export interface Bolum {
	id : string,
	bolumKisaltma: string,
	bolumAdi : string,
	bolumRenk: string
}

export interface OsbKayit {
	id : string
	salon : Salon,
	oturum : Oturum,
	bolum : Bolum
}

export interface Eslesme {
	salonId : string,
	salonAdi : string,
	oturumId : string,
	oturumTarihSaat : string,
	bolumId : string,
	bolumAdi : string,
}
type IstekHucre = Pick<Eslesme, 'salonId' | 'oturumId' | 'bolumId'> 

const db = factory({
  salon: {
    id: primaryKey(String),
    salonAdi: String,
    kapasite: Number
  },
  oturum: {
    id: primaryKey(String),
    gun: Number,
    ay: Number,
    yil:Number,
    saat:Number,
    dakika:Number
  },
  bolum: {
    id: primaryKey(String),
    bolumKisaltma: String,
    bolumRenk:String,
    bolumAdi : String
  },
  osbkayit: {
	id: primaryKey(String),
  	salonId : String,
	oturumId : String,
	bolumId : String,
}
  	
})
console.log(moment.tz("2013-11-18 14:30:00", "Europe/Istanbul").toDate());
const a301 = db.salon.create({id: nanoid(), salonAdi:'A301', kapasite:40});
const a302 = db.salon.create({id: nanoid(), salonAdi:'A302', kapasite:40});
const a304 = db.salon.create({id: nanoid(), salonAdi:'A304', kapasite:45});
const az05 = db.salon.create({id: nanoid(), salonAdi:'AZ05', kapasite:40});
const az04 = db.salon.create({id: nanoid(), salonAdi:'AZ04', kapasite:40});

const oturum1 = db.oturum.create({id: nanoid(), gun:16, ay:11, yil:2023, saat:9, dakika:0})
const oturum2 = db.oturum.create({id: nanoid(), gun:16, ay:11, yil:2023, saat:11, dakika:0})
const oturum3 = db.oturum.create({id: nanoid(), gun:16, ay:11, yil:2023, saat:14, dakika:0})
const oturum4 = db.oturum.create({id: nanoid(), gun:16, ay:11, yil:2023, saat:16, dakika:30})
const oturum5 = db.oturum.create({id: nanoid(), gun:17, ay:11, yil:2023, saat:9, dakika:0})
const oturum6 = db.oturum.create({id: nanoid(), gun:17, ay:11, yil:2023, saat:11, dakika:0})
const oturum7 = db.oturum.create({id: nanoid(), gun:17, ay:11, yil:2023, saat:14, dakika:0})
const oturum8 = db.oturum.create({id: nanoid(), gun:17, ay:11, yil:2023, saat:16, dakika:30})
const oturum9 = db.oturum.create({id: nanoid(), gun:18, ay:11, yil:2023, saat:9, dakika:0})
const oturum10 = db.oturum.create({id: nanoid(), gun:18, ay:10, yil:2023, saat:11, dakika:0})


const bolum1 = db.bolum.create({id: nanoid(), bolumKisaltma:'BIL', bolumAdi:'Bilgisayar Programcılığı', bolumRenk:'green'})
const bolum2 = db.bolum.create({id: nanoid(), bolumKisaltma:'HRT', bolumAdi:'Harita ve Kadastro', bolumRenk:'red'})
const bolum3 = db.bolum.create({id: nanoid(), bolumKisaltma:'ELK', bolumAdi:'Elektrik', bolumRenk:'yellow'})
const bolum4 = db.bolum.create({id: nanoid(), bolumKisaltma:'MOD', bolumAdi:'Moda Tasarımı', bolumRenk:'blue'})

const osbkayit1 = db.osbkayit.create({id: nanoid(), salonId:a301.id, oturumId: oturum1.id, bolumId:bolum1.id})  
const osbkayit2 = db.osbkayit.create({id: nanoid(), salonId:a302.id, oturumId: oturum1.id, bolumId:bolum1.id})  
const osbkayit3 = db.osbkayit.create({id: nanoid(), salonId:a304.id, oturumId: oturum1.id, bolumId:bolum1.id})  
const osbkayit4 = db.osbkayit.create({id: nanoid(), salonId:a301.id, oturumId: oturum2.id, bolumId:bolum1.id})  
const osbkayit5 = db.osbkayit.create({id: nanoid(), salonId:a302.id, oturumId: oturum2.id, bolumId:bolum1.id})  
const osbkayit6 = db.osbkayit.create({id: nanoid(), salonId:a304.id, oturumId: oturum2.id, bolumId:bolum1.id})  
const osbkayit7 = db.osbkayit.create({id: nanoid(), salonId:a301.id, oturumId: oturum3.id, bolumId:bolum2.id})  
const osbkayit8 = db.osbkayit.create({id: nanoid(), salonId:a302.id, oturumId: oturum3.id, bolumId:bolum2.id})  
const osbkayit9 = db.osbkayit.create({id: nanoid(), salonId:a304.id, oturumId: oturum3.id, bolumId:bolum2.id})  


const siraliOturumlar = db.oturum.findMany({
  orderBy: [
    {
      yil: 'asc',
    },
    {
      ay: 'asc',
    },
    {
      gun: 'asc',
    },
    {
      saat: 'asc',
    },
    {
      dakika: 'asc',
    },
  ],
})

const siraliSalonlar = db.salon.findMany({
	orderBy: {
		salonAdi : 'asc'
	}
})


console.log(siraliSalonlar);
const eslesmeler : Eslesme[] = []
siraliOturumlar.forEach((otr) => {

	let oturumId = otr.id
	let oturumOb = Object.assign(new Oturum(), {id: otr.id, gun: otr.gun, ay:otr.ay, yil: otr.yil, saat: otr.saat, dakika: otr.dakika}) 
	let oturumTarihSaat = oturumOb.getOturumTarihSaat()
	siraliSalonlar.forEach((sln) => {
		let salonId = sln.id
		let salonAdi = sln.salonAdi
		let bolumId=null
		let bolumAdi=null
		let results = db.osbkayit.findFirst({where: {oturumId: { equals: oturumId}, salonId: {equals : salonId}}})
		if(results !== null) {
			let bolum = db.bolum.findFirst({where: {id: { equals: results.bolumId}}})
			bolumId = bolum?.id
			bolumAdi = bolum?.bolumKisaltma
		}
		eslesmeler.push(<Eslesme>{salonId, salonAdi, oturumId,oturumTarihSaat, bolumId, bolumAdi})
	})
})

		

const sControlforBolum : SegmentedControl[] = [] 

db.bolum.getAll().forEach((bol) => {
	const temp : SegmentedControl = {label : bol.bolumKisaltma, value: bol.id, renk:bol.bolumRenk}
	sControlforBolum.push(temp)
})

const yeni : IBolumCubuk = {bolumler : sControlforBolum, etkin : sControlforBolum[0].value }
console.log(yeni)

	
	
console.log(eslesmeler);	
console.log({salonlar:siraliSalonlar, oturumlar:siraliOturumlar})	

export const handlers = [

http.get('/users', () => {
    console.log('Captured a "GET /posts" request')
    return HttpResponse.json({salonlar:siraliSalonlar, oturumlar:siraliOturumlar})
  }),
http.get('/bolumler', () => {
    console.log('Captured a "GET /posts" request')
    return HttpResponse.json(yeni)
  }),
http.get('/eslesmeler', () => {
    console.log('Captured a "GET /posts" request')
    return HttpResponse.json(eslesmeler)
  }),
http.post('http://localhost:3000/salonoturumhucreguncelle', async ({ request }) => {
const info = await request.json() as IstekHucre
const fr = eslesmeler.filter((val) => val.oturumId==info.oturumId && val.salonId==info.salonId)
console.log(fr[0])

const resu = db.osbkayit.findFirst({where: {
   salonId: {
      equals:fr[0].salonId
    },
  oturumId: {
      equals:fr[0].oturumId
    },
    }})
if(resu==null) {
	 db.osbkayit.create({id: nanoid(), salonId:info.salonId, oturumId: info.oturumId, bolumId:info.bolumId})  
}
else {

const dfr = db.osbkayit.update({
 where: {
   salonId: {
      equals:info.salonId
    },
  oturumId: {
      equals:info.oturumId
    },
    },
    data: {
    // Specify the exact next value.
    bolumId: info.bolumId,
  }
 })
 }
console.log(db.osbkayit.getAll())

const eslesmeler1 : Eslesme[] = []
siraliOturumlar.forEach((otr) => {

	let oturumId = otr.id
	let oturumOb = Object.assign(new Oturum(), {id: otr.id, gun: otr.gun, ay:otr.ay, yil: otr.yil, saat: otr.saat, dakika: otr.dakika}) 
	let oturumTarihSaat = oturumOb.getOturumTarihSaat()
	siraliSalonlar.forEach((sln) => {
		let salonId = sln.id
		let salonAdi = sln.salonAdi
		let bolumId=null
		let bolumAdi=null
		let results = db.osbkayit.findFirst({where: {oturumId: { equals: oturumId}, salonId: {equals : salonId}}})
		if(results !== null) {
			let bolum = db.bolum.findFirst({where: {id: { equals: results.bolumId}}})
			bolumId = bolum?.id
			bolumAdi = bolum?.bolumKisaltma
		}
		eslesmeler1.push(<Eslesme>{salonId, salonAdi, oturumId,oturumTarihSaat, bolumId, bolumAdi})
	})
})





console.log(eslesmeler1)


    return HttpResponse.json(eslesmeler1)
  }),




] as const;
