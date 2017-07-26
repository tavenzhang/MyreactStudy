/**
 * Created by thomas on 2017/3/15.
 */
export  default class GameModel {

    constructor(data) {
        this.gameInfoList = [];
        if (data) {
            this.data = data;
            for (let key in data) {
                this.gameInfoList.push(data[key]);
            }
            this.gameInfoList=this.gameInfoList.sort(this.sortGameFun)
        }
    }

    sortGameFun(a,b){
        let isDisableA=!a.open||a.noIssue;
        let isDisableB=!b.open||b.noIssue;
        if(isDisableA !=isDisableB)
        {
            if(isDisableA)
            {
                return 1;
            }
            else{
                return -1;
            }

        }else{
            return 0;
        }
    }

    getGameDataById(id){
        let result=null
        for (let item of this.gameInfoList) {
            if (item.id == parseInt(id)) {
                result = item;
                break;
            }
        }
        return result;
    }

    getGameNameById(id) {
        let reultName = ""
        for (let item of this.gameInfoList) {
            if (item.id == parseInt(id)) {
                reultName = item.name;
                break;
            }
        }
        return reultName;
    }

    getSeriesIdById(id) {
        let series_id = null;
        for (let item of this.gameInfoList) {
            if (item.id == parseInt(id)) {
                series_id = item.series_id;
                break;
            }
        }
        return series_id;
    }

    getCoefficient(coefficient) {
        let coefficientF = Number(coefficient);
        switch (coefficientF) {
            case 1:
                return '元';
            case 0.1:
                return '角';
            case 0.01:
                return '分';

        }
    }

}