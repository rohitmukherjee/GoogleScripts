function createAndSendDocument() {
  
  //script will find attachments in email from a particular sender and download them to google drive
  var sender = "aconf-help@hpair.org";
  var folderName = "HPAIR Attachments1";
  var threads = GmailApp.search(sender);
  Logger.log(threads.length);
 // Logger.log(threads[0].getMessages()[2].getRawContent());
  var folder = DocsList.createFolder(folderName);
  var fileListString = "";
  
  for (var x=0; x<threads.length; x++) {    
  var messages = threads[x].getMessages();
      
  Logger.log(messages[0]);
  for (var y=0; y<messages.length; y++) {      
   var att = messages[y].getAttachments();
    fileListString += att.toString() + '\n';
  
   for (var z=0; z<att.length; z++) {
    try {
     // Copy the Gmail attachment to Google Drive
     var file = folder.createFile(att[z]);
     // Wait for a minute to prevent timeout errors
     Utilities.sleep(1000);
    }
    catch (e) {
     GmailApp.sendEmail(
      Session.getActiveUser().getUserLoginId(), 
       "Error: " + messages[z].getSubject(), e.message);
    }
   
   }}
  
}
//Send Email to User with synced file list
   var emailAddress = Session.getActiveUser().getUserLoginId();

  // Send yourself an email with a link to the document
  //GmailApp.sendEmail(emailAddress,fileListString);

}