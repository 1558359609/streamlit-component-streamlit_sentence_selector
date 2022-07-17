import {
    Streamlit,
    StreamlitComponentBase,
    withStreamlitConnection,
} from "streamlit-component-lib"
import React, {ReactNode, useState} from "react"
import {stringify} from "querystring";

//类
class SentencesClickLabel extends StreamlitComponentBase<any> {
    // 点击事件, 动态添加class颜色。并将选中的语句提交给父组件
    public useState = {selectArr: [], setSelectArr: [],hoverStyle:[]};

    //渲染方法
    public render = (): ReactNode => {

        // const {parentPropsValue, onclickItem} = props || {};
        var parentPropsValue = this.props.args["sentences"]

        // const [selectArr, setSelectArr] = useState<any>([]);
        // const [hoverStyle, setHoverStyle] = useState({}); //hover样式


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
                    onClick={() => this.handleClickThisEle(item)}
                    onMouseEnter={() => this.state.toggleHover('enter')}
                    onMouseLeave={() => this.state.toggleHover('leave')}
                    className={this.state.selectArr.includes(item) ? 'selected' : ''}
                    style={
                        this.state.selectArr.includes(item)
                            ? {...this.state.hoverStyle, background: 'lightgreen', cursor: 'pointer'}
                            : {...this.state.hoverStyle, cursor: 'pointer'}
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
    private handleClickThisEle = (item: any): void => {
        let newSelectArr = [];
        if (this.state.selectArr.includes(item)) {
            //原来已经包含需要剔除
            newSelectArr = this.state.selectArr.filter((oldItem: any) => oldItem !== item);
        } else {
            //原来不包含需要加入
            newSelectArr = [...this.state.selectArr, item];
        }
        this.state.setSelectArr(newSelectArr);
        console.log('你选择的语句有 => ', [...newSelectArr]);

        // 抛出去给后端
        // this.state.onclickItem([...newSelectArr]);
        var a = newSelectArr.join()
        this.setState(
            () => Streamlit.setComponentValue(a)
        )
    }
    // hover事件-hover样式
    private toggleHover(type: any) {
        const nowStyle =
            type === 'enter'
                ? {
                    background: 'lightblue',
                    padding: '3px',
                }
                : {};
        this.state.setHoverStyle(nowStyle);
    }
}

export default withStreamlitConnection(SentencesClickLabel)
