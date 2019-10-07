/**
 * MpkController class
 * Manage access and interact with
 * the MPK Mini
 *
 *
 * Usage:
 *
 * // Create an object and connect
 * let myMPK = new MpkController('MPK Mini')
 * myMPK.accessDevice()
 *
 * //
 *
 * Notes:
 *
 * Input:
 *   Drumpad
 *     [144, 48, 18]
 *     [128, 48, 127]
 *   Nob
 *     [176, 1, 59]
 */
class MpkController {
  /**
   * Midi device to find
   * Of course this class is made for the MPK mini
   * but maybe the new version got a different name.
   */
  deviceName: string;

  // Status

  /**
   * Status of the MPK
   *
   * @public
   */
  status = MpkStatus.off;

  /**
   * List of listeners for MIDI status.
   * Will be triggered for MIDI connections and disconnections.
   */
  statusListener: ((event: MpkStatus) => void)[] = [];

  // Internal

  /**
   * MIDIInput and MIDIOutput of the MPK Mini
   */
  input: any;
  output: any;

  /**
   * Classic internal listeners for MIDI messages
   * received from the MPK
   */
  listeners: ((data: number[]) => void)[];

  /**
   * Store the current value of nobs
   */
  nobsState: { [nobIndex: number]: number } = {};

  /**
   * Status of the help key
   */
  isOnHelp: boolean;

  // Outside listeners

  /**
   * Stack of CtrlListeners
   */
  controlListenerStack: CtrlListener[] = [];

  /**
   * Current Control Listener
   */
  controlListener: CtrlListener;

  /**
   * Listener callback for helpkey event
   */
  onHelpKey: PadListener;

  // Intro

  /**
   * Binded methodto avoid bloating the memory
   */
  runIntroAnimBinded: () => void;

  /**
   * Current frame index of the animation
   */
  introAnimIndex: number = null;

  /**
   * Empty function, used for some cases
   */
  lostCall = (bin: any) => {};

  /**
   * The constructor take only the device name
   * to catch, in our case the 'Launchpad Mini'.
   * However this value can be change in a new
   * version of the device got a slightly
   * different name.
   * @param  {[type]} deviceName Device name to find from MIDIDevice
   */
  constructor(deviceName = 'MPK mini') {
    this.deviceName = deviceName;
    this.input = null;
    this.output = null;
    this.listeners = [];

    this.runIntroAnimBinded = this.runIntroAnim.bind(this);

    // Check if the user already granted access
    (<any>navigator).permissions.query({ name: 'midi', sysex: true }).then(
      (status: any /* PermissionStatus */) => {
        if (status.state === 'granted') {
          this.accessDevice();
        }
      },
      (e: any) => {
        this.setStatus(MpkStatus.incompatible);
      }
    );
  }

  /**
   * Start to load all the required assets from the
   * list provided to the constructor
   *
   * @public
   */
  accessDevice(): Promise<any> {
    if (!(<any>window).navigator.requestMIDIAccess) {
      return Promise.reject(
        new Error('Your browser is not compatible. Please use Chrome.')
      );
    } else if (
      this.status !== MpkStatus.off &&
      this.status !== MpkStatus.error
    ) {
      return Promise.resolve(this);
    }
    this.setStatus(MpkStatus.waitingForAccess);
    return (<any>window).navigator.requestMIDIAccess({ sysex: true }).then(
      (access: any) => {
        // Test deprecated browsers
        if ('function' === typeof access.inputs || !access.inputs) {
          throw new Error(
            'Your browser is deprecated and use an old Midi API.'
          );
        }
        this.setStatus(MpkStatus.pending);
        access.addEventListener(
          'statechange',
          this.stateChangeHandler.bind(this)
        );

        [
          ...(<any>Array).from(access.inputs.values()),
          ...(<any>Array).from(access.outputs.values())
        ].forEach((port: any) => this.stateChangeHandler({ port }));
      },
      () => {
        this.setStatus(MpkStatus.error);
      }
    );
  }

