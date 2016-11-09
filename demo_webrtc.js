/**
 * Created by Jozo on 16/9/22.
 */
/*
 * Check out the full guide at
 *   http://sipjs.com/guides/make-call/
 *
 * This sample uses
 *   http://sipjs.com/download/sip-0.7.0.min.js
 *
 * Login with your developer account to receive calls at
 *   http://sipjs.com/demo-phone
 */

document.write("<script src='SDK_JZWebSip.js'></script>");
var session;


var arr_domain = ['域名'];
var arr_wss = ['wss'];

var arr_username = ['用户名'];
var arr_password = ['密码'];
var arr_displayName = ['昵称'];



function fillDomain(){
    var objS = document.getElementById("select_domain");
    var index = objS.selectedIndex - 1;

    //UDomain.domain = arr_domain[index];
    //UDomain.wsServer = arr_ws[index];
    //UDomain.wssServer = arr_wss[index];

    $('#domain_init').val(arr_domain[index]);
    //$('#ws_init').val(arr_ws[index]);
    $('#wss_init').val(arr_wss[index]);

}


function fillLoginUser(){
    var objS = document.getElementById("select_login_user");
    var index = objS.selectedIndex - 1;
    $('#username_login').val(arr_username[index]);
    $('#password_login').val(arr_password[index]);
    $('#displayName_login').val(arr_displayName[index]);
}

function fillCalled(){
    var objS = document.getElementById("select_called");
    var index = objS.selectedIndex - 1;
    $('#username_called').val(arr_username[index]);

}


function settingAction() {

    var domain = $('#domain_init').val();
    var wsServer = $('#ws_init').val();
    var wssServer = $('#wss_init').val();

    UDomain.domain = domain;
    //UDomain.wsServer = wsServer;
    UDomain.wssServer = wssServer;

    //printLog('修改配置\ndomain:'  + domain + '\nwsServer:' + wsServer + '\nwssServer:' + wssServer);
    printLog('修改配置\ndomain:'  + domain + '\nwssServer:' + wssServer);
    UCSConnect.init();
}

function loginAction() {

    //UCSConnect.init();
    USIP.options = {
        media: {
            constraints: {
                video: false,
                audio: true
            },
            render: {
                remote: document.getElementById('remoteAudio'),
                local: document.getElementById('localAudio')
            }
        }
    };


    var username = $('#username_login').val();
    var password = $('#password_login').val();
    var displayName = $('#displayName_login').val();

    UCSConnect.login(username, password, displayName);

}

function logoutAction() {
    UCSConnect.logout();
}


function startAction() {

    var called = $('#username_called').val();
    UCSCall.SendOutCall(called);
}


function answerAction() {
    UCSCall.AnswerCall();
}


function rejectAction() {
    UCSCall.CallReject();
}

function cancelAction() {
    UCSCall.cancel();
}


function endAction() {
    UCSCall.CallGiveup();
}

function cleanAction() {
    $('#text_log').val('');
}


// 回调函数
// 登录回调
function OnLoginRet(message, ret) {
    //alert(message + '\n' + ret);
    printLog('登陆回调\n'  + message + '\nret:' + ret);
}

// 登出回调
function OnLogoutRet(message, ret) {
    //alert(message + '\n' + ret);
    printLog('登出回调\n'  + message + '\nret:' + ret);
}


// 来电
function OnIncomingCall(callID, caller, message) {
    //alert( caller + '\n' + data);
    printLog('收到来电\n'  + message);
}

function OnOutCallStatus(callID, ret, callType, peerNumber) {
    //alert('OnOutCallStatus\n' + callId + '\n' + ret + '\n' + callType + '\n' + peerNumber);
    //printLog("通话状态回调(解析后)\n" + 'callID:' + callID + '\ncallType:' + callType + '\npeerNumber:' + peerNumber + '\nret:' + ret);
}


function OnOutCallStatusMSG(message, ret) {

    // 打印msg
    console.log("----------------\n\n通话状态变更\n" + message + "\n\n----------------");

    var str_ret;
    if (ret === 1) {
        str_ret = '拨号中';
    } else if (ret === 2) {
        str_ret = '被叫接听';
    } else if (ret === 3) {
        str_ret = '被叫拒接';
    } else if (ret === 4) {
        str_ret = '通话挂断';
    } else if (ret === 5) {
        str_ret = '主叫取消';
    } else if (ret === 6) {
        str_ret = '通话结束';
    } else if (ret === 7) {
        str_ret = '异常操作';
    }

    printLog(str_ret + "\n" + message + '\nret:' + ret);
    //alert('OnOutCallStatus\n' + callId + '\n' + ret + '\n' + callType + '\n' + peerNumber);
}

// 通话结束回调
function OnCallGiveup(message, cause) {

    var str_ret = '通话已结束';
    printLog(str_ret + "\n" + message + '\ncause:' + cause);
}

// 异常回调
function onExcepting(message, cause) {

    var str_ret = '异常事件';
    //printLog(str_ret + "\n" + message + '\ncause:' + cause);
}

// 打印信息到页面
function printLog(str) {
    var val_tmp = '\n\n----------------' + '\n\n*********************************************************************************************\n\n';
    var val_old = $('#text_log').val();
    var val_new = '----------------\n\n' + str + val_tmp + val_old;
    $('#text_log').val(val_new);
}








