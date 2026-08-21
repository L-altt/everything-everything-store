create extension if not exists pgcrypto;

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(12,2) not null check(price >= 0),
  stock integer not null default 0 check(stock >= 0),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists meals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  active boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists meal_ingredients (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid not null references meals(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  unique(meal_id, product_id)
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  delivery_address text not null,
  subtotal numeric(12,2) not null,
  currency text not null default 'GHS',
  payment_status text not null default 'pending'
    check(payment_status in ('pending','paid','failed','abandoned')),
  order_status text not null default 'pending'
    check(order_status in ('pending','confirmed','processing','ready','delivered','cancelled')),
  paystack_reference text,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null check(quantity > 0),
  metadata jsonb
);

alter table categories enable row level security;
alter table products enable row level security;
alter table meals enable row level security;
alter table meal_ingredients enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

create policy "public can read active categories"
on categories for select
using (active = true);

create policy "public can read active products"
on products for select
using (active = true);

create policy "public can read active meals"
on meals for select
using (active = true);

create policy "public can read meal ingredients"
on meal_ingredients for select
using (
  exists (
    select 1
    from meals m
    where m.id = meal_id
    and m.active = true
  )
);

insert into categories(name,slug,sort_order)
values
('Groceries','groceries',1),
('Clothing','clothing',2),
('Jewelry','jewelry',3),
('Gifts','gifts',4)
on conflict(slug) do nothing;

insert into meals(name,slug,sort_order)
values
('English Breakfast','english-breakfast',1),
('Rice & Stew','rice-stew',2),
('Jollof','jollof',3),
('Fried Rice','fried-rice',4),
('Fufu','fufu',5),
('Waakye','waakye',6),
('Banku & Tilapia','banku-tilapia',7),
('Kenkey & Fish','kenkey-fish',8)
on conflict(slug) do nothing;
