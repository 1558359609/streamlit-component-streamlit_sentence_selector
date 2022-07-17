import {
    Streamlit,
    ComponentProps,
    withStreamlitConnection,
} from "streamlit-component-lib"
import React, {ReactElement, ReactNode, useState, useEffect} from "react"


// 子组件定义
function ChildComponent(props: any) {
    const {handleClickThisEle, selectArr, item, isSelected} = props || {};
    const [thisSpanIsHovering, setThisSpanIsHovering] = useState(false);//当前span是不是正在被hover
    const hoverStyle = {background: 'lightblue'}//hover时样式
    const selectedStyle = {background: 'lightskyblue'}//selected时样式

    let computedNeedShowStyle = {}
    if (isSelected && thisSpanIsHovering) {
        computedNeedShowStyle = {...hoverStyle, ...selectedStyle, cursor: 'pointer'}//既被hover又被selected时背景色以selected时的背景色为主
    } else if (isSelected && !thisSpanIsHovering) {
        computedNeedShowStyle = {...selectedStyle, cursor: 'pointer'}
    } else if (!isSelected && thisSpanIsHovering) {
        computedNeedShowStyle = {...hoverStyle, cursor: 'pointer'}
    } else if (!isSelected && !thisSpanIsHovering) {
        computedNeedShowStyle = {cursor: 'pointer'}
    }

    // hover事件 - 驱动hover样式变化
    function toggleHover(type: any) {
        if (type === 'enter') {
            setThisSpanIsHovering(true)
        } else if (type === 'leave') {
            setThisSpanIsHovering(false)
        }
    }

    return (
        <span
            onClick={() => handleClickThisEle(item)}
            onMouseEnter={() => toggleHover('enter')}
            onMouseLeave={() => toggleHover('leave')}
            className={selectArr.includes(item) ? 'selected' : ''}
            style={{...computedNeedShowStyle, border: '1px #cdcdcd solid', marginRight: '3px', borderRadius: '4px'}}
        >
          {item}
        </span>
    )
}


function SentencesClickLabel({args}: ComponentProps): ReactElement {
    // const {parentPropsValue, onclickItem} = args || {};
    Streamlit.setComponentReady()
    const {sentences} = args
    var parentPropsValue = sentences

    const [selectArr, setSelectArr] = useState<any>([]);
    const [hoverStyle, setHoverStyle] = useState({}); //hover样式

    // 点击事件, 动态添加class颜色。并将选中的语句提交给父组件
    function handleClickThisEle(item: any) {
        let newSelectArr = [];
        if (selectArr.includes(item)) {
            //原来已经包含需要剔除
            newSelectArr = selectArr.filter((oldItem: any) => oldItem !== item);
        } else {
            //原来不包含需要加入
            newSelectArr = [...selectArr, item];
        }
        setSelectArr(newSelectArr);
        console.log('你选择的语句有 => ', [...newSelectArr]);

        // 抛出去给后端
        // onclickItem([...newSelectArr]);
        Streamlit.setComponentValue([...newSelectArr])
    }

    // hover事件-hover样式
    function toggleHover(type: any) {
        const nowStyle =
            type === 'enter'
                ? {
                    background: 'lightblue',
                    // padding: '3px',
                }
                : {};
        setHoverStyle(nowStyle);
    }

    useEffect(() => {
        Streamlit.setFrameHeight()
    })
    return (
        <div className="tag">
      <span
          className="sentence"
          style={{
              lineHeight: '30px',
              height: '30px',
              // marginLeft: '5px',
              // border: '1px #cdcdcd solid',
              padding: '2px',
              borderRadius: '4px',
              cursor: 'pointer',
              transitionProperty: 'all',
          }}
      >

          {parentPropsValue?.map((item: any, index: number) => {
              return (
                  <ChildComponent key={index}
                                  selectArr={selectArr}
                                  item={item} isSelected={selectArr.includes(item)}
                                  handleClickThisEle={handleClickThisEle}
                                  style={{
                                      border: '1px #cdcdcd solid'
                                  }}
                  />
              );
          })}
      </span>
        </div>
        // <div>
        //     sdfsdfsdfsd
        // </div>
    );
}


export default withStreamlitConnection(SentencesClickLabel)
