const {TicketRepository} = require('../repositories')
const {MAILER} = require('../config')
const ticketRepo = new TicketRepository();



async function sendMail(mailFrom , mailTo , subject , text) {
  console.log("inside send mail-----");
  try {

    const response = await MAILER.sendMail({
        from:mailFrom,
        to:mailTo,
        subject:subject,
        text:text
    })

    return response;

  } catch(error) {
    
    console.log(error);


  }


}


async function createTicket(data) {
    try {
  
      const response = await ticketRepo.create(data);
      return response;
  
    } catch(error) {

      console.log(error);
  
      
    }
  
  
  }


  
async function getpendingEmails(data) {
    try {
  
     const response   = await ticketRepo.getpendingEmails();
     return response;
  
    } catch(error) {
        
     console.log(error);
     throw error;
  
      
    }
  
  
  }

module.exports= {
    sendMail,
    createTicket,
    getpendingEmails
}