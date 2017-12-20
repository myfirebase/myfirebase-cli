/**
 * <%= middleware %> middleware, you can get access
 * to myfirebase functionalities and vue auth guard via actions.
 * myfirebase => [auth, storage, database, firestore]
 * actions => [to, from, next()]
 * 
 * @param {object} myfirebase 
 * @param {object} actions 
 */

const <%= middleware %> = (myfirebase, actions) => {
    // you can get access to the realtime database via myfirebase.store.
    // Example
    // var e = myfirebase.database.get().child('/foo')
    // console.log(e)
    // actions.next()
}

export default <%= middleware %>;