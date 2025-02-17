import { CensusType, Election, PublishedCensus } from '../../../src';

const validCensusId = '43cbda11b9d1a322c03eac325eb8a7b72779b46a76f8a727cff94b539ed9b903';
const validCensusURI = 'ipfs://QmeowUvr4Q9SMBSB942QVzFAqQQYukbjLYXxwANH3oTxbf';
const validCensusType = CensusType.WEIGHTED;

const publishedCensus: PublishedCensus = new PublishedCensus(validCensusId, validCensusURI, validCensusType);

let electionData;

beforeEach(() => {
  electionData = {
    title: {
      es: 'This is a test in english',
      en: 'Esto es un test en castellano',
      default: 'This is the default title',
    },
    description: 'Test',
    header: 'Test',
    streamUri: 'Test',
    startDate: new Date().getTime() + 80000,
    endDate: new Date().getTime() + 10000000,
    census: publishedCensus,
  };
});

describe('Election tests', () => {
  it('should have the correct type', () => {
    const election = new Election(electionData);
    expect(election).toBeInstanceOf(Election);
    expect(election.census).toBeInstanceOf(PublishedCensus);
  });
  it('should have the correct default values', () => {
    const election = new Election(electionData);
    expect(election.electionType).toEqual({
      autoStart: true,
      interruptible: true,
      dynamicCensus: false,
      secretUntilTheEnd: false,
      anonymous: false,
    });
    expect(election.voteType).toEqual({
      uniqueChoices: false,
      maxVoteOverwrites: 1,
      costFromWeight: false,
      costExponent: 10000,
    });
  });
  it('should have no questions', () => {
    const election = new Election(electionData);
    expect(election.questions).toEqual([]);
  });
  it('should have the correct default language property even if not set explicitly', () => {
    const election = new Election(electionData);
    expect(election.description).toEqual({
      default: 'Test',
    });
  });
  it('should throw when start date is invalid', () => {
    electionData.startDate = 'invalid';
    expect(() => {
      new Election(electionData);
    }).toThrow('Invalid start date');
  });
  it('should throw when end date is invalid', () => {
    electionData.endDate = 'invalid';
    expect(() => {
      new Election(electionData);
    }).toThrow('Invalid end date');
  });
  it('should throw when end date is before start date', () => {
    electionData.endDate = new Date().getTime();
    expect(() => {
      new Election(electionData);
    }).toThrow('The end date cannot be prior to the start date');
  });
  it('should throw when no title is set', () => {
    electionData.title = null;
    expect(() => {
      new Election(electionData);
    }).toThrow('Title is not set');
  });
  it('should throw when no description is set', () => {
    electionData.description = null;
    expect(() => {
      new Election(electionData);
    }).toThrow('Description is not set');
  });
  it('should throw when no census is set', () => {
    electionData.census = null;
    expect(() => {
      new Election(electionData);
    }).toThrow('Invalid census');
  });
});
