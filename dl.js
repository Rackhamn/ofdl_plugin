function strip_referrer(ref) {
	// turn "https://some.website.ext/..."
	// to: "some.website.ext"
	// into "some_website_ext"
	
	let s = ref.split("/");	
	let dom = s[2].replace(/[-.]/gm, "_");
	return dom;
}

function strip_mime(mime) {
	// turn "type/ext" into "ext"
	var mime_arr = mime.split("/");
	return mime_arr[1]; 
}

function check_filename(filename, ext) {
	// make sure that the filename is correct and that ext is at the end
	// otherwise fucking add it. (fuck duckduckgo's shitty downloader)
	
	let dot_ext = "." + ext;
	
	let ew = filename.endsWith(ext);
	let ewd = filename.endsWith(dot_ext);
	
	if(ewd == false) {
		if(ew == true) {
			// need to insert a '.' before the mime
			filename = filename.replace(/[ext]/gm, dot_ext);
		} else {
			// there is no end
			filename = filename + dot_ext;
		}
	}
	
	return filename;
}

chrome.downloads.onDeterminingFilename.addListener(
	function(item, __suggest) {
		function do_suggest(filename, conflictAction) {
			// conflict_action was renamed to conflictAction, so we just use both to
			// not have any great issues with versioning.
			__suggest({filename: filename, conflictAction: conflictAction, 
					conflict_action: conflictAction});
		}
		
		/*
			we can now put the file from the true source (where google got it from)
			or we can put it at the google source.
			
			or we can do a matching subcheck.
			making the path:
				'google_com/wikimedia/jpg/cat.jpg'
				
			ALSO
				some websites gets the image name fucked.
				we need to check the mime format and be sure that the filename has
				the correct extension. (duckduckgo always fucks me)
		*/

		let ref = strip_referrer(item.referrer);
		let mime = item.mime;
		let mime_ext = strip_mime(mime);
		let filename = check_filename(item.filename, mime_ext);
		
		// we can let the ordering be up to the user.
		let npath = ref + "/" + mime_ext + "/" + filename;
		
		if(item.incognito == true) {
			npath = "dli/" + npath;
		} else {
			npath = "dl/" + npath;
		}
		
		do_suggest(npath, 'overwrite');
	}
);

