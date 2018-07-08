'use strict';

export default {
    template: `
            <section class="notes-filter">
       
             <input type="search" class="search" placeholder="Search by Title" v-model="filter.title" @input="filterNotes"/>   
                
            </section>
    `,

    data() {
        return {
            filter: {
                title: ''
            }
        }
    },

    methods: {
        filterNotes() {
            // console.log('filterNotes', this.filter);
            this.$emit('filtered', this.filter);
        }
    }
}