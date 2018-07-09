import bus from '../../services/event-bus.service.js'


export default {
    template: `
        <section class="controls" v-if="currMode !== 'preview' && currMode !== 'new'">
            <button v-if="currMode === 'list'" @click="deleteNote(note.id)" title="delete"> <i class="fas fa-trash-alt"> </i></button>
            <button v-if="currMode === 'list'" @click="editNote(note.id)" title="edit"> <i class="fas fa-pencil-alt" ></i></button>
            <button v-if="currMode === 'list'" @click="pinNote(note.id)" title="pin to starts"> <i class="fas fa-thumbtack"></i> </button>
            <button  v-if="currMode === 'list'" @click="previewNote(note.id)" title="preview"> <i class="fas fa-expand"></i> </button>
            <button  v-if="currMode === 'edit'" @click="saveNotes()" title="save changes" class="save-btn-control">save changes </button>
        </section>
    `,
    props: ['note', 'currMode'],
    data() {
        return {
            // noteId: this.note.id
        }
    },
    created() {
        // console.log(this.noteId);
    },
    methods: {
        deleteNote(noteId) {
            bus.$emit('deleteNote', noteId);
            // console.log('delete', noteId);
        },
        editNote(noteId) {
            bus.$emit('editNote', noteId);
            // console.log('delete', noteId);
        },
        previewNote(noteId) {
            bus.$emit('previewNote', noteId);
            // console.log('delete', noteId);
        },
        pinNote(noteId) {
            bus.$emit('pinNote', noteId);
            // console.log('delete', noteId);
        },
        saveNotes() {
            bus.$emit('saveNotes');
            // console.log('delete', noteId);
        },
        // changeColor(color) {
        //     // bus.$emit('saveNotes');
        //     console.log('color', color);
        // }

        // changeColor(jscolor) {
            // 'jscolor' instance can be used as a string
            // console.log('color', jscolor);
            // document.getElementById('rect').style.backgroundColor = '#' + jscolor
        // }
        
    }
}


{/* <input class="jscolor {onFineChange:'changeColor(this)'}" value="cc66ff"> */}