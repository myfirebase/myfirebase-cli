import { DatabaseModel } from 'myfirebase'

// if you want to use cloud firestore
// import { FirestoreModel } from 'myfirebase' 

class <%= model %> extends DatabaseModel {
    constructor(ref) {
        super(ref)
    }

    required() {
        return []
    }
}
