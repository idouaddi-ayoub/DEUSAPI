export interface Partic {
  tournId: number;
  teamId: number;
}

export interface Tournament {
  id: string;
  name: string;
  type: string;
  startingDate: Date;
  endingDate: Date;
  participants: Partic[];
  playersLenght: number;
}

export interface Match {
  partic: Partic[];
  matchUuid: number;
  parentUuid: number;
  stage: number;
}
