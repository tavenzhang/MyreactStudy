global.G_GetSerialNameById = (sid) => {
    let result = "";
    switch (sid) {
        case 1:
            result = "时时彩"
            break
        case 2:
            result = "11选5"
            break
        case 3:
            result = "福彩3d"
            break
        case 5:
            result = "快3"
            break;
        case 8:
            result = "快乐10"
            break;
        case 4:
            result = "快乐8"
            break;
        case 7:
            result = "PK10"
            break;
        case 6:
            result = "幸运28"
            break;
        default:
            result = "新游戏"
    }
    return result;
}



global.G_GAME_OnHandleWinnerNum=(sid,numStr)=>{
    let lotteryList=[];
    switch(sid) {
        case 1://ssc
        case 6://LUCKY
        case 3://3D
            lotteryList=numStr.split("");
            break;
        case 2://"11-5"
        case 7://pk10
        case 8://KL10
        case 9://
            lotteryList=numStr.split(" ");
            break;
        case 4://KENO
            lotteryList=numStr.split(",")
            break;
        case 5://"K3
            lotteryList=numStr.split("");
             break;
        default:
            lotteryList=numStr.split(" ");
            break;
    }
    return lotteryList;
}