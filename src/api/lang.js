import VueI18n from 'vue-i18n'
import Vue from "vue";
Vue.use(VueI18n)
import data from './langData'
import {getQueryVariable} from './util'
let countryCodeArr=['en','ar','de','es','fr','hi','in','tr',"ko","zh","ja"];
let countryCode=getQueryVariable("lang") || 'en';
let countryResult=null;
for(var x of countryCodeArr){
  if(countryCode.includes(x)){
    countryResult=x
  }
}
window.lang = countryResult || "en";
const i18n = new VueI18n({
  // locale: getParamValue(window.location.href, "lang"), // 语言标识
  locale: window.lang, // 语言标识
  // this.$i18n.locale, // 通过切换locale的值来实现语言切换
  messages: {
    en: data["en"],
    ar: data["ar"],
    de: data["de"],
    es: data["es"],
    fr: data["fr"],
    hi: data["hi"],
    in: data["in"],
    tr: data["tr"],
    ko: data["ko"],
    zh: data["zh"],
    ja: data["ja"],
    // zh: require("../../common/lang/zh")
  }
});
export default i18n;