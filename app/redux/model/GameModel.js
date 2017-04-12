/**
 * Created by thomas on 2017/3/15.
 */
export  default class GameModel{

    constructor(data){
        this.gameInfoList=[];
        if(data)
        {
            this.data= data;
            for(let key in data){
                data[key].img=`${SERVERADDR}/dist/i/home/home_activity_banner.jpg`;
                this.gameInfoList.push(data[key]);
            }
        }
    }

    getGameInfoById(id)
    {
        return this.data[`${id}`];
    }

    getGameNameById(id)
    {
        if(this.data[`${id}`])
        {
            return this.data[`${id}`].name;
        }
        else{
            return ""
        }
    }

}