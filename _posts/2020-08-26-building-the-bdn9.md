---
layout: post
title: Building the BDN9
categories: [programming, keyboards, 3dprinting]
---

I hadn't soldered for a while and wasn't really up-to-speed with all the new swiches so I decided to build this little macropad from keebio.  Total cost for the project was around $20. 

![_config.yml]({{ site.baseurl }}/images/bdn9.jpg)

Hardware
----

* this [kit](https://keeb.io/products/bdn9-3x3-9-key-macropad-rotary-encoder-support) from keeb.io
* 7 keycaps and switches (I used the [NovelKeys](https://novelkeys.xyz/) cream switches, just becuase they were the only ones in stock at the time)
* this 3d printed [middle layer](https://www.thingiverse.com/thing:3706381)
* a soldering iron and solder

Software
----
The BDN9 uses an Arduino Pro Micro and therefore works with [QMK Firmware](https://qmk.fm/).  Using this [keymap.c](https://github.com/qmk/qmk_firmware/blob/master/keyboards/keebio/bdn9/keymaps/default/keymap.c) as a guide, I decided I wanted to make the rotary encoder scroll through my most used Slack and Discord emojis.

> The small piece of logic here is calculating and remembering the length of the emoji so that you can tell the keyboard to backspace that amount of times. Also when you turn the encoder left when on the first emoji in the array (or right on the last), we want to jump to the other side of the array for a circular experience.

```c
const uint16_t PROGMEM keymaps[][MATRIX_ROWS][MATRIX_COLS] = {
    [0] = LAYOUT(
        SELECT_EMOJI, XXXXXXX, XXXXXXX,
        XXXXXXX, XXXXXXX, XXXXXXX,
        XXXXXXX, XXXXXXX, XXXXXXX 
    ),
};


int16_t emoji_index = 0;      

uint16_t backspaces = 0;

const char emojis[10][20] = {
    " :smile: ",
    " :spaghetti: ",
    " :sweat: ",
    " :heart: ",
    " :sunflower: ",
    " :tada: ",
    " :doughnut: ",
    " :sleepy: ",
    " :poop: ",
};



void encoder_update_user(uint8_t index, bool clockwise) {
    if (index == _LEFT) {
        if (clockwise) {
            emoji_index++;
            if (emoji_index > 9) {
            	emoji_index = 0;
            }

            int i;
            
            // delete the old emoji	
            for (i = 0; i < backspaces; ++i) {
                register_code(KC_BSPACE);
                unregister_code(KC_BSPACE);
            }

	    // calc the length of the current emoji
	    backspaces = 0;
  	    for (i = 0; i < 20; i++) {
	        if (emojis[emoji_index][i] == '\0') {
	            break;
	        }
	        backspaces++;
	    }

            send_string(emojis[emoji_index]);	    

        } else {
            emoji_index--;
            if (emoji_index < 0) {
            	emoji_index = 9;
            }
            
            int i;
            
            // delete the old emoji	
            for (i = 0; i < backspaces; ++i) {
                register_code(KC_BSPACE);
                unregister_code(KC_BSPACE);
            }

	    // calc the lenght of the current emoji
	    backspaces = 0;
  	    for (i = 0; i < 20; i++) {
	        if (emojis[emoji_index][i] == '\0') {
	            break;
	        }
	        backspaces++;
	    }
	    
            send_string(emojis[emoji_index]);
        }
    }
}

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
  
  switch (keycode) {
    case SELECT_EMOJI:
      if (record->event.pressed && backspaces > 0) {
      	    backspaces = 0;
            register_code(KC_ENTER);
            unregister_code(KC_ENTER);
      } else {
        // Do something else when release
      }
      return false; // Skip all further processing of this key
               default:
      return true; // Process all other keycodes normally
  }

```

Here is the [code](https://github.com/ThomasChung/qmk_firmware/tree/master/keyboards/keebio/bdn9/keymaps/thomas) for the layout.

Now to get this code onto the BDN9, the first step is to compile the firmware:

    qmk compile -kb keebio/bdn9 -km thomas
    
Then flash it (this will prompt you to press the reset button on the BDN9):

    qmk flash -kb keebio/bdn9 -km thomas
    

Here it is in action:

![](/images/bdn9-in-action.gif)


