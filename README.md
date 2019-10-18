# HexaBeat

**Express the beats from hidden commits.**

HexaBeat is a sequencer using commits from GitHub to make beats.
It takes a config file as input (also called liveset file) defining groups of sounds and repositories to extract commits from.
Then mix and match commits and algorithms to make an infinite combinaisons of sequences.
The app can be fully controlled via Akai MiniMPK device.

[Start HexaBeat](//maxwellito.github.io/hexabeat)

## Usage

In every case, P8 is reserved to reset nobs and display help.

```
 .----. .----. .----. .----.    .--.   .--.   .--.   .--.
 | P1 | | P2 | | P3 | | P4 |   | N1 | | N2 | | N3 | | N4 |
 '----' '----' '----' '----'    '--'   '--'   '--'   '--'
 .----. .----. .----. .----.    .--.   .--.   .--.   .--.
 | P5 | | P6 | | P7 | | P8 |   | N5 | | N6 | | N7 | | N8 |
 '----' '----' '----' '----'    '--'   '--'   '--'   '--'
 '---------- PADS ---------'   '--------- NOBS ----------'
```

_Mini MPK setup_

# FAQ

### Why this stuff?

I wanted to build something to discover React and Redux beyond a simple TO DO list app. It was fun. It probably contain a lot of misconception and missing optimisations.

### Is there a way to record this inaudible stuff?

Nothing is built in. It's your problem now.

### Does this work with other MIDI keyboards than the Akai Mini MPK?

No.

### Is it planned to control it with other devices?

No.

### Why the demo video looks cool and the product produce crappy stuff?

Marketing got a high power of persuasion. It's reminder that you shouldn't trust everything you see on YouTube or social medias en general.

### Why the default sample are in a separate repo?

I'm not entirely sure about the rights to use them, so in case it get striked, it won't take down the code. But shhhhhh.
Also, I don't wanted to mess up the main repo with them.

### Can I build my own liveset file?

Yes you can! [Follow these instruction to build your own liveset](#build-your-own-liveset-file)

# Build your own liveset file

The Liveset file is a JSON encoded file that define the different audio sets and repositories sources. Here is an example below:

```json
{
  "name": "minimal kit",
  "version": "1.1",
  "description": "Audio deck for minimal kit",
  "author": "Sancho Gomez aka Wurst Offendr",
  "repositories": [
    "maxwellito/vivus",
    "maxwellito/triangulart",
    "maxwellito/commitbeat",
    "maxwellito/breaklock"
  ],
  "pathBase": "/public/livesets/",
  "sampleGroups": [
    {
      "name": "hightomtom",
      "icon": "HT",
      "samples": [
        { "name": "HT10", "url": "TR808WAV/HT/HT10.WAV" },
        { "name": "HT25", "url": "TR808WAV/HT/HT25.WAV" }
      ]
    },
    {
      "name": "midtomtom",
      "icon": "MT",
      "samples": [
        { "name": "MT10", "url": "TR808WAV/MT/MT10.WAV" },
        { "name": "MT25", "url": "TR808WAV/MT/MT25.WAV" }
      ]
    }
  ],
  "themed": {
    "shade-base": "#000",
    "shade-dark": "#011",
    "shade": "#044",
    "shade-light": "#0ff",
    "shade-active-on": "#f0f"
  }
}
```

### 1. Metadata

The first properties are basic metadata : `name`, `version`, `description`, `author`. There's no specific restrictions, feel free to provide few details.

### 2. GitHub repositories list

The property `repositories`is a simple array of repositories to load which will be used as commit sources. The list provided must be valid and contain a minimum of one repository.

### 3. Sample groups

This is where tracks are defined. The property `sampleGroups` is an array of sample group. Each group, is defined by a `name`, an `icon` (string of maximum 3 letters) and links to audio samples (minimum 1, maximum 4). Each sample object got 2 properties: `url` (link to the audio file) and a `name` (unique string of maximum 8 chars).

In case you have a common path to all the audio files, you can use the property `pathBase` to set a URL base. In the example above, the sample `TR808WAV/MT/MT25.WAV` will be loaded via `/public/livesets/TR808WAV/MT/MT25.WAV`.

### 4. Theme

Liveset config allow to provide a custom theme. These will override the CSS variables of the app. Please find the default values above.

- **shade-base**: `#000`
- **shade-dark**: `#111`
- **shade**: `#444`
- **shade-light**: `#fff`
- **shade-active-on**: `#f6c408`

> #### WARNING: In order to let HexaBeat app load your liveset + samples they must be accessible from the app domain. Thankfully all request across \*.github.io domains are possible. So if you host your files on GitHub pages you will be able to load your assets without fears of cross-domain issues.

Then to share your creation with the rest of the world, provide the link to your liveset file on a hash. Like this URL : https://maxwellito.github.io/hexabeat/#//you.github.io/my-hexabeat/my-little-pony.json
This link will open HexaBeat and load `//you.github.io/my-hexabeat/my-little-pony.json` and boot it. If the magic doesn't happen, maybe check the web console, you might have an error somewhere.

## Credits

The awful CommitBeat

Music instruments: Icon pack
Icons made by [Freepik](http://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/) is licensed by Creative Commons BY 3.0
