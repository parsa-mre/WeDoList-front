import { Todo } from "./Todo";

describe("Todo", () => {
    let todo: Todo;

    beforeEach(() => {
        todo = new Todo();
    });

    it("should merge another Todo document correctly", () => {
        // Arrange
        const other: Todo = new Todo();
        other.removed = [1, 2, 3];
        other.items = [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
        ];
        other.states = [
            { id: 1, name: "State 1" },
            { id: 2, name: "State 2" },
        ];

        // Act
        todo.merge(other);

        // Assert
        expect(todo.removed).toEqual([1, 2, 3]);
        expect(todo.items).toEqual([
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
        ]);
        expect(todo.states).toEqual([
            { id: 1, name: "State 1" },
            { id: 2, name: "State 2" },
        ]);
    });

    // Add more test cases as needed
});
