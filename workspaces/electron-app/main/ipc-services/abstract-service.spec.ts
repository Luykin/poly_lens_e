import { AbstractService } from './abstract-service';
import { expect } from 'expect';

const NOT_IMPLEMENTED_YET = 'Method not implemented yet.';

describe('AbstractService', () => {
  let abstractService: AbstractService<string, string>;
  beforeEach(() => {
    abstractService = new AbstractService<string, string>();
  });

  it('should throw "Method not implemented yet." for receptionChannel', () => {
    expect(() => abstractService.receptionChannel()).toThrowError(
      NOT_IMPLEMENTED_YET
    );
  });

  it('should return undefined for sendingChannel', () => {
    expect(abstractService.sendingChannel()).toBeUndefined();
  });

  it('should throw "Method not implemented yet." for process', () => {
    expect(() => abstractService.process('input')).toThrowError(
      NOT_IMPLEMENTED_YET
    );
  });
});
