import Brand from "./Brand";
import Color from "./Color";
import Model from "./Model";

type CarProperties = {
    brands: Brand[];
    models: Model[];
    colors: Color[]; 
}

export default CarProperties;