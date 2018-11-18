<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark
                   color="primary">
          <v-toolbar-title>登录</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat>
            注册
          </v-btn>
          <!-- <v-tooltip bottom>
            <span>Source</span>
          </v-tooltip> -->
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field prepend-icon="person"
                          name="login"
                          :rules="formRules.phone"
                          v-model="form.phone"
                          label="Login"
                          type="text">
            </v-text-field>
            <v-text-field prepend-icon="lock"
                          name="password"
                          :rules="formRules.password"
                          v-model="form.password"
                          label="Password"
                          type="password">
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary"
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

interface FormType {
  phone: string;
  password: string;
  role: 1 | 2 | 3,
}

const UserStore = namespace('auth')

@Component

export default class VuexLogin extends Vue {

  @UserStore.Action('LOGIN') LOGIN!: Auth.LOGIN;

  private form: FormType = {
    phone: '',
    password: '',
    role: 2,
  };

  private formRules = {
    phone: [
      (v: string) => !!v || '请输入手机号',
      (v: string) => (/[\d]{11}/.test(v) || '无效的手机号'),
    ],
    password: [
      (v: string) => !!v || '请输入密码',
    ],
  }

  private async login() {
    const form = this.$refs.form as any;
    if (!form.validate()) {
      return;
    }
    const response = await this.LOGIN(this.form);
    console.log(response);
    // await this.setAuth(this.form.password);
    // this.$router.push({ path: value });
  }
}
</script>
