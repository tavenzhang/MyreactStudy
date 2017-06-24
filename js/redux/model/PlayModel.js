/**
 * Created by thomas on 2017/3/15.
 */
export  default class PlayModel {

    constructor(data) {
        if (data) {
            this.data = data;
            //玩法数据预处理
            for (let key in data) {
                if (data[key]["children"]) {
                    data[key].arrayList = []
                    for (let subKey in data[key]["children"]) {
                        data[key].arrayList.push(data[key]["children"][subKey]);
                        data[key]["children"][subKey]["children"].sort(this.compareFunction);
                    }
                }
            }
        }
    }

    compareFunction(item1, item2) {
        if (parseInt(item1.id) > parseInt(item2.id)) {
            return 1; // 如果是降序排序，返回-1。
        } else if (parseInt(item1.id) === parseInt(item2.id)) {
            return 0;
        } else {
            return -1; // 如果是降序排序，返回1
        }
    }

    getPlayByGid(gid) {
        let id = `series_id_${gid}`;
        return this.data[`${id}`];
    }

    getWayNameById(wayId) {
        let name = "";
        for (let key in this.data) {
            if (parseInt(this.data[key]["id"]) == parseInt(wayId)) {
                name = this.data[key].name;
                return name
            }
            else {
                for (let keySub1 in this.data[key].arrayList) {
                    let item = this.data[key].arrayList[keySub1]
                    if (parseInt(item["id"]) == parseInt(wayId)) {
                        name = item.name;
                        return name
                    }
                    else {
                        if (item["children"]) {
                            for (let subKey2 in item["children"]) {
                                let dataItem = item["children"][subKey2];
                                if (parseInt(dataItem["id"]) == parseInt(wayId)) {
                                    name = dataItem.name;
                                    return name
                                }
                            }
                        }
                    }
                }

            }
        }
        return name;
    }
}