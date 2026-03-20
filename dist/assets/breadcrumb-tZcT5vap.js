function s({category:e,count:r=null}){const n=document.getElementById("breadcrumb");if(!n||!e)return;function a(t){return t.replace("-"," ").replace(/\b\w/g,p=>p.toUpperCase())}r!==null?n.innerHTML=`
      <span>${a(e)}</span> -> (${r} items)
    `:n.innerHTML=`
      <span>${a(e)}</span>
    `}export{s as r};
