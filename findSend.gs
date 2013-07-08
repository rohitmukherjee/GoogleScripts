function syncAttachments() {
  
  //script will find attachments in email from a particular sender and download them to google drive
  var emailHeader = "The following files were synced with GoogleDrive:";
  var sender = "SENDER_EMAIL_ID_HERE";
  var folderName = "FOLDER_NAME_HERE";
  var threads = GmailApp.search(sender);
  var emailSubject = "Sync completed";
  
  var folder = DocsList.createFolder(folderName);
  var fileListString = "";
  
  for (var x=0; x<threads.length; x++) {    
  var messages = threads[x].getMessages();
      
  Logger.log(messages[0]);
  for (var y=0; y<messages.length; y++) {      
   var att = messages[y].getAttachments();
     
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
   Logger.log(fileListString);
  //Send yourself an email with a link to the document
  //GmailApp.sendEmail(emailAddress,emailSubject,emailHeader + '\n' + fileListString);

}
function cleanUpDrive() {
var folders = DocsList.getAllFolders()
  for(n=0;n<folders.length;++n){
    if(folders[n].getFiles().length==0 && folders[n].getFolders().length==0){
     folders[n].setTrashed(true)
     Logger.log(folders[n].getName())
     }
   }
}