import{u as n,o as e,d as t,w as o,a,b as c,r as s,i as u}from"./index.8f27103f.js";import{_ as d}from"./u-input.34f2184f.js";import{_ as i,r}from"./uni-app.es.117eeecc.js";import{_ as l}from"./uni-card.9cdbe16e.js";import{_ as m}from"./u-modal.2fb8b156.js";import{_ as h}from"./u-button.b4b9cb03.js";import{_ as p,a as _}from"./u-row.74c7cb75.js";import"./u-icon.aeca22ef.js";var f=i({data:()=>({show:!1,content:"公告发布后不可修改，您是否确认添加公告？",addannouncement:{tno:"",cno:"",content:""},recive_content:[]}),methods:{open(){this.show=!0},async add(){console.log(this.addannouncement),this.addannouncement.tno=n("login_id"),this.addannouncement.cno=n("cno"),await this.$u.post("/teacher_user/insert-announcement",this.addannouncement),this.$u.toast("添加成功!"),this.$u.route({url:"pages/teacher_announcement/teacher_announcement",type:"to"})},async get_draft(){this.addannouncement.tno=n("login_id"),this.addannouncement.cno=n("cno"),console.log(this.addannouncement),this.recive_content=await this.$u.post("/teacher_user/get-draft-announcement",this.addannouncement),console.log("=============="),console.log(this.recive_content),this.addannouncement.content=this.recive_content[0].content,console.log(this.addannouncement.content)}},onNavigationBarButtonTap(){this.addannouncement.tno=n("login_id"),this.addannouncement.cno=n("cno"),this.recive_content=this.$u.post("/teacher_user/save-draft-announcement",this.addannouncement),console.log("=============="),console.log(this.recive_content),this.$u.toast("保存成功!")}},[["render",function(n,i,f,g,b,v){const w=r(s("u-input"),d),j=r(s("uni-card"),l),y=r(s("u-modal"),m),C=r(s("u-button"),h),V=r(s("u-col"),p),$=r(s("u-row"),_),x=u;return e(),t(x,null,{default:o((()=>[a(j,null,{default:o((()=>[a(w,{type:"textarea",modelValue:b.addannouncement.content,"onUpdate:modelValue":i[0]||(i[0]=n=>b.addannouncement.content=n),placeholder:"请输入公告内容",height:300,clearable:!0},null,8,["modelValue"])])),_:1}),a($,{gutter:"8",justify:"center"},{default:o((()=>[a(V,{span:"4"},{default:o((()=>[a(y,{modelValue:b.show,"onUpdate:modelValue":i[1]||(i[1]=n=>b.show=n),content:b.content,onConfirm:v.add,showCancelButton:"true","confirm-text":"确认","cancel-text":"取消"},null,8,["modelValue","content","onConfirm"]),a(C,{onClick:v.open,ripple:!0,type:"primary"},{default:o((()=>[c(" 确认添加 ")])),_:1},8,["onClick"])])),_:1}),a(V,{span:"4"},{default:o((()=>[a(C,{onClick:v.get_draft,ripple:!0,type:"success"},{default:o((()=>[c(" 恢复草稿 ")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-4d1a952c"]]);export{f as default};