export  default class AppModel {

    constructor(data) {
        if (data) {
            this.data = data;
            let obj=this.data.data.aTransactionTypes;
            let resultList=this.getDataListByObj(obj);
             resultList.unshift({name:"全部类型",value:""});
            this.getATransactionTypeList = resultList;

             obj=this.data.data.aProjectStatus;
            let projectStateList=this.getDataListByObj(obj);
            projectStateList.unshift({name:"全部状态",value:""})
            this.getAProjectStatusList=projectStateList;

            obj=this.data.data.aWithdrawStatus;
            let drawDateList=this.getDataListByObj(obj);
            drawDateList.unshift({name:"全部状态",value:""})
            this.getADrawDateList=drawDateList;

            obj=this.data.data.aDepositStatus;
            let deposit=this.getDataListByObj(obj);
            deposit.unshift({name:"全部状态",value:""})
            this.getADeposit=deposit;




        }
    }

    getDataListByObj(obj){
        let resultList=[]
        for (let key in  obj){
            resultList.push({name:obj[key],value:key})
        }
        return resultList;
    }

    getACoefficients(cof)
    {
       let obj=this.data.data.aCoefficients;
        return  obj[`${cof}`];
    }


    getATransactionType(type) {
        let obj=this.data.data.aTransactionTypes;
        return  obj[`${type}`];
    }

    getADepositStatus(deposit)
    {
        let obj=this.data.data.aDepositStatus;
        return  obj[`${deposit}`];
    }

    getAWithdrawStatus(draw)
    {
        let obj=this.data.data.aWithdrawStatus;
        return  obj[`${draw}`];
    }

    getATraceStatus(trace)
    {
        let obj=this.data.data.aTraceStatus;
        return  obj[`${trace}`];
    }

    getAProjectStatus(project)
    {
        let obj=this.data.data.aProjectStatus;
        return  obj[`${project}`];
    }

}