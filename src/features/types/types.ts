interface Salon {
	id : string,
	salonAdi : string
}
interface Oturum {
	id : string,
	oturumTarihSaat : string
}
interface Bolum {
	id : string,
	bolumAdi : string
}

interface OsbKayit {
	salon : Salon,
	oturum : Oturum,
	bolum : Bolum
}


