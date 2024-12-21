const mongoose = require( "mongoose");


// const uri  = "mongodb://127.0.0.1:27017/mernstack";

const URI = process.env.URI;
// const URI = "mongodb+srv://darshilpatel1413:dp%40140103@cluster0.o5jqi.mongodb.net/mernstack?retryWrites=true&w=majority&appName=Cluster0";




const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection succeful");
        
    } catch (error) {
        console.error("db connection failed");
        console.error(error);
        
        process.exit(0);
    }
};

module.exports = connectDb;


// mongoose.connect(uri);



// const main = async () => {
// try {
    
     

// } catch (error) {
//     console.log(error);
// }finally{
//     mongoose.connection.close();
// }
// };


// main();