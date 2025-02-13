import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection('users').doc(user.uid).set({
      uid: user.uid,
      displayName: '',
      email: user.email,
      lowercaseDisplayName: '',
    })
  })
