@import 'ui.js'

var userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.wescraig.sketch.snipsnap");
var userDefaultsDict = userDefaults.dictionaryRepresentation();


var snip = function(context){

	var sketch = context.api()
	var selection = sketch.selectedDocument.selectedLayers

	var artboardHeight, toY, lastLayerDeltaY, layerBottomY, testDict

	if(context.selection.length == 0){
		nothingSelected()
		return 
	}

	for(var i = 0; i < selection.length; i++){
		
		if(context.selection[0].isKindOfClass(MSArtboardGroup)){
			
			testDict = layerDictionary(selection)

			// log("Selection length: " + selection.length) //2
			// log("Selection: " + JSON.stringify(selection))
			// log("Selection: " + selection["_page"]["_document"]["_application"]["_object"]["selection"]) //two artboards
			// Selection: _object,_page
			// log("Context.Selection: " + context.selection[i]) //first artboard
			// log("Context.Selection Layers: " + context.selection[i].layers()[0]) 
	// 			Context.Selection Layers: (
	//     "<MSRectangleShape: 0x7fcf1d428cb0> Rectangle (DDD9555D-755A-4420-93EC-A3C52B0D9859)",
	//     "<MSRectangleShape: 0x7fcf1d4f5f80> Rectangle (5FC2DA66-9433-4050-B105-DB1062CA95E1)"
	// )

			// log(context.selection[i].name() + " | Layer Dictionary: " + Object.keys(testDict)) //layerDict has all selected layers in artboards
			
			if(Object.keys(testDict).length == 0){
				context.document.showMessage("SnipSnap cannot set footer padding with an empty artboard! Please add layers or select a different artboard.")	
				return
			}


			
			var layers = context.selection[i].layers()
			var layer_arr = []


			for(var l = 0; l < layers.length; l++){
				var layer = layers[l]
				layer_arr.push(layer.frame().y() + layer.frame().height())
			}


			
			var largest_layer = Math.max(...layer_arr)

			
			var new_bottom_padding = userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32"
			

			// artboardHeight = context.selection[i].frame().height()
			// toY = prepSnipValues(layerDictionary(selection))
			// log(toY)
			context.selection[i].frame().height = largest_layer + parseInt(new_bottom_padding)
			context.document.showMessage("Snip! Artboard bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")	
		
		}else{

			// log("selection is not an artboard!!")
			// log("selection:" + context.selection[0])

			testDict = layerDictionaryNotArtBoard(context.selection[i])
			if(Object.keys(testDict).length == 0){
				context.document.showMessage("SnipSnap cannot set footer padding with an empty layer! Please add layers or select a different layer.")	
				return
			}

			artboardHeight = context.selection[i].frame().height()
			toY = prepSnipValues(layerDictionaryNotArtBoard(context.selection[i]))
			layerBottomY = context.selection[i].frame().height() + context.selection[i].frame().y()
			lastLayerDeltaY = layerBottomY - toY

			// log("context selection parent group index 0: " + context.selection[i].parentGroup())
			// log("context selection parent group index 0: " + context.selection[i].parentGroup().isKindOfClass(MSArtboardGroup))
			
			context.selection[i].frame().height = artboardHeight - lastLayerDeltaY

			//for future work on regrouping: 5/19/2019

			// if(!context.selection[i].parentGroup().isKindOfClass(MSArtboardGroup)){
			// 	// context.document.actionsController().actionForID("MSResizeGroupToFitAction").doPerformAction(nil);
			// 	// context.selection[i].parentGroup().adjustToFit()
				
			// 	// context.selection[i].parentGroup().resizeToFitChildrenWithOption(0)

			// 	// log("Group Height: " + context.selection[i].parentGroup().height())

			// 	// var parent_group_layers = context.selection[i].parentGroup().layers()
			// 	// context.selection[i].parentGroup().ungroup()
			// 	// MSLayerGroup.groupFromLayers(MSLayerArray.arrayWithLayers(parent_group_layers));

			// 	var selected_group = context.selection[i].parentGroup()
			// 	var selected_layers = selected_group.layers()
			// 	var selected_name = selected_group.name()

			// 	context.selection[i].parentGroup().ungroup()

			// 	context.document.actionsController().actionForID("MSGroupAction").doPerformAction(nil); 

			// 	// log("group: " + context.selection[i].parentGroup().name())

			// 	context.selection[i].parentGroup().name = selected_name
			// 	context.selection[i].parentGroup().layers = selected_layers


			// 	// new Group({
			// 	//     name: selected_group.name(),
			// 	//     layers: selected_group.layers(),
			// 	//   })


			// 	// var layers = context.selection[i].parentGroup().layers()
			// 	// log("layers: " + layers)
			// 	// context.selection[i].parentGroup().ungroup()

			// 	// context.selection = layers				
			// 	// context.document.actionsController().actionForID("MSGroupAction").doPerformAction(nil);

			// 	// selected_group.select()
			// 	// context.document.actionsController().actionForID("MSGroupAction").doPerformAction(nil);

			// 	// context.selection[i].parentGroup().ungroup()

			// 	// parent_of_selected.parentGroup().addLayer(group)
				
			// 	// context.document.actionsController().actionForID("MSGroupAction").doPerformAction(nil);
			// 	// context.document.actionsController().actionForID("MSGroupAction").doPerformAction(nil);
			// }

			context.document.showMessage("Snip! Layer bottom padding is now " + (userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : "32") + " pixels.")
		
		}
		
	}

};

