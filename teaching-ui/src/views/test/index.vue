<template>
  <div class="introduce-container">
    <!-- Swiper测试 -->
    <div class="introduce-text-container">
      <div class="title">基于区块链的教学资源共享平台</div>
      <div class="intro">
        利用区块链技术搭建课程资源共享平台，通过“共享账本”可以实现方便、快捷、灵活、低成本的共享多种数据格式的课程资源，打造“轻共享”、多边交流的新模式，以利于个性化的课程资源建设
      </div>
      <button class="intro-tologin" @click="toLogin">
        登录
        <div class="arrow-wrapper">
          <div class="arrow"></div>
        </div>
      </button>
      <div class="intro-bg-img01">
        <img src="@/assets/img/Coding _Two Color.png" alt="代码" />
      </div>
      <div class="intro-bg-img02">
        <img src="@/assets/img/Java_Two Color.png" alt="代码" />
      </div>
      <div class="intro-bg-img03">
        <img src="@/assets/img/Python_Flatline.png" alt="代码" />
      </div>
      <div class="intro-bg-img04">
        <img src="@/assets/img/Javascript_Two Color.png" alt="代码" />
      </div>

      <!-- <div class="loader"></div> -->
    </div>

    <!-- 系统架构介绍 -->
    <div class="intro-framework-stack">
      <div class="framework-intro-container">
        <div class="framework-intro">
          <div class="framework-title">系统架构图</div>
          <div class="framework-description">
            前端系统使用目前主流的JavaScript框架——Vue+Element
            UI进行搭建，前后端交互通过RestFul风格约定接口格式，后端系统拿到数据之后进行参数校验、请求处理、响应脱敏、文件传输、增加操作区块等操作，后端系统对接数据库系统和区块链系统，前者负责对实体数据的持久化操作，后者负责对操作数据的持久化操作，最终实现整个系统的正向循环。<br />
            该项目的结构严格按照目前主流的商业软件架构标准进行设计，实现低耦合，高内聚的软件设计目标，后期维护项目简单方便，贯彻分布式项目思想，可拓展性强，系统鲁棒性强。
          </div>
        </div>
        <div class="framework-img">
          <img
            src="@/assets/img/整体系统架构设计图.png"
            alt="整体系统架构设计图"
          />
        </div>
      </div>
    </div>

    <!-- 技术栈介绍 -->
    <div class="intro-skill-stack">
      <div class="skill-container">
        <div class="skill-left-icon">
          <div class="up">
            <button class="card1" @click="changeActive('vue')">
              <i class="iconfont icon-Vue vue" style="font-size: 30px"></i>
            </button>
            <button class="card2" @click="changeActive('java')">
              <i class="iconfont icon-java java" style="font-size: 30px"></i>
            </button>
          </div>
          <div class="down">
            <button class="card3" @click="changeActive('hyperledger')">
              <i
                class="iconfont icon-hyperledger hyperledger"
                style="font-size: 30px"
              ></i>
            </button>
          </div>
        </div>
        <div class="skill-intro" v-if="btnActive === 'vue'">
          <div class="skill-title">前端技术栈</div>
          <!-- vue -->
          <div
            class="swiper-container swiper-container-vue"
            v-if="btnActive === 'vue'"
          >
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-slide1 skill-intro-item">
                <div class="skill-item-title">Vue渐进式JS框架</div>
                <div class="skill-description">
                  Vue是一款功能强大的JavaScript框架，它可以用于构建用户界面并且覆盖了很多前端开发中常见的需求。Vue的特点包括轻量级、响应式、组件化、虚拟DOM等，并且拥有丰富的生态。例如，Vuex可以帮助管理状态，VueRouter可以帮助管理路由，Vue-cli可以帮助构建脚手架，而Devtools则可以帮助调试。使用Vue的开发者可以借助这些工具更方便地解决问题，提高开发效率。<br /><br />
                  在网络请求方面，我们可以选择基于Promise的Axios库来实现请求。Axios支持创建XMLHttpRequest、异步Promise
                  API以及请求和响应的拦截。借助Axios，我们可以更方便地实现数据的请求和处理。同时，我们可以通过封装和拓展Axios的一些功能来满足不同的需求。
                </div>
              </div>
              <div class="swiper-slide swiper-slide3">
                <div class="skill-item-title">组件库框架</div>
                <div class="skill-description">
                  Element UI是一套为开发者、设计师和产品经理准备的基于Vue
                  2.0的桌面端元组件库，但并不依赖于Vue，是一个十分适合Vue项目的框架，可使用Element
                  UI轻松制作出网页。<br /><br />
                  ECharts是一个开源可视化库，提供直观，交互丰富，可高度个性化定制的数据可视化图表。
                </div>
              </div>
              <div class="swiper-slide swiper-slide2">
                <div class="skill-item-title">Webpack构建工具</div>
                <div class="skill-description">
                  Webpack是一个用于现代JavaScript应用程序的
                  静态模块打包工具。它会在内部从一个或多个入口点构建一个依赖图(Dependency
                  Graph)，可以帮助项目对资源文件的压缩，比如JS压缩、CSS压缩、编译模板文件等待，从而减少前端的工作量。
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
          </div>
        </div>

        <div class="skill-intro" v-if="btnActive === 'java'">
          <div class="skill-title">后端技术栈</div>
          <div class="swiper-container swiper-container-java">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-slide1 skill-intro-item">
                <div class="skill-item-title">SpringBoot轻量级Java框架</div>
                <div class="skill-description">
                  Spring
                  Framework是一个开源的Java轻量级框架，它通过依赖注入（Dependency
                  Injection）和面向切面编程（Aspect Oriented
                  Programming）等技术为开发者提供了一个全面的编程和配置模型。它可以降低Java开发的复杂度，提高代码的可维护性和可测试性。<br /><br />
                  SpringBoot框架是基于Spring Framework
                  4.0的设计，不仅继承了Spring
                  Framework原有的优秀特性，而且还通过简化配置文件来进一步优化了Spring应用的整个搭建和开发过程。另SpringBoot通过集成大量的框架使得依赖包的版本冲突，以及引用的不稳定性等问题得到了良好的解决。
                </div>
              </div>
              <div class="swiper-slide swiper-slide3">
                <div class="skill-item-title">Mybatis-Plus 数据库框架</div>
                <div class="skill-description">
                  MyBatis最初是Apache的一个开源项目，同时是一个基于Java的持久层框架。iBatis提供的持久层框架包括SQL
                  Maps和Data Access
                  Objects（DAO）。MyBatis支持定制化SQL、存储过程以及高级映射，避免了几乎所有的JDBC代码和手动设置参数以及结果集解析操作，同时MyBatis是一个半自动的ORM（Object
                  Relation Mapping）框架。 <br /><br />
                  MyBatis-Plus是一个MyBatis的增强工具，在MyBatis的基础上只做增强不做改变，为简化开发、提高效率而生。
                </div>
              </div>
              <div class="swiper-slide swiper-slide2">
                <div class="skill-item-title">OSS对象存储服务技术</div>
                <div class="skill-description">
                  针对于该项目需要堆放大量课程资料的需求，使用OSS对象存储服务来进行文件存储；结合项目架构适配需求，在各大云服务厂商的相关产品中，该项目选择腾讯云的存储服务，使用OSS的优点如下：<br />
                  （1）文件上传下载速度不受项目服务器自身的影响，同时也不影响项目本身；<br />
                  （2）传输速度相较于直接存储在项目服务器中得到极大提升；<br />
                  （3）腾讯云自身的安防措施为项目提供了数据安全的保障；<br />
                  （4）对于项目而言，腾讯云对象存储服务相对资费较低，减少项目成本。<br />
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
          </div>
        </div>
        <div class="skill-intro" v-if="btnActive === 'hyperledger'">
          <div class="skill-title">区块链技术栈</div>
          <div class="swiper-container swiper-container-hyperledger">
            <div class="swiper-wrapper">
              <div class="swiper-slide swiper-slide1 skill-intro-item">
                <div class="skill-item-title">Hyperledger Fabric框架</div>
                <div class="skill-description">
                  Hyperledger
                  Fabric是最流行的区块链开发框架之一，主要用来搭建区块链网络，用链码实现Fabric链上数据加密/解密，主要特点有可插拔组件、支持私密交易的通道、适合联盟链应用的开发。
                </div>
              </div>
              <div class="swiper-slide swiper-slide3">
                <div class="skill-item-title">
                  Hyperledger explorer区块链浏览器
                </div>
                <div class="skill-description">
                  Hyperledger
                  Explorer是一个简单，功能强大，易于使用，高度可维护的开源区块链浏览器，用于查看底层区块链网络上的活动，目的是为了能够监控链码、查看区块、调用链码等。
                </div>
              </div>
              <div class="swiper-slide swiper-slide2">
                <div class="skill-item-title">Prometheus + Grafana监控服务</div>
                <div class="skill-description">
                  Prometheus是一个开源的监控系统，由监控服务、告警服务、时序数据库等几个部分，及周边生态的各种指标收集器（Exporter）组成，是在当下主流的云原生监控告警系统，自动发现监控端点,
                  提供了动态的监控能力。<br /><br />
                  Grafana是用于可视化大型测量数据的开源程序，他提供了强大和优雅的方式去创建、共享、浏览数据。
                </div>
              </div>
              <div class="swiper-slide swiper-slide4">
                <div class="skill-item-title">Fabric Gateway</div>
                <div class="skill-description">
                  Fabric
                  Gateway提供给应用与Fabric网络交互的SDK，用Java来实现。目的是让客户端应用开发者能够专注于业务逻辑，而不必关系Fabric的基础架构逻辑。
                </div>
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <!-- <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
  <a href="https://www.flaticon.com/free-icons/teacher" title="teacher icons">Teacher icons created by Freepik - Flaticon</a>
   -->
