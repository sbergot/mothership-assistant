interface PlayerSessionMode {
  mode: "PlayerSession";
  characterId: string;
  sessionCode: string;
}

interface DmSessionMode {
  mode: "DmSession";
  gameId: string;
}

interface CreateCharacterMode {
  mode: "CreateCharacter";
}

interface MainMenuMode {
  mode: "MainMenu";
}

export type RootModes =
  | PlayerSessionMode
  | DmSessionMode
  | CreateCharacterMode
  | MainMenuMode;
