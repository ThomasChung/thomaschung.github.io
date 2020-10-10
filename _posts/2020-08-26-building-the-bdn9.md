---
layout: post
title: Building the BDN9
---

A fun little macropad from keebio 

![_config.yml]({{ site.baseurl }}/images/bdn9.jpg)

Parts list:

* this [kit](https://keeb.io/products/bdn9-3x3-9-key-macropad-rotary-encoder-support) from keeb.io 
* a 3d printed [middle layer](https://www.thingiverse.com/thing:3706381)

Software
----
The BDN9 uses an Ardrino Pro Micro under-the-covers and therefore works with [QMK Firmware](https://qmk.fm/).  Using this [keymap.c](https://github.com/qmk/qmk_firmware/blob/master/keyboards/keebio/bdn9/keymaps/default/keymap.c) as a guide, I decided I wanted to make the rotary encoder scroll through my favorite Slack and Discord emojis.

The small piece of logic here is calculating and remembering the length of the emoji so that you can tell the keyboard to backspace that amount of times. Also when you turn the encoder left when on the first emoji in the array (or right on the last), we want to jump to the other side of the array for a circular experience.

```
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
  	    for (i = 0; i < 40; i++) {
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
  	    for (i = 0; i < 40; i++) {
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

Here it is in action:

![_config.yml]({{ site.baseurl }}/images/bdn9-in-action.gif)
