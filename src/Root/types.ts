interface PlayMode {
  mode: "Play";
  characterId: string;
  sessionCode: string;
}

interface CreateCharacterMode {
  mode: "CreateCharacter";
}

interface MainMenuMode {
  mode: "MainMenu";
}

export type RootModes = PlayMode | CreateCharacterMode | MainMenuMode;
