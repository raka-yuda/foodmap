import Geometry from "./geometry";
import Rating from "./rating";

export default interface Restaurant {
  url: string;
  site: string;
  province: string;
  city: string;
  location: string;
  name_breadcrumb: string;
  name: string;
  cuisinetype: string;
  rating: Rating;
  address: string;
  openingTime: string;
  telephone: string;
  averagePricePerson: string;
  fasilities: { [key: string]: boolean };
  payment_method: string[];
  geometry: Geometry;
}
