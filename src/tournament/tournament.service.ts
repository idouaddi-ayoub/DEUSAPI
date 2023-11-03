import { Injectable } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import {
  CreateMatchDTO,
  CreateTournamentDTO,
} from './dto/create-tournament.dto';
import { Partic, Tournament } from './tournament.interface';

@Injectable()
export class TournamentService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async getTournamentById(id: number): Promise<Tournament> {
    const tournament = await this.neo4jService.read<Tournament>(
      `
      MATCH (t:Tournament)
      WHERE ID(t) = ${id}
      RETURN t
      `,
      {},
    );
    return tournament[0];
  }

  async createTournament(tournamentData: CreateTournamentDTO) {
    return await this.neo4jService.write(
      `
      CREATE (t:Tournament)
      SET t += $properties
      `,
      {
        properties: {
          name: tournamentData.name,
        },
      },
    );
  }

  async createMatch(matchData: CreateMatchDTO) {
    const newMatch = await this.neo4jService.write(
      `
      CREATE (m:Match)
      SET m += $properties
      RETURN m
      `,
      {
        properties: {
          id: matchData.matchUuid,
        },
      },
    );
    return newMatch;
  }

  async getMatchDetails(id: number) {
    const match = await this.neo4jService.read(
      `
    MATCH (m:Match)
    WHERE ID(m) = ${id}
    RETURN m
    `,
      {},
    );
    return match;
  }

  async verifyTournament(id: number): Promise<boolean> {
    try {
      const tournament = await this.getTournamentById(id);
      console.log(tournament);
    } catch (error) {
      if (error.code === 'Neo.ClientError.Statement.EntityNotFound') {
        console.error('Tournament not found in the database.');
      } else if (
        error.code === 'Neo.ClientError.Schema.ConstraintValidationFailed'
      ) {
        console.error('One or more properties did not match the constraints.');
      } else {
        // Log any other unexpected errors
        console.error('An unexpected error occurred:', error);
        // Check the error stack trace
        console.error('Error stack trace:', error.stack);
      }
    }
    return true;
  }

  async launchTournament(
    partic: Partic[],
    stage = 1,
    parentUuid = Math.floor(Math.random() * 100000000),
  ) {
    const matchUuid = Math.floor(Math.random() * 100000000);

    if (partic.length === 2) {
      // Create match with match_team relation data thing
      this.createMatch({ partic, matchUuid, parentUuid, stage });
      return;
    } else {
      // Create match skeleton;
      this.createMatch({ partic: [], matchUuid, parentUuid, stage });
    }

    if (partic.length % 2 != 0) return;

    const firstPart = partic.slice(0, Math.floor(partic.length / 2));
    const secondPart = partic.slice(Math.floor(partic.length / 2));

    this.launchTournament(firstPart, stage + 1, matchUuid);
    this.launchTournament(secondPart, stage + 1, matchUuid);
  }

  async initiateTournament(id: number) {
    const tournament: Tournament = await this.getTournamentById(id);

    if (this.verifyTournament(id)) return;

    this.launchTournament(tournament.participants);
    return tournament;
  }
}
