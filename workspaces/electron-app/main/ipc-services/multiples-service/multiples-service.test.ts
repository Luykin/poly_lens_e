import { MultiplesService } from './multiples-service';

const NOT_IMPLEMENTED_YET = 'Method not implemented yet.';

describe('MultiplesService', () => {
	let multiplesService: MultiplesService;
	beforeEach(() => {
		multiplesService = new MultiplesService();
	});

	it('should throw "Method not implemented yet." for receptionChannel', () => {
		expect(() => multiplesService.receptionChannel()).not.toThrowError(
			NOT_IMPLEMENTED_YET
		);
	});

	it('should throw "Method not implemented yet." for sendingChannel', () => {
		expect(() => multiplesService.sendingChannel()).not.toThrowError(
			NOT_IMPLEMENTED_YET
		);
	});

	it('should throw "Method not implemented yet." for process', () => {
		expect(() => multiplesService.process(2)).not.toThrowError(
			NOT_IMPLEMENTED_YET
		);
	});
});