</template>

<script>
import Swiper from "swiper"; // 注意引入的是Swiper
import "swiper/css/swiper.min.css"; // 注意这里的引入

export default {
  name: "Test",

  data() {
    return {
      btnActive: "vue",
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: {
        delay: 3000, // 每次轮播间隔的ms数，默认3000ms
        stopOnLastSlide: false, // 播放完最后一张图片后是否停留在最后一张图片上，停止继续轮播。默认false
        disableOnInteraction: false, // 用户操作轮播图后，比如点击轮播按钮或小圆点，停止轮播
      },
      loop: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      observeSlideChildren: true,
      pagination: {
        el: ".swiper-pagination",
      },
      // navigation: {
      //   nextEl: ".swiper-button-next", // 右按钮
      //   prevEl: ".swiper-button-prev", // 左按钮
      // },
      // effect: "fade",
      // 其他配置...
    });
  },
  methods: {
    toLogin() {
      if (window.location.href.split("#")[1] !== "/login") {
        this.$router.push({ path: "/login" });
      }
    },
    changeActive(val) {
      this.btnActive = val;

      this.$nextTick(() => {
        console.log(1);
        new Swiper(".swiper-container", {
          autoplay: {
            delay: 3000, // 每次轮播间隔的ms数，默认3000ms
            stopOnLastSlide: false, // 播放完最后一张图片后是否停留在最后一张图片上，停止继续轮播。默认false
            disableOnInteraction: false, // 用户操作轮播图后，比如点击轮播按钮或小圆点，停止轮播
          },
          loop: true,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          observeSlideChildren: true,
          pagination: {
            el: ".swiper-pagination",
          },
          // navigation: {
          //   nextEl: ".swiper-button-next", // 右按钮
          //   prevEl: ".swiper-button-prev", // 左按钮
          // },
          // effect: "fade",
          // 其他配置...
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.introduce-container {
  width: 100%;
  height: 1800px;
  // border: 1px solid #409eff;
  background-color: #fff;
}

.introduce-text-container {
  width: 1200px;
  padding: 232px 0 120px;
  margin: 0 auto;
  position: relative;

  .title {
    // background-color: #409eff;
    font-size: 56px;
    font-weight: bold;
    text-align: center;
    font-family: Apple System, SF Pro SC, SF Pro Display, Helvetica Neue, Arial,
      PingFang SC, Hiragino Sans GB, STHeiti, Microsoft YaHei,
      Microsoft JhengHei, Source Han Sans SC, Noto Sans CJK SC,
      Source Han Sans CN, sans-serif;
    margin-bottom: 23px;
  }

  // 介绍
  .intro {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #6c7d8f;
    margin-bottom: 63px;
  }

  // 登录按钮
  .intro-tologin {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 68px;
    font-size: 16px;
  }
  button {
    --primary-color: #645bff;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
  }

  button .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
  }

  button .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }

  button:hover {
    background-color: var(--hover-color);
  }

  button:hover .arrow {
    background: var(--secondary-color);
  }

  button:hover .arrow:before {
    right: 0;
  }

  // 图片
  .intro-bg-img01 {
    position: absolute;
    top: 60px;

    img {
      width: 200px;
      transform: rotate(-0.1turn);
    }
  }

  .intro-bg-img02 {
    position: absolute;
    top: 40px;
    right: 0;
    img {
      width: 200px;
      transform: rotate(0.1turn);
    }
  }

  .intro-bg-img03 {
    position: absolute;
    top: 450px;
    right: 0;
    img {
      width: 200px;
      transform: rotate(0.4turn);
    }
  }

  .intro-bg-img04 {
    position: absolute;
    top: 450px;
    left: 0;
    img {
      width: 200px;
      transform: rotate(0.6turn);
    }
  }

  // 图片动画
  .intro-bg-img01,
  .intro-bg-img02,
  .intro-bg-img03,
  .intro-bg-img04 {
    animation: envFloating 1s ease-in infinite alternate;
  }

  .intro-bg-img04 {
    position: absolute;
    top: 450px;
    left: 0;
    width: 200px;
    transform: rotate(0.6turn);
  }

  // 上下跳动动画
  @keyframes envFloating {
    0% {
      transform: translate(-2px, -5px);
    }

    100% {
      transform: translate(0, 5px);
    }
  }

  @keyframes envDropping {
    0% {
      background-position: 100px 11px, 115px 35px, 105px 60px;
      opacity: 1;
    }

    50% {
      background-position: 0px 11px, 20px 35px, 5px 60px;
    }

    60% {
      background-position: -30px 11px, 0px 35px, -10px 60px;
    }

    75%,
    100% {
      background-position: -30px 11px, -30px 35px, -30px 60px;
      opacity: 0;
    }
  }
}
// 架构图
.intro-framework-stack {
  background-color: #fbfbfd;
  padding-bottom: 51px;

  .framework-intro-container {
    display: flex;
    justify-content: center;
    // align-items: center;
  }

  .framework-intro {
    width: 400px;
    margin-right: 25px;
  }

  .framework-title {
    margin-top: 224px;
    font-size: 44px;
    font-weight: 700;
    color: #212930;
    text-align: left;
    white-space: nowrap;
  }

  .framework-description {
    font-size: 16px;
    font-weight: 400;
    color: #6c7d8f;
    line-height: 24px;
    word-break: break-all;
    text-align: left;
    padding-top: 36px;
    margin-bottom: 56px;
  }

  .framework-img {
    margin-top: 200px;
    text-align: center;
    img {
      width: 554px;
      border: 2px solid #fff;
      border-radius: 6px;
    }
  }
}

// 技术栈介绍
.intro-skill-stack {
  background-color: #fff;
  padding-bottom: 51px;

  .skill-container {
    display: flex;
    justify-content: center;
    // 左侧按钮
    .skill-left-icon {
      padding-top: 200px;
    }

    .skill-left-icon {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .up {
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }

    .down {
      display: flex;
      flex-direction: row;
      gap: 0.5em;
    }

    .card1 {
      width: 90px;
      height: 90px;
      outline: none;
      border: none;
      background: white;
      border-radius: 90px 5px 5px 5px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      transition: 0.2s ease-in-out;
    }

    .vue {
      margin-top: 2em;
      margin-left: 1em;
      // fill: #cc39a4;
      // color: #41b883;
    }

    .card2 {
      width: 90px;
      height: 90px;
      outline: none;
      border: none;
      background: white;
      border-radius: 5px 90px 5px 5px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      transition: 0.2s ease-in-out;
    }

    .java {
      margin-top: 1.5em;
      margin-left: -0.9em;
      // fill: #03a9f4;
      color: #03a9f4;
    }

    .card3 {
      width: 188px;
      height: 90px;
      outline: none;
      border: none;
      background: white;
      border-radius: 5px 5px 90px 90px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      transition: 0.2s ease-in-out;
    }

    .hyperledger {
      margin-top: -0.6em;
      margin-left: 0;
    }

    .card1:hover {
      cursor: pointer;
      scale: 1.1;
      background-color: #41b883;
    }

    .card1:hover .vue {
      // fill: white;
      color: white;
    }

    .card2:hover {
      cursor: pointer;
      scale: 1.1;
      background-color: #03a9f4;
    }

    .card2:hover .java {
      // fill: white;
      color: white;
    }

    .card3:hover {
      cursor: pointer;
      scale: 1.1;
      background-color: black;
    }

    .card3:hover .hyperledger {
      // fill: white;
      color: white;
    }

    // .card4:hover {
    //   cursor: pointer;
    //   scale: 1.1;
    //   background-color: #8c9eff;
    // }

    // .card4:hover .discord {
    //   // fill: white;
    //   color: white;
    // }

    // 右侧描述
    .skill-intro {
      width: 500px;
      margin-left: 154px;
    }

    .skill-intro-item {
      width: 100%;
      position: relative;
      // right: 400px;
    }

    .skill-title {
      // margin-top: 200px;
      width: 100%;
      margin-top: 110px;
      font-size: 44px;
      font-weight: 700;
      color: #212930;
      // text-align: right;
      text-align: center;
      white-space: nowrap;
    }

    .skill-item-title {
      // margin-top: 200px;
      // margin-top: 110px;
      font-size: 24px;
      font-weight: 700;
      color: #212930;
      // text-align: right;
      text-align: center;
      white-space: nowrap;
    }

    .skill-description {
      font-size: 16px;
      font-weight: 400;
      color: #6c7d8f;
      line-height: 24px;
      word-break: break-all;
      // text-align: right;
      text-align: left;
      // padding-top: 36px;
      padding-top: 10px;
      // margin-bottom: 56px;
    }
  }
}

.swiper-container {
  width: 500px;
  height: 350px;
  margin-top: 44px;
}

.swiper-slide {
  // text-align: center;
  // line-height: 400px;
  color: #b0b0b0;
}
// .swiper-slide1 {
//   background: red;
// }

// .swiper-slide2 {
//   background: blue;
// }

// .swiper-slide3 {
//   background: yellow;
// }
</style>
