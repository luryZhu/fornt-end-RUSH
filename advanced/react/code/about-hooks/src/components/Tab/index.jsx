//index.js
import React, { Component } from 'react'
import './style.css'

export default function Tab(props){
    return (
        <div className='tabPage'>
            <div className='tabWrapper'>
                <ul className='clearfix'>
                    {
                        props.children.map((item, index) => {
                            return <li className={currentTab === index ? 'avtive' : ''} onClick={() => { this.tabClickHandle(index) }}>
                                {item.tabName}
                            </li>
                        })
                    }
                </ul>
            </div>

        </div>
        
    )
}

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabList: [
                {
                    tabName: 'Tab1',
                    id: 1
                },
                {
                    tabName: 'Tab2',
                    id: 2
                },
                {
                    tabName: 'Tab3',
                    id: 3
                },
            ],
            currentTab: 0
        }
    }

    tabClickHandle = (i) => {
        this.setState({
            currentTab: i
        })
    }

    render() {
        const { tabList, currentTab } = this.state;
        return (
            //1.给每个tab标题添加一个点击事件，
            //2.在state中，存一个默认tab下标
            //3.在点击事件中，将下标传递过去，并且更新state中的下标
            //4.tabContent部分，有几个tab 放几个坑，通过当前下标去判断显示哪一个
            <div className='tabPage'>
                {
                    <div className='tabWrapper'>
                        <ul className='clearfix'>
                            {
                                tabList.map((item, index) => {
                                    return <li className={currentTab === index ? 'avtive' : ''} onClick={() => { this.tabClickHandle(index) }}>
                                        {item.tabName}
                                    </li>
                                })
                            }
                        </ul>
                        <div className={`tabContent ${currentTab === 0 ? 'show' : 'hide'}`}>1</div>
                        <div className={`tabContent ${currentTab === 1 ? 'show' : 'hide'}`}>2</div>
                        <div className={`tabContent ${currentTab === 2 ? 'show' : 'hide'}`}>3</div>
                    </div>
                }
            </div>
        )
    }
}
