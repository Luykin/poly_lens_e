import { BehaviorSubject } from 'rxjs';
import { WindowApiConst } from 'shared-lib';
import { AbstractService } from './abstract-service';

export class MultiplesService extends AbstractService<number, number[]> {
	private eventsSubject = new BehaviorSubject<number[]>([]);
	events$ = this.eventsSubject.asObservable();

	receptionChannel(): string {
		return WindowApiConst.MULTIPLES_INPUT;
	}

	sendingChannel(): string {
		return WindowApiConst.MULTIPLES_OUTPUT;
	}

	process(input: number): void {
		// From 1 to 10, return input multiples
		const multiples: number[] = [];
		for (let n = 1; n <= 10; n++) {
			multiples.push(n * input);
		}
		this.eventsSubject.next(multiples);
	}
}
