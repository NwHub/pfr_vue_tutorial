import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    // -------Firebaseのページからconfigの部分だけコピーする-------
    const config = {
        apiKey: "AIzaSyBNZawCz9MbccrX69llTHOC8t_VltoYJkE",
        authDomain: "prf-vue-test.firebaseapp.com",
        databaseURL: "https://prf-vue-test.firebaseio.com",
        projectId: "prf-vue-test",
        storageBucket: "prf-vue-test.appspot.com",
        messagingSenderId: "658486209538",
        appId: "1:658486209538:web:9f71f591c5dc1e45"
    }
    // -----------------
    firebase.initializeApp(config)
    firebase.firestore().settings({timestampsInSnapshots: true})
}
const fireDb = firebase.firestore()
export {fireDb}
