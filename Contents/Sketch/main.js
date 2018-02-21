@import 'ui.js'

var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.snipsnap");
var userDefaultsDict = userDefaults.dictionaryRepresentation();

var snip = function(context){

	var sketch = context.api()
	var selection = sketch.selectedDocument.selectedLayers

	var artboardHeight, toY, lastLayerDeltaY, layerBottomY, testDict

	for(var i = 0; i < selection.length; i++){
		
		if(context.selection[0].isKindOfClass(MSArtboardGroup)){
			
			testDict = layerDictionary(selection)
			if(Object.keys(testDict).length == 0){
				context.document.showMessage("SnipSnap cannot set footer padding with an empty artboard! Please add layers or select a different artboard.")	
				return
			}

			artboardHeight = context.selection[i].frame().height()
			toY = prepSnipValues(layerDictionary(selection))
			context.selection[i].frame().height = toY		
			context.document.showMessage("Snip! Artboard bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")	
		
		}else{
			testDict = layerDictionaryNotArtBoard(context.selection[i])
			if(Object.keys(testDict).length == 0){
				context.document.showMessage("SnipSnap cannot set footer padding with an empty layer! Please add layers or select a different layer.")	
				return
			}

			artboardHeight = context.selection[i].frame().height()
			toY = prepSnipValues(layerDictionaryNotArtBoard(context.selection[i]))
			layerBottomY = context.selection[i].frame().height() + context.selection[i].frame().y()
			lastLayerDeltaY = layerBottomY - toY
			context.selection[i].frame().height = artboardHeight - lastLayerDeltaY

			context.document.showMessage("Snip! Layer bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")
		
		}
		
	}

};


var snap = function(context){


	for(var i = 0; i < context.selection.length; i++){

		var artboardHeight = context.selection[i].frame().height()

		var increaseY = parseInt(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : 100)

		context.selection[i].frame().height = artboardHeight + increaseY
	}

	context.document.showMessage("Snap! Added " + increaseY + " pixels.")


};


var layerDictionaryNotArtBoard = function(selection){

	var layerDict = {}
	var parentArtArray = selection.parentArtboard().layers()
	var layerTopY, layerBottomY, selTopY, selBottomY


	for(var i = 0; i < parentArtArray.length; i++){

		// log(parentArtArray[i])

		layerTopY = parentArtArray[i].frame().y()
		layerBottomY = parentArtArray[i].frame().y() + parentArtArray[i].frame().height()
		selTopY = selection.frame().y()
		selBottomY = selection.frame().y() + selection.frame().height()

		log("Layer Top Y: "  + layerTopY + " Layer Bottom Y: " + layerBottomY)
		log("Selection  Top Y: " + selTopY + " Selection Bottom Y: " + selBottomY)
		log((layerTopY > selTopY) && (layerBottomY < selBottomY))

		if((layerTopY > selTopY) && (layerBottomY < selBottomY)){
			layerDict[layerBottomY] = parentArtArray[i].frame().height()
		}


	}

	return layerDict

};

var layerDictionary = function(selection){

	var layerDict = {}

	selection.iterate(function(layer){
		
		log(layer)

		layer.iterate(function(inner){


			if(inner.sketchObject.className() == "MSSymbolInstance"){
				layerDict[inner.sketchObject.frame().y() + inner.sketchObject.frame().height()] = inner.sketchObject.frame().height()
			}else{
				layerDict[inner.frame.y] = inner.frame.height
			}
		})
	})

	return layerDict

};

var prepSnipValues = function(dict){

	var keys = Object.keys(dict)

	var maxY = Math.max(...keys)

	// var maxHeight = dict[maxY]

	// var newY = maxY + maxHeight	

	var padding = userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : 32

	var newYwithPadding = maxY + parseInt(padding)

	return newYwithPadding

};



var adjustLabelSettings = function(labels){

	for(i = 0; i < labels.length; i++){
		labels[i].setEditable(false)
		labels[i].setSelectable(false)
		labels[i].setDrawsBackground(false)
		labels[i].setBezeled(false)
	}

	return labels

}

var viewSetup = function(view, fields, labels){

	for (i=0; i < labels.length; i++){
		view.addSubview(labels[i])
	}
	
	for (i=0; i < fields.length; i++){
		view.addSubview(fields[i])
	}

	return view
}

