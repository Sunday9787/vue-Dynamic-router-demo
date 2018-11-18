<template>
  <div style="height: 100%">
    <vuex-header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <vuex-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import VuexHeader from './header.vue';
import VuexFooter from './footer.vue';

@Component({
  components: {
    VuexHeader,
    VuexFooter,
  },
})

export default class VuexLayout extends Vue {}
</script>
