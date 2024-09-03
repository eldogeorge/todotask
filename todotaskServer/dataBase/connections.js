// s4 to create connections
// MS 5 till to 15 line
 const mongoose= require('mongoose')
        // asym.connect portName.URLName
 mongoose.connect(process.env.baseurl,{
    // parser issue, network remove connect error
    useNewUrlParser:true,
    //topology issue,
    useUnifiedTopology:true
 }).then(()=>{
    console.log('------MongoDB Atlas Connected------');

 }).catch((err)=>{
    console.log(`------MongoDB Connection Error------${err}`);
 })
//  goto index.js