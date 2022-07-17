
<!--少林帮忙写的代码-->
<template>
  <div class="tag">
    <span class="sentence" @click.stop="handleClick($event, item)" v-for="(item) in sentence">
       <span :class="handleClick">{{ item }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: "SentenceTag",
  props: {
    // 父组件传入的值
    value: {
      type: String,
      default: "的确，现在塑料袋用多了，对环境污染大。不信?你看洪水退了的河岸上,挂满了五颜六色的小旗，难道那是一道美丽的风景线吗?在电视里，你不常看到许多学生在街道旁，火车道边捡拾“白色垃圾”，这就是人们乱扔塑料袋的结果。"
    }
  },
  data() {
    return {
      // 选中的语句
      selectedSentence: []
    }
  },
  computed: {
    // 将传入的文本正则切割为语句
    sentence() {
      const separator = /(\S*?[。?？!！])/gi
      return this.value.match(separator);
    }
  },
  methods: {
    // 点击事件, 动态添加class颜色。并将选中的语句提交给父组件
    handleClick(e, item) {
      if (!this.selectedSentence.includes(item)) {
        e.target.classList.add('selected')
        this.selectedSentence.push(item)
      } else {
        this.selectedSentence = this.selectedSentence.filter(sentence => sentence !== item)
        e.target.classList.remove('selected')
      }
      console.log('你选择的语句有 => ', this.selectedSentence)
      this.$emit('onclickItem', this.selectedSentence)
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  .sentence {
    line-height: 30px;
    height: 30px;
    margin-left: 5px;
    border: 1px #cdcdcd solid;
    padding: 2px;
    border-radius: 4px;
    cursor: pointer;
    transition-property: all;

    &:hover {
      background: lightblue;
      padding: 3px;
    }

    .selected {
      background: lightgreen;
    }
  }
}
</style>