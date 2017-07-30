
export  default class BankCityModel {

    constructor(data){
        this.bankList=[];
        this.princeList=[];
        if(data)
        {
            this.bankList= this.getDataListByObj(data.data.banks);
            this.princeList=this.getDataListByObj(data.data.provice_cities);
            let provice_cities=data.data.provice_cities;

            for(let city_key in  this.provice_cities){

                this.princeList.push(this.provice_cities[city_key]);
            }

        }
    }

    getDataListByObj(obj){
        let resultList=[]
        for (let key in  obj){
            resultList.push({name:obj[key],value:key})
        }
        return resultList;
    }

}