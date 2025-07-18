// note service

import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    _createNotes,
    getDefaultFilter,
    getNoteToTrash,
}


function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (!Array.isArray(notes)) return []

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')

                notes = notes.filter(note => {
                    const info = note.info || {}

                    return (
                        regExp.test(info.title || '') ||
                        regExp.test(info.txt || '') ||
                        regExp.test(info.url || '') ||
                        regExp.test((info.todos && info.todos.txt) || ''))
            })
            }

            if (filterBy.isTrash) {
                notes = notes.filter(note => note.isTrash === filterBy.isTrash)
            }
            return notes
        })

}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(createMode) {

    const note = {
        id: '',
        createdAt: Date.now(),
        type: createMode,
        isPinned: false,
        isTrash: false,
        style: {
            backgroundColor: ''
        },
        info: {
            title: '',
            txt: '',
            url: '',
            todos: { txt: '', doneAt: null }
        }
    }
    return note
}

function getDefaultFilter() {
    return {
        txt: '', isTrash: null,
    }
}


function getNoteToTrash(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(note => {
        note = { ...note, isTrash: true }
        return note
    })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [

            {
                id: 'n101',
                isTrash: false,
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#00d' },
                info: { txt: 'Fullstack Me Baby!' }
            },
            {
                id: 'n102',
                isTrash: false,
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg/2560px-020_The_lion_king_Snyggve_in_the_Serengeti_National_Park_Photo_by_Giles_Laurent.jpg',
                    title: 'Bobi and Me'
                },
                style: { backgroundColor: '#00d' }
            },
            {
                id: 'n103',
                isTrash: false,
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: 'n104',
                isTrash: false,
                createdAt: 1112225,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#f00' },
                info: { txt: 'Learn React!' }
            },
            {
                id: 'n105',
                isTrash: false,
                createdAt: 1112226,
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg',
                    title: 'Mountain View'
                },
                style: { backgroundColor: '#0f0' }
            },
            {
                id: 'n106',
                isTrash: false,
                createdAt: 1112227,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Shopping List',
                    todos: [
                        { txt: 'Milk', doneAt: null },
                        { txt: 'Eggs', doneAt: null },
                        { txt: 'Bread', doneAt: null }
                    ]
                }
            },
            {
                id: 'n107',
                isTrash: false,
                createdAt: 1112228,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#ff0' },
                info: { txt: 'Finish the project!' }
            },
            {
                id: 'n108',
                isTrash: false,
                createdAt: 1112229,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
                    title: 'Lake Reflection'
                },
                style: { backgroundColor: '#00f' }
            },
            {
                id: 'n109',
                isTrash: false,
                createdAt: 1112230,
                type: 'NoteTodos',
                isPinned: true,
                info: {
                    title: 'Workout Plan',
                    todos: [
                        { txt: 'Push-ups', doneAt: null },
                        { txt: 'Running', doneAt: null },
                        { txt: 'Stretching', doneAt: null }
                    ]
                }
            },
            {
                id: 'n110',
                isTrash: false,
                createdAt: 1112231,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ddd' },
                info: { txt: 'Read a book!' }
            },
            {
                id: 'n111',
                isTrash: false,
                createdAt: 1112232,
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg',
                    title: 'Golden Hour'
                },
                style: { backgroundColor: '#ff6600' }
            },
            {
                id: 'n112',
                isTrash: false,
                createdAt: 1112233,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Daily Routine',
                    todos: [
                        { txt: 'Meditation', doneAt: null },
                        { txt: 'Breakfast', doneAt: null },
                        { txt: 'Work', doneAt: null }
                    ]
                }
            }
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }

    return notes;
}




