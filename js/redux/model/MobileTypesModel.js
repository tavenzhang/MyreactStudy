export  default class MobileTypesModel {

    constructor(data) {
        if (data) {
            this.data = data;
        }
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

    getATraceStatuss(trace)
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