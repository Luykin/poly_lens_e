// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import { Observable } from 'rxjs';

const NOT_IMPLEMENTED_YET = 'Method not implemented yet.';

export class AbstractService<In, Out> {
	events$?: Observable<Out>;

	receptionChannel(): string {
		throw new Error(NOT_IMPLEMENTED_YET);
	}

	sendingChannel(): string | undefined {
		return undefined;
	}

	process(_input: In): void {
		throw new Error(NOT_IMPLEMENTED_YET);
	}
}
