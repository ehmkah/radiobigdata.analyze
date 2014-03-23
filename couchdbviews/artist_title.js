{
    "_id":"_design/artist_title",
    "_rev":"1-b414c05d52660b7cb9844898ed024970",
    "language":"javascript",
    "views":
    {
        "artist_title" :
        {
            "map" : "function(doc) {" +
                "\n  emit(doc.artist+doc.title, doc.plays);" +
             "\n}"
        }
    }
}