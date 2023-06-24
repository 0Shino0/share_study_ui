<script lang="ts">
// 这是一个基于 TypeScript 的 Vue 组件
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { register, getCollegeList } from "@/api/login";
import { CollegeMember } from "@/views/register/index.vue";

export default defineComponent({
  emits: ["getTagNameChild"],
  setup(props, context) {
    // 在这里声明数据，或者编写函数并在这里执行它
    // 在使用 setup 的情况下，请牢记一点：不能再用 this 来获取 Vue 实例

    // dom
    const radios = ref<HTMLElement[]>([]);
    const selectRadio = ref<string>("哈尔滨商业大学");

    // 高校名 + 高校代码
    const collegeList = ref<object[]>([]);
    const testCollegeList = ref<CollegeMember[]>([
      {
        id: "1427935141213123341",
        name: "大学计算机基础",
        code: "22222",
      },
      {
        id: "1527935942213023441",
        name: "大学计算机程序设计(Python)",
        code: "11011",
      },
      {
        id: "162796594229305344133",
        name: "操作系统",
        code: "10240",
      },
      {
        id: "1640264651585437697",
        name: "习近平新时代中国特色社会主义思想概论",
        code: "10245",
      },
      {
        id: "1640265176313839617",
        name: "思想道德与法治",
        code: "13304",
      },
    ]);
    // 生命周期钩子
    onMounted(() => {
      // getCollegeListInfo();
      // handleClick(
      //   {
      //     id: "1627965942293053441",
      //     name: "哈尔滨商业大学",
      //     code: "10240",
      //   },
      //   2
      // );
    });

    // 方法 methods
    const getCollegeListInfo = async () => {
      const { data } = await getCollegeList();
      collegeList.value = data;
    };

    const handleClick = (currentItem: CollegeMember, index: number) => {
      context.emit("getTagNameChild", currentItem.name);
      selectRadio.value = currentItem.name;
    };

    // 计算方法 computed

    // 监听 watch

    return {
      // 需要给 `<template />` 用的数据或函数，在这里 `return` 出去
      collegeList,
      testCollegeList,
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
        v-for="(collegeItem, index) in testCollegeList"
        :key="collegeItem.code"
      >
        <input
          type="radio"
          name="post-tag-top"
          :value="collegeItem.name"
          v-model="selectRadio"
          @click="handleClick(collegeItem, index)"
        />
        <span class="post-tag-top-name">{{ collegeItem.name }}</span>
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
