<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark
                   color="primary">
          <v-toolbar-title>登录</v-toolbar-title>
          <v-spacer />
          <v-btn flat>注册</v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field prepend-icon="person"
                          name="login"
                          :rules="formRules.phone"
                          v-model="form.phone"
                          label="Login"
                          type="text" />
            <v-text-field prepend-icon="lock"
                          name="password"
                          :rules="formRules.password"
                          v-model="form.password"
                          label="Password"
                          type="password" />
            <v-radio-group row
                           v-model="form.role"
                          :rules="formRules.role">
                <span slot="prepend">角色:</span>
              <v-radio v-for="(item, i) in roles" :key="i"
                       :label="item.name"
                       :value="item.value" />
            </v-radio-group>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary"
                 :loading="loginLoading"
                 @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Mutation, namespace } from 'vuex-class';
import { Auth } from '@/@types/vuex';

const UserStore = namespace('auth')

@Component

export default class VuexLogin extends Vue {

  @UserStore.Action('LOGIN') LOGIN!: Auth.LOGIN;

  private loginLoading: boolean = false;

  private form: Auth.LoginForm = {
    phone: '17682311696',
    password: 'asd123123',
    role: 1,
  };

  private roles = [
    { name: '技术', value: 2 },
    { name: '财务', value: 3 },
    { name: '运营', value: 4 },
  ];

  private formRules = {
    phone: [
      (v: string) => !!v || '请输入手机号',
      (v: string) => (/[\d]{11}/.test(v) || '无效的手机号'),
    ],
    password: [
      (v: string) => !!v || '请输入密码',
    ],
    role: [
      (v: string) => !!v || '请选择角色',
    ],
  }

  private async login() {
    const form = this.$refs.form as any;
    if (!form.validate()) {
      return;
    }
    this.loginLoading = true;

    const response = await this.LOGIN(this.form);
    this.loginLoading = false;
    this.$router.push({ path: '/home' });
  }
}
</script>
