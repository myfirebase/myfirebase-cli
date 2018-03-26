import { DatabaseModel } from 'myfirebase'

// if you want to use cloud firestore
// import { FirestoreModel } from 'myfirebase' 

class <%= model %> extends DatabaseModel {

    /**
     * Create new <%= model %> Instance.
     * 
     * @param {*} ref
     */    
    constructor(ref) {
        super(ref)
    }

    /**
     * Define required properties.
     * 
     * @return array
     */
    required() {
        return []
    }
}
