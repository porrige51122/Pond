# Pond V 2.2.7 - ALPHA
## Description
Pond is a tranquil home for you to take your mind off what you were doing and to calm you down.

Hosted Here: [relaxing-pond.herokuapp.com](https://relaxing-pond.herokuapp.com/)

Current features include:
 * ⚫ Tadpoles ⚫
   * Small little tadpoles that dance around your screen in groups
 * 🐟 Fish 🐟
   * Slightly larger orange Koi fish dart around the screen or gracefully swim around.
 * 🌼 Lily Pads 🌼
   * Large pads which float on the top of the water without a care in the world,
 * 🌊 Water Effects 🌊
   * Move your mouse across the water and leave little waves.
 * ⏺ Shape ⏺
   * The pond has banks to show that the pond isn't endless. It is contained. contained by you!
   * From here we have a random assortment of grass and cattails and more!
 * 🎶 Music 🎶
   * No relaxation is perfect without some optional Lo-Fi tunes in the background

Planned features:
 * 🌙 Day Night Cycle 🌙
   * Canvas background colours change over time to show the passing of time is not a bad thing
 * ☔ Weather ☔
   * Rain drops to show that rain isn't just for ruining your day but for clearing your mind after a stressful day
 * 🍖 Food 🍖
   * The ability to drop bits of bread and feed the little fish
   * Big fishes eat smaller fishes and population management will occur
 * 🔞 Age 🔞
   * You can see the full life cycle of birth to death of a tadpole to a frog and other creatures
   * Fish will 'mate' with other fish to make smaller fish and the circle of life continues
 * ⚙ Optimisation ⚙
   * I want your pond to be tailored the way *YOU* want it therefore I want the program to run faster in general so you can fit as much as you want in it
 * 🎣 FEAR!!!! 🎣
   * A big pointer is scary for the little fishes, so I want this to be represented properly

## Requirements
 * [NodeJs](https://nodejs.org/en/)

## How to run developer build
 * Clone or download the repository
 * Extract it to a folder
 * Open Terminal and navigate to this folder
 * Type `npm install` (This may take a couple of minutes...)
 * Type `npm start`
   * The website should open automatically [here](http://127.0.0.1:3000)

## Changelog
#### 2.2.7
Redesigned Tadpole movement to use Boids Algorithm
#### 2.2.6
Added another colour scheme "Autumn"
#### 2.2.5
Edited menu to implement tabs plus added a new tab
#### 2.2.4
Added lots of stuff to the menu to make it YOUR pond
#### 2.2.3
Added lots of CSS to the menu to make it look better
#### 2.2.2
Flower Bushes are now randomly placed around
#### 2.2.1
Now uploaded to Heroku
#### 2.1.11
Trees have been created (Sakura Trees)
#### 2.1.10
Started Trees code
#### 2.1.9
Made all entities scalable
#### 2.1.8
Added more fish colours and more shadows!
#### 2.1.7
Colour scheme changed shadows added and fish now have a new shape
#### 2.1.6
Everything will now render randomly across the bank
#### 2.1.5
Cattails and long grass render code has been written
#### 2.1.4
Rocks will now generate around the edge of the pond
#### 2.1.3
Rocks have been started - A random polygon will be created
#### 2.1.2
Fish now will swim away from the edge
#### 2.1.1
Pond edge added - No collisions
#### 2.0.4
Changed water effect to be more cartoon like and general movement fixes
#### 2.0.3
Fish now cause ripples
#### 2.0.2
Made Water effect happen when mouse moves over canvas
#### 2.0.1
Water Effect added
#### 1.5.1
Helpful sliders have been added to customise pond to your own taste
#### 1.4.3
Lily Pads have a 25% chance to have a water lily on it
#### 1.4.2
Lily Pads have simple movement
#### 1.4.1
Lily Pads have been added
#### 1.3.1
Many bugs fixed with fish movement
#### 1.2.2
Fish have 2 states - wiggling and twitching
#### 1.2.1
Fish have been added
#### 1.1.1
Tadpoles now follow the leader
#### 1.0.2
Tadpoles now have a leader
#### 1.0.1
Tadpoles now move
#### 1.0.0
Tadpoles added

## Credits
https://github.com/christopher4lis/canvas-boilerplate - Used as boilerplate code for Web Pack
http://agilerepose.weebly.com/water-ripple.html - Used to create the water effect in water.js - Not used any more but still a great resource
https://p5js.org/examples/simulate-flocking.html - Boids Code used for Tadpoles since 2.2.7
