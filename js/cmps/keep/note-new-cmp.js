'use strict';
import bus from '../../services/event-bus.service.js'
import keepService from '../../services/keep-service.js';
import noteTxt from './note-txt-cmp.js'
import noteImg from './note-img-cmp.js'
import noteAudio from './note-audio-cmp.js'

export default {    
    template: `
            <section class="notes-new">
                <h3>- Add New -</h3>
                <div>
                    <button @click="getNote('note-txt')" title="text"><i class="fas fa-font"></i></button>
                    <button @click="getNote('note-img')" title="image"><i class="far fa-image"></i></button>
                    <button @click="getNote('note-audio')" title="audio"><i class="fas fa-volume-up"></i></button>
                    <button v-if="note && newMode" @click="closeNew()" title="discard">discard</button>
                    <button v-if="note && newMode" @click="addNote()" title="save">save</button>
                </div>
                <component v-if="note && newMode" :is="note.noteType" :key="note.id" :note="note" :curr-mode="'new'">
                </component> 
            
                <div class="hr-divider"></div>
            </section>
    `,

    data() {
        return {
            newMode:false,
            title:'',
            note: null
        }
    },

    methods: {
        getNote(noteType) {
            this.note = null;
            keepService.getNoteType(noteType).then(note => {  
                note.noteType = noteType;
                this.note = note;
                // this.note = JSON.parse(JSON.stringify(note));
            });

            this.newMode = true;
            // this.$router.push(`/keep/edit/`);
            // console.log('filterNotes', this.filter);
            // this.$emit('filtered', this.filter);
        },
        addNote() {
            this.newMode = false;
            bus.$emit('addNote', this.note);
            
            // console.log('delete', noteId);
        },
        closeNew() {
            this.newMode = false;
            // bus.$emit('addNote', this.note);
            
            // console.log('delete', noteId);
        }
    },
    computed: {

    },
    components: {
        noteTxt,
        noteImg,
        noteAudio
    }
}

// @input="addNote1()"

// <button @click="addNote('note-list')">todo list</button>