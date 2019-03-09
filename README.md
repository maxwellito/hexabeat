# Phontom project

**From commit to beat.**

_Phontom is a codename project for now. It will change, for sure._

Web-based application to generate music from repositories commits. To start, two things are required: a list of repositories to load from GitHub, and a track config file.

The app will load the list of different commits and load the config file provided and all the required samples.

## UI Workflow

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

### Setup

The MPK is not required to manipulate the app. The setup must be blank.

a. Pick an audio deck from the list (preset and added by the user). Under each of them a tickbox will inform if a session already exists about it. If the user wants to add a custom one, the last item in the list is a `+` to provide the audio deck URL. One the choice made, it loads the audio deck. If fail, it doesn't go to the next step.

- **P1** : Selects

* **N1** : Move cursor alon the list

b. If there's an active session about this deck, the UI will ask if the user wants to continue or reset.

- **P1** : Selects

* **N1** : Move cursor alon the list

### Play

a. Main screen

Contains the control bar (general volume, BPM), track list, option to add track

- **P1** : PLAY/PAUSE
- **P4** : Selects
- **P5** : Mute track
- **P6** : Solo track

* **N1** : Select the track
* **N3** : Output volume
* **N4** : BPM
* **N5** : Volume track

b. Track screen

- **P1** : ESC - Blinking
- **P4** : Delete track (double tap)
- **P5** : Mute track
- **P6** : Solo track
- **P7** : Open Sequence Crafter

* **N5** : Volume track

c. Sequence Crafter

- **P1** : ESC/Validate - Blinking

* **N1** : Selects repository
* **N2** : Sleected Commit
* **N3** : Algorithm
* **N4** : Offset

## Playground file

The playground file is a JSON encoded file that define the different audio sets and repositories sources. A good example is available at `/public/decks/demo.json`.

When this file is loaded on a user computer, it's stored in the local storage.

## Credits

The awful CommitBeat

Music instruments: Icon pack
Icons made by [Freepik](http://www.freepik.com/) from [www.flaticon.com](https://www.flaticon.com/) is licensed by Creative Commons BY 3.0
