import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { noteType, projectType, tagType, updateNoteType } from '../types'

interface NoteState {
    notes: noteType[],
    projects: projectType[],
    tags: tagType[]
}

const initialState: NoteState = {
    notes: [],
    projects: [],
    tags: []
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // for projects
        getALlProject: (state, action: PayloadAction<projectType[]>) => {
            state.projects = action.payload;
        },
        addProjects: (state, action: PayloadAction<projectType>) => {
            state.projects = [...state.projects, action.payload];
        },
        deleteProject: (state, action: PayloadAction<string>) => {
            state.projects = state.projects.filter(project => project.id !== action.payload);
        },
        updateProject: (state, action: PayloadAction<{ id: string, name: string | undefined }>) => {
            let newProject = state.projects.map(mapedProjects => {
                if (mapedProjects.id === action.payload.id) {
                    return {
                        ...mapedProjects,
                        name: action.payload.name
                    }
                }
                return mapedProjects
            })
            state.projects = newProject
        },
        // tags
        getAllTag: (state, action: PayloadAction<tagType[]>) => {
            state.tags = action.payload;
        },
        addTag: (state, action: PayloadAction<tagType>) => {
            state.tags = [...state.tags, action.payload];
        },
        deleteTag: (state, action: PayloadAction<string>) => {
            state.tags = state.tags.filter(tag => tag.id !== action.payload);
        },
        updateTag: (state, action: PayloadAction<{ id: string, name: string | undefined }>) => {
            const newTag = state.tags.map(mapedTags => {
                if (mapedTags.id === action.payload.id) {
                    return {
                        ...mapedTags,
                        name: action.payload.name
                    }
                }
                return mapedTags
            })
            state.tags = newTag
        },
        // for notes
        getAllNotes: (state, action: PayloadAction<noteType[]>) => {
            state.notes = action.payload
        },
        addNote: (state, action: PayloadAction<noteType>) => {
            state.notes = [...state.notes, action.payload];
        },
        setNotes: (state, action: PayloadAction<noteType[]>) => {
            state.notes = action.payload;
        },
        updateNote: (state, action: PayloadAction<updateNoteType>) => {
            let newNote = state.notes.map(mapedNotes => {
                if (mapedNotes.id === action.payload.id) {
                    return {
                        ...mapedNotes,
                        about: action.payload.about,
                        description: action.payload.description,
                        tags: action.payload.tags,
                    }
                }
                return mapedNotes
            })
            state.notes = newNote
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        }
    },
})

export const { addNote, updateNote, setNotes, getAllNotes, deleteNote, getAllTag, addTag, updateProject, updateTag, getALlProject, deleteProject, deleteTag, addProjects } = noteSlice.actions

export default noteSlice.reducer