  /**
   * Listener for `statechange` events from the
   * MPK to add/remove input and output.
   * @param e Event
   */
  stateChangeHandler(e: any) {
    // Ditch device that aren't what we are looking for
    if (!~e.port.name.indexOf(this.deviceName)) {
      console.info(`Useless device [${e.port.name}]`);
      return;
    }

    const isInput = e.port instanceof (<any>window).MIDIInput;
    console.info(
      `MIDI: ${this.deviceName} ${isInput ? 'input' : 'output'} ${e.port.state}`
    );

    if (e.port.state === 'connected') {
      if (isInput) {
        this.input = e.port;
        this.input.onmidimessage = this.messageDispatcher.bind(this);
        this.setStatus(MpkStatus.connected);
      } else {
        this.output = e.port;
        this.runIntroAnim(true);
      }
    } else {
      if (isInput) {
        this.input = null;
        this.setStatus(MpkStatus.disconnected);
      } else {
        this.output = null;
      }
    }
  }

  /**
   * Set the status of the MPK connection
   * and dispatch an even to all listeners.
   */
  setStatus(status: MpkStatus) {
    this.status = status;
    this.statusListener.forEach(listener => {
      listener(status);
    });
  }

  /**
   * Add listener for state change.
   * @param listener Listener function
   *
   * @public
   */
  onStateChange(listener: (status: MpkStatus) => void): (bin: any) => void {
    if (~this.statusListener.indexOf(listener)) {
      return this.lostCall;
    }
    this.statusListener.push(listener);
    return () => {
      this.statusListener.splice(this.statusListener.indexOf(listener), 1);
    };
  }

  /**
   * Method to register a listener to message event
   */
  onMessage(listener: { (data: number[]): void }): { (): void } {
    var listenerIndex = this.listeners.length;
    this.listeners.push(listener);

    return function() {
      this.listeners[listenerIndex] = null;
    };
  }

  /* Utils */

  takeControl(listeners: CtrlListener): { (): void } {
    if (listeners[MpkKey.pad8]) {
      throw new Error(
        'MpkKey.pad8 is reserved for system. Please review your listener.'
      );
    }
    this.controlListenerStack.push(listeners);
    this.controlListener = listeners;
    return () => {
      this.controlListenerStack.splice(
        this.controlListenerStack.indexOf(listeners),
        1
      );
      this.controlListener = this.controlListenerStack[
        this.controlListenerStack.length - 1
      ];
    };
  }

  /**
   * Animation function to provide the LED animation
   * on device connection
   */
  runIntroAnim(isStarting?: boolean): void {
    // Blocks if the call if its to start the animation
    // and the intro is already running
    if (isStarting && this.introAnimIndex !== null) {
      return;
    }
    if (this.introAnimIndex !== null) {
      introAnimStack[this.introAnimIndex].forEach(index => {
        this.output.send([144, index, 0]);
      });
      this.introAnimIndex++;
    } else {
      this.introAnimIndex = 0;
    }
    if (this.introAnimIndex !== introAnimStack.length) {
      introAnimStack[this.introAnimIndex].forEach(index => {
        this.output.send([144, index, 1]);
      });
      setTimeout(this.runIntroAnimBinded, 60);
    } else {
      this.introAnimIndex = null;
    }
  }

  /**
   * Listener for the device input.
   * This will find the good listeners to call.
   *
   * @param MIDIMessageEvent
   */
  messageDispatcher(e: any) {
    let data = e.data;

    // Find Nobs and Pads listener
    switch (data[0]) {
      case 144: // Pad press
        // this.currentPadListener(data[1])(true)
        this.callPadListener(data[1], true);
        break;

      case 128: // Pad release
        // this.currentPadListener(data[1])(false)
        this.callPadListener(data[1], false);
        break;

      case 176: // Nob update
        // this.currentNobListener(data[1])(data[2])
        this.callNobListener(data[1], data[2]);
        break;
    }

    // Call listeners
    this.listeners.forEach(listener => {
      listener && listener(e.data);
    });
  }

