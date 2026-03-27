export interface Product {
  id: string;
  name: string;
  category: 'Sementes' | 'Fertilizantes' | 'Equipamentos' | 'Defensivos';
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Crop {
  id: string;
  name: string;
  plantedDate: string;
  harvestDate: string;
  status: 'Saudável' | 'Atenção' | 'Colheita';
  area: number; // in hectares
  expectedYield: number; // in tons
}

export interface WeatherForecast {
  date: string;
  temp: number;
  condition: 'Ensolarado' | 'Chuvoso' | 'Nublado' | 'Tempestade';
  humidity: number;
}
