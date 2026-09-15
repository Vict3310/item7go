export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  mapUrl: string;
}

export const locations: Location[] = [
  {
    id: 'victoria-island',
    name: 'Victoria Island',
    address: '14A Adeola Odeku Street, Victoria Island',
    city: 'Lagos, Nigeria',
    hours: 'Mon–Sun: 11:00 AM – 11:00 PM',
    phone: '+234 812 345 6789',
    mapUrl: '#',
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    address: '22 Admiralty Way, Lekki Phase 1',
    city: 'Lagos, Nigeria',
    hours: 'Mon–Sun: 10:00 AM – 10:00 PM',
    phone: '+234 813 456 7890',
    mapUrl: '#',
  },
  {
    id: 'ikeja',
    name: 'Ikeja GRA',
    address: '7 Oduduwa Crescent, Ikeja GRA',
    city: 'Lagos, Nigeria',
    hours: 'Mon–Sun: 11:00 AM – 10:00 PM',
    phone: '+234 814 567 8901',
    mapUrl: '#',
  },
  {
    id: 'abuja',
    name: 'Abuja — Wuse 2',
    address: '35 Aminu Kano Crescent, Wuse 2',
    city: 'Abuja, Nigeria',
    hours: 'Mon–Sun: 11:00 AM – 10:00 PM',
    phone: '+234 815 678 9012',
    mapUrl: '#',
  },
];
