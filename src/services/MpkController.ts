/**
 * MpkController class
 * Manage access and interact with
 * the MPK Mini
 *
 * Input:
 *   Drumpad
 *     [144, 48, 18]
 *     [128, 48, 127]
 *   Nob
 *     [176, 1, 59]
 */
class MpkController {

  deviceName: string;

  /**
   * MIDIInput and MIDIOutput of the MPK Mini
   */
  input: any; 
  output: any;

  /**
   * Classic listeners for MIDI messages
   * received from the MPK
   */
  listeners: ((number) => void)[];

  /**
   * Stacks of listeners for each nob and pad.
   * The array index is related to the input
   * it represents.
   */
  padsListeners: {(isPress:boolean):void;}[][] = [[],[],[],[],[],[],[],[]];
  nobsListeners: {(value:number):void;}[][] = [[],[],[],[],[],[],[],[]];

  /**
   * Binded methodto avoid bloating the memory
   */
  runIntroAnimBinded: ()=>void;

  /**
   * Current frame index of the animation
   */
  introAnimIndex:number = null;

  /**
   * Empty function, used for some cases
   */
  lostCall = () => {};


  /**
   * The constructor take only the device name
   * to catch, in our case the 'Launchpad Mini'.
   * However this value can be change in a new
   * version of the device got a slightly 
   * different name.
   * @param  {[type]} deviceName Device name to find from MIDIDevice
   */
  constructor (deviceName = 'MPK mini') {
    this.deviceName = deviceName
    this.input = null
    this.output = null
    this.listeners = []

    this.runIntroAnimBinded = this.runIntroAnim.bind(this)
  }

  /**
   * Get the accessed device.
   * If null, please call `accessDevice` first.
   * 
   * @public
   */
  isConncted(): boolean {
    return !!(this.input && this.output)
  }

  /**
   * Start to load all the required assets from the
   * list provided to the constructor
   * 
   * @public
   */
  accessDevice():Promise<MpkController> {
    return (<any>window.navigator)
      .requestMIDIAccess()
      .then((access) => {

        // Test deprecated browsers
        if ('function' === typeof access.inputs || !access.inputs) {
          throw new Error('Your browser is deprecated and use an old Midi API.')
        }

        // Get MIDI devices
        var i, input, output,
            inputs  = (<any>Array).from(access.inputs.values()),
            outputs = (<any>Array).from(access.outputs.values())

        // Loop though the device list to find the MPK
        for (i = 0; i < inputs.length; i++) {
          input = inputs[i]
          output = outputs[i]
          if (input.type === 'input'  && ~input.name.indexOf(this.deviceName) &&
              output.type === 'output' && ~output.name.indexOf(this.deviceName)) {
            
            // When found, it save the input/output and start listening
            this.input = input
            this.output = output
            this.input.onmidimessage = this.messageDispatcher.bind(this);
            this.runIntroAnim()
            return this
          }
        }

        // No device found
        throw new Error(`Device ${this.deviceName} not found.`)
      })
  }

  /**
   * Method to register a listener to message event
   */
  onMessage (listener): {():void;} {
    var listenerIndex = this.listeners.length
    this.listeners.push(listener)

    return function () {
      this.listeners[listenerIndex] = null
    }
  }

  /**
   * Adds a listener for a specific nob
   * and returns a function to remove the listener
   */
  stackPadListener(padIndex:number, listener: {(isPress:boolean):void;}): {():void;} {
    return this.stackListener(this.padsListeners, padIndex, listener)
  }

  /**
   * Adds a listener for a specific pad
   * and returns a function to remove the listener
   */
  stackNobListener(padIndex:number, listener: {(value:number):void;}): {():void;} {
    return this.stackListener(this.nobsListeners, padIndex, listener)
  }


  /* Utils */

  /**
   * Adds a listener to a provided stack
   * and returns a function to remove the listener
   */
  stackListener(stack:{(k:any):void;}[][], padIndex:number, listener: {(a:any):void;}): {():void;} {
    padIndex = Math.min(Math.max(padIndex - 1, 0), 8)
    stack[padIndex].push(listener)
    return () => {
      stack[padIndex].splice(stack[padIndex].indexOf(listener), 1)
    }
  }

