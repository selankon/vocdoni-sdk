export enum CensusType {
  WEIGHTED = 'weighted',
  ANONYMOUS = 'zkindexed',
}

/**
 * Represents a generic census
 */
export abstract class Census {
  private _censusId: string | null;
  private _censusURI: string | null;
  private _type: CensusType;

  /**
   * Constructs a generic census
   *
   * @param censusId The id of the census
   * @param censusURI The URI of the census
   * @param type The type of the census
   */
  protected constructor(censusId?: string, censusURI?: string, type?: CensusType) {
    this.censusId = censusId;
    this.censusURI = censusURI;
    this.type = type;
  }

  get censusId(): string | null {
    return this._censusId;
  }

  set censusId(value: string | null) {
    this._censusId = value;
  }

  get censusURI(): string | null {
    return this._censusURI;
  }

  set censusURI(value: string | null) {
    this._censusURI = value;
  }

  get type(): CensusType {
    return this._type;
  }

  set type(value: CensusType) {
    this._type = value;
  }

  get isPublished(): boolean {
    return (
      typeof this.censusId !== 'undefined' && typeof this.censusURI !== 'undefined' && typeof this.type !== 'undefined'
    );
  }
}