var showSettings = function(context) {

	//log("SOMETHING IS HAPPENING")

    var alert = NSAlert.alloc().init()

    // Set Up (Title, Message, Buttons) //
    alert.setMessageText("Snip Snap Settings")
    alert.setInformativeText("Adjust the settings below to set the default Snip and Snap settings.")
    alert.addButtonWithTitle("Save")
    alert.addButtonWithTitle("Cancel")

    // View Height and Width and Init //
    var viewWidth = 308
    var viewHeight = 200
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight))
    var marginOffsetAnchor = 18

    // Text Field Labels Setup //
    var labels = []


    var snapDefaultLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - marginOffsetAnchor, 100, 20))
    snapDefaultLabel.setStringValue("Snap Pixels")

    var snipDefaultLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 96), 100, 20))
    snipDefaultLabel.setStringValue("Snip Pixels")

    var snapDescriptionLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 128), 300, 100))
    snapDescriptionLabel.setStringValue("This will the number of pixels added to the bottom of the selection.")

    var snipDescriptionLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 224), 300, 100))
    snipDescriptionLabel.setStringValue("This will be the number of pixels remaining at the bottom of your selection. The rest will be Snipped.")

    //snapDefaultLabel, snipDefaultLabel, 

    labels.push(snapDefaultLabel, snapDescriptionLabel, snipDefaultLabel, snipDescriptionLabel)

    labels = adjustLabelSettings(labels);

    // Text Field Setup //

    var fields = []

    var snapField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24), 100, 20))
    snapField.setStringValue(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : "100")
    // prefixField.setStringValue(userDefaultsDict["prefix"] !=  null? userDefaultsDict["prefix"] : "")


    var snipField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 120), 100, 20))
    snipField.setStringValue(userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32")


    fields.push(snapField, snipField)


    // Add textfields and labels to the view //
    view = viewSetup(view, fields, labels);


    // Add view to the alert //
    alert.setAccessoryView(view)
    if (alert.runModal() == 1000){
    	setValuesToMemory(snipField,snapField)
    	context.document.showMessage("Updated SnipSnap Settings!")
    }else{
    	return
    }

    // var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.artboardsequence")
    // [userDefaults setObject:prefixField.stringValue() forKey:"prefix"]
    // userDefaults.synchronize()	


    // if(alert.runModal() != 1001){
    // 	setValuesToMemory(nameField, sequenceField, sequenceCheckBx, sequenceEndField, needSequence)
    // }else{ 	
    // 	return
    // }



}

function setValuesToMemory(snipDefault, snapDefault){
	
	// var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.artboardsequence")

	[userDefaults setObject:snipDefault.stringValue() forKey:"snip"]
	[userDefaults setObject:snapDefault.stringValue() forKey:"snap"]

	userDefaults.synchronize()

}

// Old Snip Function (no loop)//
// var snip = function(context){

// 	var sketch = context.api()
// 	var selection = sketch.selectedDocument.selectedLayers
	
// 	var artboardHeight = context.selection[0].frame().height()
// 	var toY = prepSnipValues(layerDictionary(selection))

// 	context.selection[0].frame().height = toY

// 	context.document.showMessage("Snip! Removed " + (artboardHeight - toY) + " pixels. " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels remaining.")


// };

// Snip Function Loop Working //
// var snip = function(context){

// 	var sketch = context.api()
// 	var selection = sketch.selectedDocument.selectedLayers


// 	for(var i = 0; i < selection.length; i++){
// 		var artboardHeight = context.selection[i].frame().height()

// 		var toY = prepSnipValues(layerDictionary(selection))

// 		context.selection[i].frame().height = toY
// 	}

// 	context.document.showMessage("Snip! Artboard bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")


// };


// Snip Loop Working //
// var snip = function(context){

// 	var sketch = context.api()
// 	var selection = sketch.selectedDocument.selectedLayers


// 	for(var i = 0; i < selection.length; i++){
// 		var artboardHeight = context.selection[i].frame().height()

// 		var toY = prepSnipValues(layerDictionary(selection))

// 		context.selection[i].frame().height = toY
// 	}

// 	context.document.showMessage("Snip! Artboard bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")


// };


	//log(context.selection[0].className())	// line and layers == MSShapeGroup //
	//log(context.selection[0].parentArtboard()) //finds parent artboard!! //
	//log(context.selection[0].isKindOfClass(MSArtboardGroup))

// Old Snap Function (no loop)
// var snap = function(context){

// 	var sketch = context.api()
// 	var selection = sketch.selectedDocument.selectedLayers

// 	var artboardHeight = context.selection[0].frame().height()

// 	var increaseY = parseInt(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : 100)

// 	context.selection[0].frame().height = artboardHeight + increaseY

// 	context.document.showMessage("Snap! Added " + increaseY + " pixels.")


// };