import * as mongoose from "mongoose";

(async function() {

    mongoose.connect(String(process.env.MONGO_URI))
        .then(() => {
            mongoose.set("debug", true);
            console.log(`Mongo Connection Successfull!`);
        })
        .catch(error => console.log(`-------Mongo error ${error}-------`))
        .finally(()  => console.log(`Mongo connection initiation complete!`));
})();