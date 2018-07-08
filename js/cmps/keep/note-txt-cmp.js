import noteControls from './note-controls-cmp.js'


export default {
    template: `
                <section class="note">
                <h1 v-if="currMode !== 'edit' && currMode !== 'new'"> {{title}} </h1>
                <h1 v-if="currMode === 'edit' || currMode === 'new'">
                        <input type="text" v-model="note.data.title" placeholder="Enter title"/>
                </h1>

                    <div class="content">
                        <p v-if="currMode === 'list' || currMode === 'preview'">
                         {{txt}}
                        </p> 
                        <p v-if="currMode === 'edit' || currMode === 'new'">
                          <textarea v-model="note.data.txt" placeholder="Enter text"> </textarea>
                        </p>
                    </div>

                    <note-controls :note="note" :currMode="currMode"></note-controls>
                </section>
                `,
    props: ['note','currMode'],
    data() {
        return {
            title: this.note.data.title,
            txt: this.note.data.txt,
        }
    },
    created() {
        // console.log('note-txt created', this.note);
        // console.log('note-txt created', this.currMode);
        // this.title = note.data.title;
    },
    methods: {
       
    },
    components: {
        noteControls
    }
}