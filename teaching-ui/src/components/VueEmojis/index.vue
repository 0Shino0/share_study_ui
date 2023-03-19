<template>
  <ul class="emoji-container">
    <li
      class="emojiList"
      v-for="(item, index) in emojis"
      :key="index"
      @click="handleEmoji(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "VueEmojis",
  data() {
    return {
      emojis: [
        "😀",
        "😄",
        "😅",
        "🤣",
        "😂",
        "😉",
        "😊",
        "😍",
        "😘",
        "😜",
        "😝",
        "😏",
        "😒",
        "🙄",
        "😔",
        "😴",
        "😷",
        "🤮",
        "🥵",
        "😎",
        "😮",
        "😰",
        "😭",
        "😱",
        "😩",
        "😡",
        "💀",
        "👽",
        "🤓",
        "🥳",
        "😺",
        "😹",
        "😻",
        "🤚",
        "💩",
        "👍",
        "👎",
        "👏",
        "🙏",
        "💪",
      ],
    };
  },
  mounted() {
    this.emojis = this.emojis.map((emoji) => ({ text: emoji }));
    console.log(this.emojis);
  },
  methods: {
    handleEmoji(item) {
      // console.log(item);
      this.$bus.$emit("addEmoji", item);
    },
  },
};
</script>

<style lang="scss">
.emoji-container {
  position: absolute;
  width: 368px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;

  .emojiList {
    width: 22px;
    list-style: none;
    margin: 8px 12px;
    cursor: pointer;
  }
}
</style>
