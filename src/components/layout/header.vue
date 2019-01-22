<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <template v-for="(item, i) in menu">
          <v-list-group v-if="item.sub && item.sub.length > 0" :key="i">

            <v-list-tile slot="activator">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-for="sub in item.sub"
                         :to="item.root + sub.link"
                         :key="sub.name">
              <v-list-tile-action>
                <v-icon>{{ sub.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ sub.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          </v-list-group>

          <v-list-tile v-else
                       :key="i"
                       :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer />
      <v-menu>
        <v-btn slot="activator" icon dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index"
                       @click="menu(item.type)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { Getter, namespace } from 'vuex-class';
import constantMenu, { MenuType } from './menu';
import { Auth } from '@/@types/vuex';

const AuthStore = namespace('auth');

function hasPermission(role: number, menu: MenuType) {
  if (menu.roles) {
    return menu.roles.includes(role);
  }
  return true;
}

function GenerateMenu(menu: MenuType[], role: number) {
  const target: MenuType[] = [];
  menu.forEach((item) => {
    const tmp = { ...item };
    if (hasPermission(role, item)) {
      if (tmp.sub) {
        tmp.sub = GenerateMenu(tmp.sub, role);
      }
      target.push(tmp);
    }
  });
  return target;
}

@Component

export default class VuexHeader extends Vue {
  @AuthStore.Getter('ROLE') private ROLE!: number;

  private drawer = true;

  private items = [
    { title: 'Click Me', type: '' },
    { title: 'Click Me', type: '' },
    { title: 'Click Me', type: '' },
    { title: '退出', type: 'logout' },
  ];

  private menu: MenuType[] = [];

  private created() {
    if (this.ROLE === 1) {
      this.menu = constantMenu;
      return;
    }
    this.menu = GenerateMenu(constantMenu, this.ROLE);
  }
}
</script>
