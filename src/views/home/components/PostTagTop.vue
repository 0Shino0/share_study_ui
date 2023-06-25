<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import { defineComponent, onMounted, ref, nextTick } from "vue";
import type { PropType } from "vue";
import $bus from "@libs/eventBus";
// import { register, getCollegeList } from "@/api/login";
import { CollegeMember } from "@/views/register/index.vue";
import { TagListMember } from './CollegeTagsTop.vue'

// import { getTagList } from '@/api/tag'

// type TagListMember = {
//   id: string
//   belong: string
//   name: string
// }

export default defineComponent({
  emits: ["getCollegeTagNameChild"],
  props: {
    tagList:{
      type: Object as PropType<TagListMember[]>,
    },
  },
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例

    // dom
    const radios = ref<HTMLElement[]>([]);
    // const selectRadio = ref<string>("大学计算机程序设计(Python)");
    const selectRadio = ref<TagListMember>({})
    const selectName = '大学计算机程序设计(Python)'
    // const tagList = ref<TagListMember[]>([]);

    // 生命周期钩子
    onMounted(() => {
      console.log(props.tagList);
      initSelect(props.tagList, selectName)
      // console.log(1);
    });

    // 方法 methods
    // const getTagListInfo = async () => {
    //   const { data } = await getTagList();
    //   tagList.value = data;
    // };
    const initSelect = (tagList: TagListMember[] | undefined, tagName: string) => {
      if (!tagList) return -1;
      // 查找指定 索引
      const index = tagList.findIndex((element) => {
        return element.name === tagName
      })
      if (index === -1) return -1;
      selectRadio.value = tagList[index]
      // 传递给 爷组件
      $bus.emit("getTagIdChild",selectRadio.value.id)
    }

    const handleClick = (currentItem: TagListMember, index: number) => {
      // context.emit("getCollegeTagNameChild", currentItem.name);
      // 传递id
      $bus.emit("getTagIdChild",currentItem.id)
      selectRadio.value = currentItem;
    };

    // 计算方法 computed

    // 监听 watch

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
      // tagList,
      // testCollegeList,
      radios,
      selectRadio,

      handleClick,
    };
  },
});
</script>

<template>
    <div class="post-tag-top-inputs">
      <label
        class="post-tag-top"
        ref="radios"
        v-for="(tagItem, index) in tagList"
        :key="tagItem.id"
      >
        <input
          type="radio"
          name="post-tag-top"
          :value="tagItem.name"
          v-model="selectRadio.name"
          @click="handleClick(tagItem, index)"
        />
        <span class="post-tag-top-name">{{ tagItem.name }}</span>
      </label>
    </div>
</template>

<style lang="scss">

// <= 991
@media screen and (max-width: 991px) {
  .tags-container{
    .post-tag-top-inputs{
      justify-content: start;
    }
  }

  .post-tag-top-inputs .post-tag-top .post-tag-top-name {
    font-size: 5px;
  }
}

.post-tag-top-inputs {
  // 补充
  // margin: 0 auto;
  // width: 120px;
  // width: 1000px;
  // position: fixed;
  flex-direction: row;
  flex-wrap: nowrap;
  // margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: center;
  overflow: auto;
}

.post-tag-top-inputs {
  position: relative;
  display: flex;
  // flex-wrap: wrap;
  // border-radius: 0.5rem;
  // background-color: #eee;
  border-radius: 0.2rem;
  background-color: #f9fbff;
  box-sizing: border-box;
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  // width: 300px;
  font-size: 14px;
}

.post-tag-top-inputs .post-tag-top {
  // flex: 1 1 auto;
  text-align: center;
}

.post-tag-top-inputs .post-tag-top input {
  display: none;
}

.post-tag-top-inputs .post-tag-top .post-tag-top-name {
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  // border-radius: 0.5rem;
  border-radius: 0.2rem;
  border: none;
  // padding: 0.5rem 0;
  padding: 5px 15px;
  // color: rgba(51, 65, 85, 1);
  transition: all 0.15s ease-in-out;
}

.post-tag-top-name {
  // 补充
  font-size: 14px;
  color: #515767;
}

.post-tag-top-inputs .post-tag-top input:hover + .post-tag-top-name {
  // background-color: #fff;
  background-color: #e9ecef;
  color: #409eff;
}

.post-tag-top-inputs .post-tag-top input:checked + .post-tag-top-name {
  // background-color: #fff;
  background-color: #eaf2ff;
  color: #409eff;
  font-weight: 600;
}

// 补充
.post-tag-top{
  flex-shrink: 0; // 不收缩
}
</style>
