// Star Wars spinner and status words, by what the turn is doing.
export const THINKING = [
  'Consulting the Jedi archives',
  'Reaching out with the Force',
  'Meditating at the Temple',
  'Calculating the odds',
  'Reading the Holocron',
  'Trusting your feelings',
  'Consulting the Council',
  'Sensing a disturbance',
  'Plotting a Kessel Run',
  'Decrypting the Death Star plans',
  'Asking the Mon Calamari',
  'Training with Yoda',
]

export const WORKING = [
  'Engaging the hyperdrive',
  'Repairing the hyperdrive',
  'Recalibrating the deflector shield',
  'Reprogramming the astromech',
  'Charging the lightsaber',
  'Refueling at Mos Eisley',
  'Making the jump to lightspeed',
  'Routing power to the forward shields',
  'Bargaining with Jawas',
  'Patching the Falcon',
  'Targeting the exhaust port',
  'Building a lightsaber',
]

export const RESPONDING = [
  'Transmitting on a secure channel',
  'Broadcasting from Echo Base',
  'Receiving a hologram',
  'Relaying the message',
  'Opening a comm channel',
  'Speaking with the Force',
]

export const GREETINGS = [
  'May the Force be with you',
  'A long time ago, in a terminal far, far away',
  'Do or do not. There is no try',
  'Help me, Claude. You are my only hope',
]

export const DONE = [
  'Made the jump to lightspeed',
  'Mission accomplished, Rebel scum defeated',
  'The Force is strong with this one',
  'Escaped the Death Star trench',
  'Fly casual. Task complete',
]

// Same input gives the same word, so a spinner doesn't flicker as it redraws.
export function pick(list: readonly string[], seed: string): string {
  let hash = 0

  for (const ch of seed) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  }

  return list[hash % list.length] ?? list[0]!
}
