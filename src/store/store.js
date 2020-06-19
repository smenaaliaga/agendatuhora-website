import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        nombre: 'Sebastián Mena',

        select: { state: 'Viña del Mar', abbr: 'VDM' },
        items: [
            { comuna: 'Valparaíso', abbr: 'VLP' },
            { comuna: 'Viña del Mar', abbr: 'VDM' },
            { comuna: 'Reñaca', abbr: 'RÑC' },
            { comuna: 'Con Con', abbr: 'CNCN' },
            { comuna: 'Quilpué', abbr: 'QLP' },
            { comuna: 'Villa Alemana', abbr: 'VLN' },
        ],
    },

    
});
