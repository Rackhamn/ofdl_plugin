# ofdl_plugin (Ordered File Download Location)
Chromium plugin to automatically sort downloads by Website and by MIME type.

Also fixes duckduckgo's horrible file namer. 
Duckduckgo often (on my local pc) ends up dropping '.' characters inbetween the filename and the mime format extension.  

Example: "some-cat-imagejpeg" or "some-cat-image"  
Turns into: "some-cat-image.jpeg"

## Issue / future
It is automatic and hardcoded in the paths it generates and stores files into.  
In the future, both the format and the ordering of string will be editable by the user in the loaded extension and not by changing the code.
