<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <b-jumbotron class="text-center">
                    <h4>
                        {{ $t('demo.select') }}
                    </h4>
                </b-jumbotron>
            </b-col>
        </b-row>
        <b-row>
            <b-col md=6 offset=3>
                <b-list-group>
                    <b-list-group-item
                        v-for="(model, idx) in models"
                        :key="idx"
                        href="javascript:void(0)"
                        @click="onModelClick(model)"
                        :data-model-name="model.name"
                    >{{ model.name }}</b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import demo from '@/service/demo/index.js';
import threatmodelActions from '@/store/actions/threatmodel.js';

export default {
    name: 'SelectDemoModel',
    data() {
        return {
            models: demo.models
        };
    },
    mounted() {
        this.$store.dispatch(threatmodelActions.clear);
        this.$store.dispatch(threatmodelActions.fetchAll);
    },
    methods: {
        onModelClick(model) {
            this.$store.dispatch(threatmodelActions.selected, model.model);
            const params = Object.assign({}, this.$route.params, { threatmodel: model.name });
            this.$router.push({ name: 'localThreatModel' , params });
        }
    }
};

</script>
