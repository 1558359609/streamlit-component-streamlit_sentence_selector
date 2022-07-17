import React, {useState} from 'react';
//姐夫帮忙改的源代码
// 函数组件定义
function SentencesClickLabel(props: any) {
    const {parentPropsValue, onclickItem} = props || {};
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
        onclickItem([...newSelectArr]);
    }

    // hover事件-hover样式
    function toggleHover(type: any) {
        const nowStyle =
            type === 'enter'
                ? {
                    background: 'lightblue',
                    padding: '3px',
                }
                : {};

        setHoverStyle(nowStyle);
    }

    return (
        <div className="tag">
      <span
          className="sentence"
          style={{
              lineHeight: '30px',
              height: '30px',
              marginLeft: '5px',
              border: '1px #cdcdcd solid',
              padding: '2px',
              borderRadius: '4px',
              cursor: 'pointer',
              transitionProperty: 'all',
          }}
      >
        {parentPropsValue?.map((item: any, index: number) => {
            return (
                <span
                    key={index}
                    onClick={() => handleClickThisEle(item)}
                    onMouseEnter={() => toggleHover('enter')}
                    onMouseLeave={() => toggleHover('leave')}
                    className={selectArr.includes(item) ? 'selected' : ''}
                    style={
                        selectArr.includes(item)
                            ? {...hoverStyle, background: 'lightgreen', cursor: 'pointer'}
                            : {...hoverStyle, cursor: 'pointer'}
                    }
                >
              {item}
            </span>
            );
        })}
      </span>
        </div>
    );
}

// 组件导出
export default SentencesClickLabel;
