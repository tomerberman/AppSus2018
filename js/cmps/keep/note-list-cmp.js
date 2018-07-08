'use strict';

import noteTxt from './note-txt-cmp.js'
import noteImg from './note-img-cmp.js'
import noteAudio from './note-audio-cmp.js'


export default {
    props: ['notes'],
    
    template: `
        <section class="note-list">
            <component v-for="(note, idx) in notes" :is="note.noteType" :key="note.id" :note="note" :curr-mode="'list'">
            </component> 
        </section>
    `,
    created() {
    },
    methods: {
        noteSelected(noteId) {
            this.$emit('selected', noteId);
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteAudio
    }
}