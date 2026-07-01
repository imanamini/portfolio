import{c as z}from"./chunk-VPIKQEUB.js";import{a as T,b as W,c as O}from"./chunk-2J7ZUSZ4.js";import{i as V}from"./chunk-S7AGJ2PO.js";import{Ca as q,H as U,M as x,Na as g,Oa as f,Qa as R,R as p,Ra as k,S as m,Sa as w,Xa as n,Ya as o,Za as I,a as j,ab as h,b as D,bb as N,ca as C,fb as u,gb as c,jb as b,kb as E,lb as a,mb as d,nb as y,oa as B,ob as P,qa as i,ua as F,wb as S}from"./chunk-7WIKP6E2.js";var v=[{day:1,title:"JSX + Functional Components",category:"Basics",file:"App.jsx, OrderCard.jsx",description:"What functional components are, how JSX works, and why React uses this approach over class components.",angularEquivalent:`In Angular you define components with @Component decorator and a separate template file.
JSX in React = inline template inside the TypeScript/JavaScript file itself.
The two approaches achieve the same result, but React keeps logic and markup in one place.`,angularCode:`// Angular
@Component({
  selector: 'app-order-card',
  template: \`<div>{{ order.number }}</div>\`
})
export class OrderCardComponent {
  @Input() order!: Order;
}

// React equivalent
function OrderCard({ order }) {
  return <div>{order.number}</div>;
}`,keyPoints:["Component names must start with a capital letter \u2014 React uses this to distinguish components from HTML tags","Curly braces {} inside JSX run JavaScript expressions \u2014 equivalent to {{ }} in Angular templates","Use className instead of class, and htmlFor instead of for (reserved JS keywords)","A component must return a single root element \u2014 use <></> Fragment if you need siblings",'Returning null renders nothing \u2014 like *ngIf="false" in Angular'],codeBlocks:[{label:"App.jsx \u2014 simplest possible component",code:`function App() {
  return <Menu onGoToCheckout={() => setView('checkout')} />;
}
export default App;`},{label:"OrderCard.jsx \u2014 component with props",code:`function OrderCard({ order, onStatusChange, isUpdating = false }) {
  if (!order) return null; // like *ngIf

  return (
    <div className="order-card">       {/* className, not class */}
      <h3>Order #{order.orderNumber}</h3>
      <span>{getStatusLabel(order.status)}</span>
    </div>
  );
}`}],referenceUrl:"https://react.dev/learn/writing-markup-with-jsx",referenceLabel:"react.dev \u2014 Writing Markup with JSX"},{day:2,title:"Props + Default Props",category:"Basics",file:"OrderCard.jsx, ImageWithSkeleton.jsx",description:"How props pass data down the component tree, setting default values, and forwarding unknown props with spread.",angularEquivalent:`Props in React = @Input() in Angular.
Key difference: React props are strictly read-only (enforced by convention),
while Angular @Input() can technically be mutated (but shouldn't be).
Angular: <app-card [order]="order">
React:   <OrderCard order={order} />`,angularCode:`// Angular
@Component({ selector: 'app-card' })
export class CardComponent {
  @Input() order!: Order;
  @Input() isUpdating = false; // default value
}

// React equivalent
function OrderCard({ order, isUpdating = false }) {
  // isUpdating defaults to false if not passed
}`,keyPoints:["Props flow one way \u2014 from parent to child \u2014 never mutate them","Set a default with = in destructuring: ({ isUpdating = false })","Collect remaining props with ...rest, then spread them: <img {...props} />","Changing a prop causes the receiving component to re-render","Use TypeScript interfaces or PropTypes for type-safe props"],codeBlocks:[{label:"OrderCard.jsx \u2014 default prop value",code:`function OrderCard({ order, onStatusChange, isUpdating = false }) {
  //                                                    ^^^^^^^^^^^^^^^^^^^^
  //                                        false is used if caller omits it
  return (
    <button disabled={isUpdating}>
      {isUpdating ? 'Updating\u2026' : 'Change Status'}
    </button>
  );
}`},{label:"ImageWithSkeleton.jsx \u2014 rest & spread props",code:`function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  ...props        // captures tabIndex, id, data-*, aria-*, etc.
}) {
  return (
    <img src={src} alt={alt} {...props} />
    //                        ^^^^^^^^^
    //           passes every remaining prop straight to <img>
  );
}

// Usage
<ImageWithSkeleton src={url} alt="food" tabIndex={0} data-id={item.id} />`}],referenceUrl:"https://react.dev/learn/passing-props-to-a-component",referenceLabel:"react.dev \u2014 Passing Props to a Component"},{day:3,title:"useState \u2014 Introduction",category:"Basics",file:"App.jsx, Login.jsx",description:"What state is, how useState works, and why calling the setter triggers a re-render.",angularEquivalent:`useState \u2248 signal() in Angular 17+
Both trigger a UI update when their value changes.
Key difference: React re-renders the entire component function,
Angular Signals with OnPush only update the affected expressions.`,angularCode:`// Angular 17+ signals
export class AppComponent {
  authenticated = signal(true);
  view = signal<'menu' | 'checkout'>('menu');

  login() { this.authenticated.set(true); }
}

// React equivalent
function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [view, setView] = useState('menu');

  const login = () => setAuthenticated(true);
}`,keyPoints:["useState(initialValue) returns [currentValue, setter]","Calling the setter schedules a re-render with the new value","The initial value is only used on the first render","Never mutate state directly: ~~state.push(x)~~ \u274C \u2014 always call the setter","You can have multiple independent useState calls in one component"],codeBlocks:[{label:"App.jsx \u2014 multiple state variables",code:`function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [view, setView] = useState('menu');        // 'menu' | 'checkout' | \u2026
  const [orderData, setOrderData] = useState(null);

  // Change state \u2192 React re-renders App
  const goToCheckout = () => setView('checkout');

  if (!authenticated) {
    return <Login onSuccess={() => setAuthenticated(true)} />;
  }
  if (view === 'menu') {
    return <Menu onGoToCheckout={goToCheckout} />;
  }
}`}],referenceUrl:"https://react.dev/reference/react/useState",referenceLabel:"react.dev \u2014 useState Reference"},{day:4,title:"useState \u2014 Arrays & Objects",category:"Basics",file:"Menu.jsx, OrdersPage.jsx",description:"How to update arrays and objects stored in state without mutation \u2014 always create a new reference.",angularEquivalent:`The same immutability rule applies with Angular signals:
signal.update(prev => [...prev, newItem])
React and Angular both rely on reference equality to detect changes \u2014
mutating in place silently breaks the update cycle in both frameworks.`,angularCode:`// Angular signals
items = signal<string[]>([]);
this.items.update(prev => [...prev, newItem]); // add
this.items.update(prev => prev.filter(i => i !== item)); // remove

// React useState \u2014 identical pattern
const [items, setItems] = useState([]);
setItems(prev => [...prev, newItem]);
setItems(prev => prev.filter(i => i !== item));`,keyPoints:["Build a new array: [...prev, newItem] \u2014 never call .push() on the existing array","Build a new object: {...prev, key: newValue} \u2014 never assign properties directly","React checks reference equality \u2014 you must hand it a new reference to detect a change","For a Set: new Set(prev).add(item) \u2014 then return the new Set","When the new state depends on the previous value, use the functional form: setState(prev => \u2026)"],codeBlocks:[{label:"FoodModal.jsx \u2014 array state (add & remove)",code:`const [selectedToppings, setSelectedToppings] = useState([]);

// Add
setSelectedToppings(prev => [...prev, toppingId]);

// Remove
setSelectedToppings(prev => prev.filter(id => id !== toppingId));

// Replace group (single-select)
setSelectedToppings(prev => {
  const withoutGroup = prev.filter(id => !groupToppingIds.includes(id));
  return checked ? [...withoutGroup, toppingId] : withoutGroup;
});`},{label:"OrdersPage.jsx \u2014 Set in state",code:`const [updatingOrderIds, setUpdatingOrderIds] = useState(new Set());

// Add
setUpdatingOrderIds(prev => new Set(prev).add(orderId));
//                          ^^^^^^^^^^^^^ new object \u2014 React sees the change

// Remove
setUpdatingOrderIds(prev => {
  const next = new Set(prev);
  next.delete(orderId);
  return next;
});`}],referenceUrl:"https://react.dev/learn/updating-arrays-in-state",referenceLabel:"react.dev \u2014 Updating Arrays in State"},{day:5,title:"Event Handling",category:"Basics",file:"SettingsPage.jsx, FoodModal.jsx",description:"Handling user events in React \u2014 onClick, onChange, onSubmit, and the synthetic event object.",angularEquivalent:`Angular: (click)="handler()" or (change)="handler($event)"
React:   onClick={handler} or onClick={(e) => handler(e)}
In Angular you call component methods directly.
In React handlers are plain JavaScript functions \u2014 no special wiring needed.`,angularCode:`// Angular
<button (click)="handleSubmit()">Submit</button>
<input (change)="onChange($event)" [value]="printerIP">

// React equivalent
<button onClick={handleSubmit}>Submit</button>
<input onChange={(e) => setPrinterIP(e.target.value)} value={printerIP} />`,keyPoints:["Event props are camelCase: onClick, onChange, onSubmit, onKeyPress","Call e.preventDefault() to stop form submissions from reloading the page","Call e.stopPropagation() to prevent click events from bubbling to parent elements","Read the current value of an input from e.target.value","Pass the function reference, not a call: onClick={fn} \u2705  onClick={fn()} \u274C"],codeBlocks:[{label:"SettingsPage.jsx \u2014 onSubmit with preventDefault",code:`const handleSubmit = async (e) => {
  e.preventDefault(); // stop the page from reloading
  await updatePrinterIP(printerIP);
};

<form onSubmit={handleSubmit}>
  <input
    value={printerIP}
    onChange={(e) => setPrinterIP(e.target.value)}
    //         ^ SyntheticEvent    ^ current input value
  />
  <button type="submit">Save</button>
</form>`},{label:"FoodModal.jsx \u2014 stopPropagation on modal",code:`// Click overlay \u2192 close modal
<div className="overlay" onClick={close}>
  {/* Click inside modal \u2192 do NOT close */}
  <div className="modal" onClick={(e) => e.stopPropagation()}>
    \u2026
  </div>
</div>

// Menu.jsx \u2014 onKeyPress for keyboard accessibility
<div
  role="button"
  tabIndex={0}
  onClick={() => onAdd(item)}
  onKeyPress={(e) => e.key === 'Enter' && onAdd(item)}
>`}],referenceUrl:"https://react.dev/learn/responding-to-events",referenceLabel:"react.dev \u2014 Responding to Events"},{day:6,title:"Conditional Rendering",category:"Basics",file:"App.jsx, FoodModal.jsx",description:"All the ways to conditionally show UI \u2014 if/return, ternary, &&, and returning null.",angularEquivalent:`Angular: @if (condition) { } or *ngIf="condition"
React uses plain JavaScript \u2014 no structural directives.
This means more flexibility but also more responsibility for readability.`,angularCode:`// Angular
@if (authenticated) {
  <app-menu />
} @else {
  <app-login />
}

// React \u2014 approach 1: if/return (best for full-page switching)
if (!authenticated) return <Login />;
return <Menu />;

// React \u2014 approach 2: ternary
return authenticated ? <Menu /> : <Login />;`,keyPoints:["if/return \u2014 best when the entire component output changes based on a condition",'condition && <Element> \u2014 render only when true; watch out: 0 && <El> prints "0"!',"condition ? <A> : <B> \u2014 one of two alternatives, readable for simple cases","Returning null renders nothing at all (more semantic than an empty fragment)","Nested ternaries are valid but hurt readability \u2014 extract to a variable if it gets complex"],codeBlocks:[{label:"App.jsx \u2014 if/return for view switching",code:`function App() {
  const [view, setView] = useState('menu');

  if (!authenticated)      return <Login />;
  if (view === 'welcome')  return <Welcome />;
  if (view === 'menu')     return <Menu />;
  if (view === 'checkout') return <Checkout />;

  return null; // no matching view
}`},{label:"Menu.jsx \u2014 nested ternary + && in JSX",code:`{loading ? (
  <div className="spinner" />
) : error ? (
  <div className="error">{error}</div>
) : filteredCategories.length === 0 ? (
  <p>No items found</p>
) : (
  <div className="sections">
    {filteredCategories.map(\u2026)}
  </div>
)}

{/* && \u2014 show only when truthy */}
{showCartFab && (
  <button className="cart-btn">View Cart ({cartCount})</button>
)}
{itemCount > 0 && <div className="badge">{itemCount}</div>}`}],referenceUrl:"https://react.dev/learn/conditional-rendering",referenceLabel:"react.dev \u2014 Conditional Rendering"},{day:7,title:"Lists & Keys",category:"Basics",file:"OrdersPage.jsx, FoodModal.jsx",description:"Rendering lists with .map(), why every item needs a unique key, and handling nested lists.",angularEquivalent:`Angular: @for (item of items; track item.id) { }
React:   items.map(item => <El key={item.id} />)
"track" in Angular = "key" in React.
Both exist for the same reason: efficient DOM reconciliation.`,angularCode:`// Angular
@for (category of categories; track category.id) {
  <section>
    @for (item of category.items; track item.id) {
      <app-food-card [item]="item" />
    }
  </section>
}

// React equivalent
{categories.map(category => (
  <section key={category.id}>
    {category.items.map(item => (
      <FoodCard key={item.id} item={item} />
    ))}
  </section>
))}`,keyPoints:["key must be unique among siblings at the same level, not globally","Never use array index as key if the list can be reordered or filtered","Nested lists need their own keys at each nesting level independently","React uses key internally \u2014 it is not accessible inside the component as a prop","Returning null inside .map() is valid \u2014 that element simply is not rendered"],codeBlocks:[{label:"OrdersPage.jsx \u2014 map with conditional null",code:`const statusOrder = ['pending_acceptance', 'preparing', 'ready'];

{statusOrder.map((status) => {
  const orders = groupedOrders[status] || [];
  if (orders.length === 0) return null; // skip empty groups

  return (
    <div key={status} className="section">
      <h2>{status} ({orders.length})</h2>
      <div className="grid">
        {orders.map((order) => (
          <OrderCard
            key={order.id}     // real ID, not array index
            order={order}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
})}`},{label:"FoodModal.jsx \u2014 nested lists with independent keys",code:`{food.toppingGroups.map((group) => (
  <ToppingGroup
    key={group.id}       // key at the outer level
    group={group}
    onToppingChange={handleToppingChange}
  />
))}

// Inside ToppingGroup:
{group.toppings.map((topping) => (
  <ToppingItem
    key={topping.id}     // independent key at the inner level
    topping={topping}
    checked={selectedToppings.includes(topping.id)}
  />
))}`}],referenceUrl:"https://react.dev/learn/rendering-lists",referenceLabel:"react.dev \u2014 Rendering Lists"},{day:8,title:"useEffect \u2014 Introduction & Dependency Array",category:"Hooks",file:"SettingsPage.jsx, FoodModal.jsx",description:"Running side effects after render \u2014 API calls, subscriptions \u2014 and controlling when they re-run with the dependency array.",angularEquivalent:`useEffect([]) \u2248 ngOnInit
useEffect([dep]) \u2248 ngOnChanges watching a specific input
useEffect with no array \u2248 has no direct Angular equivalent (runs after every render)
Angular 17+ effect(() => { \u2026 }) \u2248 useEffect without cleanup`,angularCode:`// Angular
ngOnInit() {
  this.loadSettings(); // runs once after view init
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['foodId']) this.loadFood(); // re-runs on input change
}

// Angular 17+ reactive effect
effect(() => {
  console.log(this.count()); // re-runs whenever count() changes
});`,keyPoints:["[] \u2014 runs once after the first render (like ngOnInit)","[dep1, dep2] \u2014 re-runs every time dep1 or dep2 changes","No array at all \u2014 re-runs after every render (rarely what you want)","useEffect runs after the DOM has been painted, not during render","You can have multiple independent useEffect calls in one component \u2014 keep them focused"],codeBlocks:[{label:"App.jsx \u2014 runs once on mount ([] dependency)",code:`useEffect(() => {
  // Runs exactly once when App mounts
  setUnauthorizedHandler(() => {
    setAuthToken('');
    setAuthenticated(false);
  });
  versionChecker.init(5); // poll for updates every 5 minutes
}, []); // empty array = mount only`},{label:"FoodModal.jsx \u2014 runs when open or foodId changes",code:`useEffect(() => {
  if (!open || !foodId) return; // guard clause
  setLoading(true);
  fetchFoodById(foodId).then(data => setFood(data));
}, [open, foodId]);
//  ^^^^^^^^^^^^^ re-run whenever either value changes`}],referenceUrl:"https://react.dev/reference/react/useEffect",referenceLabel:"react.dev \u2014 useEffect Reference"},{day:9,title:"useEffect \u2014 Cleanup",category:"Hooks",file:"Menu.jsx, OrdersPage.jsx",description:"Returning a cleanup function from useEffect to remove listeners, clear timers, and disconnect subscriptions on unmount.",angularEquivalent:`Cleanup function \u2248 ngOnDestroy in Angular.
Both exist to free resources when a component is removed from the DOM.
Angular: implement OnDestroy \u2192 ngOnDestroy()
React:   return () => { cleanup\u2026 } from useEffect`,angularCode:`// Angular
export class OrdersComponent implements OnInit, OnDestroy {
  private intervalId!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => this.loadOrders(), 30_000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // cleanup
  }
}

// React equivalent
useEffect(() => {
  const id = setInterval(() => loadOrders(true), 30_000);
  return () => clearInterval(id); // same as ngOnDestroy
}, [loadOrders]);`,keyPoints:['The function returned from useEffect is the "cleanup" \u2014 React calls it before the next run or on unmount',"Event listeners: addEventListener in setup, removeEventListener in cleanup","Timers: setInterval/setTimeout in setup, clearInterval/clearTimeout in cleanup","WebSocket / Pusher: connect in setup, disconnect in cleanup",'Forgetting cleanup causes memory leaks and "update on unmounted component" warnings'],codeBlocks:[{label:"Menu.jsx \u2014 removing a scroll event listener",code:`useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container || categories.length === 0) return;

  const handleScroll = () => { /* update selected category */ };

  container.addEventListener('scroll', handleScroll, { passive: true });

  return () => container.removeEventListener('scroll', handleScroll);
  //     ^^^ cleanup: fires on unmount or before next run
}, [categories]);`},{label:"OrdersPage.jsx \u2014 clearing an interval",code:`useEffect(() => {
  loadOrders(); // initial fetch

  const intervalId = setInterval(() => {
    loadOrders(true); // silent refresh every 30 seconds
  }, 30_000);

  return () => clearInterval(intervalId); // stop on unmount
}, [loadOrders]);`}],referenceUrl:"https://react.dev/learn/synchronizing-with-effects#step-3-add-cleanup-if-needed",referenceLabel:"react.dev \u2014 Adding Cleanup to Effects"},{day:10,title:"useEffect \u2014 Async & the Cancelled Flag Pattern",category:"Hooks",file:"Menu.jsx, FoodModal.jsx",description:"How to safely run async code inside useEffect and avoid setting state after a component unmounts.",angularEquivalent:`Angular solves this with takeUntilDestroyed() or a Subject that completes in ngOnDestroy.
React has no built-in cancellation for Promises, so you use a boolean "cancelled" flag.
The async pipe in Angular also auto-unsubscribes \u2014 React has no equivalent.`,angularCode:`// Angular \u2014 auto-cancel with takeUntilDestroyed
ngOnInit() {
  this.http.get('/api/categories').pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe(data => this.categories = data);
}

// React equivalent \u2014 manual cancelled flag
useEffect(() => {
  let cancelled = false;
  fetchCategories().then(data => {
    if (!cancelled) setCategories(data);
  });
  return () => { cancelled = true; };
}, []);`,keyPoints:["useEffect cannot directly be async \u2014 define an async function inside and call it",'The "cancelled" flag prevents setState from running after the component unmounts',"Race condition: if the user navigates back before a slow fetch completes, the result must be ignored","Always guard both the success path AND the error path with the flag","AbortController + fetch signal is a cleaner alternative for native fetch calls"],codeBlocks:[{label:"Menu.jsx \u2014 full async useEffect pattern",code:`useEffect(() => {
  let cancelled = false; // \u2190 the guard flag

  async function load() {
    setLoading(true);
    setError('');
    try {
      const cats = await fetchCategories(); // may be slow
      if (cancelled) return;               // \u2190 component gone? bail out
      setCategories(cats);
      setSelectedCat(cats[0]?.id || '');
    } catch (e) {
      if (cancelled) return;               // \u2190 same guard on error path
      setError('Failed to load categories.');
    } finally {
      if (!cancelled) setLoading(false);
    }
  }

  load();

  return () => { cancelled = true; }; // cleanup sets the flag
}, []);`}],referenceUrl:"https://react.dev/learn/you-might-not-need-an-effect",referenceLabel:"react.dev \u2014 You Might Not Need an Effect"},{day:11,title:"useRef \u2014 Mutable Value Without Re-render",category:"Hooks",file:"Menu.jsx (logoClickCount, isUserScrolling, isMountedRef)",description:"Storing mutable values that should persist across renders but NOT trigger a re-render when changed.",angularEquivalent:`In Angular every private class property behaves like useRef \u2014
changing it does not trigger change detection (especially with OnPush).
private counter = 0; // mutation = no re-render
useRef \u2248 a private property that never triggers a UI update`,angularCode:`// Angular \u2014 plain class property (no signal, no re-render)
export class MenuComponent {
  private logoClickCount = 0;
  private clickTimeout?: ReturnType<typeof setTimeout>;
}

// React \u2014 useRef
const logoClickCount = useRef(0);
const logoClickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);`,keyPoints:["Access the value with .current: ref.current","Mutating .current does NOT schedule a re-render","The value persists across renders (unlike a local variable which resets)","Great for: counters, timer IDs, mount flags, socket instances, previous values","Rule of thumb: if a value should NOT appear in the UI, useRef; if it should, useState"],codeBlocks:[{label:"Menu.jsx \u2014 hidden logout (10 clicks on logo)",code:`const logoClickCount = useRef(0);
const logoClickTimeout = useRef(null);

const handleLogoClick = () => {
  logoClickCount.current += 1; // mutate \u2014 no re-render triggered

  if (logoClickTimeout.current) clearTimeout(logoClickTimeout.current);

  if (logoClickCount.current >= 10) {
    logout();
    window.location.reload();
    return;
  }

  // Reset counter if user stops clicking for 2 seconds
  logoClickTimeout.current = setTimeout(() => {
    logoClickCount.current = 0;
  }, 2000);
};`},{label:"OrdersPage.jsx \u2014 isMountedRef prevents setState after unmount",code:`const isMountedRef = useRef(true);

useEffect(() => {
  isMountedRef.current = true;
  return () => { isMountedRef.current = false; }; // set on unmount
}, []);

const loadOrders = async () => {
  const data = await fetchCurrentOrders();
  if (isMountedRef.current) { // guard \u2014 component still mounted?
    setOrders(data);
  }
};`}],referenceUrl:"https://react.dev/learn/referencing-values-with-refs",referenceLabel:"react.dev \u2014 Referencing Values with Refs"},{day:12,title:"useRef \u2014 DOM Access",category:"Hooks",file:"Menu.jsx (scrollContainerRef, categoryRefs)",description:"Attaching a ref to a JSX element to get a direct handle on the underlying DOM node.",angularEquivalent:`useRef for DOM \u2248 @ViewChild() in Angular
Ref callback \u2248 @ViewChildren() + QueryList
Both give direct access to DOM nodes when React/Angular's declarative model isn't enough.`,angularCode:`// Angular @ViewChild
@ViewChild('scrollContainer') container!: ElementRef;
@ViewChildren(CategorySection) sections!: QueryList<CategorySection>;

ngAfterViewInit() {
  this.container.nativeElement.scrollTop = 0;
}

// React equivalent
const scrollContainerRef = useRef(null);
// After mount:
scrollContainerRef.current.scrollTop = 0;`,keyPoints:["Attach with ref={myRef} on any JSX element \u2014 myRef.current becomes the DOM node after mount","current is null during the render \u2014 only available after the component mounts","Ref callback: ref={(el) => map[id] = el} \u2014 for collecting refs from a dynamic list","@ViewChild in Angular is the direct equivalent","Common uses: scrollIntoView(), focus(), getBoundingClientRect(), media playback"],codeBlocks:[{label:"Menu.jsx \u2014 ref on a single element",code:`const scrollContainerRef = useRef(null);

// Attach the ref
<main ref={scrollContainerRef}>\u2026</main>

// Use after mount
useEffect(() => {
  const container = scrollContainerRef.current; // the actual DOM node
  container.addEventListener('scroll', handleScroll);
  return () => container.removeEventListener('scroll', handleScroll);
}, []);`},{label:"Menu.jsx \u2014 ref callback for a dynamic list",code:`const categoryRefs = useRef({}); // stores { [id]: DOMElement }

{categories.map((cat) => (
  <section
    key={cat.id}
    ref={(el) => {
      // el = DOM node on mount, null on unmount
      if (el) categoryRefs.current[cat.id] = el;
    }}
  >
    {cat.name}
  </section>
))}

// Programmatic scroll
const scrollTo = (id) => {
  categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
};`}],referenceUrl:"https://react.dev/learn/manipulating-the-dom-with-refs",referenceLabel:"react.dev \u2014 Manipulating the DOM with Refs"},{day:13,title:"useMemo",category:"Hooks",file:"Menu.jsx (filteredCategories, foodQuantityMap), Checkout.jsx",description:"Memoizing expensive computations so they only re-run when their inputs change.",angularEquivalent:`useMemo \u2248 computed() in Angular Signals
Both cache a derived value and only recompute when dependencies change.
Angular's pure pipe is also similar \u2014 transform() only runs when the input reference changes.`,angularCode:`// Angular computed signal
filteredCategories = computed(() => {
  const q = this.query().toLowerCase();
  return this.categories().filter(cat =>
    cat.name.toLowerCase().includes(q)
  );
});

// React useMemo \u2014 same idea
const filteredCategories = useMemo(() => {
  const q = query.toLowerCase();
  return categories.filter(cat =>
    cat.name.toLowerCase().includes(q)
  );
}, [categories, query]);`,keyPoints:["useMemo(fn, [deps]) \u2014 fn runs only when a dependency changes; the result is cached otherwise","Use it for computations that are expensive or that produce a new object/array passed as a prop","Passing a new object/array reference as a prop every render causes the child to re-render unnecessarily","Equivalent to Angular's computed() signal","Don't wrap everything in useMemo \u2014 only use it when there's a measurable performance need"],codeBlocks:[{label:"Menu.jsx \u2014 filtered categories with memoization",code:`const filteredCategories = useMemo(() => {
  const q = query.trim().toLowerCase();
  if (!q) return categories; // no search = return all

  return categories
    .map(cat => ({
      ...cat,
      items: cat.items.filter(it =>
        it.name.toLowerCase().includes(q)
      ),
    }))
    .filter(cat => cat.items.length > 0);
}, [categories, query]);
//  ^^^^^^^^^^^^^^^^^ only recomputes when either changes`},{label:"Menu.jsx \u2014 O(1) cart lookup map",code:`// Without useMemo: rebuilds the map on every render (O(n))
// With useMemo: rebuilds only when cartItems changes
const foodQuantityMap = useMemo(() => {
  const map: Record<string, number> = {};
  cartItems.forEach(item => {
    const id = String(item.food?.food_id);
    map[id] = (map[id] || 0) + Number(item.quantity);
  });
  return map;
}, [cartItems]);

const getItemQty = (foodId: string) => foodQuantityMap[foodId] || 0;`}],referenceUrl:"https://react.dev/reference/react/useMemo",referenceLabel:"react.dev \u2014 useMemo Reference"},{day:14,title:"useCallback",category:"Hooks",file:"Menu.jsx, OrdersPage.jsx, useToast.jsx",description:"Memoizing a function so its reference stays stable across renders \u2014 preventing unnecessary child re-renders and stale useEffect dependencies.",angularEquivalent:`Angular class methods already have a stable reference \u2014 the same method object is reused across change detection cycles.
React recreates every function on every render, so you need useCallback to stabilize references.
This is one of the few areas where Angular has a natural advantage.`,angularCode:`// Angular \u2014 method reference is always stable
export class MenuComponent {
  handleCategorySelect(id: string) {
    // same reference across all change detection runs
  }
}

// React \u2014 without useCallback, new function on every render
const handleSelect = (id) => { \u2026 }; // NEW reference each render

// React \u2014 with useCallback, stable reference
const handleSelect = useCallback((id) => { \u2026 }, []);`,keyPoints:['Every render creates a new function object \u2014 new reference \u2192 child sees "new" prop \u2192 re-renders',"useCallback(fn, [deps]) caches fn and returns the same reference until deps change","Most important use case: a function that appears in another hook's dependency array","Difference from useMemo: useMemo caches a VALUE, useCallback caches a FUNCTION","useCallback(fn, []) \u2014 the function reference never changes (no deps)"],codeBlocks:[{label:"Menu.jsx \u2014 stable callback for scroll-to-category",code:`const handleCategorySelect = useCallback((categoryId) => {
  const el = categoryRefs.current[categoryId];
  if (el && scrollContainerRef.current) {
    isUserScrolling.current = false;
    setSelectedCat(categoryId);
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isUserScrolling.current = true; }, 1000);
  }
}, []); // stable \u2014 no deps change
`},{label:"OrdersPage.jsx \u2014 useCallback + useEffect dependency",code:`// loadOrders has a stable reference thanks to useCallback
const loadOrders = useCallback(async (silent = false) => {
  try {
    if (!silent) setLoading(true);
    const data = await fetchCurrentOrders();
    setOrders(data.map(mapOrder));
  } catch (err) {
    setError(err.message);
  } finally {
    if (!silent) setLoading(false);
  }
}, []); // no external deps

// Because loadOrders is stable, this effect runs only once
useEffect(() => {
  loadOrders();
  const id = setInterval(() => loadOrders(true), 30_000);
  return () => clearInterval(id);
}, [loadOrders]); // stable \u2192 effect won't loop`}],referenceUrl:"https://react.dev/reference/react/useCallback",referenceLabel:"react.dev \u2014 useCallback Reference"},{day:15,title:"Custom Hooks",category:"Patterns",file:"useOrderSocket.js, useToast.jsx",description:"Extracting stateful logic into reusable functions that can be shared across components.",angularEquivalent:`Custom Hook \u2248 Angular Service in its simplest form.
Key difference: an Angular Service is a singleton (one instance for the whole app).
A custom Hook creates a new independent state instance every time it is called.
If you need shared global state, use Context or a state library.`,angularCode:`// Angular Service \u2014 singleton
@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = signal<Toast[]>([]);

  show(msg: string, type = 'info') {
    const id = Date.now();
    this.toasts.update(t => [...t, { id, msg, type }]);
    setTimeout(() => this.hide(id), 3000);
  }
  hide(id: number) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }
}

// React Custom Hook \u2014 new instance per component
function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = 'info') => { \u2026 }, []);
  return { toasts, show, error: (msg) => show(msg, 'error') };
}`,keyPoints:['The name must start with "use" \u2014 React enforces the Rules of Hooks based on this convention',"A custom hook can call any built-in hook (useState, useEffect, useRef\u2026)","Each call to a custom hook gets its own isolated state \u2014 unlike Angular services","Extract to a custom hook when you find yourself copy-pasting stateful logic","Return whatever the consumer needs: state values, setter functions, refs"],codeBlocks:[{label:"useToast.jsx \u2014 reusable toast notifications",code:`export function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    hideToast,
    error:   (msg) => showToast(msg, 'error'),
    success: (msg) => showToast(msg, 'success'),
  };
}

// Usage \u2014 each component gets its own toast state
function Menu() {
  const toast = useToast();
  toast.error('Failed to add item!');
  return <ToastContainer toasts={toast.toasts} />;
}`},{label:"useOrderSocket.js \u2014 WebSocket lifecycle in a hook",code:`export function useOrderSocket(onOrderCreated) {
  const pusherRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const Pusher = (await import('pusher-js')).default;
      const pusher = new Pusher('key', { wsHost: '\u2026' });
      pusherRef.current = pusher;

      pusher.subscribe('channel').bind('order-event', (data) => {
        if (isSuccessful(data)) onOrderCreated(data);
      });
    };

    init();
    return () => pusherRef.current?.disconnect(); // cleanup on unmount
  }, [onOrderCreated]);
}`}],referenceUrl:"https://react.dev/learn/reusing-logic-with-custom-hooks",referenceLabel:"react.dev \u2014 Reusing Logic with Custom Hooks"},{day:16,title:"Lifting State Up",category:"Patterns",file:"App.jsx",description:"When multiple components need the same state, move it up to their closest common ancestor.",angularEquivalent:`In Angular you typically share state via a Service or @Output() EventEmitter.
Lifting State = the @Output() + callback pattern in Angular.
The difference: Angular Services are available globally via DI;
in React you lift state through the component tree (or use Context / a state library for deeper sharing).`,angularCode:`// Angular \u2014 child emits via @Output
@Component({ selector: 'app-please-pay' })
export class PleasePay {
  @Output() paymentSuccess = new EventEmitter<OrderData>();

  async process() {
    const data = await createOrder();
    this.paymentSuccess.emit(data); // notify parent
  }
}

// React \u2014 callback prop (same concept)
function PleasePay({ onPaymentSuccess }) {
  const process = async () => {
    const data = await createOrder({});
    onPaymentSuccess(data); // same as emit
  };
}`,keyPoints:["Move state to the closest common ancestor of all components that need it","Define the handler in the parent, pass it as a callback prop to the child","The child calls the callback \u2192 parent state updates \u2192 all consumers re-render",'"Prop drilling": passing props through many layers becomes painful \u2014 Context or Zustand solve this',"Equivalent to @Output() EventEmitter in Angular"],codeBlocks:[{label:"App.jsx \u2014 central state + callbacks flowing down",code:`function App() {
  // Shared state owned by the closest common ancestor
  const [view, setView] = useState('menu');
  const [orderData, setOrderData] = useState(null);

  // Handlers defined here, passed as props
  const handlePaymentSuccess = (data) => {
    setOrderData(data);
    setView('success'); // transition the whole app
  };

  const handlePaymentError = (msg) => {
    setErrorMessage(msg);
    setView('error');
  };

  return (
    <PleasePay
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentError={handlePaymentError}
      onBackToCheckout={() => setView('checkout')}
    />
  );
}

// PleasePay only calls the callback \u2014 it owns no navigation state
function PleasePay({ onPaymentSuccess, onPaymentError }) {
  const process = async () => {
    const data = await createOrder({});
    data.success ? onPaymentSuccess(data) : onPaymentError(data.message);
  };
}`}],referenceUrl:"https://react.dev/learn/sharing-state-between-components",referenceLabel:"react.dev \u2014 Sharing State Between Components"},{day:17,title:"Component Composition",category:"Patterns",file:"FoodModal.jsx (ToppingItem \u2192 ToppingGroup \u2192 FoodModal)",description:"Breaking complex UI into small, focused components with a single responsibility each.",angularEquivalent:`Component composition works the same way in Angular \u2014 you build a hierarchy of components.
Angular requires you to list child components in the imports array of standalone components.
React just imports and uses them directly \u2014 less ceremony, same pattern.`,angularCode:`// Angular \u2014 must declare in imports
@Component({
  imports: [ToppingGroupComponent],
  template: \`<app-topping-group [group]="g" />\`
})
export class FoodModalComponent {}

// React \u2014 import and use directly
import ToppingGroup from './ToppingGroup';
function FoodModal() {
  return <ToppingGroup group={g} />;
}`,keyPoints:["Each component should do one thing well \u2014 Single Responsibility Principle","ToppingItem: renders one toggle/checkbox for one topping","ToppingGroup: renders a group header and maps over its ToppingItems","FoodModal: owns state, maps over ToppingGroups, handles add logic","Props form the public API (contract) between parent and child components"],codeBlocks:[{label:"FoodModal.jsx \u2014 three-layer composition",code:`// Layer 1: smallest unit \u2014 one toggle
function ToppingItem({ topping, checked, onChange, isMultiSelect }) {
  return (
    <div className="topping-item">
      <span>{topping.name}</span>
      <input
        type={isMultiSelect ? 'checkbox' : 'radio'}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}

// Layer 2: medium \u2014 renders a list of ToppingItems
function ToppingGroup({ group, selectedToppings, onToppingChange }) {
  return (
    <div>
      <h3>{group.name} {group.isRequired && '(Required)'}</h3>
      {group.toppings.map(topping => (
        <ToppingItem
          key={topping.id}
          topping={topping}
          checked={selectedToppings.includes(topping.id)}
          onChange={(checked) =>
            onToppingChange(group.id, topping.id, checked)
          }
          isMultiSelect={group.isMultiSelect}
        />
      ))}
    </div>
  );
}

// Layer 3: large \u2014 owns state, renders ToppingGroups
export default function FoodModal({ foodId, open, onClose, onAdd }) {
  const [selectedToppings, setSelectedToppings] = useState([]);

  return (
    <div className="modal">
      {food.toppingGroups.map(group => (
        <ToppingGroup
          key={group.id}
          group={group}
          selectedToppings={selectedToppings}
          onToppingChange={handleToppingChange}
        />
      ))}
    </div>
  );
}`}],referenceUrl:"https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children",referenceLabel:"react.dev \u2014 Passing JSX as Children"},{day:18,title:"Controlled Components",category:"Patterns",file:"SettingsPage.jsx",description:"Form inputs where React state is the single source of truth \u2014 value + onChange working together.",angularEquivalent:`Controlled Component \u2248 Reactive Forms (FormControl) in Angular
Also similar to template-driven forms with [(ngModel)]
In all three cases the model/state is the source of truth \u2014 not the DOM.`,angularCode:`// Angular Reactive Forms
printerIP = new FormControl('');
<input [formControl]="printerIP" />

// Angular template-driven
<input [(ngModel)]="printerIP" />

// React Controlled
const [printerIP, setPrinterIP] = useState('');
<input value={printerIP} onChange={(e) => setPrinterIP(e.target.value)} />`,keyPoints:["value={state} + onChange={setter} = controlled input \u2014 React drives the value","Every keystroke: user types \u2192 onChange \u2192 setState \u2192 re-render \u2192 input displays new value","State is the single source of truth \u2014 validation and transformation happen before update","Uncontrolled: only a ref, DOM is the source of truth \u2014 simpler but less powerful","Prefer controlled for validation, computed values, or dependent fields"],codeBlocks:[{label:"SettingsPage.jsx \u2014 fully controlled form",code:`function PrinterTab() {
  const [printerIP, setPrinterIP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ipRegex = /^(d{1,3}.){3}d{1,3}$/;
    if (!ipRegex.test(printerIP)) {
      setError('Invalid IP format');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await updatePrinterIP(printerIP);
      setSuccess('Saved!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={printerIP}                      // \u2190 state drives the value
        onChange={(e) => {
          setPrinterIP(e.target.value);         // \u2190 every keystroke updates state
          setError(null);                       // \u2190 side effect on change
        }}
        disabled={loading}                     // \u2190 disabled driven by state
        required
      />
      <button disabled={loading}>
        {loading ? 'Saving\u2026' : 'Save'}
      </button>
    </form>
  );
}`}],referenceUrl:"https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components",referenceLabel:"react.dev \u2014 Controlled vs Uncontrolled Components"},{day:19,title:"Functional State Updates",category:"Patterns",file:"OrdersPage.jsx, useToast.jsx",description:"Using setState(prev => \u2026) when the next state depends on the previous value \u2014 avoiding stale closure bugs.",angularEquivalent:`Angular Signals use the same pattern:
signal.update(prev => newValue)
The reason is identical: to always read the latest value,
not a potentially stale snapshot captured by a closure.`,angularCode:`// Angular signal update
this.items.update(prev => [...prev, newItem]);
this.count.update(n => n + 1);

// React \u2014 functional update
setItems(prev => [...prev, newItem]);
setCount(prev => prev + 1);

// Problem without functional update (stale closure):
setCount(count + 1); // both reads use the same stale "count"
setCount(count + 1); // result: count + 1, not count + 2!`,keyPoints:["Use setState(prev => \u2026) whenever the new state depends on the previous state","The callback always receives the latest committed value \u2014 no stale closure risk","Critical inside setTimeout/setInterval where the surrounding closure is stale","Also essential when batching multiple state updates in the same event handler","Equivalent to signal.update(fn) in Angular"],codeBlocks:[{label:"OrdersPage.jsx \u2014 updating a Set in state",code:`// Always read the latest Set \u2014 never the potentially stale one from closure
setUpdatingOrderIds(prev => new Set(prev).add(orderId));

// Problem without functional update:
setUpdatingOrderIds(new Set(updatingOrderIds).add(id1)); // \u274C stale snapshot
setUpdatingOrderIds(new Set(updatingOrderIds).add(id2)); // \u274C id1 is lost!`},{label:"useToast.jsx \u2014 functional update inside setTimeout",code:`const showToast = useCallback((message, type = 'info') => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, message, type }]);

  setTimeout(() => {
    // "toasts" in the outer closure is stale after 3 seconds!
    // Using the functional form always reads the current value.
    setToasts(prev => prev.filter(t => t.id !== id));
  }, 3000);
}, []);`}],referenceUrl:"https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state",referenceLabel:"react.dev \u2014 Updating State Based on Previous State"},{day:20,title:"Spread Props (...rest / {...props})",category:"Patterns",file:"ImageWithSkeleton.jsx",description:"Collecting unknown props with rest syntax and forwarding them to a child element \u2014 the foundation of wrapper components.",angularEquivalent:`Angular has no direct equivalent \u2014 wrapping native element attributes is verbose (requires @HostBinding).
Spread props is one of the areas where React's JSX model shines.
In Angular you'd typically use ng-content or explicit @Input bindings for every attribute you want to forward.`,angularCode:`// Angular wrapper \u2014 explicit bindings required
@Component({
  selector: 'app-image',
  template: \`<img [src]="src" [alt]="alt" />\`
})
export class ImageComponent {
  @Input() src = '';
  @Input() alt = '';
  // You can't easily forward arbitrary HTML attributes
}

// React \u2014 effortless with spread
function ImageWithSkeleton({ src, alt = '', ...props }) {
  return <img src={src} alt={alt} {...props} />;
}`,keyPoints:["...rest in destructuring = collects every prop that was not explicitly named","{...props} on a JSX element = spreads all collected props onto that element","Order matters: {...props} after explicit props lets callers override defaults","Used to build generic, extensible wrapper components","Passes through HTML attributes like tabIndex, id, data-*, aria-* automatically"],codeBlocks:[{label:"ImageWithSkeleton.jsx \u2014 rest + spread in action",code:`export function ImageWithSkeleton({
  src,
  alt = '',
  className = '',
  style = {},
  onLoad,      // handle these ourselves\u2026
  onError,
  ...props     // \u2026collect everything else
}) {
  const handleLoad  = (e) => { setLoading(false); if (onLoad)  onLoad(e);  };
  const handleError = (e) => { setError(true);    if (onError) onError(e); };

  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      className={\u2026}
      {...props}    // tabIndex, id, data-item-id, etc. land here
    />
  );
}

// Caller
<ImageWithSkeleton
  src={item.image}
  alt={item.name}
  tabIndex={0}              // forwarded via ...props
  aria-label="food item"   // forwarded via ...props
/>`}],referenceUrl:"https://react.dev/learn/passing-props-to-a-component#forwarding-props-with-the-jsx-spread-syntax",referenceLabel:"react.dev \u2014 Forwarding Props with Spread Syntax"},{day:21,title:"Ref Callback",category:"Patterns",file:"Menu.jsx (categoryRefs)",description:"Using a function as a ref prop to collect DOM node references from a dynamically rendered list.",angularEquivalent:`@ViewChildren() in Angular \u2248 Ref Callback in React
@ViewChildren(CategorySection) sections!: QueryList<...>
Both build a collection of DOM nodes or child component references from a rendered list.`,angularCode:`// Angular
@ViewChildren('categorySection')
sections!: QueryList<ElementRef>;

const el = this.sections.find(s => s.nativeElement.id === id);
el?.nativeElement.scrollIntoView({ behavior: 'smooth' });

// React ref callback
const categoryRefs = useRef({});
ref={(el) => { if (el) categoryRefs.current[categoryId] = el; }}
categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });`,keyPoints:["useRef(null) holds one element \u2014 a ref callback builds a collection","ref={(el) => \u2026}: el is the DOM node on mount, null on unmount","Combine with useRef({}) to build a stable id \u2192 DOMNode map","@ViewChildren in Angular is the direct counterpart","The callback may re-run on every render if defined inline \u2014 stabilize with useCallback if needed"],codeBlocks:[{label:"Menu.jsx \u2014 building a map of DOM refs",code:`const categoryRefs = useRef({}); // { [categoryId]: HTMLElement }

{categories.map((cat) => (
  <section
    key={cat.id}
    ref={(el) => {
      if (el) categoryRefs.current[cat.id] = el;
      // el is null when the section unmounts \u2014 no cleanup needed here
    }}
  >
    {cat.name}
  </section>
))}

// Programmatic scroll to any section
const handleCategorySelect = useCallback((categoryId) => {
  categoryRefs.current[categoryId]?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}, []);`}],referenceUrl:"https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback",referenceLabel:"react.dev \u2014 Managing a List of Refs with a Ref Callback"},{day:22,title:"CSS-in-JSX",category:"Advanced",file:"Menu.jsx, FoodModal.jsx",description:"Styling React components with inline styles, dynamic classNames, and embedded <style> tags.",angularEquivalent:`Angular: :host {}, ViewEncapsulation, [ngClass], [ngStyle]
React: dynamic className strings, inline style objects, <style> template literals
Angular ViewEncapsulation automatically scopes CSS to the component.
React has no built-in scoping \u2014 styles are global unless you use CSS Modules or a CSS-in-JS library.`,angularCode:`// Angular
[class.active]="isActive"
[ngClass]="{ active: isActive, disabled: !canClick }"
[ngStyle]="{ color: isSelected ? 'red' : 'gray' }"

// React equivalents
className={\`btn \${isActive ? 'btn--active' : ''}\`}
style={{ color: isSelected ? 'red' : 'gray' }}`,keyPoints:["Inline style in React is a JavaScript object, not a string: style={{ color: 'red' }}","CSS properties in inline style are camelCase: backgroundColor, fontSize, borderRadius",'Dynamic className with template literals or the "clsx" / "classnames" library',"Embedded <style>{`\u2026`}</style> works but has no scoping \u2014 classes are global","Prefer CSS Modules, Tailwind, or styled-components for scalable projects"],codeBlocks:[{label:"Menu.jsx \u2014 dynamic className + inline style",code:`// Dynamic className with ternary
<button
  className={\`modern-menu__category-btn \${
    selectedCat === cat.id
      ? 'modern-menu__category-btn--active'
      : ''
  }\`}
>
  {cat.name}
</button>

// Inline style \u2014 object, not string
<h1 style={{ cursor: 'pointer', fontSize: '32px' }} onClick={handleLogoClick}>
  Pita
</h1>

// Camel-case CSS properties
<div style={{
  backgroundColor: '#DC2626',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
}} />`},{label:"Menu.jsx \u2014 embedded <style> tag",code:`function Menu() {
  return (
    <div className="modern-menu">
      <main>\u2026</main>

      {/* CSS injected as a template literal \u2014 no scoping! */}
      <style>{\`
        .modern-menu {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .modern-menu__grid {
            grid-template-columns: 1fr;
          }
        }
      \`}</style>
    </div>
  );
}`}],referenceUrl:"https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx",referenceLabel:"react.dev \u2014 CSS and Other Objects in JSX"},{day:23,title:"Dynamic Import (Code Splitting)",category:"Advanced",file:"useOrderSocket.js",description:"Loading a module only when it is actually needed \u2014 reducing the initial bundle size and improving startup performance.",angularEquivalent:`Angular Router lazy loading uses the same import() syntax:
loadComponent: () => import('./admin').then(m => m.AdminComponent)
React.lazy() also wraps dynamic import for component-level splitting.
In useOrderSocket, the same mechanism lazily loads the Pusher library.`,angularCode:`// Angular Router \u2014 lazy route
{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin').then(m => m.AdminComponent)
}

// React.lazy \u2014 lazy component
const Admin = React.lazy(() => import('./Admin'));

// Dynamic import of a library in useEffect
useEffect(() => {
  const init = async () => {
    const Pusher = (await import('pusher-js')).default;
    // Pusher is only downloaded when this effect runs
  };
  init();
}, []);`,keyPoints:["Static import (top of file) = always bundled; dynamic import() = downloaded on demand","Code splitting: keeps the initial bundle small \u2192 faster first load","await import('module') returns the whole module object \u2014 use .default for default exports","React.lazy() + <Suspense> wraps component-level dynamic imports declaratively","In Pita-front, Pusher (a large library) is only loaded when the socket hook initializes"],codeBlocks:[{label:"useOrderSocket.js \u2014 lazy-loading Pusher",code:`useEffect(() => {
  const initPusher = async () => {
    // Pusher is NOT in the main bundle \u2014 downloaded only when this runs
    const Pusher = (await import('pusher-js')).default;
    //              ^^^^^^^^^^^^^^^^^^^^^^^^   ^^^^^^^
    //              returns Module object    default export

    const pusher = new Pusher('key', {
      wsHost: 'back.plkiosk.online',
      wsPort: 443,
      forceTLS: true,
    });

    pusherRef.current = pusher;
    // \u2026 subscribe and bind events
  };

  initPusher();
  return () => pusherRef.current?.disconnect();
}, []);`}],referenceUrl:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",referenceLabel:"MDN \u2014 Dynamic import()"},{day:24,title:"Error & Loading State Patterns",category:"Advanced",file:"Menu.jsx, OrdersPage.jsx",description:"The standard pattern for managing loading, error, empty, and success states in a data-fetching component.",angularEquivalent:`Angular: async pipe + @if / @else handles loading and error declaratively.
React: you manually maintain loading/error/data state variables.
The async pipe also auto-unsubscribes \u2014 React requires you to manage cancellation yourself (cancelled flag).`,angularCode:`// Angular with async pipe
<ng-container *ngIf="orders$ | async as orders; else loading">
  <app-order-list [orders]="orders" />
</ng-container>
<ng-template #loading><app-spinner /></ng-template>

// React \u2014 manual state
const [loading, setLoading] = useState(true);
const [error, setError]     = useState(null);
const [data, setData]       = useState([]);

if (loading) return <Spinner />;
if (error)   return <ErrorView error={error} />;
if (!data.length) return <EmptyView />;
return <DataView data={data} />;`,keyPoints:["Three separate state variables \u2014 loading, error, data \u2014 keep concerns clean","The four states are: Loading \u2192 Success | Error | Empty","Always add a Retry button on the error state",'"Silent refresh": set loading=false so the existing data stays visible while updating in the background',"isMountedRef guards setState calls in async callbacks against unmounted components"],codeBlocks:[{label:"Menu.jsx \u2014 four-state pattern with early returns",code:`function Menu() {
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [categories, setCategories] = useState([]);

  // Early returns \u2014 no nesting needed
  if (loading)                return <LoadingSpinner />;
  if (error)                  return <ErrorMessage msg={error} onRetry={load} />;
  if (categories.length === 0) return <EmptyState />;

  // Happy path
  return (
    <div className="sections">
      {categories.map(cat => <Section key={cat.id} cat={cat} />)}
    </div>
  );
}`},{label:"OrdersPage.jsx \u2014 silent refresh pattern",code:`const loadOrders = useCallback(async (silent = false) => {
  try {
    if (!silent) setLoading(true); // only show spinner on first load
    setError(null);

    const data = await fetchCurrentOrders();
    if (isMountedRef.current) setOrders(data.map(mapOrder));

  } catch (err) {
    if (isMountedRef.current) setError(err.message);
  } finally {
    if (!silent && isMountedRef.current) setLoading(false);
  }
}, []);

// First load: with spinner
loadOrders(false);
// Background refresh every 30 s: no spinner
setInterval(() => loadOrders(true), 30_000);`}],referenceUrl:"https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",referenceLabel:"react.dev \u2014 Error Boundaries"},{day:25,title:"Monorepo with Nx",category:"Architecture",file:"apps/, libs/, nx.json, tsconfig.base.json",description:"How Pita-front is structured as an Nx monorepo \u2014 two apps sharing code through local libraries.",angularEquivalent:`You already use this at Digipay! The Nx structure is identical:
- apps/ for runnable applications
- libs/ for shared packages
The only difference is Pita uses React instead of Angular.
Your Digipay experience maps directly to this codebase.`,angularCode:`// tsconfig.base.json \u2014 path aliases (same in Angular and React Nx)
{
  "compilerOptions": {
    "paths": {
      "@pita/api":    ["libs/api/src/index.ts"],
      "@pita/ui":     ["libs/ui/src/index.ts"],
      "@pita/models": ["libs/models/src/index.ts"]
    }
  }
}

// Usage in any app
import { fetchCategories } from '@pita/api';
import { useToast } from '@pita/ui';`,keyPoints:["apps/kiosk \u2014 customer-facing self-service ordering UI (React + Vite)","apps/kitchen \u2014 kitchen display for staff to manage orders (React + Vite)","libs/api \u2014 all API calls; both apps import from @pita/api","libs/ui \u2014 shared components: Login, ImageWithSkeleton, useToast","libs/models \u2014 data transformation: mapOrder, formatCurrency, formatOrderTime"],codeBlocks:[{label:"Project structure at a glance",code:`Pita-front/
\u251C\u2500\u2500 apps/
\u2502   \u251C\u2500\u2500 kiosk/src/
\u2502   \u2502   \u251C\u2500\u2500 App.jsx              \u2190 root, view-switching state machine
\u2502   \u2502   \u251C\u2500\u2500 pages/               \u2190 Welcome, Menu, Checkout, PleasePay\u2026
\u2502   \u2502   \u2514\u2500\u2500 components/          \u2190 FoodModal, BottomBar, SearchBar\u2026
\u2502   \u2514\u2500\u2500 kitchen/src/
\u2502       \u251C\u2500\u2500 pages/               \u2190 OrdersPage, SettingsPage, MonitorPage\u2026
\u2502       \u251C\u2500\u2500 components/          \u2190 OrderCard, KitchenSidebar\u2026
\u2502       \u2514\u2500\u2500 hooks/               \u2190 useOrderSocket.js
\u2514\u2500\u2500 libs/
    \u251C\u2500\u2500 api/src/lib/             \u2190 apiConfig, auth, cart, orders, foods\u2026
    \u251C\u2500\u2500 ui/src/lib/              \u2190 Login, ImageWithSkeleton, useToast\u2026
    \u2514\u2500\u2500 models/src/lib/          \u2190 order.js, food.js, socket.js`}],referenceUrl:"https://nx.dev/getting-started/intro",referenceLabel:"nx.dev \u2014 Introduction to Nx"},{day:26,title:"Shared Libraries",category:"Architecture",file:"libs/api, libs/ui, libs/models",description:"How barrel exports, API abstraction, and data-mapping layers are structured inside the shared Nx libraries.",angularEquivalent:`Same concept as the shared libs you built at Digipay.
The difference: Nx handles path aliases without publishing to npm.
A change in @pita/ui immediately affects both kiosk and kitchen \u2014 no publish cycle needed.`,angularCode:`// libs/ui/src/index.ts \u2014 barrel export (public API of the library)
export { ImageWithSkeleton } from './lib/ImageWithSkeleton';
export { useToast }          from './lib/useToast';
export { ToastContainer }    from './lib/ToastContainer';
export { Login }             from './lib/Login';

// Both apps import from the same source
import { Login, useToast } from '@pita/ui';`,keyPoints:["index.ts = barrel export \u2014 the public API, everything else is private","libs/api: all network calls \u2014 components never call fetch() directly","libs/models: raw API response \u2192 UI-friendly shape (mapOrder, formatCurrency)","libs/ui: shared visual components \u2014 changes propagate to all consuming apps instantly","Fixing a bug in @pita/ui is fixed for both kiosk and kitchen simultaneously"],codeBlocks:[{label:"libs/models/src/lib/order.js \u2014 data transformation",code:`// Raw API shape \u2192 clean UI model
export function mapOrder(rawOrder) {
  return {
    id:               rawOrder.order_id,
    orderNumber:      rawOrder.order_number,
    status:           rawOrder.status,
    totalFoodAmount:  rawOrder.amount?.total_food_amount,
    taxAmount:        rawOrder.amount?.tax_amount,
    totalAmount:      rawOrder.amount?.total_amount,
    details:          (rawOrder.order_details || []).map(mapOrderDetail),
    availableStatusTransitions: getAvailableTransitions(rawOrder.status),
    createdAt:        rawOrder.created_at,
  };
}

// OrdersPage usage:
const mappedOrders = rawData.map(mapOrder); // imported from @pita/models`}],referenceUrl:"https://nx.dev/concepts/decisions/project-dependency-rules",referenceLabel:"nx.dev \u2014 Dependency Rules Between Projects"},{day:27,title:"Real-time with WebSocket (Pusher/Reverb)",category:"Architecture",file:"useOrderSocket.js, OrdersPage.jsx",description:"Connecting to Pusher WebSocket in a React custom hook \u2014 subscribe, bind, callback pattern, and cleanup.",angularEquivalent:`Angular typically uses RxJS Subject or Observable for event streams.
Pusher's channel.bind() \u2248 Subject.next() / Observable.subscribe()
Cleanup in Angular: unsubscribe() or takeUntilDestroyed()
React: useEffect cleanup \u2192 disconnect/unbind`,angularCode:`// Angular with RxJS
@Injectable()
export class OrderSocketService {
  private events$ = new Subject<OrderData>();

  connect() {
    pusher.channel.bind('order-event', data => this.events$.next(data));
  }
  getOrders(): Observable<OrderData> {
    return this.events$.asObservable();
  }
}

// React Custom Hook \u2014 equivalent
export function useOrderSocket(onOrderCreated) {
  useEffect(() => {
    channel.bind('order-event', data => {
      if (isSuccessful(data)) onOrderCreated(data);
    });
    return () => channel.unbind_all(); // cleanup
  }, [onOrderCreated]);
}`,keyPoints:["Connection flow: connect \u2192 subscribe to channel \u2192 bind event \u2192 fire callback","Store the Pusher instance in useRef \u2014 no re-render needed when it changes","Cleanup: unbind_all() on the channel, then disconnect() the client","The onOrderCreated callback notifies the parent component to refresh its data","Polling (setInterval every 30 s) acts as a backup in case the WebSocket drops"],codeBlocks:[{label:"useOrderSocket.js \u2014 full implementation",code:`export function useOrderSocket(onOrderCreated) {
  const pusherRef  = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    const initPusher = async () => {
      const user     = getStoredUser();
      const branchId = user?.branch?.branch_id || '1';

      const Pusher = (await import('pusher-js')).default;
      const pusher = new Pusher('key', {
        wsHost: 'back.plkiosk.online',
        wsPort: 443,
        forceTLS: true,
      });
      pusherRef.current = pusher;

      const channel = pusher.subscribe(\`order-channel-\${branchId}\`);
      channelRef.current = channel;

      channel.bind('order-event', (data) => {
        if (isSuccessfulSocketResponse(data)) {
          onOrderCreated(data); // notify parent \u2192 silent refresh
        }
      });
    };

    initPusher();

    return () => {
      channelRef.current?.unbind_all();
      pusherRef.current?.disconnect(); // full cleanup on unmount
    };
  }, [onOrderCreated]);
}

// OrdersPage \u2014 consuming the hook
const handleOrderCreated = useCallback(() => {
  loadOrders(true); // silent background refresh
}, [loadOrders]);

useOrderSocket(handleOrderCreated);`}],referenceUrl:"https://pusher.com/docs/channels/getting_started/javascript/",referenceLabel:"Pusher Docs \u2014 JavaScript Quick Start"}];var M=class r{auth=x(O);get headers(){return{apikey:W,"Content-Type":"application/json",Prefer:"return=representation"}}async get(t){try{let e=await this.auth.authFetch(`${T}/rest/v1/learning_progress?slug=eq.${t}&select=*`,{headers:this.headers});return e.ok?(await e.json())[0]??null:null}catch{return null}}async patch(t,e){try{let s=await this.auth.authFetch(`${T}/rest/v1/learning_progress?slug=eq.${t}`,{method:"PATCH",headers:this.headers,body:JSON.stringify(D(j({},e),{updated_at:new Date().toISOString()}))});return s.ok?(await s.json())[0]??null:null}catch{return null}}static \u0275fac=function(e){return new(e||r)};static \u0275prov=U({token:r,factory:r.\u0275fac,providedIn:"root"})};var G=(r,t)=>t.label,X=(r,t)=>t.day;function Y(r,t){if(r&1){let e=h();n(0,"button",17),u("click",function(){p(e);let l=c(2);return m(l.markCompleted(l.activeLesson().day))}),a(1," \u2705 Done! "),o()}}function K(r,t){r&1&&(n(0,"span",6),a(1,"\u2705 Completed"),o())}function Q(r,t){if(r&1&&(n(0,"li",21),a(1),o()),r&2){let e=t.$implicit;i(),d(e)}}function Z(r,t){if(r&1&&(n(0,"div",18)(1,"h3",24),a(2),o(),n(3,"pre",25)(4,"code"),a(5),o()()()),r&2){let e=t.$implicit;i(2),d(e.label),i(3),d(e.code)}}function ee(r,t){if(r&1&&(n(0,"div",12)(1,"div",18)(2,"h2",19),a(3,"\u{1F511} Key Points"),o(),n(4,"ul",20),k(5,Q,2,1,"li",21,R),o()(),k(7,Z,6,2,"div",18,G),n(9,"div",22)(10,"a",23),a(11),o()()()),r&2){let e=c(2);i(5),w(e.activeLesson().keyPoints),i(2),w(e.activeLesson().codeBlocks),i(3),N("href",e.activeLesson().referenceUrl,B),i(),y(" \u{1F4DA} ",e.activeLesson().referenceLabel," \u2192 ")}}function te(r,t){if(r&1&&(n(0,"div",12)(1,"div",18)(2,"h2",19),a(3,"\u{1F170}\uFE0F Angular Equivalent"),o(),n(4,"div",26),a(5),o()(),n(6,"div",18)(7,"h3",24),a(8,"Angular vs React \u2014 side-by-side code"),o(),n(9,"pre",27)(10,"code"),a(11),o()()(),n(12,"div",28)(13,"p"),a(14,"\u{1F4A1} Your Angular experience is a superpower here \u2014 React is similar in intent, different in syntax. Pay attention to "),n(15,"strong"),a(16,"immutability"),o(),a(17," and "),n(18,"strong"),a(19,"re-renders"),o(),a(20,"."),o()()()),r&2){let e=c(2);i(5),d(e.activeLesson().angularEquivalent),i(6),d(e.activeLesson().angularCode)}}function ne(r,t){if(r&1){let e=h();n(0,"button",29),u("click",function(){p(e);let l=c(2);return m(l.markCompleted(l.activeLesson().day))}),a(1),o()}if(r&2){let e=c(2);i(),y(" \u2705 I've read this \u2014 move to Day ",e.activeLesson().day+1," ")}}function re(r,t){r&1&&(n(0,"div",15),a(1,"\u2705 Already completed"),o())}function oe(r,t){if(r&1){let e=h();n(0,"div",1)(1,"div",2)(2,"button",3),u("click",function(){p(e);let l=c();return m(l.closeLesson())}),a(3," \u2190 Back to list "),o(),n(4,"div",4),a(5),o(),g(6,Y,2,0,"button",5)(7,K,2,0,"span",6),o(),n(8,"h1",7),a(9),o(),n(10,"p",8),a(11),o(),n(12,"div",9),a(13,"\u{1F4C2} Project file: "),n(14,"code"),a(15),o()(),n(16,"div",10)(17,"button",11),u("click",function(){p(e);let l=c();return m(l.setTab("lesson"))}),a(18," \u269B\uFE0F React Concept "),o(),n(19,"button",11),u("click",function(){p(e);let l=c();return m(l.setTab("angular"))}),a(20," \u{1F170}\uFE0F Angular Comparison "),o()(),g(21,ee,12,2,"div",12),g(22,te,21,2,"div",12),n(23,"div",13),g(24,ne,2,1,"button",14)(25,re,2,0,"div",15),n(26,"button",16),u("click",function(){p(e);let l=c();return m(l.closeLesson())}),a(27,"\u2190 Back to list"),o()()()}if(r&2){let e=c();i(4),b("background",e.getCategoryColor(e.activeLesson().category)),i(),P(" Day ",e.activeLesson().day," \u2014 ",e.activeLesson().category," "),i(),f(e.isCompleted(e.activeLesson().day)?7:6),i(3),d(e.activeLesson().title),i(2),d(e.activeLesson().description),i(4),d(e.activeLesson().file),i(2),E("lr-tab--active",e.activeTab()==="lesson"),i(2),E("lr-tab--active",e.activeTab()==="angular"),i(2),f(e.activeTab()==="lesson"?21:-1),i(),f(e.activeTab()==="angular"?22:-1),i(2),f(e.isCompleted(e.activeLesson().day)?25:24)}}function ae(r,t){if(r&1&&(n(0,"div",50),I(1,"span",51),n(2,"span",52),a(3),o(),n(4,"span",53),a(5),o()()),r&2){let e=t.$implicit,s=c(2);b("border-color",s.getCategoryColor(e)),i(),b("background",s.getCategoryColor(e)),i(2),d(e),i(),b("color",s.getCategoryColor(e)),i(),P(" ",s.getCompletedInCategory(e),"/",s.getTotalInCategory(e)," ")}}function ie(r,t){if(r&1){let e=h();n(0,"div",54),u("click",function(){p(e);let l=c(2);return m(l.openLesson(l.todayLesson().day))}),n(1,"div",55)(2,"div",56),a(3),o(),n(4,"div",57),a(5),o(),n(6,"div",58),a(7),o()(),n(8,"div",59),a(9,"\u2192"),o()()}if(r&2){let e=c(2);i(3),y("\u{1F4D6} Today's lesson \u2014 Day ",e.todayLesson().day),i(2),d(e.todayLesson().title),i(2),d(e.todayLesson().description)}}function se(r,t){if(r&1&&(n(0,"div",46),a(1),o()),r&2){let e=c(2);i(),y("\u{1F389} Congrats! You've completed all ",e.lessons.length," concepts!")}}function le(r,t){if(r&1&&(n(0,"div",60),a(1),o()),r&2){let e=c().$implicit,s=c(2);i(),d(s.getWeekLabel(e.day))}}function ce(r,t){r&1&&a(0," \u2713 ")}function de(r,t){if(r&1&&a(0),r&2){let e=c().$implicit;y(" ",e.day," ")}}function ue(r,t){if(r&1){let e=h();n(0,"button",71),u("click",function(){p(e);let l=c().$implicit,_=c(2);return m(_.markCompleted(l.day))}),a(1,"\u2713"),o()}}function pe(r,t){if(r&1){let e=h();n(0,"button",72),u("click",function(){p(e);let l=c().$implicit,_=c(2);return m(_.unmarkCompleted(l.day))}),a(1,"\u21A9"),o()}}function me(r,t){if(r&1){let e=h();g(0,le,2,1,"div",60),n(1,"div",61),u("click",function(){let l=p(e).$implicit,_=c(2);return m(_.openLesson(l.day))}),n(2,"div",62),g(3,ce,1,0)(4,de,1,1),o(),n(5,"div",63)(6,"div",64)(7,"span",65),a(8),o(),n(9,"span",66),a(10),o()(),n(11,"div",67),a(12),o()(),n(13,"div",68),u("click",function(l){return l.stopPropagation()}),g(14,ue,2,0,"button",69)(15,pe,2,0,"button",70),o()()}if(r&2){let e=t.$implicit,s=c(2);f(s.isWeekStart(e.day)?0:-1),i(),E("lr-item--done",s.isCompleted(e.day))("lr-item--today",e.day===s.currentDay()&&!s.isCompleted(e.day)),i(),b("background",s.isCompleted(e.day)?"#10B981":s.getCategoryColor(e.category)),i(),f(s.isCompleted(e.day)?3:4),i(5),d(e.title),i(),b("color",s.getCategoryColor(e.category)),i(),y(" ",e.category," "),i(2),d(e.description),i(2),f(s.isCompleted(e.day)?15:14)}}function ge(r,t){if(r&1){let e=h();n(0,"div")(1,"div",30)(2,"div",31)(3,"div",32),a(4,"\u269B\uFE0F React Learning Journey"),o(),n(5,"div",33),a(6),o()(),n(7,"div",34)(8,"h1",35),a(9,"Learning React"),o(),n(10,"button",36),u("click",function(){p(e);let l=c();return m(l.logout())}),a(11,"Sign out"),o()(),n(12,"p",37),a(13,"30 minutes a day \xB7 Real project examples \xB7 Angular comparisons"),o(),n(14,"div",38)(15,"div",39)(16,"span"),a(17,"Overall progress"),o(),n(18,"span"),a(19),o()(),n(20,"div",40),I(21,"div",41),o(),n(22,"div",42),a(23),o()(),n(24,"div",43),k(25,ae,6,9,"div",44,R),o()(),g(27,ie,10,3,"div",45),g(28,se,2,1,"div",46),n(29,"div",47),k(30,me,16,14,null,null,X),o(),n(32,"div",48)(33,"p"),a(34,"Concepts from real code in the "),n(35,"strong"),a(36,"Pita-front"),o(),a(37," project"),o(),n(38,"a",49),a(39,"github.com/imanamini95"),o()()()}if(r&2){let e=c();i(6),y("Based on the Pita-front project \xB7 ",e.lessons.length," concepts"),i(13),P("",e.completedCount()," / ",e.lessons.length),i(2),b("width",e.progress(),"%"),i(2),y("",e.progress(),"%"),i(2),w(e.categories),i(2),f(e.todayLesson()&&!e.isCompleted(e.todayLesson().day)?27:-1),i(),f(e.progress()===100?28:-1),i(2),w(e.lessons)}}var H="react-learning-completed",L="react-learning-current-day",A="react",fe={Basics:"#3B82F6",Hooks:"#8B5CF6",Patterns:"#10B981",Advanced:"#F59E0B",Architecture:"#EF4444"},J=class r{auth=x(O);progressSvc=x(M);router=x(z);lessons=v;completed=C(this.loadCompleted());currentDay=C(this.loadCurrentDay());activeDay=C(null);activeTab=C("lesson");syncing=C(!1);progress=S(()=>Math.round(this.completed().size/v.length*100));completedCount=S(()=>this.completed().size);activeLesson=S(()=>this.activeDay()!==null?v.find(t=>t.day===this.activeDay())??null:null);todayLesson=S(()=>v.find(t=>t.day===this.currentDay())??null);get categories(){return["Basics","Hooks","Patterns","Advanced","Architecture"]}constructor(){F(()=>this.syncFromSupabase())}async syncFromSupabase(){this.syncing.set(!0);let t=await this.progressSvc.get(A);if(this.syncing.set(!1),!t)return;let e=new Set(t.completed);this.completed.set(e),this.currentDay.set(t.current_day),this.saveCompleted(e),localStorage.setItem(L,String(t.current_day))}loadCompleted(){try{let t=localStorage.getItem(H);return t?new Set(JSON.parse(t)):new Set}catch{return new Set}}loadCurrentDay(){try{return parseInt(localStorage.getItem(L)||"1",10)}catch{return 1}}saveCompleted(t){localStorage.setItem(H,JSON.stringify([...t]))}isCompleted(t){return this.completed().has(t)}openLesson(t){this.activeDay.set(t),this.activeTab.set("lesson"),setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),50)}closeLesson(){this.activeDay.set(null)}async markCompleted(t){let e=new Set(this.completed());e.add(t),this.completed.set(e),this.saveCompleted(e);let s=this.currentDay();t===this.currentDay()&&t<v.length&&(s=t+1,this.currentDay.set(s),localStorage.setItem(L,String(s))),await this.progressSvc.patch(A,{completed:[...e],current_day:s,last_activity:new Date().toISOString()})}async unmarkCompleted(t){let e=new Set(this.completed());e.delete(t),this.completed.set(e),this.saveCompleted(e),await this.progressSvc.patch(A,{completed:[...e]})}setTab(t){this.activeTab.set(t)}async logout(){await this.auth.logout(),this.router.navigate(["/login"])}getCategoryColor(t){return fe[t]||"#6B7280"}isWeekStart(t){return t===1||t===8||t===15||t===22}getWeekLabel(t){return t<=7?"Week 1 \u2014 React Basics":t<=14?"Week 2 \u2014 Hooks":t<=21?"Week 3 \u2014 Patterns":"Week 4 \u2014 Advanced + Architecture"}getCompletedInCategory(t){return v.filter(e=>e.category===t&&this.isCompleted(e.day)).length}getTotalInCategory(t){return v.filter(e=>e.category===t).length}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=q({type:r,selectors:[["app-learn-react"]],decls:3,vars:2,consts:[[1,"lr-page"],[1,"lr-reader"],[1,"lr-reader__bar"],[1,"lr-reader__back",3,"click"],[1,"lr-reader__day-badge"],[1,"lr-reader__done"],[1,"lr-reader__done-badge"],[1,"lr-reader__title"],[1,"lr-reader__desc"],[1,"lr-reader__file"],[1,"lr-tabs"],[1,"lr-tab",3,"click"],[1,"lr-content"],[1,"lr-reader__footer"],[1,"lr-reader__done-big"],[1,"lr-reader__already-done"],[1,"lr-reader__back-btn",3,"click"],[1,"lr-reader__done",3,"click"],[1,"lr-section"],[1,"lr-section__title"],[1,"lr-keypoints"],[1,"lr-keypoint"],[1,"lr-section","lr-section--reference"],["target","_blank","rel","noopener",1,"lr-reference-link",3,"href"],[1,"lr-code-label"],[1,"lr-code"],[1,"lr-angular-text"],[1,"lr-code","lr-code--angular"],[1,"lr-section","lr-section--tip"],[1,"lr-reader__done-big",3,"click"],[1,"lr-header"],[1,"lr-header__top"],[1,"lr-header__badge"],[1,"lr-header__meta"],[1,"lr-header__title-row"],[1,"lr-header__title"],[1,"lr-logout",3,"click"],[1,"lr-header__sub"],[1,"lr-progress"],[1,"lr-progress__top"],[1,"lr-progress__bar"],[1,"lr-progress__fill"],[1,"lr-progress__pct"],[1,"lr-cats"],[1,"lr-cat",3,"border-color"],[1,"lr-today"],[1,"lr-done-banner"],[1,"lr-list"],[1,"lr-footer"],["href","https://github.com/imanamini95","target","_blank"],[1,"lr-cat"],[1,"lr-cat__dot"],[1,"lr-cat__name"],[1,"lr-cat__count"],[1,"lr-today",3,"click"],[1,"lr-today__left"],[1,"lr-today__label"],[1,"lr-today__title"],[1,"lr-today__desc"],[1,"lr-today__arrow"],[1,"lr-week"],[1,"lr-item",3,"click"],[1,"lr-item__circle"],[1,"lr-item__body"],[1,"lr-item__row"],[1,"lr-item__title"],[1,"lr-item__cat"],[1,"lr-item__desc"],[1,"lr-item__actions",3,"click"],["title","Mark as done",1,"lr-item__tick"],["title","Undo",1,"lr-item__untick"],["title","Mark as done",1,"lr-item__tick",3,"click"],["title","Undo",1,"lr-item__untick",3,"click"]],template:function(e,s){e&1&&(n(0,"div",0),g(1,oe,28,15,"div",1),g(2,ge,40,8,"div"),o()),e&2&&(i(),f(s.activeLesson()?1:-1),i(),f(s.activeLesson()?-1:2))},dependencies:[V],styles:['@charset "UTF-8";@import"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap";[_nghost-%COMP%]{display:block;background:#0f172a;min-height:100vh;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.7;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.lr-page[_ngcontent-%COMP%]{max-width:860px;margin:0 auto;padding:48px 28px 96px;color:#c8d8ec}.lr-reader__bar[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin-bottom:32px;flex-wrap:wrap}.lr-reader__back[_ngcontent-%COMP%]{background:transparent;border:1px solid #2A4060;color:#8fa8c8;padding:8px 16px;border-radius:8px;cursor:pointer;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:13px;font-weight:500;transition:border-color .2s,color .2s}.lr-reader__back[_ngcontent-%COMP%]:hover{border-color:#4a7096;color:#f1f5f9}.lr-reader__day-badge[_ngcontent-%COMP%]{padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.4px;color:#fff}.lr-reader__done[_ngcontent-%COMP%]{margin-left:auto;background:#059669;color:#fff;border:none;padding:9px 20px;border-radius:8px;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:background .2s,box-shadow .2s}.lr-reader__done[_ngcontent-%COMP%]:hover{background:#047857;box-shadow:0 4px 14px #05966959}.lr-reader__done-badge[_ngcontent-%COMP%]{margin-left:auto;font-size:13px;color:#34d399;font-weight:600}.lr-reader__title[_ngcontent-%COMP%]{font-size:24px;font-weight:700;color:#f1f5f9;margin:0 0 10px;line-height:1.4;letter-spacing:-.2px}.lr-reader__desc[_ngcontent-%COMP%]{font-size:16px;color:#c8d8ec;margin:0 0 10px;line-height:1.7}.lr-reader__file[_ngcontent-%COMP%]{font-size:13px;color:#5e7a99;margin-bottom:32px}.lr-reader__file[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{color:#93b8e0;background:#64a0e61a;padding:2px 8px;border-radius:5px;font-family:JetBrains Mono,Fira Code,Cascadia Code,monospace;font-size:12px}.lr-reader__footer[_ngcontent-%COMP%]{margin-top:48px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}.lr-reader__done-big[_ngcontent-%COMP%]{background:#059669;color:#fff;border:none;padding:14px 28px;border-radius:10px;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,box-shadow .2s}.lr-reader__done-big[_ngcontent-%COMP%]:hover{background:#047857;box-shadow:0 6px 20px #05966959}.lr-reader__already-done[_ngcontent-%COMP%]{font-size:15px;color:#34d399;font-weight:600}.lr-reader__back-btn[_ngcontent-%COMP%]{background:transparent;border:1px solid #2A4060;color:#8fa8c8;padding:12px 20px;border-radius:8px;cursor:pointer;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:13px;font-weight:500;transition:border-color .2s,color .2s}.lr-reader__back-btn[_ngcontent-%COMP%]:hover{border-color:#4a7096;color:#f1f5f9}.lr-tabs[_ngcontent-%COMP%]{display:flex;gap:3px;background:#1a2332;padding:4px;border-radius:10px;margin-bottom:32px;width:fit-content;border:1px solid #1E3248}.lr-tab[_ngcontent-%COMP%]{padding:9px 22px;border:none;border-radius:7px;background:transparent;color:#8fa8c8;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s,color .15s}.lr-tab--active[_ngcontent-%COMP%]{background:#243044;color:#f1f5f9;box-shadow:0 1px 6px #0000004d}.lr-tab[_ngcontent-%COMP%]:hover:not(.lr-tab--active){color:#c8d8ec}.lr-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:32px}.lr-section__title[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:#f1f5f9;margin:0 0 16px;letter-spacing:.1px}.lr-section--tip[_ngcontent-%COMP%]{background:#10b9810d;border:1px solid rgba(16,185,129,.18);border-radius:12px;padding:16px 20px}.lr-section--tip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#6ee7b7;font-size:15px;line-height:1.7}.lr-section--reference[_ngcontent-%COMP%]{margin-top:16px;padding-top:24px;border-top:1px solid #1E3248}.lr-keypoints[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}.lr-keypoint[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;font-size:15px;color:#c8d8ec;line-height:1.7}.lr-keypoint[_ngcontent-%COMP%]:before{content:"\\2192";color:#5b9bd5;flex-shrink:0;margin-top:1px;font-weight:600}.lr-code-label[_ngcontent-%COMP%]{font-size:13px;color:#8fa8c8;margin:0 0 10px;font-weight:500}.lr-code[_ngcontent-%COMP%]{background:#0b1628;border:1px solid #1E3248;border-radius:10px;padding:20px 22px;overflow-x:auto;margin:0}.lr-code[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:JetBrains Mono,Fira Code,Cascadia Code,monospace;font-size:13.5px;line-height:1.75;color:#b8d4f0;white-space:pre;display:block}.lr-code--angular[_ngcontent-%COMP%]{border-color:#2d1a4a;background:#0c0b18}.lr-code--angular[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{color:#c4b0f0}.lr-reference-link[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:8px;color:#7ab8f0;font-size:15px;font-weight:500;text-decoration:none;background:#64a0e614;border:1px solid rgba(100,160,230,.2);border-radius:8px;padding:10px 18px;transition:background .2s,border-color .2s,color .2s}.lr-reference-link[_ngcontent-%COMP%]:hover{background:#64a0e624;border-color:#64a0e666;color:#a0ccff;text-decoration:none}.lr-angular-text[_ngcontent-%COMP%]{font-size:15px;color:#c8d8ec;line-height:1.85;background:#8264dc0d;border:1px solid rgba(130,100,220,.14);border-radius:10px;padding:18px 22px;white-space:pre-line}.lr-header[_ngcontent-%COMP%]{margin-bottom:32px}.lr-header__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px}.lr-header__badge[_ngcontent-%COMP%]{background:#3b82f61f;border:1px solid rgba(59,130,246,.25);color:#7eb3f7;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;letter-spacing:.3px}.lr-header__meta[_ngcontent-%COMP%]{font-size:12px;color:#5e7a99;font-weight:400}.lr-header__title-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}.lr-header__title[_ngcontent-%COMP%]{font-size:30px;font-weight:800;color:#f1f5f9;margin:0;line-height:1.4;letter-spacing:-.3px}.lr-header__sub[_ngcontent-%COMP%]{font-size:15px;color:#8fa8c8;margin:0 0 28px;line-height:1.7}.lr-logout[_ngcontent-%COMP%]{background:transparent;border:1px solid #2A4060;color:#5e7a99;padding:6px 14px;border-radius:7px;font-family:Inter,system-ui,-apple-system,sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:border-color .2s,color .2s;white-space:nowrap;flex-shrink:0}.lr-logout[_ngcontent-%COMP%]:hover{border-color:#ef4444;color:#f87171}.lr-progress[_ngcontent-%COMP%]{margin-bottom:24px}.lr-progress__top[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:13px;color:#8fa8c8;margin-bottom:8px}.lr-progress__bar[_ngcontent-%COMP%]{height:7px;background:#1a2332;border-radius:999px;overflow:hidden}.lr-progress__fill[_ngcontent-%COMP%]{height:100%;background:linear-gradient(90deg,#3b82f6,#7c5cf6);border-radius:999px;transition:width .5s ease}.lr-progress__pct[_ngcontent-%COMP%]{text-align:right;font-size:12px;color:#7c5cf6;margin-top:5px;font-weight:600}.lr-cats[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.lr-cat[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#1a2332;border:1px solid;border-radius:8px;font-size:12px}.lr-cat__dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%}.lr-cat__name[_ngcontent-%COMP%]{color:#c8d8ec;font-weight:500}.lr-cat__count[_ngcontent-%COMP%]{font-weight:700;font-size:12px}.lr-today[_ngcontent-%COMP%]{display:flex;align-items:center;gap:16px;background:#2d64be1a;border:1px solid rgba(59,130,246,.22);border-radius:14px;padding:22px 26px;margin-bottom:32px;cursor:pointer;transition:border-color .2s,background .2s}.lr-today[_ngcontent-%COMP%]:hover{border-color:#3b82f673;background:#2d64be26}.lr-today__left[_ngcontent-%COMP%]{flex:1}.lr-today__label[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:#7eb3f7;text-transform:uppercase;letter-spacing:.6px;margin-bottom:7px}.lr-today__title[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#f1f5f9;margin-bottom:5px;line-height:1.4}.lr-today__desc[_ngcontent-%COMP%]{font-size:15px;color:#8fa8c8;line-height:1.7}.lr-today__arrow[_ngcontent-%COMP%]{font-size:18px;color:#5b9bd5;flex-shrink:0}.lr-done-banner[_ngcontent-%COMP%]{background:#10b98114;border:1px solid rgba(16,185,129,.25);border-radius:12px;padding:18px 24px;margin-bottom:28px;text-align:center;font-size:18px;font-weight:700;color:#6ee7b7}.lr-week[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:#5e7a99;text-transform:uppercase;letter-spacing:.8px;padding:24px 0 10px;border-bottom:1px solid #1E3248;margin-bottom:6px}.lr-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:4px}.lr-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:14px 16px;background:#1a2332;border:1px solid #1E3248;border-radius:10px;cursor:pointer;transition:border-color .15s,background .15s}.lr-item[_ngcontent-%COMP%]:hover{border-color:#2a4060;background:#243044}.lr-item--done[_ngcontent-%COMP%]{background:#10b9810a;border-color:#10b98124}.lr-item--done[_ngcontent-%COMP%]   .lr-item__title[_ngcontent-%COMP%]{color:#5e7a99;text-decoration:line-through}.lr-item--today[_ngcontent-%COMP%]{border-color:#3b82f680;background:#2d64be14}.lr-item--today[_ngcontent-%COMP%]   .lr-item__circle[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_pulse 2s infinite}.lr-item__circle[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}.lr-item__body[_ngcontent-%COMP%]{flex:1;min-width:0}.lr-item__row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px}.lr-item__title[_ngcontent-%COMP%]{font-size:15px;font-weight:600;color:#f1f5f9;line-height:1.4}.lr-item__cat[_ngcontent-%COMP%]{font-size:12px;font-weight:600;opacity:.9}.lr-item__desc[_ngcontent-%COMP%]{font-size:13px;color:#8fa8c8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.7}.lr-item__actions[_ngcontent-%COMP%]{flex-shrink:0}.lr-item__tick[_ngcontent-%COMP%], .lr-item__untick[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:7px;border:none;cursor:pointer;font-size:14px;font-weight:700;transition:background .15s,transform .15s}.lr-item__tick[_ngcontent-%COMP%]{background:#10b98124;color:#34d399}.lr-item__tick[_ngcontent-%COMP%]:hover{background:#059669;color:#fff;transform:scale(1.08)}.lr-item__untick[_ngcontent-%COMP%]{background:#5a6e8c2e;color:#8fa8c8}.lr-item__untick[_ngcontent-%COMP%]:hover{background:#ef44442e;color:#f87171}@keyframes _ngcontent-%COMP%_pulse{0%,to{box-shadow:0 0 #3b82f666}50%{box-shadow:0 0 0 6px #3b82f600}}.lr-footer[_ngcontent-%COMP%]{margin-top:64px;text-align:center;padding-top:24px;border-top:1px solid #1E3248}.lr-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#5e7a99;margin:0 0 8px}.lr-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:13px;color:#5b9bd5;text-decoration:none}.lr-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline;color:#7ab8f0}@media(max-width:600px){.lr-page[_ngcontent-%COMP%]{padding:24px 16px 64px}.lr-reader__title[_ngcontent-%COMP%]{font-size:20px}.lr-header__title[_ngcontent-%COMP%]{font-size:24px}.lr-today[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:10px}.lr-item__desc[_ngcontent-%COMP%]{display:none}.lr-code[_ngcontent-%COMP%]{padding:14px 16px}.lr-code[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-size:12.5px}}']})};export{J as LearnReactComponent};
