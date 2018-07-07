'use strict';

export default {
    template: `
            <section class="notes-filter">
				<label for="search">Search:</label> 
                <input type="search" placeholder="Search by Title" v-model="filter.title" @input="filterNotes"/>
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