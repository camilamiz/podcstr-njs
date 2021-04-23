import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

//dentro de createContext podemos informar o formato do que ele vai receber e não exatamente o que será recebido