// var calculateNewHeight = function(layers){
// 	var padding = userDefaultsDict["snip"] !=  null? userDefaultsDict["snip"] : 32
// 	var total_height = 0

// 	for(var i = 0; i < layers.length; i++){
// 		var layer = layers[i]
// 		var layer_height = layer.frame().y()



// 	}
// };


var snap = function(context){

	if(context.selection.length == 0){
		nothingSelected()
		return 
	}
	
	for(var i = 0; i < context.selection.length; i++){

		var artboardHeight = context.selection[i].frame().height()

		var increaseY = parseInt(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : 100)

		context.selection[i].frame().height = artboardHeight + increaseY
	}

	context.document.showMessage("Snap! Added " + increaseY + " pixels.")


};


var layerDictionaryNotArtBoard = function(selection){

	var layerDict = {}

	var parentArtArray = selection.parentGroup().layers()
	// log("parentGroup: " + selection.parentGroup())
	// log("parentGroup layers: " + selection.parentGroup().layers())


	var layerTopY, layerBottomY, selTopY, selBottomY


	for(var i = 0; i < parentArtArray.length; i++){

		// log(parentArtArray[i])

		layerTopY = parentArtArray[i].frame().y()
		layerBottomY = parentArtArray[i].frame().y() + parentArtArray[i].frame().height()
		selTopY = selection.frame().y()
		selBottomY = selection.frame().y() + selection.frame().height()

		// log("Layer Top Y: "  + layerTopY + " Layer Bottom Y: " + layerBottomY)
		// log("Selection  Top Y: " + selTopY + " Selection Bottom Y: " + selBottomY)
		// log((layerTopY > selTopY) && (layerBottomY < selBottomY))

		if((layerTopY > selTopY) && (layerBottomY < selBottomY)){
			layerDict[layerBottomY] = parentArtArray[i].frame().height()
		}


	}

	return layerDict

};

var layerDictionary = function(selection){

	var layerDict = {}

	selection.iterate(function(layer){

		layer.iterate(function(inner){

			
				// if(inner.sketchObject.className() == "MSSymbolInstance"){
					layerDict[inner.sketchObject.frame().y() + inner.sketchObject.frame().height()] = inner.sketchObject.frame().height()
				// }else{
					// log(inner.sketchObject.frame().y())
					// layerDict[inner.frame.y + inner.frame.height] = inner.frame.height
				// }
			
			
		})
	})

	// log(layerDict)

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

function nothingSelected(){
	var alert = NSAlert.alloc().init()	
	alert.setMessageText("Nothing is selected")
	alert.setInformativeText("Please select artboards or layers to resize!")
	alert.addButtonWithTitle("Okay!")
	alert.addButtonWithTitle("Close")
	var view = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,100))

	[alert runModal]

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

    labels.push(snapDefaultLabel, snapDescriptionLabel, snipDefaultLabel, snipDescriptionLabel)

    labels = adjustLabelSettings(labels);

    // Text Field Setup //

    var fields = []

    var snapField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (marginOffsetAnchor + 24), 100, 20))
    snapField.setStringValue(userDefaultsDict["snap"] !=  null? userDefaultsDict["snap"] : "100")
    


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



}

function setValuesToMemory(snipDefault, snapDefault){

	[userDefaults setObject:snipDefault.stringValue() forKey:"snip"]
	[userDefaults setObject:snapDefault.stringValue() forKey:"snap"]

	userDefaults.synchronize()

}
