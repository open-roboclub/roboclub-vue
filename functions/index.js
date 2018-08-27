const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const newsKey = 'news';
const debugNewsKey = 'debug/news';

function notification(event, context, key) {
    const message = event.after.val();
    if (!message) {
        console.log('Notification Deleted. Exiting');
        return false;
    }

    console.log('Send Notification?', context.params.pushId, message.notification);

    const payload = {
        notification: {
            title: message.title || 'Notification',
            body: message.notice
        }
    };

    if (!message.sent) {
        if (message.notification === 'yes') {
            return admin.messaging().sendToTopic(key, payload)
                .then(() => event.after.ref.update({
                        sent: new Date().toISOString()
                    }));
        } else if (message.notification === 'only') {
            return admin.messaging().sendToTopic(key, payload)
                .then(() => event.after.ref.remove());
        }
    } else if (message.notification === 'only') {
        return event.after.ref.remove();
    }

    return true;
}

const getNotificationTrigger = key => functions.database.ref('/' + key + '/{pushId}')
    .onWrite((event, context) => notification(event, context, key));

exports.sendNotification = getNotificationTrigger(newsKey);

exports.sendDebugNotification = getNotificationTrigger(debugNewsKey);

exports.testDebug = functions.database.ref('/debug/test/{pushId}').onWrite((snapshot, context) => {
    const message = snapshot.after.val();
    if (!message) {
        console.log('Debug Deleted. Exiting');
        return false;
    }

    console.log('Debug Message?', context.params.pushId, message.message);

    return true;
});

exports.hello = functions.https.onRequest((req, res) => {
    res.status(200).send('Hello, World');
});