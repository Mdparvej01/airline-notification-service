const express = require('express');
require('dotenv').config();   





//...................................
const amqplib  = require('amqplib')


const {EmailService} = require('./services')








//................................

async function connectQueue(){





    console.log("inside connect queue");
    try {

       
        const connection = await amqplib.connect("amqp://localhost");
        // console.log("inside TRY connect queue");
        const channel = await connection.createChannel();
        // console.log("inside TRY connect queue");
          await channel.assertQueue("noti-queue8"); // checks q is present or not ....

        
        channel.consume("noti-queue8" , (data) => {
            console.log(".......");
             console.log(`${Buffer.from(data.content)}`);

             EmailService.sendMail("vahidweb54@gmail.com" , "storagempis@gmail.com" , "Thi is content : (" , "This is content 2");
             
        })



    

        console.log("cahnnel");

         
        
    } catch(error) {

       console.log("error -> ",error);
    }
}








//.....................................

const mailsender = require('./config/email-config');
const serverConfig = require('./config/server-config');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);


    await  connectQueue();
    console.log("queue is up");

    // try {

    //     const response = await mailsender.sendMail({
    //         form:serverConfig.MAIL_EMAIL,
    //         to:'storagempis@gmail.com',
    //         subject:'Is the service working',
    //         text:'Yes it is working',
    //     })
    
    //     console.log("mailRespo -> " , response);



    // } catch(error) {

    //     console.log("mailError-> " , error);


    // }


  
});
        