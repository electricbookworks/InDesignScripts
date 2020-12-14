options = {
  labelNames:['letex:fileName', 'letex:altText', 'px:bildFileName', 'px:Foot2EndnoteHyperlink']
}

main();

function main(){
  // open file dialog and load a document
  if (app.layoutWindows.length == 0) {
    var file = File.openDialog ("Select a file", "InDesign:*.indd;*.indb;*.idml, InDesign Document:*.indd, InDesign Book:*.indb, InDesign Markup:*.idml", true)
    try {
      app.open(File(file));
    } catch (e) {
      alert(e);
      return;
    };
  }
  var doc = app.documents[0];
  // check if document is saved
  if ((!doc.saved || doc.modified)) {
    if ( confirm ("The document needs to be saved.", undefined, "Document not saved.")) {
      try {
        var userLevel = app.scriptPreferences.userInteractionLevel;
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
        doc = doc.save();
        app.scriptPreferences.userInteractionLevel = userLevel;
      } catch (e) {
        alert ("The document couldn't be saved.\n" + e);
        return;
      }
    }
    else {
      return;
    }
  }
  // show window
  try {
    deleteLabel(doc);
  } catch (e) {
    alert ("Error:\n" + e);
  }
}

function deleteLabel(doc){
  for (var i = 0; i < doc.links.length; i++) {
    var link = doc.links[i];
    var rectangle = link.parent.parent;
    for (j = 0; j < options.labelNames.length; ++j) {
      rectangle.insertLabel(options.labelNames[j], '');
    }
  }
  for (var i = 0; i < doc.groups.length; i++) {
    var group = doc.groups[i];
    for (j = 0; j < options.labelNames.length; ++j) {
      group.insertLabel(options.labelNames[j], '');
    }
  }
  alert('OK');
}
