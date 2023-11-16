'use strict'

var gTodos
var gFilterBy = 'All'

_createTodos()

function getTodos() {
	if (gFilterBy === 'All') return gTodos

	const isDone = gFilterBy === 'Done' ? true : false
	return gTodos.filter(todo => todo.isDone === isDone)
}

function getTotalCount() {
	return gTodos.length
}

function getActiveCount() {
	return gTodos.filter(todo => !todo.isDone).length
}

function setSortBy(sortBy) {
	if (sortBy === 'Text') {
		gTodos.sort((a, b) => {
			const nameA = a.txt.toUpperCase();
			const nameB = b.txt.toUpperCase();
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	}
	if (sortBy === 'Importance') {
		gTodos.sort((a, b) => a.importance - b.importance);
	}
	if (sortBy === 'Created') {
		gTodos.sort((a, b) => a.createdAt - b.createdAt);
	}
}

function setFilterBy(filterBy) {
	gFilterBy = filterBy
}

function addTodo(txt, imp) {
	const todo = _createTodo(txt, imp)
	gTodos.unshift(todo)
	_saveTodos()
}

function removeTodo(todoId) {
	const idx = gTodos.findIndex(todo => todo.id === todoId)
	gTodos.splice(idx, 1)

	_saveTodos()
}

function toggleTodo(todoId) {
	const todo = gTodos.find(todo => todo.id === todoId)
	todo.isDone = !todo.isDone

	_saveTodos()
}

// Private functions

function _createTodos() {
	gTodos = loadFromStorage('todosDB')
	if (gTodos && gTodos.length) return

	gTodos = [_createTodo('Do this', 2), _createTodo('Do that'), _createTodo('Try here', 3)]
	_saveTodos()
}

function _createTodo(txt, imp = 1) {
	return {
		id: makeId(),
		txt,
		isDone: false,
		createdAt: getDate(),
		importance: imp
	}
}

function _saveTodos() {
	saveToStorage('todosDB', gTodos)
}