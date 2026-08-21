/* Replace these two values with your Supabase project values. */
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const state = { products: [], categories: [], meals: [], cart: [], filter: "all" };
const money = n => Number(n || 0).toFixed(2);

async function loadStore(){
  const [cats, products, meals] = await Promise.all([
    supabaseClient.from("categories").select("*").eq("active",true).order("sort_order"),
    supabaseClient.from("products").select("*, categories(name,slug)").eq("active",true).order("created_at",{ascending:false}),
    supabaseClient.from("meals").select("*, meal_ingredients(*, products(id,name,price,active))").eq("active",true).order("sort_order")
  ]);
  if(cats.error || products.error || meals.error){
    console.error(cats.error, products.error, meals.error);
    document.querySelector("#productGrid").innerHTML = `<div class="loading">Connect your Supabase project to load products.</div>`;
    return;
  }
  state.categories=cats.data||[]; state.products=products.data||[]; state.meals=meals.data||[];
  renderFilters(); renderProducts(); renderMeals();
}

function renderFilters(){
  const el=document.querySelector("#categoryFilters");
  el.innerHTML=`<button class="filter active" data-filter="all">All</button>`+
    state.categories.map(c=>`<button class="filter" data-filter="${c.slug}">${c.name}</button>`).join("");
  el.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{
    el.querySelectorAll(".filter").forEach(x=>x.classList.remove("active")); b.classList.add("active");
    state.filter=b.dataset.filter; renderProducts();
  });
}
function renderProducts(){
  const list=state.filter==="all"?state.products:state.products.filter(p=>p.categories?.slug===state.filter);
  document.querySelector("#productGrid").innerHTML=list.length?list.map(p=>`
    <article class="product">
      <div class="product-img">${p.image_url?`<img src="${p.image_url}" alt="${escapeHtml(p.name)}" style="width:100%;height:100%;object-fit:cover">`:"PRODUCT IMAGE"}</div>
      <div class="product-body"><small>${escapeHtml(p.categories?.name||"SHOP")}</small><h3>${escapeHtml(p.name)}</h3>
      <p class="price">GH₵${money(p.price)}</p><button class="btn primary" onclick="addProduct('${p.id}')">Add to basket</button></div>
    </article>`).join(""):`<div class="loading">No products in this category yet.</div>`;
}
function renderMeals(){
  document.querySelector("#mealSelect").innerHTML=`<option value="">Select a meal</option>`+
    state.meals.map(m=>`<option value="${m.id}">${escapeHtml(m.name)}</option>`).join("");
}
document.querySelector("#mealSelect").onchange=()=>{
  const meal=state.meals.find(m=>m.id===document.querySelector("#mealSelect").value);
  const list=document.querySelector("#ingredientList"); document.querySelector("#platterTotal").textContent="0.00";
  if(!meal){list.innerHTML="";document.querySelector("#addPlatter").disabled=true;return}
  list.innerHTML=meal.meal_ingredients.filter(x=>x.products?.active!==false).map(x=>`
    <div class="ingredient"><label><input type="checkbox" class="ingredient-check" value="${x.products.id}" data-price="${x.products.price}" data-name="${escapeHtml(x.products.name)}"> ${escapeHtml(x.products.name)}</label><span>GH₵${money(x.products.price)}</span></div>`).join("");
  list.querySelectorAll(".ingredient-check").forEach(x=>x.onchange=updatePlatter);
  updatePlatter();
};
function updatePlatter(){
  let total=0; document.querySelectorAll(".ingredient-check:checked").forEach(x=>total+=Number(x.dataset.price));
  document.querySelector("#platterTotal").textContent=money(total);
  document.querySelector("#addPlatter").disabled=total<=0;
}
document.querySelector("#addPlatter").onclick=()=>{
  const meal=state.meals.find(m=>m.id===document.querySelector("#mealSelect").value);
  const selected=[...document.querySelectorAll(".ingredient-check:checked")].map(x=>({id:x.value,name:x.dataset.name,price:Number(x.dataset.price)}));
  state.cart.push({id:"platter-"+Date.now(),name:`Custom ${meal.name} Platter`,price:selected.reduce((a,x)=>a+x.price,0),qty:1,meta:selected.map(x=>x.name).join(", ")});
  saveCart(); renderCart(); openCart();
};
window.addProduct=id=>{
  const p=state.products.find(x=>x.id===id); if(!p)return;
  const existing=state.cart.find(x=>x.id===id);
  existing?existing.qty++:state.cart.push({id:p.id,name:p.name,price:Number(p.price),qty:1});
  saveCart();renderCart();openCart();
};
function saveCart(){localStorage.setItem("ee_cart",JSON.stringify(state.cart))}
function loadCart(){try{state.cart=JSON.parse(localStorage.getItem("ee_cart")||"[]")}catch{state.cart=[]}}
function renderCart(){
  document.querySelector("#cartCount").textContent=state.cart.reduce((a,x)=>a+x.qty,0);
  document.querySelector("#cartItems").innerHTML=state.cart.length?state.cart.map((x,i)=>`
    <div class="cart-row"><div><b>${escapeHtml(x.name)}</b><small>${x.meta?escapeHtml(x.meta):""}</small><div>GH₵${money(x.price*x.qty)}</div></div>
    <div class="qty"><button onclick="changeQty(${i},-1)">−</button>${x.qty}<button onclick="changeQty(${i},1)">+</button></div></div>`).join(""):`<div class="loading">Your basket is empty.</div>`;
  document.querySelector("#cartTotal").textContent=money(state.cart.reduce((a,x)=>a+x.price*x.qty,0));
}
window.changeQty=(i,d)=>{state.cart[i].qty+=d;if(state.cart[i].qty<=0)state.cart.splice(i,1);saveCart();renderCart()};
function openCart(){document.querySelector("#cartDrawer").classList.add("open")}
document.querySelector("#cartBtn").onclick=openCart; document.querySelector("#closeCart").onclick=()=>document.querySelector("#cartDrawer").classList.remove("open");
document.querySelector("#checkoutBtn").onclick=()=>{if(!state.cart.length)return;document.querySelector("#modal").classList.remove("hidden")};
document.querySelector("#closeModal").onclick=()=>document.querySelector("#modal").classList.add("hidden");
document.querySelector("#checkoutForm").onsubmit=async e=>{
  e.preventDefault(); const form=new FormData(e.target);
  const status=document.querySelector("#checkoutStatus"); status.textContent="Preparing secure payment…";
  const payload={customer:{name:form.get("name"),phone:form.get("phone"),email:form.get("email"),address:form.get("address")},items:state.cart.map(x=>({product_id:x.id.startsWith("platter-")?null:x.id,name:x.name,price:x.price,quantity:x.qty,metadata:x.meta||null}))};
  const {data,error}=await supabaseClient.functions.invoke("initialize-payment",{body:payload});
  if(error||!data?.authorization_url){status.textContent="Could not start payment. Check your Supabase setup.";console.error(error,data);return}
  window.location.href=data.authorization_url;
};
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
loadCart();renderCart();loadStore();
