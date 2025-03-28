
export interface Iproduct {
  sold:            number;
  images:          string[];
  subcategory:     Brand[];
  ratingsQuantity: number;
  _id:             string;
  title:           string;
  slug:            string;
  description:     string;
  quantity:        number;
  price:           number;
  imageCover:      string;
  category:        Brand;
  brand:           Brand;
  ratingsAverage:  number;
  createdAt:       Date;
  updatedAt:       Date;
  id:              string;
}

export interface Brand {
  _id:       string;
  name:      string;
  slug:      string;
  image?:    string;
  category?: string;
}



export interface IData {
  sold:            number;
  images:          string[];
  subcategory:     Brand[];
  ratingsQuantity: number;
  _id:             string;
  title:           string;
  slug:            string;
  description:     string;
  quantity:        number;
  price:           number;
  imageCover:      string;
  category:        Brand;
  brand:           Brand;
  ratingsAverage:  number;
  createdAt:       Date;
  updatedAt:       Date;
  __v:             number;
  reviews:         any[];
  id:              string;
}

export interface Brand {
  _id:       string;
  name:      string;
  slug:      string;
  image?:    string;
  category?: string;
}



export interface Metadata {
  currentPage:   number;
  numberOfPages: number;
  limit:         number;
  nextPage:      number;
}
