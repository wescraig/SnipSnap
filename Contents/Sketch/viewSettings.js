

function adjustLabelSettings(labels){

	for(i = 0; i < labels.length; i++){
		labels[i].setEditable(false)
		labels[i].setSelectable(false)
		labels[i].setDrawsBackground(false)
		labels[i].setBezeled(false)
	}

	return labels

}

function viewSetup(view, fields, labels){

	for (i=0; i < fields.length; i++){
		view.addSubview(fields[i])
		view.addSubview(labels[i])
	}

	return view
}