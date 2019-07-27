const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const newsKey = 'news'
const debugNewsKey = 'debug/news'

function notification(event, context, key) {
  const message = event.after.val()
  if (!message) {
    console.log('Notification Deleted. Exiting')
    return false
  }

  console.log('Send Notification?', context.params.pushId, message.notification)

  const payload = {
    notification: {
      title: message.title || 'Notification',
      body: message.notice
    }
  }

  const topic = key.replace('/', '-')

  if (!message.sent) {
    if (message.notification === 'yes' || message.notification === 'only') {
      return admin
        .messaging()
        .sendToTopic(topic, payload)
        .then(() => {
          if (message.notification === 'yes') {
            return event.after.ref.update({
              sent: new Date().toISOString()
            })
          } else {
            return event.after.ref.remove()
          }
        })
    }
  } else if (message.notification === 'only') {
    return event.after.ref.remove()
  }

  return true
}

const getNotificationTrigger = key =>
  functions.database
    .ref('/' + key + '/{pushId}')
    .onWrite((event, context) => notification(event, context, key))

exports.sendNotification = getNotificationTrigger(newsKey)

exports.sendDebugNotification = getNotificationTrigger(debugNewsKey)

exports.saveAuthenticatedUser = functions.auth.user().onCreate(user => {
  const userEntry = {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    name: user.displayName,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    originalPhotoURL: user.photoURL,
    avatars: [
      {
        photoURL: user.photoURL,
        timestamp: new Date().getTime()
      }
    ],
    disabled: user.disabled,
    metadata: user.metadata,
    providerData: user.providerData.map(userInfo => ({
      uid: userInfo.uid,
      displayName: userInfo.displayName || null,
      email: userInfo.email || null,
      phoneNumber: userInfo.phoneNumber || null,
      photoURL: userInfo.photoURL || null,
      providerId: userInfo.providerId || 'null'
    }))
  }

  return admin
    .database()
    .ref('users/' + user.uid)
    .set(userEntry)
})

exports.setClaims = functions.https.onCall(async (data, context) => {
  if (context.auth.token) {
    const isAdmin = (await admin
      .database()
      .ref('admins/')
      .child(context.auth.uid)
      .once('value')).val()

    if (isAdmin === true) {
      await admin.auth().setCustomUserClaims(context.auth.token.sub, {
        admin: true
      })
    } else {
      return {
        success: false,
        message: 'Not an admin'
      }
    }
  }

  return { success: true }
})
