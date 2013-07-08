function doGet(){
 //initializing app
 var app = UiApp.createApplication();
   var form = app.createFormPanel();
   var flow = app.createFlowPanel();
   flow.add(app.createTextBox().setName("textBox"));
   flow.add(app.createTextBox().setName("textBox2"));
   flow.add(app.createSubmitButton("Submit"));
   form.add(flow);
   app.add(form);
   return app;


}


function doPost(eventInfo) { 
   var app = UiApp.getActiveApplication();
  //script will find attachments in email from a particular sender and download them to google drive
  var emailHeader = "The following files were synced with GoogleDrive:";
  var sender = eventInfo.parameter.textBox;
  var folderName = eventInfo.parameter.textBox2;
  
  //var sender = "emmeline.vandermeij@baml.com";
  //var folderName = "Bank of America Merrill Lynch Documents";
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
  cleanUpDrive();
  return app;

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