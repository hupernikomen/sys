import axios from "axios";

const getApi = (env) => {

 let baseURL;

 if (env === "local") {
    baseURL = "http://localhost:3333/";
 } else if (env === "heroku") {
    baseURL = "https://guiacapp-api.herokuapp.com/";
 } else {
    throw new Error("Ambiente não suportado");
 }


 return axios.create({ baseURL });
};

export default getApi;