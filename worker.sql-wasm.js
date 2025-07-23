
// We are modularizing this manually because the current modularize setting in Emscripten has some issues:
// https://github.com/kripken/emscripten/issues/5820
// In addition, When you use emcc's modularization, it still expects to export a global object called `Module`,
// which is able to be used/called before the WASM is loaded.
// The modularization below exports a promise that loads and resolves to the actual sql.js module.
// That way, this module can't be used before the WASM is finished loading.

// We are going to define a function that a user will call to start loading initializing our Sql.js library
// However, that function might be called multiple times, and on subsequent calls, we don't actually want it to instantiate a new instance of the Module
// Instead, we want to return the previously loaded module

// TODO: Make this not declare a global if used in the browser
var initSqlJsPromise = undefined;

var initSqlJs = function (moduleConfig) {

    if (initSqlJsPromise){
      return initSqlJsPromise;
    }
    // If we're here, we've never called this function before
    initSqlJsPromise = new Promise(function (resolveModule, reject) {

        // We are modularizing this manually because the current modularize setting in Emscripten has some issues:
        // https://github.com/kripken/emscripten/issues/5820

        // The way to affect the loading of emcc compiled modules is to create a variable called `Module` and add
        // properties to it, like `preRun`, `postRun`, etc
        // We are using that to get notified when the WASM has finished loading.
        // Only then will we return our promise

        // If they passed in a moduleConfig object, use that
        // Otherwise, initialize Module to the empty object
        var Module = typeof moduleConfig !== 'undefined' ? moduleConfig : {};

        // EMCC only allows for a single onAbort function (not an array of functions)
        // So if the user defined their own onAbort function, we remember it and call it
        var originalOnAbortFunction = Module['onAbort'];
        Module['onAbort'] = function (errorThatCausedAbort) {
            reject(new Error(errorThatCausedAbort));
            if (originalOnAbortFunction){
              originalOnAbortFunction(errorThatCausedAbort);
            }
        };

        Module['postRun'] = Module['postRun'] || [];
        Module['postRun'].push(function () {
            // When Emscripted calls postRun, this promise resolves with the built Module
            resolveModule(Module);
        });

        // There is a section of code in the emcc-generated code below that looks like this:
        // (Note that this is lowercase `module`)
        // if (typeof module !== 'undefined') {
        //     module['exports'] = Module;
        // }
        // When that runs, it's going to overwrite our own modularization export efforts in shell-post.js!
        // The only way to tell emcc not to emit it is to pass the MODULARIZE=1 or MODULARIZE_INSTANCE=1 flags,
        // but that carries with it additional unnecessary baggage/bugs we don't want either.
        // So, we have three options:
        // 1) We undefine `module`
        // 2) We remember what `module['exports']` was at the beginning of this function and we restore it later
        // 3) We write a script to remove those lines of code as part of the Make process.
        //
        // Since those are the only lines of code that care about module, we will undefine it. It's the most straightforward
        // of the options, and has the side effect of reducing emcc's efforts to modify the module if its output were to change in the future.
        // That's a nice side effect since we're handling the modularization efforts ourselves
        module = undefined;

        // The emcc-generated code and shell-post.js code goes below,
        // meaning that all of it runs inside of this promise. If anything throws an exception, our promise will abort
var k;k||=typeof Module != 'undefined' ? Module : {};var aa="object"==typeof window,ba="undefined"!=typeof WorkerGlobalScope,ca="object"==typeof process&&process.versions?.node&&"renderer"!=process.type;
k.onRuntimeInitialized=function(){function a(f,l){switch(typeof l){case "boolean":gc(f,l?1:0);break;case "number":hc(f,l);break;case "string":ic(f,l,-1,-1);break;case "object":if(null===l)nb(f);else if(null!=l.length){var n=da(l,ea);jc(f,n,l.length,-1);fa(n)}else wa(f,"Wrong API use : tried to return a value of an unknown type ("+l+").",-1);break;default:nb(f)}}function b(f,l){for(var n=[],p=0;p<f;p+=1){var r=m(l+4*p,"i32"),w=kc(r);if(1===w||2===w)r=lc(r);else if(3===w)r=mc(r);else if(4===w){w=r;
r=nc(w);w=oc(w);for(var K=new Uint8Array(r),I=0;I<r;I+=1)K[I]=t[w+I];r=K}else r=null;n.push(r)}return n}function c(f,l){this.Qa=f;this.db=l;this.Oa=1;this.lb=[]}function d(f,l){this.db=l;l=ha(f)+1;this.eb=ia(l);if(null===this.eb)throw Error("Unable to allocate memory for the SQL string");x(f,y,this.eb,l);this.kb=this.eb;this.Za=this.qb=null}function e(f){this.filename="dbfile_"+(4294967295*Math.random()>>>0);if(null!=f){var l=this.filename,n="/",p=l;n&&(n="string"==typeof n?n:ja(n),p=l?ka(n+"/"+l):
n);l=la(!0,!0);p=ma(p,l);if(f){if("string"==typeof f){n=Array(f.length);for(var r=0,w=f.length;r<w;++r)n[r]=f.charCodeAt(r);f=n}na(p,l|146);n=oa(p,577);pa(n,f,0,f.length,0);qa(n);na(p,l)}}this.handleError(q(this.filename,g));this.db=m(g,"i32");qb(this.db);this.fb={};this.Sa={}}var g=A(4),h=k.cwrap,q=h("sqlite3_open","number",["string","number"]),v=h("sqlite3_close_v2","number",["number"]),u=h("sqlite3_exec","number",["number","string","number","number","number"]),z=h("sqlite3_changes","number",["number"]),
F=h("sqlite3_prepare_v2","number",["number","string","number","number","number"]),rb=h("sqlite3_sql","string",["number"]),qc=h("sqlite3_normalized_sql","string",["number"]),sb=h("sqlite3_prepare_v2","number",["number","number","number","number","number"]),rc=h("sqlite3_bind_text","number",["number","number","number","number","number"]),tb=h("sqlite3_bind_blob","number",["number","number","number","number","number"]),sc=h("sqlite3_bind_double","number",["number","number","number"]),tc=h("sqlite3_bind_int",
"number",["number","number","number"]),uc=h("sqlite3_bind_parameter_index","number",["number","string"]),vc=h("sqlite3_step","number",["number"]),wc=h("sqlite3_errmsg","string",["number"]),xc=h("sqlite3_column_count","number",["number"]),yc=h("sqlite3_data_count","number",["number"]),zc=h("sqlite3_column_double","number",["number","number"]),ub=h("sqlite3_column_text","string",["number","number"]),Ac=h("sqlite3_column_blob","number",["number","number"]),Bc=h("sqlite3_column_bytes","number",["number",
"number"]),Cc=h("sqlite3_column_type","number",["number","number"]),Dc=h("sqlite3_column_name","string",["number","number"]),Ec=h("sqlite3_reset","number",["number"]),Fc=h("sqlite3_clear_bindings","number",["number"]),Gc=h("sqlite3_finalize","number",["number"]),vb=h("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),kc=h("sqlite3_value_type","number",["number"]),nc=h("sqlite3_value_bytes","number",["number"]),mc=h("sqlite3_value_text",
"string",["number"]),oc=h("sqlite3_value_blob","number",["number"]),lc=h("sqlite3_value_double","number",["number"]),hc=h("sqlite3_result_double","",["number","number"]),nb=h("sqlite3_result_null","",["number"]),ic=h("sqlite3_result_text","",["number","string","number","number"]),jc=h("sqlite3_result_blob","",["number","number","number","number"]),gc=h("sqlite3_result_int","",["number","number"]),wa=h("sqlite3_result_error","",["number","string","number"]),wb=h("sqlite3_aggregate_context","number",
["number","number"]),qb=h("RegisterExtensionFunctions","number",["number"]),xb=h("sqlite3_update_hook","number",["number","number","number"]);c.prototype.bind=function(f){if(!this.Qa)throw"Statement closed";this.reset();return Array.isArray(f)?this.Cb(f):null!=f&&"object"===typeof f?this.Db(f):!0};c.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var f=vc(this.Qa);switch(f){case 100:return!0;case 101:return!1;default:throw this.db.handleError(f);}};c.prototype.wb=function(f){null==
f&&(f=this.Oa,this.Oa+=1);return zc(this.Qa,f)};c.prototype.Gb=function(f){null==f&&(f=this.Oa,this.Oa+=1);f=ub(this.Qa,f);if("function"!==typeof BigInt)throw Error("BigInt is not supported");return BigInt(f)};c.prototype.Hb=function(f){null==f&&(f=this.Oa,this.Oa+=1);return ub(this.Qa,f)};c.prototype.getBlob=function(f){null==f&&(f=this.Oa,this.Oa+=1);var l=Bc(this.Qa,f);f=Ac(this.Qa,f);for(var n=new Uint8Array(l),p=0;p<l;p+=1)n[p]=t[f+p];return n};c.prototype.get=function(f,l){l=l||{};null!=f&&
this.bind(f)&&this.step();f=[];for(var n=yc(this.Qa),p=0;p<n;p+=1)switch(Cc(this.Qa,p)){case 1:var r=l.useBigInt?this.Gb(p):this.wb(p);f.push(r);break;case 2:f.push(this.wb(p));break;case 3:f.push(this.Hb(p));break;case 4:f.push(this.getBlob(p));break;default:f.push(null)}return f};c.prototype.getColumnNames=function(){for(var f=[],l=xc(this.Qa),n=0;n<l;n+=1)f.push(Dc(this.Qa,n));return f};c.prototype.getAsObject=function(f,l){f=this.get(f,l);l=this.getColumnNames();for(var n={},p=0;p<l.length;p+=
1)n[l[p]]=f[p];return n};c.prototype.getSQL=function(){return rb(this.Qa)};c.prototype.getNormalizedSQL=function(){return qc(this.Qa)};c.prototype.run=function(f){null!=f&&this.bind(f);this.step();return this.reset()};c.prototype.tb=function(f,l){null==l&&(l=this.Oa,this.Oa+=1);f=ra(f);var n=da(f,ea);this.lb.push(n);this.db.handleError(rc(this.Qa,l,n,f.length-1,0))};c.prototype.Bb=function(f,l){null==l&&(l=this.Oa,this.Oa+=1);var n=da(f,ea);this.lb.push(n);this.db.handleError(tb(this.Qa,l,n,f.length,
0))};c.prototype.sb=function(f,l){null==l&&(l=this.Oa,this.Oa+=1);this.db.handleError((f===(f|0)?tc:sc)(this.Qa,l,f))};c.prototype.Eb=function(f){null==f&&(f=this.Oa,this.Oa+=1);tb(this.Qa,f,0,0,0)};c.prototype.ub=function(f,l){null==l&&(l=this.Oa,this.Oa+=1);switch(typeof f){case "string":this.tb(f,l);return;case "number":this.sb(f,l);return;case "bigint":this.tb(f.toString(),l);return;case "boolean":this.sb(f+0,l);return;case "object":if(null===f){this.Eb(l);return}if(null!=f.length){this.Bb(f,
l);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+f+").";};c.prototype.Db=function(f){var l=this;Object.keys(f).forEach(function(n){var p=uc(l.Qa,n);0!==p&&l.ub(f[n],p)});return!0};c.prototype.Cb=function(f){for(var l=0;l<f.length;l+=1)this.ub(f[l],l+1);return!0};c.prototype.reset=function(){this.freemem();return 0===Fc(this.Qa)&&0===Ec(this.Qa)};c.prototype.freemem=function(){for(var f;void 0!==(f=this.lb.pop());)fa(f)};c.prototype.free=function(){this.freemem();var f=
0===Gc(this.Qa);delete this.db.fb[this.Qa];this.Qa=0;return f};d.prototype.next=function(){if(null===this.eb)return{done:!0};null!==this.Za&&(this.Za.free(),this.Za=null);if(!this.db.db)throw this.nb(),Error("Database closed");var f=sa(),l=A(4);ta(g);ta(l);try{this.db.handleError(sb(this.db.db,this.kb,-1,g,l));this.kb=m(l,"i32");var n=m(g,"i32");if(0===n)return this.nb(),{done:!0};this.Za=new c(n,this.db);this.db.fb[n]=this.Za;return{value:this.Za,done:!1}}catch(p){throw this.qb=B(this.kb),this.nb(),
p;}finally{ua(f)}};d.prototype.nb=function(){fa(this.eb);this.eb=null};d.prototype.getRemainingSQL=function(){return null!==this.qb?this.qb:B(this.kb)};"function"===typeof Symbol&&"symbol"===typeof Symbol.iterator&&(d.prototype[Symbol.iterator]=function(){return this});e.prototype.run=function(f,l){if(!this.db)throw"Database closed";if(l){f=this.prepare(f,l);try{f.step()}finally{f.free()}}else this.handleError(u(this.db,f,0,0,g));return this};e.prototype.exec=function(f,l,n){if(!this.db)throw"Database closed";
var p=sa(),r=null;try{var w=va(f),K=A(4);for(f=[];0!==m(w,"i8");){ta(g);ta(K);this.handleError(sb(this.db,w,-1,g,K));var I=m(g,"i32");w=m(K,"i32");if(0!==I){var H=null;r=new c(I,this);for(null!=l&&r.bind(l);r.step();)null===H&&(H={columns:r.getColumnNames(),values:[]},f.push(H)),H.values.push(r.get(null,n));r.free()}}return f}catch(L){throw r&&r.free(),L;}finally{ua(p)}};e.prototype.each=function(f,l,n,p,r){"function"===typeof l&&(p=n,n=l,l=void 0);f=this.prepare(f,l);try{for(;f.step();)n(f.getAsObject(null,
r))}finally{f.free()}if("function"===typeof p)return p()};e.prototype.prepare=function(f,l){ta(g);this.handleError(F(this.db,f,-1,g,0));f=m(g,"i32");if(0===f)throw"Nothing to prepare";var n=new c(f,this);null!=l&&n.bind(l);return this.fb[f]=n};e.prototype.iterateStatements=function(f){return new d(f,this)};e.prototype["export"]=function(){Object.values(this.fb).forEach(function(l){l.free()});Object.values(this.Sa).forEach(C);this.Sa={};this.handleError(v(this.db));var f=xa(this.filename);this.handleError(q(this.filename,
g));this.db=m(g,"i32");qb(this.db);return f};e.prototype.close=function(){null!==this.db&&(Object.values(this.fb).forEach(function(f){f.free()}),Object.values(this.Sa).forEach(C),this.Sa={},this.Ya&&(C(this.Ya),this.Ya=void 0),this.handleError(v(this.db)),ya("/"+this.filename),this.db=null)};e.prototype.handleError=function(f){if(0===f)return null;f=wc(this.db);throw Error(f);};e.prototype.getRowsModified=function(){return z(this.db)};e.prototype.create_function=function(f,l){Object.prototype.hasOwnProperty.call(this.Sa,
f)&&(C(this.Sa[f]),delete this.Sa[f]);var n=za(function(p,r,w){r=b(r,w);try{var K=l.apply(null,r)}catch(I){wa(p,I,-1);return}a(p,K)},"viii");this.Sa[f]=n;this.handleError(vb(this.db,f,l.length,1,0,n,0,0,0));return this};e.prototype.create_aggregate=function(f,l){var n=l.init||function(){return null},p=l.finalize||function(H){return H},r=l.step;if(!r)throw"An aggregate function must have a step function in "+f;var w={};Object.hasOwnProperty.call(this.Sa,f)&&(C(this.Sa[f]),delete this.Sa[f]);l=f+"__finalize";
Object.hasOwnProperty.call(this.Sa,l)&&(C(this.Sa[l]),delete this.Sa[l]);var K=za(function(H,L,Sa){var V=wb(H,1);Object.hasOwnProperty.call(w,V)||(w[V]=n());L=b(L,Sa);L=[w[V]].concat(L);try{w[V]=r.apply(null,L)}catch(Ic){delete w[V],wa(H,Ic,-1)}},"viii"),I=za(function(H){var L=wb(H,1);try{var Sa=p(w[L])}catch(V){delete w[L];wa(H,V,-1);return}a(H,Sa);delete w[L]},"vi");this.Sa[f]=K;this.Sa[l]=I;this.handleError(vb(this.db,f,r.length-1,1,0,0,K,I,0));return this};e.prototype.updateHook=function(f){this.Ya&&
(xb(this.db,0,0),C(this.Ya),this.Ya=void 0);f&&(this.Ya=za(function(l,n,p,r,w){switch(n){case 18:l="insert";break;case 23:l="update";break;case 9:l="delete";break;default:throw"unknown operationCode in updateHook callback: "+n;}p=B(p);r=B(r);if(w>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";f(l,p,r,Number(w))},"viiiij"),xb(this.db,this.Ya,0))};k.Database=e};var Aa="./this.program",Ba=(a,b)=>{throw b;},Ca="undefined"!=typeof document?document.currentScript?.src:void 0;
"undefined"!=typeof __filename?Ca=__filename:ba&&(Ca=self.location.href);var Da="",Ea,Fa;
if(ca){var fs=require("fs");Da=__dirname+"/";Fa=a=>{a=Ga(a)?new URL(a):a;return fs.readFileSync(a)};Ea=async a=>{a=Ga(a)?new URL(a):a;return fs.readFileSync(a,void 0)};1<process.argv.length&&(Aa=process.argv[1].replace(/\\/g,"/"));process.argv.slice(2);"undefined"!=typeof module&&(module.exports=k);Ba=(a,b)=>{process.exitCode=a;throw b;}}else if(aa||ba){try{Da=(new URL(".",Ca)).href}catch{}ba&&(Fa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});
Ea=async a=>{if(Ga(a))return new Promise((c,d)=>{var e=new XMLHttpRequest;e.open("GET",a,!0);e.responseType="arraybuffer";e.onload=()=>{200==e.status||0==e.status&&e.response?c(e.response):d(e.status)};e.onerror=d;e.send(null)});var b=await fetch(a,{credentials:"same-origin"});if(b.ok)return b.arrayBuffer();throw Error(b.status+" : "+b.url);}}var Ha=console.log.bind(console),D=console.error.bind(console),Ia,Ja=!1,Ka,Ga=a=>a.startsWith("file://"),La,t,y,Ma,E,G,Na,Oa,J;
function Pa(){var a=La.buffer;t=new Int8Array(a);Ma=new Int16Array(a);y=new Uint8Array(a);new Uint16Array(a);E=new Int32Array(a);G=new Uint32Array(a);Na=new Float32Array(a);Oa=new Float64Array(a);J=new BigInt64Array(a);new BigUint64Array(a)}var M=0,Qa=null;function Ra(a){k.onAbort?.(a);a="Aborted("+a+")";D(a);Ja=!0;throw new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");}var Ta;
async function Ua(a){if(!Ia)try{var b=await Ea(a);return new Uint8Array(b)}catch{}if(a==Ta&&Ia)a=new Uint8Array(Ia);else if(Fa)a=Fa(a);else throw"both async and sync fetching of the wasm failed";return a}async function Va(a,b){try{var c=await Ua(a);return await WebAssembly.instantiate(c,b)}catch(d){D(`failed to asynchronously prepare wasm: ${d}`),Ra(d)}}
async function Wa(a){var b=Ta;if(!Ia&&"function"==typeof WebAssembly.instantiateStreaming&&!Ga(b)&&!ca)try{var c=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(c,a)}catch(d){D(`wasm streaming compile failed: ${d}`),D("falling back to ArrayBuffer instantiation")}return Va(b,a)}class Xa{name="ExitStatus";constructor(a){this.message=`Program terminated with exit(${a})`;this.status=a}}
var Ya=a=>{for(;0<a.length;)a.shift()(k)},Za=[],$a=[],ab=()=>{var a=k.preRun.shift();$a.push(a)};function m(a,b="i8"){b.endsWith("*")&&(b="*");switch(b){case "i1":return t[a];case "i8":return t[a];case "i16":return Ma[a>>1];case "i32":return E[a>>2];case "i64":return J[a>>3];case "float":return Na[a>>2];case "double":return Oa[a>>3];case "*":return G[a>>2];default:Ra(`invalid type for getValue: ${b}`)}}var bb=!0;
function ta(a){var b="i32";b.endsWith("*")&&(b="*");switch(b){case "i1":t[a]=0;break;case "i8":t[a]=0;break;case "i16":Ma[a>>1]=0;break;case "i32":E[a>>2]=0;break;case "i64":J[a>>3]=BigInt(0);break;case "float":Na[a>>2]=0;break;case "double":Oa[a>>3]=0;break;case "*":G[a>>2]=0;break;default:Ra(`invalid type for setValue: ${b}`)}}
var cb=new TextDecoder,db=(a,b,c,d)=>{c=b+c;if(d)return c;for(;a[b]&&!(b>=c);)++b;return b},B=(a,b,c)=>a?cb.decode(y.subarray(a,db(y,a,b,c))):"",eb=(a,b)=>{for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a},ka=a=>{var b="/"===a.charAt(0),c="/"===a.slice(-1);(a=eb(a.split("/").filter(d=>!!d),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a},fb=a=>{var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
a=b[0];b=b[1];if(!a&&!b)return".";b&&=b.slice(0,-1);return a+b},gb=a=>a&&a.match(/([^\/]+|\/)\/*$/)[1],hb=()=>{if(ca){var a=require("crypto");return b=>a.randomFillSync(b)}return b=>crypto.getRandomValues(b)},ib=a=>{(ib=hb())(a)},jb=(...a)=>{for(var b="",c=!1,d=a.length-1;-1<=d&&!c;d--){c=0<=d?a[d]:"/";if("string"!=typeof c)throw new TypeError("Arguments to path.resolve must be strings");if(!c)return"";b=c+"/"+b;c="/"===c.charAt(0)}b=eb(b.split("/").filter(e=>!!e),!c).join("/");return(c?"/":"")+b||
"."},kb=a=>{var b=db(a,0);return cb.decode(a.buffer?a.subarray(0,b):new Uint8Array(a.slice(0,b)))},lb=[],ha=a=>{for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b},x=(a,b,c,d)=>{if(!(0<d))return 0;var e=c;d=c+d-1;for(var g=0;g<a.length;++g){var h=a.codePointAt(g);if(127>=h){if(c>=d)break;b[c++]=h}else if(2047>=h){if(c+1>=d)break;b[c++]=192|h>>6;b[c++]=128|h&63}else if(65535>=h){if(c+2>=d)break;b[c++]=224|h>>12;b[c++]=128|h>>6&
63;b[c++]=128|h&63}else{if(c+3>=d)break;b[c++]=240|h>>18;b[c++]=128|h>>12&63;b[c++]=128|h>>6&63;b[c++]=128|h&63;g++}}b[c]=0;return c-e},ra=(a,b)=>{var c=Array(ha(a)+1);a=x(a,c,0,c.length);b&&(c.length=a);return c},mb=[];function ob(a,b){mb[a]={input:[],output:[],cb:b};pb(a,yb)}
var yb={open(a){var b=mb[a.node.rdev];if(!b)throw new N(43);a.tty=b;a.seekable=!1},close(a){a.tty.cb.fsync(a.tty)},fsync(a){a.tty.cb.fsync(a.tty)},read(a,b,c,d){if(!a.tty||!a.tty.cb.xb)throw new N(60);for(var e=0,g=0;g<d;g++){try{var h=a.tty.cb.xb(a.tty)}catch(q){throw new N(29);}if(void 0===h&&0===e)throw new N(6);if(null===h||void 0===h)break;e++;b[c+g]=h}e&&(a.node.atime=Date.now());return e},write(a,b,c,d){if(!a.tty||!a.tty.cb.rb)throw new N(60);try{for(var e=0;e<d;e++)a.tty.cb.rb(a.tty,b[c+e])}catch(g){throw new N(29);
}d&&(a.node.mtime=a.node.ctime=Date.now());return e}},zb={xb(){a:{if(!lb.length){var a=null;if(ca){var b=Buffer.alloc(256),c=0,d=process.stdin.fd;try{c=fs.readSync(d,b,0,256)}catch(e){if(e.toString().includes("EOF"))c=0;else throw e;}0<c&&(a=b.slice(0,c).toString("utf-8"))}else"undefined"!=typeof window&&"function"==typeof window.prompt&&(a=window.prompt("Input: "),null!==a&&(a+="\n"));if(!a){a=null;break a}lb=ra(a,!0)}a=lb.shift()}return a},rb(a,b){null===b||10===b?(Ha(kb(a.output)),a.output=[]):
0!=b&&a.output.push(b)},fsync(a){0<a.output?.length&&(Ha(kb(a.output)),a.output=[])},Tb(){return{Ob:25856,Qb:5,Nb:191,Pb:35387,Mb:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ub(){return 0},Vb(){return[24,80]}},Ab={rb(a,b){null===b||10===b?(D(kb(a.output)),a.output=[]):0!=b&&a.output.push(b)},fsync(a){0<a.output?.length&&(D(kb(a.output)),a.output=[])}},O={Wa:null,Xa(){return O.createNode(null,"/",16895,0)},createNode(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new N(63);
O.Wa||(O.Wa={dir:{node:{Ta:O.La.Ta,Ua:O.La.Ua,lookup:O.La.lookup,hb:O.La.hb,rename:O.La.rename,unlink:O.La.unlink,rmdir:O.La.rmdir,readdir:O.La.readdir,symlink:O.La.symlink},stream:{Va:O.Ma.Va}},file:{node:{Ta:O.La.Ta,Ua:O.La.Ua},stream:{Va:O.Ma.Va,read:O.Ma.read,write:O.Ma.write,ib:O.Ma.ib,jb:O.Ma.jb}},link:{node:{Ta:O.La.Ta,Ua:O.La.Ua,readlink:O.La.readlink},stream:{}},vb:{node:{Ta:O.La.Ta,Ua:O.La.Ua},stream:Bb}});c=Cb(a,b,c,d);P(c.mode)?(c.La=O.Wa.dir.node,c.Ma=O.Wa.dir.stream,c.Na={}):32768===
(c.mode&61440)?(c.La=O.Wa.file.node,c.Ma=O.Wa.file.stream,c.Ra=0,c.Na=null):40960===(c.mode&61440)?(c.La=O.Wa.link.node,c.Ma=O.Wa.link.stream):8192===(c.mode&61440)&&(c.La=O.Wa.vb.node,c.Ma=O.Wa.vb.stream);c.atime=c.mtime=c.ctime=Date.now();a&&(a.Na[b]=c,a.atime=a.mtime=a.ctime=c.atime);return c},Sb(a){return a.Na?a.Na.subarray?a.Na.subarray(0,a.Ra):new Uint8Array(a.Na):new Uint8Array(0)},La:{Ta(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=
a.rdev;P(a.mode)?b.size=4096:32768===(a.mode&61440)?b.size=a.Ra:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.atime);b.mtime=new Date(a.mtime);b.ctime=new Date(a.ctime);b.blksize=4096;b.blocks=Math.ceil(b.size/b.blksize);return b},Ua(a,b){for(var c of["mode","atime","mtime","ctime"])null!=b[c]&&(a[c]=b[c]);void 0!==b.size&&(b=b.size,a.Ra!=b&&(0==b?(a.Na=null,a.Ra=0):(c=a.Na,a.Na=new Uint8Array(b),c&&a.Na.set(c.subarray(0,Math.min(b,a.Ra))),a.Ra=b)))},lookup(){O.mb||(O.mb=
new N(44),O.mb.stack="<generic error, no stack>");throw O.mb;},hb(a,b,c,d){return O.createNode(a,b,c,d)},rename(a,b,c){try{var d=Q(b,c)}catch(g){}if(d){if(P(a.mode))for(var e in d.Na)throw new N(55);Db(d)}delete a.parent.Na[a.name];b.Na[c]=a;a.name=c;b.ctime=b.mtime=a.parent.ctime=a.parent.mtime=Date.now()},unlink(a,b){delete a.Na[b];a.ctime=a.mtime=Date.now()},rmdir(a,b){var c=Q(a,b),d;for(d in c.Na)throw new N(55);delete a.Na[b];a.ctime=a.mtime=Date.now()},readdir(a){return[".","..",...Object.keys(a.Na)]},
symlink(a,b,c){a=O.createNode(a,b,41471,0);a.link=c;return a},readlink(a){if(40960!==(a.mode&61440))throw new N(28);return a.link}},Ma:{read(a,b,c,d,e){var g=a.node.Na;if(e>=a.node.Ra)return 0;a=Math.min(a.node.Ra-e,d);if(8<a&&g.subarray)b.set(g.subarray(e,e+a),c);else for(d=0;d<a;d++)b[c+d]=g[e+d];return a},write(a,b,c,d,e,g){b.buffer===t.buffer&&(g=!1);if(!d)return 0;a=a.node;a.mtime=a.ctime=Date.now();if(b.subarray&&(!a.Na||a.Na.subarray)){if(g)return a.Na=b.subarray(c,c+d),a.Ra=d;if(0===a.Ra&&
0===e)return a.Na=b.slice(c,c+d),a.Ra=d;if(e+d<=a.Ra)return a.Na.set(b.subarray(c,c+d),e),d}g=e+d;var h=a.Na?a.Na.length:0;h>=g||(g=Math.max(g,h*(1048576>h?2:1.125)>>>0),0!=h&&(g=Math.max(g,256)),h=a.Na,a.Na=new Uint8Array(g),0<a.Ra&&a.Na.set(h.subarray(0,a.Ra),0));if(a.Na.subarray&&b.subarray)a.Na.set(b.subarray(c,c+d),e);else for(g=0;g<d;g++)a.Na[e+g]=b[c+g];a.Ra=Math.max(a.Ra,e+d);return d},Va(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.Ra);if(0>b)throw new N(28);
return b},ib(a,b,c,d,e){if(32768!==(a.node.mode&61440))throw new N(43);a=a.node.Na;if(e&2||!a||a.buffer!==t.buffer){e=!0;d=65536*Math.ceil(b/65536);var g=Eb(65536,d);g&&y.fill(0,g,g+d);d=g;if(!d)throw new N(48);if(a){if(0<c||c+b<a.length)a.subarray?a=a.subarray(c,c+b):a=Array.prototype.slice.call(a,c,c+b);t.set(a,d)}}else e=!1,d=a.byteOffset;return{Kb:d,Ab:e}},jb(a,b,c,d){O.Ma.write(a,b,0,d,c,!1);return 0}}},la=(a,b)=>{var c=0;a&&(c|=365);b&&(c|=146);return c},Fb=null,Gb={},Hb=[],Ib=1,R=null,Jb=!1,
Kb=!0,Lb={},N=class{name="ErrnoError";constructor(a){this.Pa=a}},Mb=class{gb={};node=null;get flags(){return this.gb.flags}set flags(a){this.gb.flags=a}get position(){return this.gb.position}set position(a){this.gb.position=a}},Nb=class{La={};Ma={};ab=null;constructor(a,b,c,d){a||=this;this.parent=a;this.Xa=a.Xa;this.id=Ib++;this.name=b;this.mode=c;this.rdev=d;this.atime=this.mtime=this.ctime=Date.now()}get read(){return 365===(this.mode&365)}set read(a){a?this.mode|=365:this.mode&=-366}get write(){return 146===
(this.mode&146)}set write(a){a?this.mode|=146:this.mode&=-147}};
function S(a,b={}){if(!a)throw new N(44);b.ob??(b.ob=!0);"/"===a.charAt(0)||(a="//"+a);var c=0;a:for(;40>c;c++){a=a.split("/").filter(q=>!!q);for(var d=Fb,e="/",g=0;g<a.length;g++){var h=g===a.length-1;if(h&&b.parent)break;if("."!==a[g])if(".."===a[g])if(e=fb(e),d===d.parent){a=e+"/"+a.slice(g+1).join("/");c--;continue a}else d=d.parent;else{e=ka(e+"/"+a[g]);try{d=Q(d,a[g])}catch(q){if(44===q?.Pa&&h&&b.Jb)return{path:e};throw q;}!d.ab||h&&!b.ob||(d=d.ab.root);if(40960===(d.mode&61440)&&(!h||b.$a)){if(!d.La.readlink)throw new N(52);
d=d.La.readlink(d);"/"===d.charAt(0)||(d=fb(e)+"/"+d);a=d+"/"+a.slice(g+1).join("/");continue a}}}return{path:e,node:d}}throw new N(32);}function ja(a){for(var b;;){if(a===a.parent)return a=a.Xa.zb,b?"/"!==a[a.length-1]?`${a}/${b}`:a+b:a;b=b?`${a.name}/${b}`:a.name;a=a.parent}}function Ob(a,b){for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%R.length}
function Db(a){var b=Ob(a.parent.id,a.name);if(R[b]===a)R[b]=a.bb;else for(b=R[b];b;){if(b.bb===a){b.bb=a.bb;break}b=b.bb}}function Q(a,b){var c=P(a.mode)?(c=Pb(a,"x"))?c:a.La.lookup?0:2:54;if(c)throw new N(c);for(c=R[Ob(a.id,b)];c;c=c.bb){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.La.lookup(a,b)}function Cb(a,b,c,d){a=new Nb(a,b,c,d);b=Ob(a.parent.id,a.name);a.bb=R[b];return R[b]=a}function P(a){return 16384===(a&61440)}
function Qb(a){var b=["r","w","rw"][a&3];a&512&&(b+="w");return b}function Pb(a,b){if(Kb)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0}function Rb(a,b){if(!P(a.mode))return 54;try{return Q(a,b),20}catch(c){}return Pb(a,"wx")}
function Sb(a,b,c){try{var d=Q(a,b)}catch(e){return e.Pa}if(a=Pb(a,"wx"))return a;if(c){if(!P(d.mode))return 54;if(d===d.parent||"/"===ja(d))return 10}else if(P(d.mode))return 31;return 0}function Tb(a){if(!a)throw new N(63);return a}function T(a){a=Hb[a];if(!a)throw new N(8);return a}function Ub(a,b=-1){a=Object.assign(new Mb,a);if(-1==b)a:{for(b=0;4096>=b;b++)if(!Hb[b])break a;throw new N(33);}a.fd=b;return Hb[b]=a}function Vb(a,b=-1){a=Ub(a,b);a.Ma?.Rb?.(a);return a}
function Wb(a,b,c){var d=a?.Ma.Ua;a=d?a:b;d??=b.La.Ua;Tb(d);d(a,c)}var Bb={open(a){a.Ma=Gb[a.node.rdev].Ma;a.Ma.open?.(a)},Va(){throw new N(70);}};function pb(a,b){Gb[a]={Ma:b}}function Xb(a,b){var c="/"===b;if(c&&Fb)throw new N(10);if(!c&&b){var d=S(b,{ob:!1});b=d.path;d=d.node;if(d.ab)throw new N(10);if(!P(d.mode))throw new N(54);}b={type:a,Wb:{},zb:b,Ib:[]};a=a.Xa(b);a.Xa=b;b.root=a;c?Fb=a:d&&(d.ab=b,d.Xa&&d.Xa.Ib.push(b))}
function Yb(a,b,c){var d=S(a,{parent:!0}).node;a=gb(a);if(!a)throw new N(28);if("."===a||".."===a)throw new N(20);var e=Rb(d,a);if(e)throw new N(e);if(!d.La.hb)throw new N(63);return d.La.hb(d,a,b,c)}function ma(a,b=438){return Yb(a,b&4095|32768,0)}function U(a,b=511){return Yb(a,b&1023|16384,0)}function Zb(a,b,c){"undefined"==typeof c&&(c=b,b=438);Yb(a,b|8192,c)}
function $b(a,b){if(!jb(a))throw new N(44);var c=S(b,{parent:!0}).node;if(!c)throw new N(44);b=gb(b);var d=Rb(c,b);if(d)throw new N(d);if(!c.La.symlink)throw new N(63);c.La.symlink(c,b,a)}function ac(a){var b=S(a,{parent:!0}).node;a=gb(a);var c=Q(b,a),d=Sb(b,a,!0);if(d)throw new N(d);if(!b.La.rmdir)throw new N(63);if(c.ab)throw new N(10);b.La.rmdir(b,a);Db(c)}
function ya(a){var b=S(a,{parent:!0}).node;if(!b)throw new N(44);a=gb(a);var c=Q(b,a),d=Sb(b,a,!1);if(d)throw new N(d);if(!b.La.unlink)throw new N(63);if(c.ab)throw new N(10);b.La.unlink(b,a);Db(c)}function bc(a,b){a=S(a,{$a:!b}).node;return Tb(a.La.Ta)(a)}function cc(a,b,c,d){Wb(a,b,{mode:c&4095|b.mode&-4096,ctime:Date.now(),Fb:d})}function na(a,b){a="string"==typeof a?S(a,{$a:!0}).node:a;cc(null,a,b)}
function dc(a,b,c){if(P(b.mode))throw new N(31);if(32768!==(b.mode&61440))throw new N(28);var d=Pb(b,"w");if(d)throw new N(d);Wb(a,b,{size:c,timestamp:Date.now()})}
function oa(a,b,c=438){if(""===a)throw new N(44);if("string"==typeof b){var d={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[b];if("undefined"==typeof d)throw Error(`Unknown file open mode: ${b}`);b=d}c=b&64?c&4095|32768:0;if("object"==typeof a)d=a;else{var e=a.endsWith("/");a=S(a,{$a:!(b&131072),Jb:!0});d=a.node;a=a.path}var g=!1;if(b&64)if(d){if(b&128)throw new N(20);}else{if(e)throw new N(31);d=Yb(a,c|511,0);g=!0}if(!d)throw new N(44);8192===(d.mode&61440)&&(b&=-513);if(b&65536&&!P(d.mode))throw new N(54);
if(!g&&(e=d?40960===(d.mode&61440)?32:P(d.mode)&&("r"!==Qb(b)||b&576)?31:Pb(d,Qb(b)):44))throw new N(e);b&512&&!g&&(e=d,e="string"==typeof e?S(e,{$a:!0}).node:e,dc(null,e,0));b&=-131713;e=Ub({node:d,path:ja(d),flags:b,seekable:!0,position:0,Ma:d.Ma,Lb:[],error:!1});e.Ma.open&&e.Ma.open(e);g&&na(d,c&511);!k.logReadFiles||b&1||a in Lb||(Lb[a]=1);return e}function qa(a){if(null===a.fd)throw new N(8);a.pb&&(a.pb=null);try{a.Ma.close&&a.Ma.close(a)}catch(b){throw b;}finally{Hb[a.fd]=null}a.fd=null}
function ec(a,b,c){if(null===a.fd)throw new N(8);if(!a.seekable||!a.Ma.Va)throw new N(70);if(0!=c&&1!=c&&2!=c)throw new N(28);a.position=a.Ma.Va(a,b,c);a.Lb=[]}function fc(a,b,c,d,e){if(0>d||0>e)throw new N(28);if(null===a.fd)throw new N(8);if(1===(a.flags&2097155))throw new N(8);if(P(a.node.mode))throw new N(31);if(!a.Ma.read)throw new N(28);var g="undefined"!=typeof e;if(!g)e=a.position;else if(!a.seekable)throw new N(70);b=a.Ma.read(a,b,c,d,e);g||(a.position+=b);return b}
function pa(a,b,c,d,e){if(0>d||0>e)throw new N(28);if(null===a.fd)throw new N(8);if(0===(a.flags&2097155))throw new N(8);if(P(a.node.mode))throw new N(31);if(!a.Ma.write)throw new N(28);a.seekable&&a.flags&1024&&ec(a,0,2);var g="undefined"!=typeof e;if(!g)e=a.position;else if(!a.seekable)throw new N(70);b=a.Ma.write(a,b,c,d,e,void 0);g||(a.position+=b);return b}
function xa(a){var b="binary";if("utf8"!==b&&"binary"!==b)throw Error(`Invalid encoding type "${b}"`);var c=oa(a,c||0);a=bc(a).size;var d=new Uint8Array(a);fc(c,d,0,a,0);"utf8"===b&&(d=kb(d));qa(c);return d}
function W(a,b,c){a=ka("/dev/"+a);var d=la(!!b,!!c);W.yb??(W.yb=64);var e=W.yb++<<8|0;pb(e,{open(g){g.seekable=!1},close(){c?.buffer?.length&&c(10)},read(g,h,q,v){for(var u=0,z=0;z<v;z++){try{var F=b()}catch(rb){throw new N(29);}if(void 0===F&&0===u)throw new N(6);if(null===F||void 0===F)break;u++;h[q+z]=F}u&&(g.node.atime=Date.now());return u},write(g,h,q,v){for(var u=0;u<v;u++)try{c(h[q+u])}catch(z){throw new N(29);}v&&(g.node.mtime=g.node.ctime=Date.now());return u}});Zb(a,d,e)}var X={};
function Y(a,b,c){if("/"===b.charAt(0))return b;a=-100===a?"/":T(a).path;if(0==b.length){if(!c)throw new N(44);return a}return a+"/"+b}
function pc(a,b){E[a>>2]=b.dev;E[a+4>>2]=b.mode;G[a+8>>2]=b.nlink;E[a+12>>2]=b.uid;E[a+16>>2]=b.gid;E[a+20>>2]=b.rdev;J[a+24>>3]=BigInt(b.size);E[a+32>>2]=4096;E[a+36>>2]=b.blocks;var c=b.atime.getTime(),d=b.mtime.getTime(),e=b.ctime.getTime();J[a+40>>3]=BigInt(Math.floor(c/1E3));G[a+48>>2]=c%1E3*1E6;J[a+56>>3]=BigInt(Math.floor(d/1E3));G[a+64>>2]=d%1E3*1E6;J[a+72>>3]=BigInt(Math.floor(e/1E3));G[a+80>>2]=e%1E3*1E6;J[a+88>>3]=BigInt(b.ino);return 0}
var Hc=void 0,Jc=()=>{var a=E[+Hc>>2];Hc+=4;return a},Kc=0,Lc=[0,31,60,91,121,152,182,213,244,274,305,335],Mc=[0,31,59,90,120,151,181,212,243,273,304,334],Nc={},Oc=a=>{Ka=a;bb||0<Kc||(k.onExit?.(a),Ja=!0);Ba(a,new Xa(a))},Pc=a=>{if(!Ja)try{if(a(),!(bb||0<Kc))try{Ka=a=Ka,Oc(a)}catch(b){b instanceof Xa||"unwind"==b||Ba(1,b)}}catch(b){b instanceof Xa||"unwind"==b||Ba(1,b)}},Qc={},Sc=()=>{if(!Rc){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&
navigator.language||"C").replace("-","_")+".UTF-8",_:Aa||"./this.program"},b;for(b in Qc)void 0===Qc[b]?delete a[b]:a[b]=Qc[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);Rc=c}return Rc},Rc,va=a=>{var b=ha(a)+1,c=A(b);x(a,y,c,b);return c},Tc=(a,b,c,d)=>{var e={string:u=>{var z=0;null!==u&&void 0!==u&&0!==u&&(z=va(u));return z},array:u=>{var z=A(u.length);t.set(u,z);return z}};a=k["_"+a];var g=[],h=0;if(d)for(var q=0;q<d.length;q++){var v=e[c[q]];v?(0===h&&(h=sa()),g[q]=v(d[q])):g[q]=d[q]}c=a(...g);
return c=function(u){0!==h&&ua(h);return"string"===b?B(u):"boolean"===b?!!u:u}(c)},da=(a,b)=>{b=1==b?A(a.length):ia(a.length);a.subarray||a.slice||(a=new Uint8Array(a));y.set(a,b);return b},ea=0,Uc,Vc=[],Z,C=a=>{Uc.delete(Z.get(a));Z.set(a,null);Vc.push(a)},Wc=a=>{const b=a.length;return[b%128|128,b>>7,...a]},Xc={i:127,p:127,j:126,f:125,d:124,e:111},Yc=a=>Wc(Array.from(a,b=>Xc[b])),za=(a,b)=>{if(!Uc){Uc=new WeakMap;var c=Z.length;if(Uc)for(var d=0;d<0+c;d++){var e=Z.get(d);e&&Uc.set(e,d)}}if(c=Uc.get(a)||
0)return c;c=Vc.length?Vc.pop():Z.grow(1);try{Z.set(c,a)}catch(g){if(!(g instanceof TypeError))throw g;b=Uint8Array.of(0,97,115,109,1,0,0,0,1,...Wc([1,96,...Yc(b.slice(1)),...Yc("v"===b[0]?"":b[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0);b=new WebAssembly.Module(b);b=(new WebAssembly.Instance(b,{e:{f:a}})).exports.f;Z.set(c,b)}Uc.set(a,c);return c};R=Array(4096);Xb(O,"/");U("/tmp");U("/home");U("/home/web_user");
(function(){U("/dev");pb(259,{read:()=>0,write:(d,e,g,h)=>h,Va:()=>0});Zb("/dev/null",259);ob(1280,zb);ob(1536,Ab);Zb("/dev/tty",1280);Zb("/dev/tty1",1536);var a=new Uint8Array(1024),b=0,c=()=>{0===b&&(ib(a),b=a.byteLength);return a[--b]};W("random",c);W("urandom",c);U("/dev/shm");U("/dev/shm/tmp")})();
(function(){U("/proc");var a=U("/proc/self");U("/proc/self/fd");Xb({Xa(){var b=Cb(a,"fd",16895,73);b.Ma={Va:O.Ma.Va};b.La={lookup(c,d){c=+d;var e=T(c);c={parent:null,Xa:{zb:"fake"},La:{readlink:()=>e.path},id:c+1};return c.parent=c},readdir(){return Array.from(Hb.entries()).filter(([,c])=>c).map(([c])=>c.toString())}};return b}},"/proc/self/fd")})();k.noExitRuntime&&(bb=k.noExitRuntime);k.print&&(Ha=k.print);k.printErr&&(D=k.printErr);k.wasmBinary&&(Ia=k.wasmBinary);k.thisProgram&&(Aa=k.thisProgram);
k.stackSave=()=>sa();k.stackRestore=a=>ua(a);k.stackAlloc=a=>A(a);k.cwrap=(a,b,c,d)=>{var e=!c||c.every(g=>"number"===g||"boolean"===g);return"string"!==b&&e&&!d?k["_"+a]:(...g)=>Tc(a,b,c,g)};k.addFunction=za;k.removeFunction=C;k.UTF8ToString=B;k.ALLOC_NORMAL=ea;k.allocate=da;k.allocateUTF8OnStack=va;
var ia,fa,Eb,Zc,ua,A,sa,$c={a:(a,b,c,d)=>Ra(`Assertion failed: ${B(a)}, at: `+[b?B(b):"unknown filename",c,d?B(d):"unknown function"]),i:function(a,b){try{return a=B(a),na(a,b),0}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return-c.Pa}},L:function(a,b,c){try{b=B(b);b=Y(a,b);if(c&-8)return-28;var d=S(b,{$a:!0}).node;if(!d)return-44;a="";c&4&&(a+="r");c&2&&(a+="w");c&1&&(a+="x");return a&&Pb(d,a)?-2:0}catch(e){if("undefined"==typeof X||"ErrnoError"!==e.name)throw e;return-e.Pa}},
j:function(a,b){try{var c=T(a);cc(c,c.node,b,!1);return 0}catch(d){if("undefined"==typeof X||"ErrnoError"!==d.name)throw d;return-d.Pa}},h:function(a){try{var b=T(a);Wb(b,b.node,{timestamp:Date.now(),Fb:!1});return 0}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return-c.Pa}},b:function(a,b,c){Hc=c;try{var d=T(a);switch(b){case 0:var e=Jc();if(0>e)break;for(;Hb[e];)e++;return Vb(d,e).fd;case 1:case 2:return 0;case 3:return d.flags;case 4:return e=Jc(),d.flags|=e,0;case 12:return e=
Jc(),Ma[e+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(g){if("undefined"==typeof X||"ErrnoError"!==g.name)throw g;return-g.Pa}},g:function(a,b){try{var c=T(a),d=c.node,e=c.Ma.Ta;a=e?c:d;e??=d.La.Ta;Tb(e);var g=e(a);return pc(b,g)}catch(h){if("undefined"==typeof X||"ErrnoError"!==h.name)throw h;return-h.Pa}},H:function(a,b){b=-9007199254740992>b||9007199254740992<b?NaN:Number(b);try{if(isNaN(b))return-61;var c=T(a);if(0>b||0===(c.flags&2097155))throw new N(28);dc(c,c.node,b);return 0}catch(d){if("undefined"==
typeof X||"ErrnoError"!==d.name)throw d;return-d.Pa}},G:function(a,b){try{if(0===b)return-28;var c=ha("/")+1;if(b<c)return-68;x("/",y,a,b);return c}catch(d){if("undefined"==typeof X||"ErrnoError"!==d.name)throw d;return-d.Pa}},K:function(a,b){try{return a=B(a),pc(b,bc(a,!0))}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return-c.Pa}},C:function(a,b,c){try{return b=B(b),b=Y(a,b),U(b,c),0}catch(d){if("undefined"==typeof X||"ErrnoError"!==d.name)throw d;return-d.Pa}},J:function(a,
b,c,d){try{b=B(b);var e=d&256;b=Y(a,b,d&4096);return pc(c,e?bc(b,!0):bc(b))}catch(g){if("undefined"==typeof X||"ErrnoError"!==g.name)throw g;return-g.Pa}},x:function(a,b,c,d){Hc=d;try{b=B(b);b=Y(a,b);var e=d?Jc():0;return oa(b,c,e).fd}catch(g){if("undefined"==typeof X||"ErrnoError"!==g.name)throw g;return-g.Pa}},v:function(a,b,c,d){try{b=B(b);b=Y(a,b);if(0>=d)return-28;var e=S(b).node;if(!e)throw new N(44);if(!e.La.readlink)throw new N(28);var g=e.La.readlink(e);var h=Math.min(d,ha(g)),q=t[c+h];x(g,
y,c,d+1);t[c+h]=q;return h}catch(v){if("undefined"==typeof X||"ErrnoError"!==v.name)throw v;return-v.Pa}},u:function(a){try{return a=B(a),ac(a),0}catch(b){if("undefined"==typeof X||"ErrnoError"!==b.name)throw b;return-b.Pa}},f:function(a,b){try{return a=B(a),pc(b,bc(a))}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return-c.Pa}},r:function(a,b,c){try{b=B(b);b=Y(a,b);if(c)if(512===c)ac(b);else return-28;else ya(b);return 0}catch(d){if("undefined"==typeof X||"ErrnoError"!==d.name)throw d;
return-d.Pa}},q:function(a,b,c){try{b=B(b);b=Y(a,b,!0);var d=Date.now(),e,g;if(c){var h=G[c>>2]+4294967296*E[c+4>>2],q=E[c+8>>2];1073741823==q?e=d:1073741822==q?e=null:e=1E3*h+q/1E6;c+=16;h=G[c>>2]+4294967296*E[c+4>>2];q=E[c+8>>2];1073741823==q?g=d:1073741822==q?g=null:g=1E3*h+q/1E6}else g=e=d;if(null!==(g??e)){a=e;var v=S(b,{$a:!0}).node;Tb(v.La.Ua)(v,{atime:a,mtime:g})}return 0}catch(u){if("undefined"==typeof X||"ErrnoError"!==u.name)throw u;return-u.Pa}},m:()=>Ra(""),l:()=>{bb=!1;Kc=0},A:function(a,
b){a=-9007199254740992>a||9007199254740992<a?NaN:Number(a);a=new Date(1E3*a);E[b>>2]=a.getSeconds();E[b+4>>2]=a.getMinutes();E[b+8>>2]=a.getHours();E[b+12>>2]=a.getDate();E[b+16>>2]=a.getMonth();E[b+20>>2]=a.getFullYear()-1900;E[b+24>>2]=a.getDay();var c=a.getFullYear();E[b+28>>2]=(0!==c%4||0===c%100&&0!==c%400?Mc:Lc)[a.getMonth()]+a.getDate()-1|0;E[b+36>>2]=-(60*a.getTimezoneOffset());c=(new Date(a.getFullYear(),6,1)).getTimezoneOffset();var d=(new Date(a.getFullYear(),0,1)).getTimezoneOffset();
E[b+32>>2]=(c!=d&&a.getTimezoneOffset()==Math.min(d,c))|0},y:function(a,b,c,d,e,g,h){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e);try{var q=T(d);if(0!==(b&2)&&0===(c&2)&&2!==(q.flags&2097155))throw new N(2);if(1===(q.flags&2097155))throw new N(2);if(!q.Ma.ib)throw new N(43);if(!a)throw new N(28);var v=q.Ma.ib(q,a,e,b,c);var u=v.Kb;E[g>>2]=v.Ab;G[h>>2]=u;return 0}catch(z){if("undefined"==typeof X||"ErrnoError"!==z.name)throw z;return-z.Pa}},z:function(a,b,c,d,e,g){g=-9007199254740992>g||
9007199254740992<g?NaN:Number(g);try{var h=T(e);if(c&2){c=g;if(32768!==(h.node.mode&61440))throw new N(43);if(!(d&2)){var q=y.slice(a,a+b);h.Ma.jb&&h.Ma.jb(h,q,c,b,d)}}}catch(v){if("undefined"==typeof X||"ErrnoError"!==v.name)throw v;return-v.Pa}},n:(a,b)=>{Nc[a]&&(clearTimeout(Nc[a].id),delete Nc[a]);if(!b)return 0;var c=setTimeout(()=>{delete Nc[a];Pc(()=>Zc(a,performance.now()))},b);Nc[a]={id:c,Xb:b};return 0},B:(a,b,c,d)=>{var e=(new Date).getFullYear(),g=(new Date(e,0,1)).getTimezoneOffset();
e=(new Date(e,6,1)).getTimezoneOffset();G[a>>2]=60*Math.max(g,e);E[b>>2]=Number(g!=e);b=h=>{var q=Math.abs(h);return`UTC${0<=h?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`};a=b(g);b=b(e);e<g?(x(a,y,c,17),x(b,y,d,17)):(x(a,y,d,17),x(b,y,c,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:a=>{var b=y.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);a:{d=(Math.min(2147483648,65536*Math.ceil(Math.max(a,
d)/65536))-La.buffer.byteLength+65535)/65536|0;try{La.grow(d);Pa();var e=1;break a}catch(g){}e=void 0}if(e)return!0}return!1},E:(a,b)=>{var c=0,d=0,e;for(e of Sc()){var g=b+c;G[a+d>>2]=g;c+=x(e,y,g,Infinity)+1;d+=4}return 0},F:(a,b)=>{var c=Sc();G[a>>2]=c.length;a=0;for(var d of c)a+=ha(d)+1;G[b>>2]=a;return 0},e:function(a){try{var b=T(a);qa(b);return 0}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return c.Pa}},p:function(a,b){try{var c=T(a);t[b]=c.tty?2:P(c.mode)?3:40960===(c.mode&
61440)?7:4;Ma[b+2>>1]=0;J[b+8>>3]=BigInt(0);J[b+16>>3]=BigInt(0);return 0}catch(d){if("undefined"==typeof X||"ErrnoError"!==d.name)throw d;return d.Pa}},w:function(a,b,c,d){try{a:{var e=T(a);a=b;for(var g,h=b=0;h<c;h++){var q=G[a>>2],v=G[a+4>>2];a+=8;var u=fc(e,t,q,v,g);if(0>u){var z=-1;break a}b+=u;if(u<v)break;"undefined"!=typeof g&&(g+=u)}z=b}G[d>>2]=z;return 0}catch(F){if("undefined"==typeof X||"ErrnoError"!==F.name)throw F;return F.Pa}},D:function(a,b,c,d){b=-9007199254740992>b||9007199254740992<
b?NaN:Number(b);try{if(isNaN(b))return 61;var e=T(a);ec(e,b,c);J[d>>3]=BigInt(e.position);e.pb&&0===b&&0===c&&(e.pb=null);return 0}catch(g){if("undefined"==typeof X||"ErrnoError"!==g.name)throw g;return g.Pa}},I:function(a){try{var b=T(a);return b.Ma?.fsync?b.Ma.fsync(b):0}catch(c){if("undefined"==typeof X||"ErrnoError"!==c.name)throw c;return c.Pa}},t:function(a,b,c,d){try{a:{var e=T(a);a=b;for(var g,h=b=0;h<c;h++){var q=G[a>>2],v=G[a+4>>2];a+=8;var u=pa(e,t,q,v,g);if(0>u){var z=-1;break a}b+=u;
if(u<v)break;"undefined"!=typeof g&&(g+=u)}z=b}G[d>>2]=z;return 0}catch(F){if("undefined"==typeof X||"ErrnoError"!==F.name)throw F;return F.Pa}},k:Oc},ad;
(async function(){function a(c){ad=c.exports;La=ad.M;Pa();Z=ad.O;c=ad;k._sqlite3_free=c.P;k._sqlite3_value_text=c.Q;k._sqlite3_prepare_v2=c.R;k._sqlite3_step=c.S;k._sqlite3_reset=c.T;k._sqlite3_exec=c.U;k._sqlite3_finalize=c.V;k._sqlite3_column_name=c.W;k._sqlite3_column_text=c.X;k._sqlite3_column_type=c.Y;k._sqlite3_errmsg=c.Z;k._sqlite3_clear_bindings=c._;k._sqlite3_value_blob=c.$;k._sqlite3_value_bytes=c.aa;k._sqlite3_value_double=c.ba;k._sqlite3_value_int=c.ca;k._sqlite3_value_type=c.da;k._sqlite3_result_blob=
c.ea;k._sqlite3_result_double=c.fa;k._sqlite3_result_error=c.ga;k._sqlite3_result_int=c.ha;k._sqlite3_result_int64=c.ia;k._sqlite3_result_null=c.ja;k._sqlite3_result_text=c.ka;k._sqlite3_aggregate_context=c.la;k._sqlite3_column_count=c.ma;k._sqlite3_data_count=c.na;k._sqlite3_column_blob=c.oa;k._sqlite3_column_bytes=c.pa;k._sqlite3_column_double=c.qa;k._sqlite3_bind_blob=c.ra;k._sqlite3_bind_double=c.sa;k._sqlite3_bind_int=c.ta;k._sqlite3_bind_text=c.ua;k._sqlite3_bind_parameter_index=c.va;k._sqlite3_sql=
c.wa;k._sqlite3_normalized_sql=c.xa;k._sqlite3_changes=c.ya;k._sqlite3_close_v2=c.za;k._sqlite3_create_function_v2=c.Aa;k._sqlite3_update_hook=c.Ba;k._sqlite3_open=c.Ca;k._malloc=ia=c.Da;k._free=fa=c.Ea;k._RegisterExtensionFunctions=c.Fa;Eb=c.Ga;Zc=c.Ha;ua=c.Ia;A=c.Ja;sa=c.Ka;M--;k.monitorRunDependencies?.(M);0==M&&Qa&&(c=Qa,Qa=null,c());return ad}M++;k.monitorRunDependencies?.(M);var b={a:$c};if(k.instantiateWasm)return new Promise(c=>{k.instantiateWasm(b,(d,e)=>{c(a(d,e))})});Ta??=k.locateFile?
k.locateFile("sql-wasm.wasm",Da):Da+"sql-wasm.wasm";return a((await Wa(b)).instance)})();
function bd(){function a(){k.calledRun=!0;if(!Ja){if(!k.noFSInit&&!Jb){var b,c;Jb=!0;b??=k.stdin;c??=k.stdout;d??=k.stderr;b?W("stdin",b):$b("/dev/tty","/dev/stdin");c?W("stdout",null,c):$b("/dev/tty","/dev/stdout");d?W("stderr",null,d):$b("/dev/tty1","/dev/stderr");oa("/dev/stdin",0);oa("/dev/stdout",1);oa("/dev/stderr",1)}ad.N();Kb=!1;k.onRuntimeInitialized?.();if(k.postRun)for("function"==typeof k.postRun&&(k.postRun=[k.postRun]);k.postRun.length;){var d=k.postRun.shift();Za.push(d)}Ya(Za)}}if(0<
M)Qa=bd;else{if(k.preRun)for("function"==typeof k.preRun&&(k.preRun=[k.preRun]);k.preRun.length;)ab();Ya($a);0<M?Qa=bd:k.setStatus?(k.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>k.setStatus(""),1);a()},1)):a()}}if(k.preInit)for("function"==typeof k.preInit&&(k.preInit=[k.preInit]);0<k.preInit.length;)k.preInit.shift()();bd();


        // The shell-pre.js and emcc-generated code goes above
        return Module;
    }); // The end of the promise being returned

  return initSqlJsPromise;
} // The end of our initSqlJs function

// This bit below is copied almost exactly from what you get when you use the MODULARIZE=1 flag with emcc
// However, we don't want to use the emcc modularization. See shell-pre.js
if (typeof exports === 'object' && typeof module === 'object'){
    module.exports = initSqlJs;
    // This will allow the module to be used in ES6 or CommonJS
    module.exports.default = initSqlJs;
}
else if (typeof define === 'function' && define['amd']) {
    define([], function() { return initSqlJs; });
}
else if (typeof exports === 'object'){
    exports["Module"] = initSqlJs;
}
/* global initSqlJs */
/* eslint-env worker */
/* eslint no-restricted-globals: ["error"] */

"use strict";

var db;

function onModuleReady(SQL) {
    function createDb(data) {
        if (db != null) db.close();
        db = new SQL.Database(data);
        return db;
    }

    var buff; var data; var result;
    data = this["data"];
    var config = data["config"] ? data["config"] : {};
    switch (data && data["action"]) {
        case "open":
            buff = data["buffer"];
            createDb(buff && new Uint8Array(buff));
            return postMessage({
                id: data["id"],
                ready: true
            });
        case "exec":
            if (db === null) {
                createDb();
            }
            if (!data["sql"]) {
                throw "exec: Missing query string";
            }
            return postMessage({
                id: data["id"],
                results: db.exec(data["sql"], data["params"], config)
            });
        case "getRowsModified":
            return postMessage({
                id: data["id"],
                rowsModified: db.getRowsModified()
            });
        case "each":
            if (db === null) {
                createDb();
            }
            var callback = function callback(row) {
                return postMessage({
                    id: data["id"],
                    row: row,
                    finished: false
                });
            };
            var done = function done() {
                return postMessage({
                    id: data["id"],
                    finished: true
                });
            };
            return db.each(data["sql"], data["params"], callback, done, config);
        case "export":
            buff = db["export"]();
            result = {
                id: data["id"],
                buffer: buff
            };
            try {
                return postMessage(result, [result]);
            } catch (error) {
                return postMessage(result);
            }
        case "close":
            if (db) {
                db.close();
            }
            return postMessage({
                id: data["id"]
            });
        default:
            throw new Error("Invalid action : " + (data && data["action"]));
    }
}

function onError(err) {
    return postMessage({
        id: this["data"]["id"],
        error: err["message"]
    });
}

db = null;
var sqlModuleReady = initSqlJs();

function global_sqljs_message_handler(event) {
    return sqlModuleReady
        .then(onModuleReady.bind(event))
        .catch(onError.bind(event));
}

if (typeof importScripts === "function") {
    self.onmessage = global_sqljs_message_handler;
}

if (typeof require === "function") {
    // eslint-disable-next-line global-require
    var worker_threads = require("worker_threads");
    var parentPort = worker_threads.parentPort;
    // eslint-disable-next-line no-undef
    globalThis.postMessage = parentPort.postMessage.bind(parentPort);
    parentPort.on("message", function onmessage(data) {
        var event = { data: data };
        global_sqljs_message_handler(event);
    });

    if (typeof process !== "undefined") {
        process.on("uncaughtException", function uncaughtException(err) {
            postMessage({ error: err.message });
        });
        process.on("unhandledRejection", function unhandledRejection(err) {
            postMessage({ error: err.message });
        });
    }
}
