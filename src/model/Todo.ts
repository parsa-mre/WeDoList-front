export class TodoItem {
    constructor(public id: string, public title: string) {}
}

export class TodoState {
    constructor(
        public id: string,
        public completed: boolean,
        public timestamp: number
    ) {
        this.id = id;
        this.completed = completed;
        this.timestamp = timestamp;
    }

    compareTo(o: TodoState): number {
        if (this.timestamp === o.timestamp) {
            // if timestamps are equal, we want to make sure that completed states come first
            return this.completed ? 1 : -1;
        }
        return this.timestamp - o.timestamp;
    }
}

export class ToDoDocument {
    constructor(
        public id: string,
        public items: TodoItem[],
        public states: TodoState[],
        public removed: string[]
    ) {
        this.items = [...items];
        this.states = [...states];
        this.removed = [...removed];
    }

    static mergeDocuments(
        doc1: ToDoDocument,
        doc2: ToDoDocument
    ): ToDoDocument {
        let mergedItems = [...doc1.items];
        const mergedStates = [...doc1.states];
        const mergedRemoved = [...doc1.removed];

        // union removed
        for (const removedId of doc2.removed) {
            if (!mergedRemoved.includes(removedId)) {
                mergedRemoved.push(removedId);
            }
        }

        // union items
        for (const item of doc2.items) {
            let found = false;
            for (const thisItem of mergedItems) {
                if (thisItem.id === item.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                mergedItems.push(item);
            }
        }

        // remove items if they are in removed
        mergedRemoved.forEach((removedId) => {
            mergedItems = mergedItems.filter((item) => item.id !== removedId);
        });

        // add all states
        mergedStates.push(...doc2.states);

        // remove duplicates using LLW
        mergedStates.sort((a: TodoState, b: TodoState) => {
            if (a.timestamp === b.timestamp) {
                // if timestamps are equal, we want to make sure that completed states come first
                return a.completed ? 1 : -1;
            }
            return a.timestamp - b.timestamp;
        });
        const uniqueStates: TodoState[] = [];
        for (const state of mergedStates) {
            if (
                uniqueStates.length === 0 ||
                uniqueStates[uniqueStates.length - 1].id !== state.id
            ) {
                uniqueStates.push(state);
            }
        }

        return new ToDoDocument(
            doc2.id,
            mergedItems,
            uniqueStates,
            mergedRemoved
        );
    }
}
