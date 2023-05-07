const mongoose =require('mongoose');
const mongoURI ="mongodb://localhost:27017/diginotebook?tls=false&directConnection=true";


const connectToMongo = async () =>{
    await mongoose.connect(mongoURI).then(() => {
        console.log('MongoDB connected successfully');
    }).catch(err => console.log(err));
}


module.exports=connectToMongo;