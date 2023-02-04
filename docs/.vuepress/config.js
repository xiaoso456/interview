import {defaultTheme, defineUserConfig, viteBundler} from 'vuepress'
import {searchPlugin} from "@vuepress/plugin-search";

const base = "/interview"
export default defineUserConfig({
    lang: 'zh-CN',
    title: '精简八股',
    base: base + "/",
    head:[
        [
            // logo
            'link', { rel: 'icon', href: base +'/img/logo.svg' }
        ],
    ],
    description: '精简八股文',
    plugins: [
        // 搜索插件
        searchPlugin({
            // 搜索框显示文字
            placeholder: '搜索'
        })
    ],
    // 打包配置
    bundler: viteBundler({
        viteOptions: {},
        vuePluginOptions: {},
    }),
    theme: defaultTheme({
        colorMode: 'auto',
        navbar: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: 'Java基础',
                children: [
                    {
                        text: '基础',
                        link: '/Java基础/Java基础.md'
                    },
                    {
                        text: '关键字',
                        link: '/Java基础/Java关键字.md'
                    },
                    {
                        text: '面向对象',
                        link: '/Java基础/Java面向对象.md'
                    },
                    {
                        text: '集合',
                        link: '/Java基础/Java集合.md'
                    },
                    {
                        text: '线程',
                        link: '/Java基础/Java线程.md'
                    },
                    {
                        text: '锁',
                        link: '/Java基础/Java锁.md'
                    },
                    {
                        text: '虚拟机',
                        link: '/Java基础/Java虚拟机.md'
                    },
                    {
                        text: 'GC',
                        link: '/Java基础/JavaGC.md'
                    },
                    {
                        text: '杂',
                        link: '/Java基础/Java杂.md'
                    },
                ]
            }
        ],
        // 侧边栏最大深度，到h3标题
        sidebarDepth: 2,
        subSidebar: 'auto',

        // 底边栏
        lastUpdated: true,
        lastUpdatedText: '最后更新',
        contributors: true,
        contributorsText: '贡献者',
        editLink: true,
        editLinkText: '编辑此页',

        // 容器默认标题
        tip: '提示',
        warning: '注意',
        danger: '警告',

        repo: 'xiaoso456' + base,
        docsBranch: 'main',
        docsDir: 'docs',


    }),
})