  /**
   * Animation function to provide the LED animation
   * on device connection
   */
  runIntroAnim():void {
    if (this.introAnimIndex !== null) {
      introAnimStack[this.introAnimIndex].forEach(index => {
        this.output.send([144, index, 0])
      })
      this.introAnimIndex++;
    }
    else {
      this.introAnimIndex = 0;
    }
    if (this.introAnimIndex !== introAnimStack.length) {
      introAnimStack[this.introAnimIndex].forEach(index => {
        this.output.send([144, index, 1])
      })
      setTimeout(this.runIntroAnimBinded.bind(this), 60)
    }
    else {
      this.introAnimIndex = null
    }
  }

  /**
   * Listener for the device input.
   * This will find the good listeners to call.
   * 
   * @param MIDIMessageEvent
   */
  messageDispatcher(e) {
    let data = e.data;

    // Find Nobs and Pads listener
    switch (data[0]) {
      case 144: // Pad press
        this.currentPadListener(data[1])(true)
        break;
      
      case 128: // Pad release
        this.currentPadListener(data[1])(false)
        break;
      
      case 176: // Nob update
        this.currentNobListener(data[1])(data[2])
        break;
    }

    // Call listeners
    this.listeners.forEach(listener => {
      listener && listener(e.data)
    })
  }

  /**
   * Find the current pad listener from a pad key.
   * The pad key is the pad index received via MIDI
   * message.
   * If `padKey` is 49, this match with the pad n.2, and
   * will return the most recent listener registered
   * for this pad.
   */
  currentPadListener(padKey:number): {(isPress:boolean):void} {
    let padId = PADS.indexOf(padKey);
    if (!~padId) {
      return this.lostCall;
    }

    let stack = this.padsListeners[padId];
    if (!stack.length) {
      return this.lostCall;
    }

    return stack[stack.length - 1];
  }

  /**
   * Find the current nob listener from a nob key.
   * The nob key is the nob index received via MIDI
   * message.
   */
  currentNobListener(nobIndex:number): {(value:number):void} {
    nobIndex = Math.min(Math.max(nobIndex - 1, 0), 8)

    let stack = this.nobsListeners[nobIndex];
    if (!stack.length) {
      return this.lostCall;
    }

    return stack[stack.length - 1];
  }
}

/**
 * Index of pads keys
 */
const PADS = [
  48,
  49,
  50,
  51,
  44,
  45,
  46,
  47,
]

/**
 * Animation stack data for intro
 */
const introAnimStack:number[][] = [
  [PADS[0]],
  [PADS[0], PADS[1]],
  [PADS[1], PADS[2]],
  [PADS[2], PADS[3]],
  [PADS[3], PADS[7]],
  [PADS[7], PADS[6]],
  [PADS[6], PADS[5]],
  [PADS[5], PADS[4]],
  [PADS[4], PADS[0]],
  [PADS[0], PADS[1]],
  [PADS[1], PADS[2]],
  [PADS[2], PADS[3]],
  [PADS[3], PADS[7]],
  [PADS[7], PADS[6]],
  [PADS[6], PADS[5]],
  [PADS[5], PADS[4]],
  [PADS[4], PADS[0]],
  [PADS[0], PADS[1]],
  [PADS[1], PADS[2]],
  [PADS[2], PADS[3]],
  [PADS[3], PADS[7]],
  [PADS[7], PADS[6]],
  [PADS[6], PADS[5]],
  [PADS[5], PADS[4]],
  [PADS[4]],
]


let xx = new MpkController()
xx.accessDevice()
let a = xx.stackPadListener(2, function (p) {console.log('Firster', p)})
let b = xx.stackPadListener(2, function (p) {console.log('Sec', p)})

var aa = xx.stackNobListener(2, function (p) { console.log('FF', p); });
var bb = xx.stackNobListener(2, function (p) { console.log('SS', p); });
