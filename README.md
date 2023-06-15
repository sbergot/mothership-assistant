# mothership-assistant

Mothership assistant is a micro vtt for the Mothership tabletop RPG game by Tuesday Knight Games - www.tuesdayknightgames.com

Features included:

- character creation
- solo & multiplayer sessions
- warden view
- tracking of various elements: health, equipment, contractors, ammo

Please note that all your data is stored locally on your device.

Mothership assistant is currently in beta and available at https://mothership-assistant-canary.wandering-mushroom.com/. It should be useable as is. The plan is to improve the UI and review the various data tables before publishing a stable branch to a new url. The canary url will remain available and will track a more up to date & unstable version of the code.

Feel free to submit any feedback here: https://github.com/sbergot/mothership-assistant/issues

# roadmap

## in development

- add attacks on monsters - done ?
- allow players to roll damage without rolling attack - done ?
- add speed stat on monsters - done ?
- add quick roll button on rating component - done ?
- add message to remind players to reduce stats/saves when stress goes over 20 - done?
- schema version for games - done?

## being considered

- put session code and player connections in separate warden tab
- "library"
  - stored in local storage
  - warden tab to allow export/import tables from library
  - can export/import library from main menu
- armor/weapons/equipment/contractors customization
- UI review:
  - better font hierarchy
  - reduce various font sizes
  - make the UI denser
  - design a better "select" component instead of using buttons
- check for the possibility to integrate with portraits from ashen-victor.itch.io
- import/export characters from the mobile app
- ship management 
