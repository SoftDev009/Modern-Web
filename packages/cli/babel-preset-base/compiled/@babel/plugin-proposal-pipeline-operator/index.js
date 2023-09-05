(()=>{"use strict";var e={345:e=>{e.exports=require("../helper-plugin-utils")},718:e=>{e.exports=require("@babel/core")},742:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(718);function isConciseArrowExpression(e){return s.types.isArrowFunctionExpression(e)&&s.types.isExpression(e.body)&&!e.async}const buildOptimizedSequenceExpression=({call:e,path:r,placeholder:t})=>{const{callee:o}=e;const i=r.node.left;const n=s.types.assignmentExpression("=",s.types.cloneNode(t),i);const p=isConciseArrowExpression(o);if(p){let e;let p=true;const{params:a}=o;if(a.length===1&&s.types.isIdentifier(a[0])){e=a[0]}else if(a.length>0){p=false}if(p&&!e){return s.types.sequenceExpression([i,o.body])}else if(e){r.scope.push({id:s.types.cloneNode(t)});r.get("right").scope.rename(e.name,t.name);return s.types.sequenceExpression([n,o.body])}}else if(s.types.isIdentifier(o,{name:"eval"})){const r=s.types.sequenceExpression([s.types.numericLiteral(0),o]);e.callee=r}r.scope.push({id:s.types.cloneNode(t)});return s.types.sequenceExpression([n,e])};var o=buildOptimizedSequenceExpression;r["default"]=o},177:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(718);var o=t(742);const i={BinaryExpression(e){const{scope:r,node:t}=e;const{operator:i,left:n,right:p}=t;if(i!=="|>")return;const a=r.generateUidIdentifierBasedOnNode(n);const c=p.type==="AwaitExpression"?s.types.awaitExpression(s.types.cloneNode(a)):s.types.callExpression(p,[s.types.cloneNode(a)]);const l=(0,o.default)({placeholder:a,call:c,path:e});e.replaceWith(l)}};var n=i;r["default"]=n},454:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(718);const o={exit(e,r){if(e.isTopicReference()){r.topicReferences.push(e)}else{if(r.topicReferences.length===0&&!r.sideEffectsBeforeFirstTopicReference&&!e.isPure()){r.sideEffectsBeforeFirstTopicReference=true}}},"ClassBody|Function"(e,r){if(r.topicReferences.length===0){r.sideEffectsBeforeFirstTopicReference=true}}};const i={BinaryExpression:{exit(e){const{scope:r,node:t}=e;if(t.operator!=="|>"){return}const i=e.get("right");if(i.node.type==="TopicReference"){e.replaceWith(t.left);return}const n={topicReferences:[],sideEffectsBeforeFirstTopicReference:i.isFunction()};i.traverse(o,n);if(n.topicReferences.length===1&&(!n.sideEffectsBeforeFirstTopicReference||e.scope.isPure(t.left,true))){n.topicReferences[0].replaceWith(t.left);e.replaceWith(t.right);return}const p=r.generateUidIdentifierBasedOnNode(t);r.push({id:p});n.topicReferences.forEach((e=>e.replaceWith(s.types.cloneNode(p))));e.replaceWith(s.types.sequenceExpression([s.types.assignmentExpression("=",s.types.cloneNode(p),t.left),t.right]))}}};var n=i;r["default"]=n},809:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(718);var o=t(742);const i={BinaryExpression(e){const{scope:r,node:t}=e;const{operator:i,left:n,right:p}=t;if(i!=="|>")return;const a=r.generateUidIdentifierBasedOnNode(n);const c=s.types.callExpression(p,[s.types.cloneNode(a)]);e.replaceWith((0,o.default)({placeholder:a,call:c,path:e}))}};var n=i;r["default"]=n},812:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(718);const o={PipelinePrimaryTopicReference(e){e.replaceWith(s.types.cloneNode(this.topicId))},PipelineTopicExpression(e){e.skip()}};const i={BinaryExpression(e){const{scope:r}=e;const{node:t}=e;const{operator:i,left:n,right:p}=t;if(i!=="|>")return;const a=r.generateUidIdentifierBasedOnNode(n);r.push({id:a});let c;if(s.types.isPipelineTopicExpression(p)){e.get("right").traverse(o,{topicId:a});c=p.expression}else{let e=p.callee;if(s.types.isIdentifier(e,{name:"eval"})){e=s.types.sequenceExpression([s.types.numericLiteral(0),e])}c=s.types.callExpression(e,[s.types.cloneNode(a)])}e.replaceWith(s.types.sequenceExpression([s.types.assignmentExpression("=",s.types.cloneNode(a),n),c]))}};var n=i;r["default"]=n},168:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:true});r["default"]=void 0;var s=t(345);const o=["minimal","fsharp","hack","smart"];const i=["^^","@@","^","%","#"];const n="https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator";var p=(0,s.declare)(((e,{proposal:r,topicToken:t})=>{e.assertVersion(7);if(typeof r!=="string"||!o.includes(r)){const e=o.map((e=>`"${e}"`)).join(", ");throw new Error(`The pipeline plugin requires a "proposal" option. "proposal" must be one of: ${e}. See <${n}>.`)}if(r==="hack"&&!i.includes(t)){const e=i.map((e=>`"${e}"`)).join(", ");throw new Error(`The pipeline plugin in "proposal": "hack" mode also requires a "topicToken" option. "topicToken" must be one of: ${e}. See <${n}>.`)}return{name:"syntax-pipeline-operator",manipulateOptions(e,s){s.plugins.push(["pipelineOperator",{proposal:r,topicToken:t}]);e.generatorOpts.topicToken=t}}}));r["default"]=p}};var r={};function __nccwpck_require__(t){var s=r[t];if(s!==undefined){return s.exports}var o=r[t]={exports:{}};var i=true;try{e[t](o,o.exports,__nccwpck_require__);i=false}finally{if(i)delete r[t]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t={};(()=>{var e=t;Object.defineProperty(e,"__esModule",{value:true});e["default"]=void 0;var r=__nccwpck_require__(345);var s=__nccwpck_require__(168);var o=__nccwpck_require__(809);var i=__nccwpck_require__(454);var n=__nccwpck_require__(177);var p=__nccwpck_require__(812);const a={minimal:o.default,hack:i.default,fsharp:n.default,smart:p.default};var c=(0,r.declare)(((e,r)=>{e.assertVersion(7);const{proposal:t}=r;if(t==="smart"){console.warn(`The smart-mix pipe operator is deprecated. Use "proposal": "hack" instead.`)}return{name:"proposal-pipeline-operator",inherits:s.default,visitor:a[r.proposal]}}));e["default"]=c})();module.exports=t})();