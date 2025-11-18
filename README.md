# Buttons And Controls

# Play Button
The play button obviously plays the songText data, yet it also preprocesses the text data and adds gain where the gains are missing. This is so that the volume slider works effectively without 1. having to hard code over any of the tunes.js instruments and 2. so that there isnt a gain over all the instruments that make it super "Bassy" which i saw other student do.

# Stop Button
Stops the music from playing, pretty basic

# Save Song
Saves the songtext using localstorage, and just storing the songText under "savedsongtext", 

# Get Song
Gets the songtext from the localstorage, by getting the songtext under what its attribute is saved under, in this case "savedsongtext'

# Volume Slider
The volume slider works dynamically and adjusts either gain which was previously there by the volume, or by a (1*{volume}), allowing the slider to adjust all different levels of gain, even if the gain is implented after the preprocessing is done.

# Set BPM
set bpm grabs the BPM from the top and replaces it with the new bpm at the start, then sets the songTextBack. Now that I am writing this I realise it may not work for anything other then the specified BPM format that is given to it and I should've done another regex function that would search for "bpm{/yadayada}" and then replace the bpm based on what it finds.

# Muting The Instruments
The lengthiest one, created a new regex functino based on the one the tutor used, and bascailly grabbed the instrument titles based on it ending in a semicolon ":". Then i would loop through all the found instrumnets within the regex and either set them to their state of muted or unmuted, based on what I found within the array, using a empty usestate array. From their I would then generate the checkboxes for every single instrument within that array, once again based on whether or not the checkboxes needed to be checked or not. Finally I would then have a handleToggle function that would handle the toggleing of all my individual instrumental checkboxes, in which it copies over all the states of the checkboxes, either unchecked or checked, and then checks whether they are true, or false, and then changes the state of the checkbox based on newState[inst] of the instrument, either tickde or unticked, in which I then set the muted instruments to the useEffect ones that should be muted, and apply the muting of the instruments by sending it to the apply instrument mute functino, which just checks the lines and compares if they have an _ or not, and if so, replaces them, finally returning the newly modified insturmnets back to the songtext.