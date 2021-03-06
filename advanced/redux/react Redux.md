# 前言

## 参考

- [视频：Redux Fundamentals](https://www.bilibili.com/video/BV1RF411v7cE) | [课件](https://stevekinney.github.io/redux-fundamentals/)

- [官方文档：Redux API](https://www.redux.org.cn/docs/api/)

探究的问题：

- 将React和Redux绑定的两种方式

  - react-redux中的useSelector、useDispatch钩子
  - Connect API，mapStateToProps，mapDispatchToProps




https://codesandbox.io/s/df1j4

# 将React和Redux绑定

两种方法，

- 新的技术栈，Hook API：useSelector、useDispatch

- 旧的技术栈，Connect API：mapStateToProps，mapDispatchToProps

这两种方法的Connect API和Hook API都由react-redux库提供

## React Redux

文档：https://react-redux.js.org/api/

翻译版：https://zhuanlan.zhihu.com/p/81569230

添加依赖

``` js
cnpm install --save redux
cnpm install --save react-redux
cnpm install --save-dev redux-devtools-extension
```

react-redux库中提供了useSelector、useDispatch钩子和connect API

redux-devtools-extension库可以激活redux devtools插件，对redux进行调试

## Hooks API

基本理念：在React中，不直接操作store对象，而是通过钩子获取state派发事件

### Provider

要在应用中获取store，需要使用Provider将应用包起来，使store暴露在组件树中，之后才能用其他Hooks管理Redux store

``` jsx
import { createStore } from "redux";
import { Provider } from 'react-redux'

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### useSelector

```js
const result : any = useSelector(selector : Function, equalityFn? : Function)
```

入参

- selector，回调函数，输入为state树，输出为想要获取的state树的一部分

返回值

- 回调的输出

原理

- 监听原理：每一个useSelector都对store创建了一个独立的subscription（store.subscribe），监听了state变化
- 渲染时机：函数组件渲染时，执行selector，useSelector存储了上一次selector的返回值，与这一次的比较，不同才触发重新渲染
  - 此处的比较是`===`严格引用比较

``` jsx
import { useSelector } from 'react-redux'
// 获取state.count，count改变重新渲染
const Counter=()=>{
    const count = useSelector(state=>state.count)
    return (
        <h1>{count}</h1>
    )
}
```

### useDispatch

``` js
const dispatch = useDispatch()
```

返回 Redux store 的 分发(dispatch) 函数的引用。等价于：

``` js
// react redux里不会这么用，只是意会一下
const dispatch=store.diapatch
```

调用dispatch函数派发action

``` js
import {increment, decrement, set} from './actions'
dispatch(increment())
dispatch(decrement())
dispatch(set())
```

在这里同样可以用redux中的bindActionCreators来集成action creator，上面的语法和下面的等价

``` js
const actions=bindActionCreators(
  { increment, decrement, reset },
  dispatch
);
actions.increment()
actions.decrement()
actions.set()
```

### 练习

#### 需求

原sandbox：https://codesandbox.io/s/uo1rb

> 需求：
>
> 按钮：按下按钮改变count的值
>
> - INCREMENT，+1
> - DECREMENT，-1
> - RESET，-> 0
>
> 输入框：
>
> - count改变时输入框的值也改变
> - 按下提交后将count值置为输入框的值

<img src="E:\front-end\notes\高阶\Redux\react Redux\image-20220408153532536.png" alt="image-20220408153532536" style="zoom:50%;" />

#### 代码

mysandbox：https://codesandbox.io/s/redux-counter-zbtugj

使用useCounter封装获取dispatch，action和state的操作

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, set } from '../redux/actions';
import { bindActionCreators } from 'redux';
export const useCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const actions = bindActionCreators({ increment, decrement, set }, dispatch);
  return { count, actions };
};
```

表单组件中，表单、输入框、store的state、组件的state、输入框的value的绑定逻辑

- store的state、组件的state互相影响
  - store的state改变引起组件state改变（useEffect）
  - 表单提交时使用组件state改变store的state（onSubmit）
- 组件的state、输入框的value双向绑定
  - 组件state改变引起输入框value改变（value={value}）
  - 输入框value被用户改写时引起state改变（onChange）

``` jsx
import { useEffect, useState } from 'react';
import { useCounter } from './utils/useCounter';
export const SetCounter = () => {
  // count 与 val 相互影响
  // count改变引起val改变，val提交引起count改变
  // val 和 input.value 双向绑定
  // val改变引起input.value改变，input.value改变引起val改变
  const { count, actions } = useCounter();
  const [val, setVal] = useState(count);
  useEffect(() => {
    setVal(count);
  }, [count]);
  return (
    <section className="controls">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.set(val);
        }}
      >
        <label htmlFor="set-to">Set Count</label>
        <input
          id="set-to"
          type="number"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </section>
  );
};
```

## Connect API

### connect

[`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`](https://www.redux.org.cn/docs/react-redux/api.html#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

连接 React 组件与 Redux store。

`const NewComponent=connect(...)(OldComponent)`

连接操作不会改变原来的组件类。
反而**返回**一个新的已与 Redux store 连接的组件类。

一般只会用到前两个参数：mapStateToProps，mapDispatchToProps

注* 如果一个参数都不传，默认会把dispatch传入到组件中作为参数

``` js
const NewComponent = connect()(OldComponent);

const OldComponent=({dispatch})=>{
    // 原组件里可以接收dispatch
    dispatch({//todo})
    return (
        // todo...
    )
}
    
```

### mapStateToProps

`mapStateToProps(state, [ownProps]): stateProps` (*Function*)

作为connect函数的第一个参数，如果不传这个参数，或者传入null，组件就不会监听store

如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，`mapStateToProps` 函数就会被调用。

入参：

- state，值为store中存储的state树
- ownProps，可省略，值为传递到组件的 props，
  - ，如果传了ownProps，那么只要组件接收到新的 props，`mapStateToProps` 也会被调用（例如，当 props 接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）

返回值：

- stateProps，必须返回一个纯对象，这个对象会与组件的 props 合并

例子：

MenuItems需要接收store中的state.items作为输入参数

在不改变原组件的基础上，使用connect返回一个新组件，新组建能够监听store的变化，并将state.items输入到原组件

``` js
import { connect } from 'react-redux';
import { MenuItems } from '../components/MenuItems';

const mapStateToProps = (state) => {
  return {
    items: state.items
  };
};
export const MenuItemsContainer = connect(mapStateToProps)(MenuItems);
```

### mapDispatchToProps

`mapDispatchToProps(dispatch, [ownProps]): dispatchProps` (*Object* or *Function*)

mapStateToProps可以是一个**对象**：

- 每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；
- 每个方法将返回一个新的函数，函数中`dispatch`方法会将action creator的返回值作为参数执行。
- 这些属性会被合并到组件的 props 中。

mapStateToProps可以是一个**函数**：

入参：

- `dispatch`，函数，就是useDispatch产生的dispatch函数
- `ownProps`，可省略，该参数的值为传递到组件的 props，
  - 如果传了ownProps，只要组件接收到新 props，`mapDispatchToProps` 也会被调用。

返回值：对象，

- 这个对象通过 `dispatch` 函数与 action creator 以某种方式绑定在一起
- （提示：你也许会用到 Redux 的辅助函数 [`bindActionCreators()`](http://rackt.github.io/redux/docs/api/bindActionCreators.html)）。

如果省略这个 `mapDispatchToProps` 参数，默认情况下，`dispatch` 会自动注入到组件 props 中。

例子：

NewItemForm需要一个函数submitHandler作为它的输入参数，

- 并且这个 submitHandler 要跟 dispatch 绑定，调用即可派发action
- 需要派发的 action 由 addNewItem 生成

``` js
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    submitHandler: (name, price) => dispatch(addNewItem(name, price))
  };
};
// <NewItemForm submitHandler={}>

export const NewItemFormContainer = connect(
  null,
  mapDispatchToProps
)(NewItemForm);
```

也可以简写，只传对象，connect会自动把dispatch包到对象外面（bindActionCreators）：

``` js
const mapDispatchToProps = {
  submitHandler: addNewItem
};
```

### 练习

#### 需求

原sandbox：https://codesandbox.io/s/df1j4

应用实现的功能是商品价格计算器

- 可以输入商品名和商品价格添加商品
- 可以删除商品
- 可以修改商品价格和数量
- 可以选择小费比例
- 最终计算出商品价格，小费价格和总价格

state树结构：

``` js
{
    items: [
        { uuid: 1, name: "Tofu Roast", price: 14, quantity: 1 }
        { uuid: 2, name: "Vegan Ham", price: 12, quantity: 1 }
    ]
	tipPercentage: 20
}
```

给按钮绑定事件：

- add item：将表单中的item加入到state.items
- remove：去掉state.items中对应的item

给每一个商品的价格和数量输入框绑定事件：

- 修改后更新state.items中的对应item

每一次产生上述修改后要重新计算总价

<img src="E:\front-end\notes\高阶\Redux\react Redux\image-20220408194425171.png" alt="image-20220408194425171" style="zoom:50%;" />

#### 代码

我的sandbox：https://codesandbox.io/s/redux-calculator-mqt8g8

##### 商品增删改

state.items相关的action creator

``` js
export const ITEM_ADDED = 'ITEM_ADDED';
export const ITEM_DELETED = 'ITEM_DELETED';
export const ITEM_PRICE_UPDATED = 'ITEM_PRICE_UPDATED';
export const ITEM_QUANTITY_UPDATED = 'ITEM_QUANTITY_UPDATED';

export const addNewItem = (name, price) => {
  return {
    type: ITEM_ADDED,
    payload: {
      name,
      price
    }
  };
};

export const deleteItem = (uuid) => {
  return {
    type: ITEM_DELETED,
    payload: { uuid }
  };
};

export const updatePrice = (uuid, price) => {
  return {
    type: ITEM_PRICE_UPDATED,
    payload: { uuid, price }
  };
};

export const updateQuantity = (uuid, quantity) => {
  return {
    type: ITEM_QUANTITY_UPDATED,
    payload: { uuid, quantity }
  };
};
```

处理state.items部分更新的reducer

``` js
import {
  ITEM_ADDED,
  ITEM_DELETED,
  ITEM_PRICE_UPDATED,
  ITEM_QUANTITY_UPDATED
} from './actions';

let id = 1;

export const initialItems = [
  { uuid: id++, name: 'Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham', price: 12, quantity: 1 }
];

export const reducer = (state = initialItems, action) => {
  switch (action.type) {
    case ITEM_ADDED:
      const item = {
        uuid: id++,
        quantity: 1,
        name: action.payload.name,
        price: parseInt(action.payload.price, 10)
      };
      return [...state, item];
    case ITEM_DELETED:
      return state.filter((item) => item.uuid !== action.payload.uuid);
    case ITEM_PRICE_UPDATED:
      return state.map((item) => {
        return item.uuid === action.payload.uuid
          ? {
              ...item,
              price: parseInt(action.payload.price, 10)
            }
          : item;
      });
    case ITEM_QUANTITY_UPDATED:
      return state.map((item) => {
        return item.uuid === action.payload.uuid
          ? {
              ...item,
              quantity: parseInt(action.payload.quantity, 10)
            }
          : item;
      });
    default:
      return state;
  }
};

export default reducer;
```

删除、更新商品时如何派发action

``` js
import { MenuItem } from '../components/MenuItem';
import { connect } from 'react-redux';
import {
  deleteItem,
  updatePrice,
  updateQuantity
} from '../store/items/actions';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    remove: () => dispatch(deleteItem(ownProps.uuid)),
    updatePrice: (price) => dispatch(updatePrice(ownProps.uuid, price)),
    updateQuantity: (quantity) =>
      dispatch(updateQuantity(ownProps.uuid, quantity))
  };
};
export const MenuItemContainer = connect(null, mapDispatchToProps)(MenuItem);
```

MenuItem的API如下：

``` js
export const MenuItem = ({
  uuid,
  name,
  price,
  quantity,
  total,
  updatePrice = () => {},
  updateQuantity = () => {},
  remove = () => {}
}) => {
    // ...
}
```

##### 商品价格计算

商品价格的计算结果没必要放到redux store里，直接从state中取值，计算后放入组件就行了

``` js
import { connect } from 'react-redux';
import { Summary } from '../components/Summary';
const mapStateToProps = (state) => {
  const subtotal = state.items.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  const tipAmount = (state.tipPercentage * subtotal) / 100;
  const total = subtotal + tipAmount;
  return { subtotal, tipAmount, total };
};

export const SummaryContainer = connect(mapStateToProps)(Summary);
```

Summary组件的API如下

``` js
export const Summary = ({ subtotal = 0, tipAmount = 0, total = 0 }) => {
  // ...
}
```

