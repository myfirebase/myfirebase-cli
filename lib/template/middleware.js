/**
 * <%= middleware %> middleware, you can get access
 * to myfirebase functionalities and vue auth guard via actions.
 * myfirebase => [auth, storage, store]
 * actions => [to, from, next()]
 * 
 * @param {object} myfirebase 
 * @param {object} actions 
 */

const <%= middleware %> = (myfirebase, actions) => {
    // you can get access to the database via myfirebase.store.
    // Example
    // var e = myfirebase.store.state.database.ref.child('/foo')
    // console.log(e)
    // actions.next()
}

export default <%= middleware %>;