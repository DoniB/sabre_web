webpackJsonp([5],{"+0ln":function(e,t){},"/vdX":function(e,t){},"35HZ":function(e,t){},"4+hh":function(e,t){},"5LpN":function(e,t){},"8Z2Z":function(e,t,a){"use strict";a.d(t,"a",function(){return i});var i=function(e){return e.toString().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-").toLowerCase().replace(/&/g,"-e-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-*/,"").replace(/-*$/,"")}},HpXc:function(e,t){},IbKJ:function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={};a.d(i,"loadUser",function(){return _}),a.d(i,"unloadUser",function(){return g});var s,r=a("7+uW"),n=a("K/Lq"),o=a.n(n),d=a("Lgyv"),c=a.n(d),m=a("Dd8w"),u=a.n(m),l=a("NYxO"),p=a("YaEn"),f=a("bOdI"),v=a.n(f),h=(s={},v()(s,"USERNAME",function(e,t){e.username=t}),v()(s,"EMAIL",function(e,t){e.email=t}),v()(s,"IS_LOGGED",function(e,t){e.isLogged=t}),v()(s,"SECURE_TOKEN",function(e,t){e.secureToken=t}),v()(s,"IS_ADMIN",function(e,t){e.isAdmin=t}),s),_=function(e,t){var a=e.commit;a("USERNAME",t.username),a("EMAIL",t.email),a("IS_LOGGED",!0),a("SECURE_TOKEN",t.token),a("IS_ADMIN",t.is_admin)},g=function(e){var t=e.commit;t("USERNAME",""),t("EMAIL",""),t("IS_LOGGED",!1),t("SECURE_TOKEN",""),t("IS_ADMIN",!1)};r.default.use(l.a);var b=new l.a.Store({state:{username:"",email:"",isLogged:!1,secureToken:"",isAdmin:!1},mutations:h,actions:i}),C=a("8Z2Z"),y={data:function(){return{categories:{}}},methods:{friendlyUrl:function(e){return Object(C.a)(e)}},created:function(){var e=this;this.remote.categories.index(function(t){e.categories=t.data},function(e){return console.log("error loading categories at header",e)})}},k={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.categories,function(t){return a("md-button",{key:"hcat"+t.id,attrs:{to:{name:"category",params:{id:t.id,friendlyUrl:e.friendlyUrl(t.name)}}}},[e._v("\n    "+e._s(t.name)+"\n  ")])}))},staticRenderFns:[]};var w=a("VU/8")(y,k,!1,function(e){a("NsbN")},"data-v-7c22458c",null).exports,$=a("mtWM");p.a.beforeEach(function(e,t,a){e.matched.some(function(e){return e.meta.requiresAuth})?b.state.isLogged?a():a({path:"/sign",query:{redirect:e.fullPath}}):a()});var q={name:"App",data:function(){return{query:"",showCategoryBar:"true",recipesOnly:!1,showRecipesOnly:!1}},methods:u()({},Object(l.b)(["unloadUser","loadUser"]),{logOut:function(){this.unloadUser(),this.$cookie.delete("SecureToken"),p.a.currentRoute.meta.requiresAuth&&p.a.push({path:"/sign",query:{redirect:p.a.currentRoute.fullPath}})},doLogin:function(e){if(this.loadUser(e.data),"sign"===this.$route.name){var t=this.$route.query.redirect;t?p.a.push(t):p.a.push("/")}},search:function(){p.a.push({name:"index",query:{q:this.query}})},findComma:function(e){this.showRecipesOnly=e.indexOf(",")>=0}}),created:function(){var e=this.$cookie.get("SecureToken");e?$.get("https://sabre-api.herokuapp.com/api/v1/user",{headers:{"X-Secure-Token":e}}).then(this.doLogin).catch(this.logOut):console.log("no secure token"),this.query=this.$route.query.q},computed:{firstname:function(){return this.$store.state.username.split(" ")[0]}},components:{Categories:w},watch:{$route:function(e,t){e.query.q!==t.query.q&&(this.query=this.$route.query.q),this.showCategoryBar=!e.meta.requiresAuth}}},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-container",attrs:{id:"app"}},[a("md-toolbar",{staticClass:"md-medium"},[a("div",{staticClass:"md-toolbar-section-start"},[a("router-link",{attrs:{to:"/"}},[a("h3",{staticClass:"md-title"},[e._v("SABRE")])]),e._v(" "),a("md-button",{attrs:{to:"/"}},[a("md-icon",[e._v("home")]),e._v(" Inicio")],1)],1),e._v(" "),a("div",{attrs:{id:"search"}},[a("md-field",[a("label",[e._v("Separe ingredientes com virgula")]),e._v(" "),a("md-input",{staticClass:"md-default",attrs:{placeholder:"Procurar receitas"},on:{keypress:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.search(t):null},input:e.findComma},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}}),e._v(" "),e.showRecipesOnly?a("md-checkbox",{model:{value:e.recipesOnly,callback:function(t){e.recipesOnly=t},expression:"recipesOnly"}},[e._v("Só com estes ingredientes")]):e._e(),e._v(" "),a("md-button",{staticClass:"md-icon-button",on:{click:e.search}},[a("md-icon",[e._v("search")])],1)],1)],1),e._v(" "),a("div",{staticClass:"md-toolbar-section-end"},[a("md-button",{staticClass:"md-default",attrs:{to:"/painel/enviar-receita"}},[a("md-icon",[e._v("restaurant_menu")]),e._v(" Enviar Receita ")],1),e._v(" "),e.$store.state.isLogged?a("md-menu",{attrs:{"md-align-trigger":""}},[a("md-button",{staticClass:"md-default",attrs:{"md-menu-trigger":""}},[a("md-icon",[e._v("perm_identity")]),e._v(" "+e._s(e.firstname))],1),e._v(" "),a("md-menu-content",[a("md-menu-item",{staticClass:"menu-link",attrs:{to:"/painel"}},[e._v("Minha Conta")]),e._v(" "),a("md-menu-item",{on:{click:e.logOut}},[e._v("Sair")])],1)],1):a("md-button",{staticClass:"md-default",attrs:{to:"/sign"}},[a("md-icon",[e._v("perm_identity")]),e._v(" Entrar")],1)],1)]),e._v(" "),e.showCategoryBar?a("md-toolbar",{staticClass:"md-primary md-medium"},[a("categories")],1):e._e(),e._v(" "),a("div",{staticClass:"md-layout router-body"},[a("div",{staticClass:"md-layout-item md-size-100"},[a("router-view")],1)])],1)},staticRenderFns:[]};var R=a("VU/8")(q,x,!1,function(e){a("r3Yp")},"data-v-16e60730",null).exports,E=a("mtWM"),S=a.n(E),M="https://sabre-api.herokuapp.com/api/v1",A={users:{recipe:{show:function(e,t,a,i){S.a.get(M+"/users/recipe/"+t,{headers:{"X-Secure-Token":e}}).then(a).catch(function(e){i&&i(e)})},create:function(e,t,a,i){S.a.post(M+"/users/recipe",t,{headers:{"X-Secure-Token":e}}).then(function(e){return a(e)}).catch(function(e){i&&i(e)})},update:function(e,t,a,i){var s={name:t.name,ingredients:t.ingredients,directions:t.directions,status:t.status};S.a.patch(M+"/users/recipe/"+t.id,s,{headers:{"X-Secure-Token":e}}).then(a).catch(function(e){i&&i(e)})},index:function(e,t,a,i){S.a.get(M+"/users/recipe",{params:t,headers:{"X-Secure-Token":e}}).then(a).catch(function(e){i&&i(e)})}}},recipes:{index:function(e,t,a){S.a.get(M+"/recipes",{params:e}).then(t).catch(function(e){a&&a(e)})},comments:{create:function(e,t,a,i,s){S.a.post(M+"/recipes/"+t+"/comments",{text:a},{headers:{"X-Secure-Token":e}}).then(function(e){return i(e)}).catch(function(e){s&&s(e)})},index:function(e,t,a){S.a.get(M+"/recipes/"+e+"/comments").then(function(e){return t(e)}).catch(function(e){a&&a(e)})}},rating:{show:function(e,t,a,i){S.a.get(M+"/recipes/"+e+"/rating",{headers:{"X-Secure-Token":t}}).then(function(e){return a(e)}).catch(function(e){i&&i(e)})},create:function(e,t,a,i,s){S.a.post(M+"/recipes/"+e+"/rating",{stars:t},{headers:{"X-Secure-Token":a}}).then(function(e){return i(e)}).catch(function(e){s&&s(e)})}}},categories:{index:function(e,t){S.a.get(M+"/categories").then(function(t){return e(t)}).catch(function(e){t&&t(e)})}},adm:{users:{index:function(e,t,a,i,s){var r="?page="+t;a&&(r+="&q="+a),S.a.get(M+"/adm/users"+r,{headers:{"X-Secure-Token":e}}).then(function(e){return i(e)}).catch(function(e){s&&s(e)})},show:function(e,t,a,i){S.a.get(M+"/adm/users/"+t,{headers:{"X-Secure-Token":e}}).then(function(e){return a(e)}).catch(function(e){i&&i(e)})},update:function(e,t,a,i){var s={username:t.username,email:t.email,is_admin:t.is_admin,active:t.active};t.password&&(s.password=t.password),S.a.patch(M+"/adm/users/"+t.id,s,{headers:{"X-Secure-Token":e}}).then(function(e){return a(e)}).catch(function(e){i&&i(e)})},create:function(e,t,a,i){S.a.post(M+"/adm/users",t,{headers:{"X-Secure-Token":e}}).then(function(e){return a(e)}).catch(function(e){i&&i(e.response)})}}}},U={computed:{remote:function(){return A}}},F={methods:{isAuth:function(){return!!this.$cookie.get("SecureToken")}}},L=a("EqLo");a("4+hh"),a("giDI");r.default.use(L.MdButton),r.default.use(L.MdContent),r.default.use(L.MdTabs),r.default.use(L.MdToolbar),r.default.use(L.MdIcon),r.default.use(L.MdCard),r.default.use(L.MdField),r.default.use(L.MdProgress),r.default.use(L.MdSnackbar),r.default.use(o.a),r.default.use(L.MdMenu),r.default.use(L.MdList),r.default.use(L.MdApp),r.default.use(L.MdDrawer),r.default.use(L.MdRadio),r.default.use(L.MdDivider),r.default.use(c.a),r.default.mixin(U),r.default.mixin(F),r.default.config.productionTip=!1,new r.default({el:"#app",router:p.a,store:b,components:{App:R},template:"<App/>"})},NsbN:function(e,t){},QlOn:function(e,t){},YaEn:function(e,t,a){"use strict";var i=a("7+uW"),s=a("/ocq"),r=a("8Z2Z"),n=a("X+2x"),o=a.n(n),d={mixins:[a("rEVH").a],props:{recipe:{type:Object,required:!0},showAdminEdit:{type:Boolean,default:!1}},computed:{ingredients:function(){var e="";return this.recipe.ingredients.split("\n").forEach(function(t){e+="<p>"+t+"</p>"}),e},friendlyUrl:function(){return Object(r.a)(this.recipe.name)}},components:{StarRating:o.a}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("md-card",[a("md-button",{staticClass:"md-fab md-fab-top-right md-mini md-accent"},[a("md-icon",[e._v("favorite_border")])],1),e._v(" "),a("md-card-media",[a("img",{attrs:{src:"/static/img/demo.jpg",alt:"Demo"}})]),e._v(" "),a("md-card-header",[a("div",{staticClass:"md-title"},[e._v(e._s(e.recipe.name))]),e._v(" "),a("div",{staticClass:"md-subhead"},[e._v(e._s(e.recipe.owner))]),e._v(" "),a("div",{staticClass:"md-subhead recipe-date"},[e._v(e._s(e._f("timePassed")(e.recipe.created_at)))]),e._v(" "),a("div",{staticClass:"md-layout md-alignment-top-right"},[a("star-rating",{attrs:{rating:e.recipe.average_stars,"star-size":20,"rounded-corners":"","show-rating":!1,padding:1,"read-only":""}})],1)]),e._v(" "),a("md-card-expand",[a("md-card-actions",{attrs:{"md-alignment":"space-between"}},[a("div",[1===e.recipe.status?a("md-button",{attrs:{to:{name:"recipe.show",params:{id:e.recipe.id,friendlyUrl:e.friendlyUrl}}}},[e._v("Receita")]):e._e(),e._v(" "),e.showAdminEdit?a("md-button",{attrs:{to:{name:"dashboard.recipes.edit",params:{id:e.recipe.id}}}},[e._v("Editar")]):e._e()],1),e._v(" "),a("md-card-expand-trigger",{on:{click:function(t){e.showRecipe=!e.showRecipe}}},[a("md-button",[e._v("Ingredientes")])],1)],1),e._v(" "),a("md-card-expand-content",[a("md-card-content",{domProps:{innerHTML:e._s(e.ingredients)}})],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,c,!1,function(e){a("/vdX")},"data-v-0c223b8f",null).exports,u=a("ks6x"),l={name:"index",data:function(){return{recipes:[],isLoading:!0,isLoadingMore:!1,hasMore:!1,page:0}},components:{recipeCard:m,loading:u.a},methods:{setRecipes:function(e){var t=this;e.data.forEach(function(e){t.recipes.push(e)}),this.isLoading=!1,this.isLoadingMore=!1,this.hasMore=20===e.data.length,this.page++},loadRecipes:function(){this.isLoadingMore=!0;var e={page:this.page};this.$route.query.q&&(e.q=this.$route.query.q),this.$route.params.id&&(e.category=this.$route.params.id),this.remote.recipes.index(e,this.setRecipes,function(e){console.log(e)})}},created:function(){this.loadRecipes()},watch:{$route:function(e,t){this.isLoading=!0,this.recipes=[],this.page=0,this.loadRecipes({q:e.query.q})}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.isLoading?a("loading"):a("div",{staticClass:"md-layout md-alignment-top-center"},e._l(e.recipes,function(e){return a("recipe-card",{key:e.id,attrs:{recipe:e}})})),e._v(" "),e.hasMore?a("div",[a("p",{staticStyle:{"text-align":"center"}},[a("md-button",{staticClass:"md-accent",attrs:{disabled:e.isLoadingMore},on:{click:e.loadRecipes}},[e._v("Mais Receitas "),a("md-icon",[e._v("expand_more")])],1)],1)]):e._e()],1)},staticRenderFns:[]},f=a("VU/8")(l,p,!1,null,null,null).exports,v=a("Dd8w"),h=a.n(v),_=a("ESwS"),g=a("+cKO"),b=a("NYxO"),C=a("mtWM"),y={name:"sign-up",mixins:[_.validationMixin],data:function(){return{showSnackbar:!1,form:{username:"",email:"",password:"",password_confirmation:""},sending:!1}},methods:h()({validateUser:function(){this.$v.$touch(),this.$v.$invalid||(this.sending=!0,this.createUser())},getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},createUser:function(){var e=this;C.post("https://sabre-api.herokuapp.com/api/v1/user",{username:this.form.username,email:this.form.email,password:this.form.password,password_confirmation:this.form.password_confirmation}).then(function(t){return e.userCreated(t)}).catch(this.requestError)},userCreated:function(e){this.loadUser(e.data),this.$cookie.set("SecureToken",e.data.token,30);var t=this.$route.query.redirect;t?H.push(t):H.push("/")},requestError:function(){this.sending=!1,this.showSnackbar=!0}},Object(b.b)(["loadUser"])),validations:{form:{username:{required:g.required,minLength:Object(g.minLength)(3)},email:{required:g.required,email:g.email},password:{required:g.required,minLength:Object(g.minLength)(6)},password_confirmation:{required:g.required,sameAs:Object(g.sameAs)("password")}}},created:function(){this.$store.state.isLogged&&H.push("/")}},k={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("md-card-content",[a("div",{staticClass:"md-layout md-gutter"},[a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("username")},[a("label",{attrs:{for:"username"}},[e._v("Nome: ")]),e._v(" "),a("md-input",{attrs:{name:"username",autocomplete:"name",id:"username",disabled:e.sending},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}}),e._v(" "),e.$v.form.username.required?e.$v.form.username.minLength?e._e():a("span",{staticClass:"md-error"},[e._v("É necessário informar o nome valido")]):a("span",{staticClass:"md-error"},[e._v("É necessário informar o nome")])],1)],1),e._v(" "),a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("email")},[a("label",{attrs:{for:"email"}},[e._v("E-mail: ")]),e._v(" "),a("md-input",{attrs:{type:"email",name:"email",autocomplete:"email",id:"email",disabled:e.sending},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),e.$v.form.email.required?e.$v.form.email.email?e._e():a("span",{staticClass:"md-error"},[e._v("É necessário informar um e-mail valido")]):a("span",{staticClass:"md-error"},[e._v("É necessário informar um e-mail")])],1)],1),e._v(" "),a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("password")},[a("label",{attrs:{for:"password"}},[e._v("Senha: ")]),e._v(" "),a("md-input",{attrs:{type:"password",name:"password",autocomplete:"password",id:"password",disabled:e.sending},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),e.$v.form.password.required?e.$v.form.password.minLength?e._e():a("span",{staticClass:"md-error"},[e._v("A senha deve ter mais de 6 caracteres")]):a("span",{staticClass:"md-error"},[e._v("É necessário informar uma senha")])],1)],1),e._v(" "),a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("password_confirmation")},[a("label",{attrs:{for:"password_confirmation"}},[e._v("Confirme senha: ")]),e._v(" "),a("md-input",{attrs:{type:"password",name:"password_confirmation",autocomplete:"password_confirmation",id:"password_confirmation",disabled:e.sending},model:{value:e.form.password_confirmation,callback:function(t){e.$set(e.form,"password_confirmation",t)},expression:"form.password_confirmation"}}),e._v(" "),e.$v.form.password_confirmation.required?e.$v.form.password_confirmation.sameAs?e._e():a("span",{staticClass:"md-error"},[e._v("As senhas não são iguais")]):a("span",{staticClass:"md-error"},[e._v("É necessário confirmar a senha")])],1)],1)])]),e._v(" "),e.sending?a("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),e._v(" "),a("md-card-actions",[a("md-button",{staticClass:"md-primary",attrs:{type:"submit",disabled:e.sending},on:{click:e.validateUser}},[e._v(" Cadastrar ")])],1),e._v(" "),a("md-snackbar",{attrs:{"md-position":"center","md-duration":1/0,"md-active":e.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(t){e.showSnackbar=t}}},[a("span",[e._v("Ops, algo deu errado :( Por favor tente novamente mais tarde.")]),e._v(" "),a("md-button",{staticClass:"md-primary",on:{click:function(t){e.showSnackbar=!1}}},[e._v("Fechar")])],1)],1)},staticRenderFns:[]};var w=a("VU/8")(y,k,!1,function(e){a("5LpN")},null,null).exports,$=a("mtWM"),q={name:"sign-in",mixins:[_.validationMixin],data:function(){return{showSnackbar:!1,form:{email:"",password:""},sending:!1}},methods:h()({validateUser:function(){this.$v.$touch(),this.$v.$invalid||(this.sending=!0,this.doLogin())},getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},doLogin:function(){var e=this;$.post("https://sabre-api.herokuapp.com/api/v1/sign_in",{email:this.form.email,password:this.form.password}).then(function(t){return e.userCreated(t)}).catch(this.requestError)},userCreated:function(e){this.loadUser(e.data),this.$cookie.set("SecureToken",e.data.token,30);var t=this.$route.query.redirect;t?H.push(t):H.push("/")},requestError:function(){this.sending=!1,this.showSnackbar=!0}},Object(b.b)(["loadUser"])),validations:{form:{email:{required:g.required,email:g.email},password:{required:g.required}}},created:function(){this.$store.state.isLogged&&H.push("/")}},x={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("md-card-content",[a("div",{staticClass:"md-layout md-gutter"},[a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("email")},[a("label",{attrs:{for:"email"}},[e._v("E-mail: ")]),e._v(" "),a("md-input",{attrs:{type:"email",name:"email",autocomplete:"email",id:"email",disabled:e.sending},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}}),e._v(" "),e.$v.form.email.required?e.$v.form.email.email?e._e():a("span",{staticClass:"md-error"},[e._v("É necessário informar um e-mail valido")]):a("span",{staticClass:"md-error"},[e._v("É necessário informar um e-mail")])],1)],1),e._v(" "),a("div",{staticClass:"md-layout-item md-medium-size-100"},[a("md-field",{class:e.getValidationClass("password")},[a("label",{attrs:{for:"password"}},[e._v("Senha: ")]),e._v(" "),a("md-input",{attrs:{type:"password",name:"password",autocomplete:"password",id:"password",disabled:e.sending},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}}),e._v(" "),e.$v.form.password.required?e.$v.form.password.minLength?e._e():a("span",{staticClass:"md-error"},[e._v("A senha deve ter mais de 6 caracteres")]):a("span",{staticClass:"md-error"},[e._v("É necessário informar uma senha")])],1)],1)])]),e._v(" "),e.sending?a("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),e._v(" "),a("md-card-actions",[a("md-button",{staticClass:"md-primary",attrs:{type:"submit"},on:{click:e.validateUser}},[e._v(" Entrar ")])],1),e._v(" "),a("md-snackbar",{attrs:{"md-position":"center","md-duration":1/0,"md-active":e.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(t){e.showSnackbar=t}}},[a("span",[e._v("Por favor verifique o e-mail e a senha")]),e._v(" "),a("md-button",{staticClass:"md-primary",on:{click:function(t){e.showSnackbar=!1}}},[e._v("Fechar")])],1)],1)},staticRenderFns:[]};var R=a("VU/8")(q,x,!1,function(e){a("bQ6b")},null,null).exports;i.default.component("sign-up",w),i.default.component("sign-in",R);var E={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("form",{staticClass:"md-layout",attrs:{novalidate:""},on:{submit:function(e){e.preventDefault()}}},[a("md-card",{staticClass:"md-layout-item md-size-50 md-xsmall-size-90 md-small-size-50 md-medium-size-40 md-large-size-25 md-xlarge-size-15 sign-card"},[a("md-card-header",[a("md-tabs",{attrs:{"md-alignment":"centered"}},[a("md-tab",{attrs:{id:"signin","md-label":"Entrar"},on:{click:function(t){e.signup=!1}}}),e._v(" "),a("md-tab",{staticClass:"mutted",attrs:{id:"signup","md-label":"Cadastrar"},on:{click:function(t){e.signup=!0}}})],1)],1),e._v(" "),e.signup?a("sign-up"):a("sign-in")],1)],1)])},staticRenderFns:[]};var S=a("VU/8")({name:"sign",data:function(){return{signup:!1}}},E,!1,function(e){a("iDUj")},null,null).exports,M=a("tl5J"),A={name:"sendRecipe",mixins:[_.validationMixin],data:function(){return{showSnackbar:!1,sending:!1,showRecipeCreated:!1,categories:{},form:{name:"",ingredients:"",directions:"",category_id:null}}},methods:{validateRecipe:function(){console.log("todo: validateRecipe"),this.$v.$touch(),this.$v.$invalid||(this.sending=!0,this.createRecipe())},createRecipe:function(){var e=this.$cookie.get("SecureToken");this.remote.users.recipe.create(e,this.form,this.recipeCreated,this.requestError)},recipeCreated:function(e){this.showRecipeCreated=!0},requestError:function(){this.sending=!1,this.showSnackbar=!0},getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},loadCategories:function(e){this.categories=e.data}},components:{dashboard:M.a},validations:{form:{name:{required:g.required},ingredients:{required:g.required},directions:{required:g.required},category_id:{required:g.required}}},created:function(){this.remote.categories.index(this.loadCategories,function(e){return console.log("error loading categories",e)})}},U={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dashboard",{attrs:{title:"Enviar receita"}},[e.showRecipeCreated?a("md-card",{staticClass:"md-layout-item md-size-50 md-small-size-90 center-vertically center-horizontally"},[a("md-card-header",[a("div",{staticClass:"md-title center-align"},[e._v("\n          Sua receita foi enviada. "),a("br"),e._v("\n          Obrigado!\n        ")])])],1):a("form",{staticClass:"md-layout",attrs:{novalidate:""},on:{submit:function(e){e.preventDefault()}}},[a("md-card",{staticClass:"md-layout-item md-size-80 md-small-size-90 md-xlarge-size-60 sign-card"},[a("md-card-header",[a("div",{staticClass:"md-title"},[e._v("Cadastro de Receitas")])]),e._v(" "),a("md-card-content",[a("md-field",[a("label",[e._v("Foto")]),e._v(" "),a("md-file",{attrs:{placeholder:"Foto (opcional)",disabled:e.sending}})],1),e._v(" "),a("md-field",{class:e.getValidationClass("name")},[a("label",[e._v("Nome da receita")]),e._v(" "),a("md-input",{attrs:{required:"",disabled:e.sending},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),e._v(" "),e.$v.form.name.required?e._e():a("span",{staticClass:"md-error"},[e._v("É necessário informar o nome da receita")])],1),e._v(" "),a("md-field",{class:e.getValidationClass("category_id")},[a("md-select",{attrs:{name:"category",id:"category",placeholder:"Categoria"},model:{value:e.form.category_id,callback:function(t){e.$set(e.form,"category_id",t)},expression:"form.category_id"}},e._l(e.categories,function(t){return a("md-option",{key:"cat"+t.id,attrs:{value:t.id}},[e._v("\n                      "+e._s(t.name))])})),e._v(" "),e.$v.form.category_id.required?e._e():a("span",{staticClass:"md-error"},[e._v("Ops, está faltando a categoria")])],1),e._v(" "),a("md-field",{class:e.getValidationClass("ingredients")},[a("label",[e._v("Ingredientes")]),e._v(" "),a("md-textarea",{attrs:{id:"text-ingredients",required:"",disabled:e.sending},model:{value:e.form.ingredients,callback:function(t){e.$set(e.form,"ingredients",t)},expression:"form.ingredients"}}),e._v(" "),e.$v.form.ingredients.required?e._e():a("span",{staticClass:"md-error"},[e._v("Ops, está faltando os ingredientes")])],1),e._v(" "),a("md-field",{class:e.getValidationClass("directions")},[a("label",[e._v("Modo de preparo")]),e._v(" "),a("md-textarea",{attrs:{id:"text-directions",required:"",disabled:e.sending},model:{value:e.form.directions,callback:function(t){e.$set(e.form,"directions",t)},expression:"form.directions"}}),e._v(" "),e.$v.form.directions.required?e._e():a("span",{staticClass:"md-error"},[e._v("Ops, está faltando modo de preparo")])],1)],1),e._v(" "),e.sending?a("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),e._v(" "),a("md-card-actions",[a("md-button",{staticClass:"md-primary",attrs:{type:"submit",disabled:e.sending},on:{click:e.validateRecipe}},[e._v(" Enviar ")])],1)],1),e._v(" "),a("md-snackbar",{attrs:{"md-position":"center","md-duration":1/0,"md-active":e.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(t){e.showSnackbar=t}}},[a("span",[e._v("Ops, algo deu errado :( Por favor tente novamente mais tarde.")]),e._v(" "),a("md-button",{staticClass:"md-primary",on:{click:function(t){e.showSnackbar=!1}}},[e._v("Fechar")])],1)],1)],1)},staticRenderFns:[]};var F=a("VU/8")(A,U,!1,function(e){a("35HZ")},"data-v-1cfff980",null).exports,L={render:function(){var e=this.$createElement;return(this._self._c||e)("div",[this._v("\n    Página nâo encontrada\n")])},staticRenderFns:[]},O=a("VU/8")(null,L,!1,null,null,null).exports,T={data:function(){return{title:"Minha Conta"}},components:{dashboardFrame:M.a}},V={render:function(){var e=this.$createElement,t=this._self._c||e;return t("dashboard-frame",{attrs:{title:this.title}},[t("div",{attrs:{id:"dashboard-index"}},[this._v("dashboard index placeholder")])])},staticRenderFns:[]},z=a("VU/8")(T,V,!1,null,null,null).exports,D=a("ypr2"),I={data:function(){return{title:"Receitas",loading:!0,recipes:[],recipesFilter:"my",disableFilterWatch:!0,searchQuery:""}},computed:{isAdmin:function(){return this.$store.state.isAdmin}},methods:{loadRecipes:function(){this.loading=!0;var e={};switch(this.recipesFilter){case"waiting_activation":e.status="waiting_activation";case"all":e.all_users=1}this.searchQuery&&(e.q=this.searchQuery);var t=this.$cookie.get("SecureToken");this.remote.users.recipe.index(t,e,this.recipesLoaded,function(e){return console.log(e)})},recipesLoaded:function(e){this.recipes=e.data,this.loading=!1}},components:{dashboardFrame:M.a,recipeCard:m,centerContent:D.a,Loading:u.a},created:function(){this.isAdmin&&(this.recipesFilter="waiting_activation",this.disableFilterWatch=!1),this.loadRecipes()},watch:{recipesFilter:function(){this.disableFilterWatch||this.loadRecipes()}}},N={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dashboard-frame",{attrs:{title:e.title}},[a("div",[e.loading?a("loading"):a("div",[e.isAdmin?a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-size-80 recipe-filter"},[a("md-radio",{attrs:{value:"all"},model:{value:e.recipesFilter,callback:function(t){e.recipesFilter=t},expression:"recipesFilter"}},[e._v("Todas As Receitas")]),e._v(" "),a("md-radio",{attrs:{value:"waiting_activation"},model:{value:e.recipesFilter,callback:function(t){e.recipesFilter=t},expression:"recipesFilter"}},[e._v("Receitas Para Aprovar")]),e._v(" "),a("md-radio",{attrs:{value:"my"},model:{value:e.recipesFilter,callback:function(t){e.recipesFilter=t},expression:"recipesFilter"}},[e._v("Minhas Receitas")])],1)]):e._e(),e._v(" "),a("div",{staticClass:"md-layout"},[a("div",{staticClass:"md-layout-item md-size-80 recipe-filter"},[a("md-field",[a("md-input",{attrs:{placeholder:"Procurar por nome"},on:{keypress:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.loadRecipes(t):null}},model:{value:e.searchQuery,callback:function(t){e.searchQuery=t},expression:"searchQuery"}}),e._v(" "),a("md-button",{staticClass:"md-icon-button",on:{click:e.loadRecipes}},[a("md-icon",[e._v("search")])],1)],1)],1)]),e._v(" "),e._l(e.recipes,function(e){return a("recipe-card",{key:"recipe"+e.id,attrs:{showAdminEdit:!0,recipe:e}})})],2)],1)])},staticRenderFns:[]};var X=a("VU/8")(I,N,!1,function(e){a("HpXc")},"data-v-4a715bc9",null).exports,P={mixins:[_.validationMixin],data:function(){return{title:"Receita",loading:!0,sending:!1,showSnackbar:!1,snackMessage:"",form:{}}},methods:{getValidationClass:function(e){var t=this.$v.form[e];if(t)return{"md-invalid":t.$invalid&&t.$dirty}},validateRecipe:function(){console.log("todo: validateRecipe"),this.$v.$touch(),this.$v.$invalid||(this.sending=!0,this.updateRecipe())},updateRecipe:function(){var e=this.$cookie.get("SecureToken");this.remote.users.recipe.update(e,this.form,this.recipeUpdated,this.requestError)},recipeUpdated:function(e){this.snackMessage="Receita atualizada.",this.showSnackbar=!0,console.log(e.data),setTimeout(function(){H.push({name:"dashboard.recipes"})},5e3)},requestError:function(){this.snackMessage="Ops, algo deu errado :( Por favor tente novamente mais tarde.",this.showSnackbar=!0}},components:{dashboardFrame:M.a,centerContent:D.a},created:function(){var e=this,t=this.$cookie.get("SecureToken");this.remote.users.recipe.show(t,this.$route.params.id,function(t){e.form=t.data,e.loading=!1,e.title="Receita #"+e.$route.params.id+" - "+e.form.name},function(e){return console.log(e)})},validations:{form:{name:{required:g.required},ingredients:{required:g.required},directions:{required:g.required}}}},j={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("dashboard-frame",{attrs:{title:e.title}},[a("form",{staticClass:"md-layout",attrs:{novalidate:""},on:{submit:function(e){e.preventDefault()}}},[a("md-card",{staticClass:"md-layout-item md-size-80 md-small-size-90 sign-card"},[a("md-card-header",[a("div",{staticClass:"md-title"},[e._v(e._s(e.title))])]),e._v(" "),a("md-card-content",[a("md-field",[a("label",[e._v("Foto")]),e._v(" "),a("md-file",{attrs:{placeholder:"Foto (opcional)",disabled:e.sending}})],1),e._v(" "),a("md-field",{class:e.getValidationClass("name")},[a("label",[e._v("Nome da receita")]),e._v(" "),a("md-input",{attrs:{required:"",disabled:e.sending||e.loading},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}}),e._v(" "),e.$v.form.name.required?e._e():a("span",{staticClass:"md-error"},[e._v("É necessário informar o nome da receita")])],1),e._v(" "),a("md-field",{class:e.getValidationClass("ingredients")},[a("label",[e._v("Ingredientes")]),e._v(" "),a("md-textarea",{attrs:{id:"text-ingredients",required:"",disabled:e.sending||e.loading},model:{value:e.form.ingredients,callback:function(t){e.$set(e.form,"ingredients",t)},expression:"form.ingredients"}}),e._v(" "),e.$v.form.ingredients.required?e._e():a("span",{staticClass:"md-error"},[e._v("Ops, está faltando os ingredientes")])],1),e._v(" "),a("md-field",{class:e.getValidationClass("directions")},[a("label",[e._v("Modo de preparo")]),e._v(" "),a("md-textarea",{attrs:{id:"text-directions",required:"",disabled:e.sending||e.loading},model:{value:e.form.directions,callback:function(t){e.$set(e.form,"directions",t)},expression:"form.directions"}}),e._v(" "),e.$v.form.directions.required?e._e():a("span",{staticClass:"md-error"},[e._v("Ops, está faltando modo de preparo")])],1),e._v(" "),a("div",[a("md-radio",{attrs:{disabled:e.sending||e.loading,value:0},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("Aguardando Ativação")]),e._v(" "),a("md-radio",{attrs:{disabled:e.sending||e.loading,value:1},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("Ativo")]),e._v(" "),a("md-radio",{attrs:{disabled:e.sending||e.loading,value:2},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("Pausado")]),e._v(" "),a("md-radio",{attrs:{disabled:e.sending||e.loading,value:4},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[e._v("Rejeitado")])],1)],1),e._v(" "),e.sending||e.loading?a("md-progress-bar",{attrs:{"md-mode":"indeterminate"}}):e._e(),e._v(" "),a("md-card-actions",[a("md-button",{staticClass:"md-primary",attrs:{type:"submit",disabled:e.sending||e.loading},on:{click:e.validateRecipe}},[e._v(" Enviar ")])],1)],1),e._v(" "),a("md-snackbar",{attrs:{"md-position":"center","md-duration":1/0,"md-active":e.showSnackbar,"md-persistent":""},on:{"update:mdActive":function(t){e.showSnackbar=t}}},[a("span",[e._v(e._s(e.snackMessage))]),e._v(" "),a("md-button",{staticClass:"md-primary",on:{click:function(t){e.showSnackbar=!1}}},[e._v("Fechar")])],1)],1)])},staticRenderFns:[]};var W=a("VU/8")(P,j,!1,function(e){a("QlOn")},"data-v-4fd62bee",null).exports;i.default.use(s.a);var H=t.a=new s.a({mode:"history",routes:[{path:"/",name:"index",component:f},{path:"/sign",name:"sign",component:S},{path:"/painel/enviar-receita",name:"sendRecipe",component:F,meta:{requiresAuth:!0}},{path:"/painel",name:"dashboardIndex",component:z,meta:{requiresAuth:!0}},{path:"/painel/receitas",name:"dashboard.recipes",component:X,meta:{requiresAuth:!0}},{path:"/painel/receitas/:id",name:"dashboard.recipes.edit",component:W,meta:{requiresAuth:!0}},{path:"/receita/:id/:friendlyUrl",name:"recipe.show",component:function(){return a.e(0).then(a.bind(null,"mDmC"))}},{path:"/categoria/:id/:friendlyUrl",name:"category",component:f},{path:"/painel/users",name:"dashboard.users",component:function(){return a.e(1).then(a.bind(null,"+u/8"))},meta:{requiresAuth:!0}},{path:"/painel/users/:id/edit",name:"dashboard.users.edit",component:function(){return a.e(3).then(a.bind(null,"WDuK"))},meta:{requiresAuth:!0}},{path:"/painel/users/new",name:"dashboard.users.new",component:function(){return a.e(2).then(a.bind(null,"boDw"))},meta:{requiresAuth:!0}},{path:"*",component:O}]})},bQ6b:function(e,t){},giDI:function(e,t){},iDUj:function(e,t){},ks6x:function(e,t,a){"use strict";var i={components:{centerContent:a("ypr2").a}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("center-content",{staticStyle:{"margin-top":"10%"}},[t("md-progress-spinner",{attrs:{"md-diameter":200,"md-stroke":10,"md-mode":"indeterminate"}})],1)},staticRenderFns:[]},r=a("VU/8")(i,s,!1,null,null,null);t.a=r.exports},r3Yp:function(e,t){},rEVH:function(e,t,a){"use strict";var i={filters:{timePassed:function(e){var t=new Date(e),a=new Date,i=Math.abs(a.getTime()-t.getTime()),s=Math.round(i/864e5);if(0===s)return"hoje";if(1===s)return"1 dia";if(s<30)return s+" dias";var r=Math.round(s/30);return 1===r?"1 mês":r+" meses"}}};t.a=i},tl5J:function(e,t,a){"use strict";var i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("md-app",[a("md-app-toolbar",{staticClass:"md-primary"},[a("span",{staticClass:"md-title"},[e._v(e._s(e.frameTitle))])]),e._v(" "),a("md-app-drawer",{attrs:{"md-permanent":"card"}},[a("md-list",[a("md-list-item",{attrs:{to:{name:"dashboardIndex"}}},[a("md-icon",[e._v("note")]),e._v(" "),a("span",{staticClass:"md-list-item-text"},[e._v("Inicio")])],1),e._v(" "),a("md-list-item",{attrs:{to:"/"}},[a("md-icon",[e._v("favorite")]),e._v(" "),a("span",{staticClass:"md-list-item-text"},[e._v("Favoritos")])],1),e._v(" "),e.isAdmin?a("md-list-item",{attrs:{to:{name:"dashboard.recipes"}}},[a("md-icon",[e._v("receipt")]),e._v(" "),a("span",{staticClass:"md-list-item-text"},[e._v("Receitas")])],1):a("md-list-item",{attrs:{to:{name:"dashboard.recipes"}}},[a("md-icon",[e._v("receipt")]),e._v(" "),a("span",{staticClass:"md-list-item-text"},[e._v("Minhas Receitas")])],1),e._v(" "),e.isAdmin?a("md-list-item",{attrs:{to:{name:"dashboard.users"}}},[a("md-icon",[e._v("people")]),e._v(" "),a("span",{staticClass:"md-list-item-text"},[e._v("Usuários")])],1):e._e()],1)],1),e._v(" "),a("md-app-content",[e._t("default")],2)],1)],1)},staticRenderFns:[]};var s=a("VU/8")({props:["title"],computed:{frameTitle:function(){return this.title?this.title:"Dashboard"},isAdmin:function(){return this.$store.state.isAdmin}}},i,!1,function(e){a("IbKJ")},"data-v-84fd1686",null);t.a=s.exports},ypr2:function(e,t,a){"use strict";var i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"center-content"},[t("div",{staticClass:"content-to-center",style:{width:this.computedWidth,height:this.computedHeight}},[this._t("default")],2)])},staticRenderFns:[]};var s=a("VU/8")({props:["width","height"],computed:{computedWidth:function(){return this.width?this.width:"200px"},computedHeight:function(){return this.height?this.height:"200px"}}},i,!1,function(e){a("+0ln")},"data-v-43370d58",null);t.a=s.exports}},["NHnr"]);
//# sourceMappingURL=app.0dfc67d1ce06225b1b9d.js.map