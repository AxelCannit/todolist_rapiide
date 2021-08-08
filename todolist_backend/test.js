const Todolist = require('./app');
const assert = require('assert').strict;

describe("post()", function() {
    it("should post the todo", function() {
        let todos = new TodoList();
        const expectedError = new Error("You have no TODOs stored. Why don't you add one first?");

        assert.throws(() => {
            todos.complete("doesn't exist");
        }, expectedError);
    });
});