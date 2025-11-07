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

