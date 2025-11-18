export function Preprocess({ inputText, volume }) {
    console.log("Testing"); 
    let outputText = inputText + "\n//Hello, this is a test";

    outputText += `\n//all(x => x.gain(${volume}))`;

    outputText = outputText.replaceAll("${VOLUME}", volume);

    let regex = /[a-zA-Z0-9-]+:\s*[\n\s\S]+?\r?\n(?=[a-zA-Z0-9-]*[:\/])/gm;

    let m;
    let matches = [];

    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex) {
        regex.lastIndex++;
        }   


        m.forEach((match, groupIndex) => {
        matches.push(match);
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
        `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText  );

    console.log(matches3);

    return matches3;
}


export function AddGainIfMissing(processedText, volume = 1) {
    const regex = /(note\([^)]+\))(?!.*\.gain\()/g;

    return processedText.replace(regex, (match) => `${match}.gain(${volume})`);
}


export function getInstrumentTitles(inputText) {
    const lines = inputText.split("\n");
    const unique = []; //to store unique instrument titles

    for (let line of lines) { //for each lien
        line = line.trim();
        if (!line || line.startsWith("//")) {
            continue; //skip it if they r blank or no lines
        }

        const match = line.match(/^_?([a-zA-Z][a-zA-Z0-9-_]*)\:/);//regex to get the title basde on it ending with a ":"
                     
        if (match) { //if it gets one
            const instr = match[1]; //push the instrument
             if (!unique.includes(instr)) {
                unique.push(instr); //add it only if not already included
            }
        }
    }

    return unique;
}

export function ApplyInstrumentMute(inputText, instrumentStates) {
    const lines = inputText.split("\n");
    const outputLines = [];

    for (let line of lines) {
        let modifiedLine = line;

        for (let instr in instrumentStates) {
            const active = instrumentStates[instr];
            if (line.startsWith(instr + ":") || line.startsWith("_" + instr + ":")) {
                if (active) {
                    //add underscore if its meant to be muted
                    if (!line.startsWith("_")) modifiedLine = "_" + line;
                } else {
                    //remove underscore if not muted
                    modifiedLine = line.replace(/^_/, "");
                }
            }
        }

        outputLines.push(modifiedLine); //push the modified checkboxes to the arr
    }

    return outputLines.join("\n"); //return them back to the songText
}
