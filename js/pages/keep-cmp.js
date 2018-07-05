// Vue.component('say-hello', {
//     template: `<section>HELLO</section>`
// })
import keepService from '../services/keep-service.js';
import noteTxt from '../cmps/keep/note-txt-cmp.js'
import noteImg from '../cmps/keep/note-img-cmp.js'
import noteAudio from '../cmps/keep/note-audio-cmp.js'


export default {
    template: `
    <section class="home" v-if="notes">
        <h1>Keep</h1>
        <div>
				<label for="search">Search:</label> 
				<input type="text" id="search"  v-model="filter.txt" @input="updateFilter() "/>
		</div>

        <div>
            <component v-for="(note, idx) in notes" :is="note.noteType" :key="idx" :data="note.data" >
            </component> 
        </div>

        <pre>
            {{notes}}
        </pre>
    </section>
    `,
    data() {
        return {
            currView: 'note-txt',
            notes: [],
            filter: { txt: '' }
        }
    },
    created() {
        keepService.query()
            .then(notes => {
                this.notes = notes;
                // console.log(notes);
            })
    },
    methods: {
        // changeCmp() {
        //     this.currView = (this.currView === 'say-hello') ? 'user-profile' : 'say-hello'
        // }
        updateFilter() {
            console.log(this.filter.txt);
            // this.filter = ;
            if (this.filter) {
                // Search by search
                notesToShow = notesToShow.filter(note => {
                    return note.title.includes(this.filter.by);
                });
            }
        }
    },
    computed: {
        //  notesToShow() {
        //    console.log(this.filter.txt);

        // 	let notesToShow = this.books;
        // 	if (this.filter) {
        // 		// Search by search
        // 		notesToShow = notesToShow.filter(note => {
        // 			return note.title.includes(this.filter.by);
        //         });
        //     }
        // }
    },
    components: {
        noteTxt,
        noteImg,
        noteAudio
    }
}


// 'note-txt': {
//     template: `<section>GREET {{data.txt}}</section>`,
//     props: ['data']
// }

// <input type="text" id="search" 
// 					v-model="filterBy.by" 
// 					@input="updateFilter"/>

// <!-- <button @click="cmps.push({cmpType: 'say-hello', data: {greet : 'Hi'}})">+</button>-->

// <!-- <button @click="changeCmp">Change Cmp</button> -->

//  <!-- <component :is="currView" :data="{user: {email: 'x@x.com'}}"></component>-->