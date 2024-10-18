var admin = require("firebase-admin");

var serviceAccount = require("./dussan-d3e25-firebase-adminsdk-hbex6-bbe22f8bd0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fcmNotify = async (notificationData, regToken) => {
    //notificationData is an object with 2 parameters title and content
    if (regToken) {
        let payload, options;
        payload = {
            data: notificationData,
        };
        options = {
            priority: "high",
            timeToLive: 60 * 60 * 24,
        };
        const val = await admin.messaging().sendToDevice(regToken, payload, options);
        console.log(val);
        return val;
    }
    return 0;
};
const fcmMulticastNotify = async (notificationObj) => {
    console.log(notificationObj);
    //notificationData is an object with 2 parameters title and content
    if (notificationObj) {
        if (notificationObj.tokens.length) {
            notificationObj.android = { priority: "high" };

            const val = await admin.messaging().sendMulticast(notificationObj);
            console.log(val);
            return val;
        }
    }
    return 0;
};

module.exports = { fcmNotify, fcmMulticastNotify };
