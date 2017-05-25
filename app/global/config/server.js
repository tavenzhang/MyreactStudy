//let SERVERADDR = "http://www.monkey.com";
//let G_SERVERADDR = "http://104.250.140.242:8081"
let SERVERADDR = "http://www.orchidf.com";

global.G_SERVERADDR = SERVERADDR;

const METHOD_GET = "GET";
const METHOD_POST = "POST";

//接口配置
global.HTTP_SERVER = {
    //获取接口配置详情
    GET_DATA_DEATIL: {url: `/mobile-types`},
    //获取游戏列表
    //GET_GAME_LIST_INFO:{url:`/js/data/lottery-series.json`},
    GET_GAME_LIST_INFO: {url: `/mobile-lotteries/lottery-series`},
    //获取玩法列表
    GET_PLAY_LIST_INFO: {url: `/mobile-lotteries/series-way-groups`},
    //获取游戏种类相关数据
    GET_GAME_DETAIL: {url: '', formatUrl: `/mobile-lotteries/lottery-info/#id`, method: METHOD_POST, body: {}},
    //获取游戏玩法相关数据
    GET_GAME_WAY: {url: '', formatUrl: `/mobile-lotteries/series-info/#id/way/#way_id`, method: METHOD_POST, body: {}},
    //注单提交接口
    SUBMIT_ORDERS: {url: '', formatUrl: `/mobile-lotteries/lottery-bet/#id`, method: METHOD_POST, body: {}},
    //获取银行卡city 信息
    GET_BANG_CITY_INFO: {url: `/js/data/districts.json`},
    //登陆
    LOGIN_IN: {url: `/mobile-auth/login`, method: METHOD_POST, body: {username: "", password: ""}},
    //登出
    LOGIN_OUT: {url: `/mobile-auth/logout`, method: METHOD_POST, body: {}},
    //获取可用资金 /mobile-users/user-account-info
    MOENY_USER_ACCOUNT: {url: `/mobile-users/user-account-info`, method: METHOD_POST, body: {}},
    //获取投注列表
    GET_BET_WIN: {url: `/mobile-projects/get-win-bet`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //2017-02-22  15:47:00 投注记录
    BET_RECODE: {
        url: `/mobile-projects`,
        method: METHOD_POST,
        body: {
            bought_at_from: "",
            bought_at_to: "",
            issue: "",
            serial_number: "",
            lottery_id: "",
            way_id: "",
            username: "",
            user_id: "",
            page: 1,
            pagesize: 20
        }
    },
    BET_DETAIL: {url: "", formatUrl: `/mobile-projects/#id/view`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //追号记录
    CHASE_RECODE: {
        url: `/mobile-traces`,
        method: METHOD_POST,
        body: {
            bought_at_from: "",
            bought_at_to: "",
            issue: "",
            serial_number: "",
            lottery_id: "",
            way_id: "",
            username: "",
            user_id: "",
            page: 1,
            pagesize: 20
        }
    },
    //追号详情
    CHASE_DETAIL: {url: "", formatUrl: `/mobile-traces/#id/view`, method: METHOD_POST, body: {}},
    //获取站内信列表
    LETTER_LIST: {url: `/mobile-station-letters`, method: METHOD_POST, body: {}},
    LETTER_DETAIL: {url: "", formatUrl: `/mobile-station-letters/#id/view`, method: METHOD_POST, body: {}},
    //获取系统公告
    GET_LIST_SYSTEM: {url: `/mobile-announcements`, method: METHOD_POST, body: {}},
    GET_SYSTEM_DETAIL: {url: "", formatUrl: `/mobile-announcements/#id/view`, method: METHOD_POST, body: {}},
    //资金全部明细
    LIST_REANSACTON: {url: `/mobile-transactions/index`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //充值明细
    LIST_ADD_MONEY: {url: `/mobile-transactions/my-deposit`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //提现帐变
    LIST_DRAW: {url: `/mobile-transactions/my-withdraw`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //派奖明细
    LIST_AWARD_MONEY: {url: `/mobile-transactions/send-prize`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    //转账明细
    LIST_TRANSLATE_MONEY: {url: `/mobile-transactions/my-transfer`, method: METHOD_POST, body: {page: 1, pagesize: 20}},
    // 修改登陆密码
    PWD_LOGIN: {
        url: `/mobile-users/password-management/0`,
        method: METHOD_POST,
        body: {old_password: "", password: "", password_confirmation: ""}
    },
    // 修改资金密码
    PWD_FUND: {
        url: `/mobile-users/password-management/1`,
        method: METHOD_POST,
        body: {old_fund_password: "", fund_password: "", fund_password_confirmation: ""}
    },
    //设置资金密码
    PWD_CONFIG_FUND: {
        url: `/mobile-users/safe-reset-fund-password`,
        method: METHOD_POST,
        body: {fund_password: "", fund_password_confirmation: ""}
    },
    //mobile-bank-cards/银行卡列表
    LIST_BANGK_CARDS: {url: `/mobile-bank-cards`, method: METHOD_POST, body: {page: 1, pagesize: 15}},
    //删除bangkCard
    BANK_CARDS_DEL: {
        url: `/mobile-bank-cards/destroy`,
        method: METHOD_POST,
        body: {id: 1, account_name: "", account: "", fund_password: ""}
    },
    // step1验证旧银行卡信息:
    BANK_CARD_ADD_STEP_0: {
        url: `/mobile-bank-cards/0/bind-card`,
        method: METHOD_POST,
        body: {id: 1, account_name: "", account: "", fund_password: ""}
    },
    // step2获取增加银行的数据
    BANK_CARD_ADD_STEP_1: {url: `/mobile-bank-cards/1/bind-card`, method: METHOD_POST, body: {}},
    //step3提交确认银行卡信息
    BANK_CARD_ADD_STEP_2: {
        url: `/mobile-bank-cards/2/bind-card`,
        method: METHOD_POST,
        body: {
            bank_id: 1,
            branch: 0,
            province_id: 0,
            city_id: 0,
            account_name: "",
            account: "",
            account_confirmation: "",
            fund_password: ""
        }
    },
    //添加银行卡 step1验证旧银行卡信息:
    BANK_CARD_MODIFY_STEP_O: {
        url: "",
        formatUrl: `/mobile-bank-cards/0/#id/modify-card`,
        method: METHOD_POST,
        body: {id: 1, account_name: "", account: "", fund_password: ""}
    },
    //step2获取增加银行的数据
    BANK_CARD_MODIFY_STEP_1: {
        url: "",
        formatUrl: `/mobile-bank-cards/1/#id/modify-card`,
        method: METHOD_POST,
        body: {}
    },
    //step3提交确认银行卡信息
    BANK_CARD_MODIFY_STEP_2: {
        url: "",
        formatUrl: `/mobile-bank-cards/2/#id/modify-card`,
        method: METHOD_POST,
        body: {
            bank_id: 1,
            branch: 0,
            province_id: 0,
            city_id: 0,
            account_name: "",
            account: "",
            account_confirmation: "",
            fund_password: ""
        }
    },
    //   转账信息：POST:/mobile-transfers/index/{user_id?}
    TRANSFER_GETINFO: {url: "", formatUrl: `/mobile-transfers/index/#id`, method: METHOD_POST, body: {}},
    //转账提交 POST:/mobile-transfers/transfer-to-sub
    TRANSFER_SUB_MINT: {
        url: `/mobile-transfers/transfer-to-sub`,
        method: METHOD_POST,
        body: {card_number: "", card_id: "", fund_password: "", amount: 0, username: ""}
    },
    //提现
    MONEY_OUTER_0: {url: "/mobile-withdrawals/withdraw/0", method: METHOD_POST, body: {}},
    //提现
    MONEY_OUTER_1: {
        url: "/mobile-withdrawals/withdraw/1",
        method: METHOD_POST,
        body: {account: "", fund_password: "", amount: "", id: ""}
    },
    //-----------------------------------------------开奖通知-----------------------------------------
    //获取所有arard notice list
    notice_ALL_Lottery: {url: "/mobile-lotteries/all-lottery-numbers", method: METHOD_GET},
    //获取具体游戏开奖记录/mobile-lotteries/lottery-issue-number-list/{lottery_id}/{next_id}
    notice_Lottery_Hisotry: {url: "", formatUrl: `/mobile-lotteries/lottery-issue-number-list`, method: METHOD_GET},
    //-----------------------------------------------趋势图-----------------------------------------
    //趋势图数据  Get  /mobile-trends/trend-data?lottery_id=1&num_type=5
    TREND_DATA: {
        url: "",
        formatUrl: `/mobile-trends/trend-data?lottery_id={#lid}&num_type={#type}`,
        method: METHOD_GET
    },
};


global.HttpUtil = {
    flushMoneyBalance: () => {
        ActDispatch.FetchAct.fetchVoWithAction(HTTP_SERVER.MOENY_USER_ACCOUNT, ActionEnum.AppAct.MONEY_ACCOUNT__CHANGE,null,true);
    }
}



global.AppData = {
    userData: null,
    isLogined: false,
}


