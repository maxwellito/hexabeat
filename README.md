# Phantom project

From commit to beat.


## Vat is ziz'?

Web application controlled via a MiniNPK Midi controller. 


## Structure

The main layout got few controls:

- Play/Pause
- Volume
- BPM

Each track got different variables:

- on/off switch
- output
- by-pass filter
- Samples
- Grid


Use 'ch' unit


## UI Workflow

A. Welcoming screen

  1. Press START
  2. Connect your Mini MPK
    a. Check if WebMIDI is allowed [can skip]
    b. Ask for auth
    c. Get the list of Midi devices
    d. Ask to press start if the device is not available
  3. Pick a session from the local storage or new one
  4. Pick an audio deck
    a. From list or provide URL
    b. Load content
    c. Check validity
    d. Load assets
  5. GO!

B. Playin

  1. We got 8 drumpads and 8 nobs + 25 notes
  2. 

## Required

services/
  commitParsers: takes an input an index
  audioDeck: load all the required audio files
  localStorage: manage the loacal storage, to import and export. Backup what.


## Credits

The awful CommitBeat

