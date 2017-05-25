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
                data[key].img=`${G_SERVERADDR}/dist/i/home/home_activity_banner.jpg`;
                this.gameInfoList.push(data[key]);
            }
        }
    }



    getGameNameById(id)
    {
        let reultName=""
        for (let item of this.gameInfoList) {
            if(item.id == parseInt(id))
            {
                reultName=item.name;
                break;
            }
        }
        return reultName;
    }

}