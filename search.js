var fs = require('fs');
var path = require('path');

// Return a list of files with a specified extension 
// and containing specified string 
// in the provided directory and subdirectories
// dir: path of the directory to search the files for
// fileExtension: file extension to search e.g ".txt"
// searchString: string to search in the file
function getFilteredFiles(dir, fileExtension, searchString) {
	var foundfiles = [];
	function scanFilesInDir(currentPath) {
		var files = fs.readdirSync(currentPath);
		for (var i in files) {
			var currentFile = path.join(currentPath, files[i]);      
			if (fs.statSync(currentFile).isFile() && fileExtension == path.extname(currentFile) && fileContainString(currentFile, searchString)) {
				foundfiles.push(currentFile);
			} else if (fs.statSync(currentFile).isDirectory()) {
				scanFilesInDir(currentFile);
			}
		}
	};
	scanFilesInDir(dir);
	return foundfiles; 
}

//Return true if the file contains specified string, otherwise return false
//fileName: file to search the string in.
//searchString: specified string to search in the file.
function fileContainString (fileName, searchString){
	var fileData;
	// Try to read file. In case of error in reading the file return false.
	try {
		fileData = fs.readFileSync(fileName);
	}catch (err){
		return false;
	}
	if (fileData.indexOf(searchString) >= 0)
		return true;
	else 
		return false;
}

//Check the number of command line arguments.
//If the number of arguments in the command line equals to the expected number of arguments return true, otherwise return false.
//cmdArgms: array of command line arguments.
//numExpectedArgms: expected number of arguments
 function numberOfArgumentsIsCorrect (cmdArgms, numExpectedArgms){
	 if (cmdArgms.length == numExpectedArgms)
		 return true;
	 else
		 return false;
 }
 
 
//The application prints all files with the specified extension under the current directory 
//(including subdirectories) that contain the specified string.
// In case of wrong number of arguments prints usage rules and exits.
// In case of no files were found prins a notification.

if (numberOfArgumentsIsCorrect(process.argv,4)){
	var extension = "." + process.argv[2];
	var searchString = process.argv[3];
	var foundFiles = getFilteredFiles(__dirname, extension, searchString);
	if (foundFiles.length == 0)
		console.log("No file was found")
	else
		console.log(foundFiles.join('\n'));
	}
else 
	console.log("USAGE: node search [EXT] [TEXT]");