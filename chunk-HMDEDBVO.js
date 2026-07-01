import{a as H}from"./chunk-W35FXFTL.js";import{c as V,d as z}from"./chunk-W7TPDWGX.js";import{a as A,b as W,c as R}from"./chunk-4U7ZYP3M.js";import"./chunk-Z7UFM6WV.js";import{Da as N,I as F,N as x,Oa as p,Pa as g,Ra as I,S as m,Sa as k,T as f,Ta as w,Ua as T,Va as n,Wa as a,Xa as O,a as D,b as B,bb as h,da as C,db as u,fb as c,gb as v,hb as S,ib as o,jb as d,kb as b,lb as M,pa as U,ra as i,rb as P,va as q}from"./chunk-TD5RH56E.js";var y=[{day:1,title:"JSX + Functional Components",category:"Basics",file:"App.jsx, OrderCard.jsx",description:"What functional components are, how JSX works, and why React uses this approach over class components.",angularEquivalent:`In Angular you define components with @Component decorator and a separate template file.
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

useOrderSocket(handleOrderCreated);`}],referenceUrl:"https://pusher.com/docs/channels/getting_started/javascript/",referenceLabel:"Pusher Docs \u2014 JavaScript Quick Start"}];var E=class r{auth=x(R);get headers(){return{apikey:W,"Content-Type":"application/json",Prefer:"return=representation"}}async get(t){try{let e=await this.auth.authFetch(`${A}/rest/v1/learning_progress?slug=eq.${t}&select=*`,{headers:this.headers});return e.ok?(await e.json())[0]??null:null}catch{return null}}async patch(t,e){try{let s=await this.auth.authFetch(`${A}/rest/v1/learning_progress?slug=eq.${t}`,{method:"PATCH",headers:this.headers,body:JSON.stringify(B(D({},e),{updated_at:new Date().toISOString()}))});return s.ok?(await s.json())[0]??null:null}catch{return null}}static \u0275fac=function(e){return new(e||r)};static \u0275prov=F({token:r,factory:r.\u0275fac,providedIn:"root"})};var Y=(r,t)=>t.label,X=(r,t)=>t.day;function K(r,t){if(r&1){let e=h();n(0,"button",19),u("click",function(){m(e);let l=c(2);return f(l.markCompleted(l.activeLesson().day))}),o(1,"\u2713 Mark done"),a()}}function Q(r,t){r&1&&(n(0,"span",8),o(1,"\u2713 Completed"),a())}function Z(r,t){if(r&1&&(n(0,"li",23),o(1),a()),r&2){let e=t.$implicit;i(),d(e)}}function ee(r,t){if(r&1&&(n(0,"div",20)(1,"h3",25),o(2),a(),n(3,"pre",26)(4,"code"),o(5),a()()()),r&2){let e=t.$implicit;i(2),d(e.label),i(3),d(e.code)}}function te(r,t){if(r&1&&(n(0,"div",14)(1,"div",20)(2,"h2",21),o(3,"\u{1F511} Key Points"),a(),n(4,"ul",22),k(5,Z,2,1,"li",23,I),a()(),k(7,ee,6,2,"div",20,Y),n(9,"a",24)(10,"span"),o(11),a(),n(12,"span"),o(13,"\u2192"),a()()()),r&2){let e=c(2);i(5),w(e.activeLesson().keyPoints),i(2),w(e.activeLesson().codeBlocks),i(2),T("href",e.activeLesson().referenceUrl,U),i(2),b("\u{1F4DA} ",e.activeLesson().referenceLabel)}}function ne(r,t){if(r&1&&(n(0,"div",14)(1,"div",20)(2,"h2",21),o(3,"\u{1F170}\uFE0F Angular Equivalent"),a(),n(4,"div",27),o(5),a()(),n(6,"div",20)(7,"h3",25),o(8,"Angular vs React \u2014 side-by-side code"),a(),n(9,"pre",26)(10,"code"),o(11),a()()(),n(12,"div",28)(13,"p"),o(14,"\u{1F4A1} Your Angular experience is a superpower here \u2014 React is similar in intent, different in syntax. Pay attention to "),n(15,"strong"),o(16,"immutability"),a(),o(17," and "),n(18,"strong"),o(19,"re-renders"),a(),o(20,"."),a()()()),r&2){let e=c(2);i(5),d(e.activeLesson().angularEquivalent),i(6),d(e.activeLesson().angularCode)}}function re(r,t){if(r&1){let e=h();n(0,"button",29),u("click",function(){m(e);let l=c(2);return f(l.markCompleted(l.activeLesson().day))}),o(1),a()}if(r&2){let e=c(2);i(),b(" \u2713 I've read this \u2014 move to Day ",e.activeLesson().day+1," ")}}function ae(r,t){r&1&&(n(0,"div",17),o(1,"\u2713 Already completed"),a())}function oe(r,t){if(r&1){let e=h();n(0,"div",3)(1,"div",4)(2,"button",5),u("click",function(){m(e);let l=c();return f(l.closeLesson())}),o(3,"\u2190 Back to list"),a(),n(4,"div",6),o(5),a(),p(6,K,2,0,"button",7)(7,Q,2,0,"span",8),a(),n(8,"h1",9),o(9),a(),n(10,"p",10),o(11),a(),n(12,"div",11),o(13,"\u{1F4C2} Project file: "),n(14,"code"),o(15),a()(),n(16,"div",12)(17,"button",13),u("click",function(){m(e);let l=c();return f(l.setTab("lesson"))}),o(18," \u269B\uFE0F React Concept "),a(),n(19,"button",13),u("click",function(){m(e);let l=c();return f(l.setTab("angular"))}),o(20," \u{1F170}\uFE0F Angular Comparison "),a()(),p(21,te,14,2,"div",14),p(22,ne,21,2,"div",14),n(23,"div",15),p(24,re,2,1,"button",16)(25,ae,2,0,"div",17),n(26,"button",18),u("click",function(){m(e);let l=c();return f(l.closeLesson())}),o(27,"\u2190 Back to list"),a()()()}if(r&2){let e=c();i(4),v("background",e.getCategoryColor(e.activeLesson().category)),i(),M(" Day ",e.activeLesson().day," \u2014 ",e.activeLesson().category," "),i(),g(e.isCompleted(e.activeLesson().day)?7:6),i(3),d(e.activeLesson().title),i(2),d(e.activeLesson().description),i(4),d(e.activeLesson().file),i(2),S("lr-tab--active",e.activeTab()==="lesson"),i(2),S("lr-tab--active",e.activeTab()==="angular"),i(2),g(e.activeTab()==="lesson"?21:-1),i(),g(e.activeTab()==="angular"?22:-1),i(2),g(e.isCompleted(e.activeLesson().day)?25:24)}}function ie(r,t){if(r&1&&(n(0,"div",53),O(1,"span",54),n(2,"span",55),o(3),a(),n(4,"span",56),o(5),a()()),r&2){let e=t.$implicit,s=c(2);v("border-color",s.getCategoryColor(e)),i(),v("background",s.getCategoryColor(e)),i(2),d(e),i(),v("color",s.getCategoryColor(e)),i(),M(" ",s.getCompletedInCategory(e),"/",s.getTotalInCategory(e)," ")}}function se(r,t){if(r&1){let e=h();n(0,"div",57),u("click",function(){m(e);let l=c(2);return f(l.openLesson(l.todayLesson().day))}),O(1,"div",58),n(2,"div",59)(3,"div",60),o(4),a(),n(5,"div",61),o(6),a(),n(7,"div",62),o(8),a()(),n(9,"div",63),o(10,"\u2192"),a()()}if(r&2){let e=c(2);i(4),b("\u{1F4D6} Today's lesson \u2014 Day ",e.todayLesson().day),i(2),d(e.todayLesson().title),i(2),d(e.todayLesson().description)}}function le(r,t){if(r&1&&(n(0,"div",49),o(1),a()),r&2){let e=c(2);i(),b("\u{1F389} Congrats! You've completed all ",e.lessons.length," concepts!")}}function ce(r,t){if(r&1&&(n(0,"div",64),o(1),a()),r&2){let e=c().$implicit,s=c(2);i(),d(s.getWeekLabel(e.day))}}function de(r,t){r&1&&o(0," \u2713 ")}function ue(r,t){if(r&1&&o(0),r&2){let e=c().$implicit;b(" ",e.day," ")}}function pe(r,t){r&1&&(n(0,"span",70),o(1,"TODAY"),a())}function ge(r,t){if(r&1&&(n(0,"span",76),o(1),a()),r&2){let e=c().$implicit,s=c(2);v("color",s.getCategoryColor(e.category)),i(),b(" ",e.category," ")}}function me(r,t){if(r&1){let e=h();n(0,"button",77),u("click",function(){m(e);let l=c().$implicit,_=c(2);return f(_.markCompleted(l.day))}),o(1,"\u2713"),a()}}function fe(r,t){if(r&1){let e=h();n(0,"button",78),u("click",function(){m(e);let l=c().$implicit,_=c(2);return f(_.unmarkCompleted(l.day))}),o(1,"\u21A9"),a()}}function he(r,t){if(r&1){let e=h();p(0,ce,2,1,"div",64),n(1,"div",65),u("click",function(){let l=m(e).$implicit,_=c(2);return f(_.openLesson(l.day))}),n(2,"div",66),p(3,de,1,0)(4,ue,1,1),a(),n(5,"div",67)(6,"div",68)(7,"span",69),o(8),a(),p(9,pe,2,0,"span",70)(10,ge,2,3,"span",71),a(),n(11,"div",72),o(12),a()(),n(13,"div",73),u("click",function(l){return l.stopPropagation()}),p(14,me,2,0,"button",74)(15,fe,2,0,"button",75),a()()}if(r&2){let e=t.$implicit,s=c(2);g(s.isWeekStart(e.day)?0:-1),i(),S("lr-item--done",s.isCompleted(e.day))("lr-item--today",e.day===s.currentDay()&&!s.isCompleted(e.day)),i(),v("background",s.isCompleted(e.day)?s.doneColor:s.getCategoryColor(e.category)),i(),g(s.isCompleted(e.day)?3:4),i(5),d(e.title),i(),g(e.day===s.currentDay()&&!s.isCompleted(e.day)?9:10),i(3),d(e.description),i(2),g(s.isCompleted(e.day)?15:14)}}function be(r,t){if(r&1){let e=h();n(0,"div")(1,"div",30)(2,"div",31)(3,"div",32),o(4,"\u269B\uFE0F React Learning Journey"),a(),n(5,"div",33),o(6),a()(),n(7,"div",34)(8,"h1",35),o(9,"Learning React"),a(),n(10,"div",36)(11,"a",37),o(12,"\u2190 All topics"),a(),n(13,"button",38),u("click",function(){m(e);let l=c();return f(l.logout())}),o(14,"Sign out"),a()()(),n(15,"p",39),o(16,"30 minutes a day \xB7 Real project examples \xB7 Angular comparisons"),a()(),n(17,"div",40)(18,"div",41)(19,"span"),o(20,"Overall progress"),a(),n(21,"span",42),o(22),a()(),n(23,"div",43),O(24,"div",44),a(),n(25,"div",45),o(26),a(),n(27,"div",46),k(28,ie,6,9,"div",47,I),a()(),p(30,se,11,3,"div",48),p(31,le,2,1,"div",49),n(32,"div",50),k(33,he,16,12,null,null,X),a(),n(35,"div",51)(36,"p"),o(37,"Concepts from real code in the "),n(38,"strong"),o(39,"Pita-front"),a(),o(40," project"),a(),n(41,"a",52),o(42,"github.com/imanamini95"),a()()()}if(r&2){let e=c();i(6),b("Based on the Pita-front project \xB7 ",e.lessons.length," concepts"),i(16),M("",e.completedCount()," / ",e.lessons.length),i(2),v("width",e.progress(),"%"),i(2),b("",e.progress(),"%"),i(2),w(e.categories),i(2),g(e.todayLesson()&&!e.isCompleted(e.todayLesson().day)?30:-1),i(),g(e.progress()===100?31:-1),i(2),w(e.lessons)}}var J="react-learning-completed",L="react-learning-current-day",j="react",ve={Basics:"#4F8DF7",Hooks:"#A78BFA",Patterns:"#2DD4A7",Advanced:"#F6B23E",Architecture:"#FB7699"},ye="#2DD4A7",$=class r{auth=x(R);progressSvc=x(E);router=x(V);themeSvc=x(H);doneColor=ye;lessons=y;completed=C(this.loadCompleted());currentDay=C(this.loadCurrentDay());activeDay=C(null);activeTab=C("lesson");syncing=C(!1);progress=P(()=>Math.round(this.completed().size/y.length*100));completedCount=P(()=>this.completed().size);activeLesson=P(()=>this.activeDay()!==null?y.find(t=>t.day===this.activeDay())??null:null);todayLesson=P(()=>y.find(t=>t.day===this.currentDay())??null);get categories(){return["Basics","Hooks","Patterns","Advanced","Architecture"]}constructor(){q(()=>this.syncFromSupabase())}async syncFromSupabase(){this.syncing.set(!0);let t=await this.progressSvc.get(j);if(this.syncing.set(!1),!t)return;let e=new Set(t.completed);this.completed.set(e),this.currentDay.set(t.current_day),this.saveCompleted(e),localStorage.setItem(L,String(t.current_day))}loadCompleted(){try{let t=localStorage.getItem(J);return t?new Set(JSON.parse(t)):new Set}catch{return new Set}}loadCurrentDay(){try{return parseInt(localStorage.getItem(L)||"1",10)}catch{return 1}}saveCompleted(t){localStorage.setItem(J,JSON.stringify([...t]))}isCompleted(t){return this.completed().has(t)}openLesson(t){this.activeDay.set(t),this.activeTab.set("lesson"),setTimeout(()=>window.scrollTo({top:0,behavior:"smooth"}),50)}closeLesson(){this.activeDay.set(null)}async markCompleted(t){let e=new Set(this.completed());e.add(t),this.completed.set(e),this.saveCompleted(e);let s=this.currentDay();t===this.currentDay()&&t<y.length&&(s=t+1,this.currentDay.set(s),localStorage.setItem(L,String(s))),await this.progressSvc.patch(j,{completed:[...e],current_day:s,last_activity:new Date().toISOString()})}async unmarkCompleted(t){let e=new Set(this.completed());e.delete(t),this.completed.set(e),this.saveCompleted(e),await this.progressSvc.patch(j,{completed:[...e]})}setTab(t){this.activeTab.set(t)}async logout(){await this.auth.logout(),this.router.navigate(["/login"])}getCategoryColor(t){return ve[t]||"#9AA7BE"}isWeekStart(t){return t===1||t===8||t===15||t===22}getWeekLabel(t){return t<=7?"Week 1 \u2014 React Basics":t<=14?"Week 2 \u2014 Hooks":t<=21?"Week 3 \u2014 Patterns":"Week 4 \u2014 Advanced + Architecture"}getCompletedInCategory(t){return y.filter(e=>e.category===t&&this.isCompleted(e.day)).length}getTotalInCategory(t){return y.filter(e=>e.category===t).length}static \u0275fac=function(e){return new(e||r)};static \u0275cmp=N({type:r,selectors:[["app-learn-react"]],decls:6,vars:6,consts:[[1,"lr-page"],[1,"lr-theme-toggle",3,"click","title"],[1,"lr-shell"],[1,"lr-reader"],[1,"lr-reader__bar"],[1,"lr-reader__back",3,"click"],[1,"lr-reader__day-badge"],[1,"lr-reader__done"],[1,"lr-reader__done-badge"],[1,"lr-reader__title"],[1,"lr-reader__desc"],[1,"lr-reader__file"],[1,"lr-tabs"],[1,"lr-tab",3,"click"],[1,"lr-content"],[1,"lr-reader__footer"],[1,"lr-cta"],[1,"lr-reader__already-done"],[1,"lr-reader__back-btn",3,"click"],[1,"lr-reader__done",3,"click"],[1,"lr-section"],[1,"lr-section__title"],[1,"lr-keypoints"],[1,"lr-keypoint"],["target","_blank","rel","noopener",1,"lr-reference-link",3,"href"],[1,"lr-code-label"],[1,"lr-code"],[1,"lr-angular-text"],[1,"lr-tip"],[1,"lr-cta",3,"click"],[1,"lr-header"],[1,"lr-header__top"],[1,"lr-header__badge"],[1,"lr-header__meta"],[1,"lr-header__title-row"],[1,"lr-header__title"],[1,"lr-header__actions"],["routerLink","/learn",1,"lr-pill"],[1,"lr-pill","lr-pill--muted",3,"click"],[1,"lr-header__sub"],[1,"lr-progress"],[1,"lr-progress__top"],[1,"lr-progress__count"],[1,"lr-progress__bar"],[1,"lr-progress__fill"],[1,"lr-progress__pct"],[1,"lr-cats"],[1,"lr-cat",3,"border-color"],[1,"lr-today"],[1,"lr-done-banner"],[1,"lr-list"],[1,"lr-footer"],["href","https://github.com/imanamini95","target","_blank"],[1,"lr-cat"],[1,"lr-cat__dot"],[1,"lr-cat__name"],[1,"lr-cat__count"],[1,"lr-today",3,"click"],[1,"lr-today__glow"],[1,"lr-today__left"],[1,"lr-today__label"],[1,"lr-today__title"],[1,"lr-today__desc"],[1,"lr-today__arrow"],[1,"lr-week"],[1,"lr-item",3,"click"],[1,"lr-item__circle"],[1,"lr-item__body"],[1,"lr-item__row"],[1,"lr-item__title"],[1,"lr-item__today-chip"],[1,"lr-item__cat",3,"color"],[1,"lr-item__desc"],[1,"lr-item__actions",3,"click"],["title","Mark as done",1,"lr-item__tick"],["title","Undo",1,"lr-item__tick"],[1,"lr-item__cat"],["title","Mark as done",1,"lr-item__tick",3,"click"],["title","Undo",1,"lr-item__tick",3,"click"]],template:function(e,s){e&1&&(n(0,"div",0)(1,"button",1),u("click",function(){return s.themeSvc.toggle()}),o(2),a(),n(3,"div",2),p(4,oe,28,15,"div",3),p(5,be,43,8,"div"),a()()),e&2&&(S("lr-page--light",s.themeSvc.isLight()),i(),T("title",s.themeSvc.isLight()?"Dark mode":"Light mode"),i(),d(s.themeSvc.isLight()?"\u{1F319}":"\u2600\uFE0F"),i(2),g(s.activeLesson()?4:-1),i(),g(s.activeLesson()?-1:5))},dependencies:[z],styles:['[_nghost-%COMP%]{display:block;font-family:Inter,Vazirmatn,system-ui,sans-serif;-webkit-font-smoothing:antialiased}@keyframes _ngcontent-%COMP%_au-rise{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes _ngcontent-%COMP%_au-pop{0%{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}@keyframes _ngcontent-%COMP%_au-draw{0%{stroke-dashoffset:1}to{stroke-dashoffset:0}}.lr-page[_ngcontent-%COMP%]{--ease: cubic-bezier(.22, .7, .2, 1);--gold: #F6B23E;--stock: #4F8DF7;--dollar: #2DD4A7;--crypto: #A78BFA;--silver: #9AA7BE;--custom: #FB7699;--bg-base: #090D18;--page-grad: radial-gradient(1100px 640px at 88% -12%, rgba(96, 165, 250, .2), transparent 60%), radial-gradient(820px 520px at -4% 6%, rgba(167, 139, 250, .15), transparent 55%), radial-gradient(760px 520px at 55% 118%, rgba(45, 212, 167, .13), transparent 55%);--glass: rgba(255, 255, 255, .045);--glass-2: rgba(255, 255, 255, .075);--glass-strong: rgba(255, 255, 255, .11);--glass-border: rgba(255, 255, 255, .11);--glass-border-hi: rgba(255, 255, 255, .2);--card-shadow: 0 26px 60px -30px rgba(0, 0, 0, .85);--text-hi: #F4F8FF;--text: #C6D4EC;--text-dim: #8194B6;--text-faint: #56688A;--accent: #60A5FA;--hairline: rgba(255, 255, 255, .09);--track: rgba(255, 255, 255, .07);--inset: rgba(0, 0, 0, .28);--code-bg: rgba(0, 0, 0, .34);--code-text: #C6D4EC;min-height:100vh;color:var(--text);background:var(--page-grad),var(--bg-base);background-attachment:fixed;transition:background .5s var(--ease),color .3s var(--ease);--on-color: #0A1220}.lr-page--light[_ngcontent-%COMP%]{--bg-base: #E9EEF8;--page-grad: radial-gradient(1100px 640px at 88% -12%, rgba(96, 165, 250, .26), transparent 60%), radial-gradient(820px 520px at -4% 6%, rgba(167, 139, 250, .22), transparent 55%), radial-gradient(760px 520px at 55% 118%, rgba(45, 212, 167, .2), transparent 55%);--glass: rgba(255, 255, 255, .58);--glass-2: rgba(255, 255, 255, .72);--glass-strong: rgba(255, 255, 255, .88);--glass-border: rgba(255, 255, 255, .75);--glass-border-hi: rgba(255, 255, 255, .95);--card-shadow: 0 24px 50px -28px rgba(30, 52, 96, .42);--text-hi: #0E1B33;--text: #33435E;--text-dim: #62759A;--text-faint: #93A2BE;--accent: #2563EB;--hairline: rgba(15, 30, 60, .1);--track: rgba(15, 30, 60, .08);--inset: rgba(15, 30, 60, .05);--code-bg: #0E1626;--code-text: #C6D4EC}.lr-shell[_ngcontent-%COMP%]{width:min(760px,100%);margin:0 auto;padding:clamp(32px,6vw,56px) clamp(16px,4vw,24px) 80px}.lr-theme-toggle[_ngcontent-%COMP%]{position:fixed;top:16px;inset-inline-end:16px;z-index:50;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;cursor:pointer;font-size:18px;color:var(--text-hi);border-radius:14px;background:var(--glass-2);border:1px solid var(--glass-border-hi);backdrop-filter:blur(14px) saturate(100%);-webkit-backdrop-filter:blur(14px) saturate(100%);box-shadow:var(--card-shadow)}.lr-pill[_ngcontent-%COMP%]{display:inline-flex;align-items:center;font-family:inherit;font-size:13px;color:var(--text);text-decoration:none;cursor:pointer;background:var(--glass);border:1px solid var(--glass-border);border-radius:999px;padding:8px 15px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease)}.lr-pill[_ngcontent-%COMP%]:hover{background:var(--glass-2);border-color:var(--glass-border-hi);color:var(--text-hi)}.lr-pill--muted[_ngcontent-%COMP%]{color:var(--text-dim)}.lr-header[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_au-rise .5s var(--ease) both}.lr-header__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}.lr-header__badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--accent);background:var(--glass-2);border:1px solid var(--glass-border);border-radius:999px;padding:6px 14px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.lr-header__meta[_ngcontent-%COMP%]{font-size:12px;color:var(--text-faint)}.lr-header__title-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-top:16px}.lr-header__title[_ngcontent-%COMP%]{font-size:clamp(28px,7vw,38px);font-weight:800;letter-spacing:-.02em;color:var(--text-hi);margin:0}.lr-header__actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.lr-header__sub[_ngcontent-%COMP%]{font-size:14.5px;color:var(--text-dim);margin:10px 0 0}.lr-progress[_ngcontent-%COMP%]{border-radius:22px;padding:clamp(20px,4vw,26px);margin-top:26px;animation:_ngcontent-%COMP%_au-rise .5s var(--ease) .07s both;background:var(--glass);border:1px solid var(--glass-border);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);box-shadow:var(--card-shadow)}.lr-progress__top[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;font-size:13.5px;color:var(--text-dim);margin-bottom:12px}.lr-progress__count[_ngcontent-%COMP%]{font-weight:700;color:var(--text-hi)}.lr-progress__bar[_ngcontent-%COMP%]{height:10px;border-radius:999px;background:var(--track);overflow:hidden}.lr-progress__fill[_ngcontent-%COMP%]{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--accent),var(--crypto));transition:width .4s var(--ease)}.lr-progress__pct[_ngcontent-%COMP%]{text-align:right;font-size:12px;font-weight:700;color:var(--accent);margin-top:8px}.lr-cats[_ngcontent-%COMP%]{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.lr-cat[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;border:1px solid;border-radius:999px;padding:6px 12px}.lr-cat__dot[_ngcontent-%COMP%]{width:8px;height:8px;border-radius:50%}.lr-cat__name[_ngcontent-%COMP%]{color:var(--text)}.lr-cat__count[_ngcontent-%COMP%]{font-weight:700}.lr-today[_ngcontent-%COMP%]{position:relative;overflow:hidden;cursor:pointer;display:flex;align-items:center;gap:16px;border-radius:22px;padding:clamp(18px,4vw,24px);margin-top:16px;transition:transform .2s var(--ease);animation:_ngcontent-%COMP%_au-rise .5s var(--ease) .14s both;background:var(--glass-strong);border:1px solid var(--glass-border-hi);backdrop-filter:blur(28px) saturate(150%);-webkit-backdrop-filter:blur(28px) saturate(150%);box-shadow:var(--card-shadow)}.lr-today[_ngcontent-%COMP%]:hover{transform:translateY(-3px)}.lr-today__glow[_ngcontent-%COMP%]{position:absolute;inset:-50% 20% auto -10%;height:180px;background:radial-gradient(circle,rgba(96,165,250,.32),transparent 70%);filter:blur(26px);pointer-events:none}.lr-today__left[_ngcontent-%COMP%]{position:relative;flex:1;min-width:0}.lr-today__label[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:var(--accent);margin-bottom:8px}.lr-today__title[_ngcontent-%COMP%]{font-size:clamp(17px,4.5vw,20px);font-weight:800;color:var(--text-hi);margin-bottom:5px}.lr-today__desc[_ngcontent-%COMP%]{font-size:13.5px;color:var(--text-dim)}.lr-today__arrow[_ngcontent-%COMP%]{position:relative;font-size:22px;color:var(--accent)}.lr-done-banner[_ngcontent-%COMP%]{border-radius:18px;padding:16px 18px;margin-top:16px;font-size:14.5px;font-weight:600;color:var(--dollar);border:1px solid rgba(45,212,167,.3);background:#2dd4a714}.lr-list[_ngcontent-%COMP%]{margin-top:26px;display:flex;flex-direction:column;gap:8px;animation:_ngcontent-%COMP%_au-rise .5s var(--ease) .2s both}.lr-week[_ngcontent-%COMP%]{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-faint);margin:16px 4px 6px;font-family:JetBrains Mono,monospace}.lr-week[_ngcontent-%COMP%]:first-child{margin-top:8px}.lr-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;cursor:pointer;border-radius:16px;padding:14px 16px;transition:transform .18s var(--ease),border-color .18s var(--ease);background:var(--glass);border:1px solid var(--glass-border);backdrop-filter:blur(18px) saturate(100%);-webkit-backdrop-filter:blur(18px) saturate(100%);box-shadow:var(--card-shadow);box-shadow:none}.lr-item[_ngcontent-%COMP%]:hover{transform:translateY(-2px);border-color:var(--glass-border-hi)}.lr-item--done[_ngcontent-%COMP%]{opacity:.82}.lr-item--today[_ngcontent-%COMP%]{position:relative;overflow:hidden;padding:16px;border-color:#60a5fa66;background:var(--glass-strong);box-shadow:var(--card-shadow)}.lr-item--today[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0 auto 0 0;width:4px;background:var(--accent)}.lr-item--today[_ngcontent-%COMP%]   .lr-item__title[_ngcontent-%COMP%]{font-weight:700}.lr-item__circle[_ngcontent-%COMP%]{width:38px;height:38px;flex-shrink:0;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:var(--on-color)}.lr-item__body[_ngcontent-%COMP%]{flex:1;min-width:0}.lr-item__row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.lr-item__title[_ngcontent-%COMP%]{font-size:14.5px;font-weight:600;color:var(--text-hi)}.lr-item__cat[_ngcontent-%COMP%]{font-size:11px;font-weight:700}.lr-item__today-chip[_ngcontent-%COMP%]{font-size:10.5px;font-weight:700;color:var(--accent);background:#60a5fa26;border-radius:999px;padding:2px 8px}.lr-item__desc[_ngcontent-%COMP%]{font-size:12.5px;color:var(--text-dim);margin-top:3px}.lr-item__actions[_ngcontent-%COMP%]{flex-shrink:0}.lr-item__tick[_ngcontent-%COMP%]{width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border-radius:9px;background:var(--glass-2);border:1px solid var(--glass-border);color:var(--text-dim);font-size:13px;transition:background .15s var(--ease),color .15s var(--ease),border-color .15s var(--ease)}.lr-item__tick[_ngcontent-%COMP%]:hover{background:#2dd4a72e;border-color:#2dd4a766;color:var(--dollar)}.lr-footer[_ngcontent-%COMP%]{margin-top:40px;text-align:center;font-size:12.5px;color:var(--text-faint)}.lr-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 4px}.lr-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--accent);text-decoration:none}.lr-reader[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_au-rise .4s var(--ease) both}.lr-reader__bar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:24px}.lr-reader__back[_ngcontent-%COMP%]{font-family:inherit;cursor:pointer;font-size:13px;color:var(--text);background:var(--glass);border:1px solid var(--glass-border);border-radius:12px;padding:9px 15px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background .2s var(--ease),border-color .2s var(--ease)}.lr-reader__back[_ngcontent-%COMP%]:hover{background:var(--glass-2);border-color:var(--glass-border-hi)}.lr-reader__day-badge[_ngcontent-%COMP%]{font-size:12px;font-weight:700;color:var(--on-color);border-radius:999px;padding:6px 14px}.lr-reader__done[_ngcontent-%COMP%]{font-family:inherit;cursor:pointer;font-size:13px;font-weight:700;color:#06210f;background:var(--dollar);border:none;border-radius:12px;padding:9px 15px;transition:transform .15s var(--ease),filter .15s var(--ease)}.lr-reader__done[_ngcontent-%COMP%]:hover{transform:translateY(-1px);filter:brightness(1.05)}.lr-reader__done-badge[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:var(--dollar);background:#2dd4a71f;border:1px solid rgba(45,212,167,.3);border-radius:12px;padding:9px 15px}.lr-reader__title[_ngcontent-%COMP%]{font-size:clamp(24px,6vw,32px);font-weight:800;letter-spacing:-.02em;color:var(--text-hi);margin:0 0 10px}.lr-reader__desc[_ngcontent-%COMP%]{font-size:15px;line-height:1.65;color:var(--text-dim);margin:0 0 14px}.lr-reader__file[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text);background:var(--glass);border:1px solid var(--glass-border);border-radius:10px;padding:8px 13px;margin-bottom:24px}.lr-reader__file[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:JetBrains Mono,monospace;color:var(--accent)}.lr-reader__footer[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-top:26px}.lr-reader__already-done[_ngcontent-%COMP%]{text-align:center;font-size:14.5px;font-weight:700;color:var(--dollar);border:1px solid rgba(45,212,167,.3);background:#2dd4a714;border-radius:16px;padding:15px}.lr-reader__back-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;font-family:inherit;font-size:13px;color:var(--text);text-decoration:none;cursor:pointer;background:var(--glass);border:1px solid var(--glass-border);border-radius:999px;padding:8px 15px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);transition:background .2s var(--ease),border-color .2s var(--ease),color .2s var(--ease)}.lr-reader__back-btn[_ngcontent-%COMP%]:hover{background:var(--glass-2);border-color:var(--glass-border-hi);color:var(--text-hi)}.lr-reader__back-btn[_ngcontent-%COMP%]{align-self:center;color:var(--text-dim)}.lr-cta[_ngcontent-%COMP%]{cursor:pointer;font-family:inherit;font-size:15px;font-weight:700;color:#06210f;background:linear-gradient(135deg,var(--dollar),#14B88A);border:none;border-radius:16px;padding:15px;box-shadow:0 14px 34px -14px #2dd4a7b3;transition:transform .2s var(--ease),filter .2s var(--ease)}.lr-cta[_ngcontent-%COMP%]:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.05)}.lr-cta[_ngcontent-%COMP%]:active:not(:disabled){transform:none}.lr-cta[_ngcontent-%COMP%]:disabled{opacity:.55;cursor:not-allowed}.lr-cta[_ngcontent-%COMP%]{width:100%}.lr-tabs[_ngcontent-%COMP%]{display:flex;gap:8px;margin-bottom:22px}.lr-tab[_ngcontent-%COMP%]{font-family:inherit;cursor:pointer;font-size:13.5px;font-weight:600;border-radius:12px;padding:11px 16px;color:var(--text-dim);background:var(--glass);border:1px solid var(--glass-border);transition:all .2s var(--ease)}.lr-tab--active[_ngcontent-%COMP%]{color:#fff;background:linear-gradient(135deg,var(--accent),var(--crypto));border-color:transparent;box-shadow:0 10px 26px -14px var(--accent)}.lr-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}.lr-section[_ngcontent-%COMP%]{border-radius:20px;padding:clamp(18px,4vw,24px);background:var(--glass);border:1px solid var(--glass-border);backdrop-filter:blur(22px) saturate(140%);-webkit-backdrop-filter:blur(22px) saturate(140%);box-shadow:var(--card-shadow)}.lr-section__title[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text-hi);margin:0 0 16px}.lr-keypoints[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}.lr-keypoint[_ngcontent-%COMP%]{position:relative;padding-inline-start:17px;font-size:14px;line-height:1.6;color:var(--text)}.lr-keypoint[_ngcontent-%COMP%]:before{content:"";position:absolute;inset-inline-start:0;top:8px;width:6px;height:6px;border-radius:50%;background:var(--accent)}.lr-code-label[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:var(--text-dim);margin:0 0 14px;font-family:JetBrains Mono,monospace}.lr-code[_ngcontent-%COMP%]{margin:0;overflow-x:auto;background:var(--code-bg);border:1px solid var(--hairline);border-radius:14px;padding:18px;font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:1.7;color:var(--code-text)}.lr-reference-link[_ngcontent-%COMP%]{text-decoration:none;display:flex;align-items:center;justify-content:space-between;gap:12px;border-radius:16px;border:1px solid var(--glass-border);background:var(--glass-2);padding:16px 18px;font-size:14px;font-weight:600;color:var(--accent);transition:border-color .2s var(--ease),background .2s var(--ease)}.lr-reference-link[_ngcontent-%COMP%]:hover{border-color:var(--glass-border-hi);background:var(--glass-strong)}.lr-angular-text[_ngcontent-%COMP%]{font-size:14px;line-height:1.7;color:var(--text)}.lr-tip[_ngcontent-%COMP%]{border-radius:16px;border:1px solid rgba(246,178,62,.3);background:#f6b23e14;padding:16px 18px}.lr-tip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13.5px;line-height:1.6;color:var(--text);margin:0}.lr-tip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--text-hi)}']})};export{$ as LearnReactComponent};