  callPadListener(padIndex: number, state: boolean): any {
    if (padIndex === MpkKey.pad8) {
      return this.triggerHelp(state);
    }
    if (
      this.isOnHelp ||
      !this.controlListener ||
      !this.controlListener[padIndex]
    ) {
      return;
    }
    (<any>this.controlListener[padIndex][1])(state);
  }
  callNobListener(nobIndex: number, value: number): any {
    this.nobsState[nobIndex] =
      this.nobsState[nobIndex] === undefined ? value : this.nobsState[nobIndex];
    const progress = value - this.nobsState[nobIndex];
    this.nobsState[nobIndex] = value;

    if (
      this.isOnHelp ||
      !this.controlListener ||
      !this.controlListener[nobIndex]
    ) {
      return;
    }
    (<any>this.controlListener[nobIndex][1])(progress);
  }
  triggerHelp(state: boolean): void {
    this.isOnHelp = state;
    this.onHelpKey(state);
  }
}

/**
 * CtrlListener is an object defining the listeners
 * while setting a new control.
 *
 * Example:
 * {
 *   [MpkKey.pad1]: (isPressed: boolean) => {...},
 *   [MpkKey.nob1]: (value: number) => {...},
 * }
 */
export type CtrlListener = {
  [key: number]: [string, PadListener | NobListener];
};

/**
 * Listener for pad events
 */
export type PadListener = (isPress: boolean) => void;

/**
 * Listener for nob events
 */
export type NobListener = (value: number) => void;

/**
 * Enum defining the different status of the MPK
 */
export enum MpkStatus {
  off = 'off',
  incompatible = 'incompatible',
  waitingForAccess = 'waitingForAccess',
  pending = 'pending',
  connected = 'connected',
  disconnected = 'disconnected',
  error = 'error'
}

/**
 * Enum listing the keys of the MPK
 * Thankfully nobs and pads don't share the same IDs
 * Making this enum a pleasure to use.
 */
export enum MpkKey {
  pad1 = 48,
  pad2 = 49,
  pad3 = 50,
  pad4 = 51,
  pad5 = 44,
  pad6 = 45,
  pad7 = 46,
  pad8 = 47,
  nob1 = 1,
  nob2 = 2,
  nob3 = 3,
  nob4 = 4,
  nob5 = 5,
  nob6 = 6,
  nob7 = 7,
  nob8 = 8
}

/**
 * Animation stack data for intro
 */
const introAnimStack: number[][] = [
  [MpkKey.pad1],
  [MpkKey.pad1, MpkKey.pad2],
  [MpkKey.pad2, MpkKey.pad3],
  [MpkKey.pad3, MpkKey.pad4],
  [MpkKey.pad4, MpkKey.pad8],
  [MpkKey.pad8, MpkKey.pad7],
  [MpkKey.pad7, MpkKey.pad6],
  [MpkKey.pad6, MpkKey.pad5],
  [MpkKey.pad5, MpkKey.pad1],
  [MpkKey.pad1, MpkKey.pad2],
  [MpkKey.pad2, MpkKey.pad3],
  [MpkKey.pad3, MpkKey.pad4],
  [MpkKey.pad4, MpkKey.pad8],
  [MpkKey.pad8, MpkKey.pad7],
  [MpkKey.pad7, MpkKey.pad6],
  [MpkKey.pad6, MpkKey.pad5],
  [MpkKey.pad5, MpkKey.pad1],
  [MpkKey.pad1, MpkKey.pad2],
  [MpkKey.pad2, MpkKey.pad3],
  [MpkKey.pad3, MpkKey.pad4],
  [MpkKey.pad4, MpkKey.pad8],
  [MpkKey.pad8, MpkKey.pad7],
  [MpkKey.pad7, MpkKey.pad6],
  [MpkKey.pad6, MpkKey.pad5],
  [MpkKey.pad5]
];

export let Mpk = new MpkController();

export function NobBypass(stepSize: number, listener: NobListener) {
  let state = 0;
  return function(value: number) {
    state += value;
    const afterMod = state % stepSize;
    if (afterMod !== state) {
      listener((state - afterMod) / stepSize);
      state = afterMod;
    }
  };
}

export function PadFilter(onPress: boolean, listener: PadListener) {
  return function(state: boolean) {
    if (state === onPress) {
      listener(onPress);
    }
  };
}
