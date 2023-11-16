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

function setFilterBy(filterBy) {
	gFilterBy = filterBy
}

function addTodo(txt) {
	const todo = _createTodo(txt)
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

	gTodos = [_createTodo('Do this'), _createTodo('Do that'), _createTodo('Try here')]
	_saveTodos()
}

function _createTodo(txt) {
	return {
		id: makeId(),
		txt,
		isDone: false,
		createdAt: getDate(),
		importance: getRandomInt(1, 4)
	}
}

function _saveTodos() {
	saveToStorage('todosDB', gTodos)
}