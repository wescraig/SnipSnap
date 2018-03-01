@import 'MochaJSDelegate.js';
@import 'viewSettings.js';

var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.artboardsequence")
var userDefaultsDict = userDefaults.dictionaryRepresentation()

function renameArtboards(prefix, mainName, sequenceStart, sequenceTotalBool, suffix, selection, total, count, sequenceEnd){

	var nameStart = prefix + " " + mainName + " "

	for(var i = 0; i < count; i++){

		if(sequenceTotalBool == 1){
			selection[i].name = nameStart + (parseInt(sequenceStart) + i) + "/" + total + " " + suffix
		}else{
			selection[i].name = nameStart + (parseInt(sequenceStart) + i) + "/" + sequenceEnd + " " + suffix
		}
	}



}

function noArtboardsSelected(){
	var alert = NSAlert.alloc().init()	
	alert.setMessageText("No Artboards Selected")
	alert.setInformativeText("Please select artboards to rename!")
	alert.addButtonWithTitle("Okay!")
	alert.addButtonWithTitle("Close")
	var view = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,100))

	[alert runModal]

}

function showWindow(){

	var alert = NSAlert.alloc().init()

	

	// // Set Up (Title, Message, Buttons) //
	// alert.setMessageText("Rename Selection")
	// alert.setInformativeText("Use the fields below to standardize the names of your selection. ")
	// alert.addButtonWithTitle("Rename")	
	// alert.addButtonWithTitle("Cancel")
	// alert.addButtonWithTitle("Rename and Save Values")

	// // View Height and Width and Init //
	// var viewWidth = 300
	// var viewHeight = 230
	// var view = NSView.alloc().initWithFrame(NSMakeRect(0,0,viewWidth,viewHeight))
	// var marginOffsetAnchor = 18
	
	// // Text Field Labels Setup //
	// var labels = [];

	// var prefixLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - marginOffsetAnchor, 130, 20))
	// 	prefixLabel.setStringValue("Prefix: ")

	// var nameLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 48), 130, 20))
	// 	nameLabel.setStringValue("New Name: ")
	
	// var sequenceLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + (48 * 2)), 130, 20))
	// 	sequenceLabel.setStringValue("Start Sequence:")	

	// var sequenceEndLabel = NSTextField.alloc().initWithFrame(NSMakeRect(160, viewHeight - (marginOffsetAnchor + (48 * 2)), 130, 20))
	// 	sequenceEndLabel.setStringValue("End Sequence: ")	


	// var suffixLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + (48 * 3.7)), 130, 20))
	// 	suffixLabel.setStringValue("Suffix: ")


	// labels.push(prefixLabel, nameLabel, sequenceLabel, suffixLabel, sequenceEndLabel)
	
	// labels = adjustLabelSettings(labels);

	// // Text Field Setup //

	// var fields = [];

	// var prefixField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24), 280, 20))
	// 	// prefixField.setStringValue("[VD]")
	// 	prefixField.setStringValue(userDefaultsDict["prefix"] !=  null? userDefaultsDict["prefix"] : "")


	// var nameField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + 48), 280, 20))
	// 	nameField.setStringValue(userDefaultsDict["newName"] !=  null? userDefaultsDict["newName"] : "")

	// var sequenceField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + (48 * 2)), 120, 20)) // needs to be a counter
	// 	sequenceField.setStringValue(userDefaultsDict["sequenceStart"] !=  null? userDefaultsDict["sequenceStart"] : "1")
		
	// var sequenceEndField = NSTextField.alloc().initWithFrame(NSMakeRect(160, viewHeight - (marginOffsetAnchor + 24 + (48 * 2)), 120, 20))
	// 	sequenceEndField.setStringValue(userDefaultsDict["seqEnd"] !=  null? userDefaultsDict["seqEnd"] : "")

	// var sequenceCheckBx = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + (48 * 2.6)), viewWidth, 20))
	// 	sequenceCheckBx.setButtonType(NSSwitchButton)
	// 	sequenceCheckBx.setBezelStyle(0)
	// 	sequenceCheckBx.setTitle("Show with total count (i.e. x/10)")
	// 	sequenceCheckBx.setState(NSOnState)


	// var sequenceCheckBxCallback = function(sender){
	// 	if(sender.state() == NSOnState){
	// 		sequenceEndLabel.setTextColor(NSColor.disabledControlTextColor())
	// 		sequenceEndField.setTextColor(NSColor.disabledControlTextColor())
	// 		sequenceEndField.setEditable(false)
	// 		alert.window().makeFirstResponder(nil)
	// 	} else{
	// 		sequenceEndLabel.setTextColor(NSColor.controlTextColor())
	// 		sequenceEndField.setTextColor(NSColor.controlTextColor())
	// 		sequenceEndField.setEditable(true)
	// 	}

	// }

	// 	sequenceCheckBx.setCOSJSTargetFunction(sequenceCheckBxCallback)
	// 	sequenceCheckBxCallback(sequenceCheckBx)

	// //////////////////////////////	
	// /////// For Public Use ///////
	// //////////////////////////////


	// var suffixField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + (48 * 3.75)), 280, 20))	
	// 	suffixField.setStringValue(userDefaultsDict["suffix"] !=  null? userDefaultsDict["suffix"] : "(desktop)")



	// //////////////////////////////

	// //////////////////////////////	
	// /// FOR MI BRIDGES ISD TEAM //
	// //////////////////////////////


	// // var suffixField = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + (48 * 3.75)), 280, 20))	
	// // 	[suffixField addItemWithTitle:"(desktop)"]
	// // 	[suffixField addItemWithTitle:"(mobile)"]
	// // 	[suffixField addItemWithTitle:""]



	// //////////////////////////////
	// //////////////////////////////
	// //////////////////////////////


	// // Suffix as text field //
	// // var suffixField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24 + (48 * 3.6)), 280, 20))
	// // 	suffixField.setStringValue("(Desktop)")
	
	// fields.push(prefixField, nameField, sequenceField, suffixField, sequenceEndField)

	// // Add textfields and labels to the view //
	// view = viewSetup(view, fields, labels);


	// view.addSubview(sequenceCheckBx)


	// // Add view to the alert //
	// alert.setAccessoryView(view)

	// // var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.artboardsequence")
	// // [userDefaults setObject:prefixField.stringValue() forKey:"prefix"]
	// // userDefaults.synchronize()	


	// if(alert.runModal() != 1001){
	// 	setValuesToMemory(prefixField, nameField, sequenceField, sequenceCheckBx, suffixField, sequenceEndField)
	// }else{ 	
	// 	return
	// }



}

function clearMemory(){
	userDefaultsDict["prefix"] = ""
	userDefaultsDict["newName"] = ""
	userDefaultsDict["sequenceStart"] ="1"
	userDefaultsDict["suffix"] = ""
	userDefaultsDict["seqEnd"] = ""
}


function setValuesToMemory(prefix, mainName, sequenceStart, sequenceTotalBool, suffix, sequenceEnd){

	// var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.artboardsequence")

	[userDefaults setObject:prefix.stringValue() forKey:"prefix"]
	[userDefaults setObject:mainName.stringValue() forKey:"newName"]
	[userDefaults setObject:sequenceStart.stringValue() forKey:"sequenceStart"]
	[userDefaults setObject:sequenceTotalBool.stringValue() forKey:"sequenceTotalBool"]
	[userDefaults setObject:suffix.stringValue() forKey:"suffix"]
	// [userDefaults setObject:suffix.titleOfSelectedItem() forKey:"suffix"]
	[userDefaults setObject:sequenceEnd.stringValue() forKey:"seqEnd"]

	userDefaults.synchronize()

}