const { App, LogLevel } = require('@slack/bolt');

function init(){
    return new App({
        token: "xoxb-1074284586432-1056103360293-S5fa7mKK8J37fbygyTk7CMBy",
        signingSecret: "db3b4b907035a3638451c1f89d00572e"
    })
}

exports.init = init;