export interface Address {
  id: string;
  adresBasligi: string;
  ad: string;
  soyad: string;
  adres: string;
  apartmanDaire: string;
  sehir: string;
  telefon: string;
}

export const mockAddresses: Address[] = [
  {
    id: "1",
    adresBasligi: "Ev Adresi",
    ad: "Emre",
    soyad: "Seferoglu",
    adres: "Atatürk Mah. Cumhuriyet Cad. No:1",
    apartmanDaire: "D: 5",
    sehir: "İstanbul",
    telefon: "5551234567",
  },
  {
    id: "2",
    adresBasligi: "İş Adresi",
    ad: "Ayşe",
    soyad: "Yılmaz",
    adres: "Sanayi Bölgesi, Teknoloji Parkı Sk. No:2",
    apartmanDaire: "Kat: 3",
    sehir: "Ankara",
    telefon: "5559876543",
  },
];
