webpackJsonp([3],{WDuK:function(e,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=s("tl5J"),i=s("ESwS"),r=s("+cKO"),d={mixins:[i.validationMixin],data:function(){return{title:"",showSnackbar:!1,sending:!1,user:{}}},methods:{validateUser:function(){this.$v.$touch(),this.$v.$invalid||(this.sending=!0,this.updateUser())},getValidationClass:function(e){var a=this.$v.user[e];if(a)return{"md-invalid":a.$invalid&&a.$dirty}},updateUser:function(){var e=this;this.remote.adm.users.update(this.$cookie.get("SecureToken"),this.user,function(){e.showSnackbar=!0,e.sending=!1})}},created:function(){var e=this;this.remote.adm.users.show(this.$cookie.get("SecureToken"),this.$route.params.id,function(a){e.user=a.data,e.title="#"+e.user.id+" - "+e.user.username})},validations:{user:{email:{required:r.required,email:r.email}}},components:{Dashboard:t.a}},n={render:function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("dashboard",{attrs:{title:e.title}},[s("form",{staticClass:"md-layout",attrs:{novalidate:""},on:{submit:function(e){e.preventDefault()}}},[s("md-card",{staticClass:"md-layout-item md-size-70 md-small-size-100 md-size-large-50"},[s("md-card-header",[s("h2",{staticClass:"md-card-title"},[e._v("Editar")])]),e._v(" "),e.user.id?s("md-card-content",[s("div",{staticClass:"md-layout md-gutter"},[s("div",{staticClass:"md-layout-item md-size-100"},[s("md-field",{class:e.getValidationClass("username")},[s("label",{attrs:{for:"username"}},[e._v("Nome: ")]),e._v(" "),s("md-input",{attrs:{name:"username",autocomplete:"name",id:"username",disabled:e.sending},model:{value:e.user.username,callback:function(a){e.$set(e.user,"username",a)},expression:"user.username"}})],1)],1),e._v(" "),s("div",{staticClass:"md-layout-item md-size-100"},[s("md-field",{class:e.getValidationClass("email")},[s("label",{attrs:{for:"email"}},[e._v("E-mail: ")]),e._v(" "),s("md-input",{attrs:{type:"email",name:"email",autocomplete:"email",id:"email",disabled:e.sending},model:{value:e.user.email,callback:function(a){e.$set(e.user,"email",a)},expression:"user.email"}})],1)],1),e._v(" "),s("div",{staticClass:"md-layout-item md-size-100"},[s("md-field",[s("label",{attrs:{for:"password"}},[e._v("Senha: ")]),e._v(" "),s("md-input",{attrs:{type:"password",name:"password",autocomplete:"password",id:"password",disabled:e.sending},model:{value:e.user.password,callback:function(a){e.$set(e.user,"password",a)},expression:"user.password"}})],1)],1),e._v(" "),s("div",{staticClass:"md-layout-item md-size-100"},[s("br"),e._v(" "),s("label",[e._v("Administrador?")]),e._v(" "),s("div",[s("md-radio",{attrs:{value:!1},model:{value:e.user.is_admin,callback:function(a){e.$set(e.user,"is_admin",a)},expression:"user.is_admin"}},[e._v("Não")]),e._v(" "),s("md-radio",{attrs:{value:!0},model:{value:e.user.is_admin,callback:function(a){e.$set(e.user,"is_admin",a)},expression:"user.is_admin"}},[e._v("Sim")])],1)]),e._v(" "),s("div",{staticClass:"md-layout-item md-size-100"},[s("br"),e._v(" "),s("label",[e._v("Ativo?")]),e._v(" "),s("div",[s("md-radio",{attrs:{value:!1},model:{value:e.user.active,callback:function(a){e.$set(e.user,"active",a)},expression:"user.active"}},[e._v("Não")]),e._v(" "),s("md-radio",{attrs:{value:!0},model:{value:e.user.active,callback:function(a){e.$set(e.user,"active",a)},expression:"user.active"}},[e._v("Sim")])],1)])])]):e._e(),e._v(" "),e.sending?s("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),e._v(" "),s("md-card-actions",[s("md-button",{staticClass:"md-primary",attrs:{type:"submit",disabled:e.sending},on:{click:e.validateUser}},[e._v(" Salvar ")])],1),e._v(" "),s("md-snackbar",{attrs:{"md-position":"center","md-duration":1/0,"md-active":e.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(a){e.showSnackbar=a}}},[s("span",[e._v("O registro foi atualizado")]),e._v(" "),s("md-button",{staticClass:"md-primary",on:{click:function(a){e.showSnackbar=!1}}},[e._v("Fechar")])],1)],1)],1)])},staticRenderFns:[]},l=s("VU/8")(d,n,!1,null,null,null);a.default=l.exports}});
//# sourceMappingURL=3.43b3ba69378c0e8f88f5.js.map