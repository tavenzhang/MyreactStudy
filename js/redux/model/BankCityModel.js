/**
 * Created by thomas on 2017/3/15.
 */
export  default class BankCityModel {

    constructor(data){
        this.bankList=[];
        this.princeList=[];
        if(data)
        {
            this.banks= data.data.banks;
            for(let key in  this.banks){
                let item ={};
                item.name =this.banks[key];
                item.id=key;
                this.bankList.push(item);
            }
            this.provice_cities=data.data.provice_cities;

            for(let city_key in  this.provice_cities){

                this.princeList.push(this.provice_cities[city_key]);
            }

        }
    }

    getBanksIdByName(name)
    {
        let banksId = "";
        for(let key in  this.banks){
            if(this.banks[key]==name)
            {
                banksId=key;
                 break;
            }
        }
        return banksId;
    }

    getProvinceIdByNameById(name)
    {
        let princeId = "";
        for(let key in  this.provice_cities){
            if(this.provice_cities[key]==name)
            {
                princeId=key;
                break;
            }
        }
        return princeId;
    }

    getCityDataByProvince()
    {

    }

}