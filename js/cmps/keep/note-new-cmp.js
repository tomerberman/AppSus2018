'use strict';

export default {
    template: `
            <section class="notes-filter">
				<label for="search">new:</label> 
                <input type="text" placeholder="add title" v-model="title" />

                <div v-if="title.length > 0">
                    <button @click="addNote()">text</button>
                    <button @click="editNote()">img</button>
                    <button @click="pinNote()">todo list</button>
                    <button @click="previewNote()">audio</button>
                </div>
            </section>
    `,

    data() {
        return {
            addNew:false,
            title:'',
            newNote: {
                title: ''
            }
        }
    },

    methods: {
        addNote() {
            this.addNew = true;
            this.$router.push(`/keep/edit/`);
            // console.log('filterNotes', this.filter);
            // this.$emit('filtered', this.filter);
        }
    }
}

// @input="addNote1()"