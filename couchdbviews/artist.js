 // artist
 // query: http://localhost:5984/ostseewelle/_design/artist/_view/artist?group=true
function map(doc) {
    emit(doc.artist, null);
}

function reduce(key,values,rereduce) {
    if(rereduce) {
        return _count(values);
    } else {
        return key.length;
    }
}