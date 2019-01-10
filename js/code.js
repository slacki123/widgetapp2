var SDK = lpTag.agentSDK || {};
$(function() {
    SDK.init({
        notificationCallback: getLogFunction('INFO', 'Notification received!'),
        visitorFocusedCallback: getLogFunction('INFO', 'Visitor Focused received!'),
        visitorBlurredCallback: getLogFunction('INFO', 'Visitor Blurred received!')
    });
});

function getLogFunction(type, message){
    return function(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data, null, 2);
        }
        logger(type, message + ' The ' + type + ' data: ' + data);
    }
}

function getUserId() {
    var getId = visitorInfo.visitorId;
    function renderText(getIdResult) {
        $(".userId").html(JSON.stringify(getIdResult));
        getLogFunction('INFO', 'Get success!')(getIdResult);
    }
    SDK.get(getId, renderText, getLogFunction('ERROR', 'Error in get!'));
}

function writeCommand() {
    var commandVal = $(".commandInput").val();
    SDK.command('Write ChatLine',{text:commandVal}, createCallback('Write'));
}

//the below selects the element with class "getInput" and takes its 'value'
function get() {
    var getKey = $(".getInput").val();
    SDK.get(getKey, getSuccess, getLogFunction('ERROR', 'Error in get!'));
}
function bind() {
    var bindKey = $(".bindInput").val();
    SDK.bind(bindKey, bindSuccess, createCallback('Bind'));
}
function unbind() {
    clearLogger();
    var bindKey = $(".bindInput").val();
    SDK.unbind(bindKey, bindSuccess, createCallback('Unbind'));
}

function createCallback(name) {
    return function(error) {
        if (error) {
            getLogFunction('ERROR', 'Error in ' + name + '!')(error);
        } else {
            getLogFunction('INFO', name + ' success!')();
        }
    }
}

function getSuccess(data){
    //the below selects an element and adds text by using the .html command
    $(".getResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Get success!')(data);
}
function bindSuccess(data){
    $(".bindResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Bind success!')(data);
}

function logger(type, text){
    if (typeof text === 'object') {
        text = JSON.stringify(text, null, 2);
    }
    var area = $(".logBox textarea");
    area.val(new Date().toTimeString() + ":  " + type + " - " + text + '\n' + area.val());
}