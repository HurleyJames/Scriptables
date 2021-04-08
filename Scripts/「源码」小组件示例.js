// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: comments;
// 
// iOS 桌面组件脚本 @「小件件」
// 开发说明：请从 Widget 类开始编写，注释请勿修改
// https://x.im3x.cn
// 

// 添加require，是为了vscode中可以正确引入包，以获得自动补全等功能
if (typeof require === 'undefined') require = importModule
const { Base } = require("./「小件件」开发环境")

// @组件代码开始
class Widget extends Base {
    /**
     * 传递给组件的参数，可以是桌面 Parameter 数据，也可以是外部如 URLScheme 等传递的数据
     * @param {string} arg 自定义参数
     */
    constructor(arg) {
        super(arg)
        this.name = '个人资料页'
        this.desc = '常用信息'
        this.user = 'Hurley'
        this.github = 'HurleyJames'
        this.twitter = 'HurleyHuang23'
        this.weibo = '5628559861'
        this.instagram = 'hurleyhuang'
    }

    /**
     * 渲染函数，函数名固定
     * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
     */
    async render() {
        const data = await this.getData();
        const githubData = await this.getGithubData()
        const fetchData = data['data']['subsInEachSource']

        console.log(fetchData)

        // 将两个请求的数据合并
        const finalData = Object.assign(fetchData, githubData)

        console.log(finalData)


        switch (this.widgetFamily) {
            case 'large':
                return await this.renderLarge(finalData)
            case 'medium':
                return await this.renderMedium(finalData)
            default:
                return await this.renderSmall(finalData)
        }
    }

    /**
     * 渲染小尺寸组件
     */
    async renderSmall(data) {
            // 创建小部件
            // let widget = new ListWidget()
            // await this.renderHeader(widget, data['logo'], data['title'])
            // const text = widget.addText(data['content'])
            // text.font = Font.lightSystemFont(16)
            // widget.addSpacer()
            // widget.url = this.actionUrl('open-url', data['url'])
            // return widget

            let widget = new ListWidget();
            const bgColor = new LinearGradient();
            // @ts-ignore
            bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")];
            bgColor.locations = [0.0, 1.0];
            widget.backgroundGradient = bgColor;
            widget.setPadding(12, 12, 12, 0);
            widget.spacing = 6;

            // 第一行
            let firstLine = widget.addText(`[📱] ${this.user} ~$`);
            firstLine.textColor = Color.white();
            firstLine.textOpacity = 0.7;
            firstLine.font = new Font("Menlo", 11);

            // 地点栏
            let locationLine = widget.addText(`[🇬🇧] Leeds, UK`);
            // @ts-ignore
            locationLine.textColor = new Color("#F5FD9D");
            locationLine.font = new Font("Menlo", 11);

            // Github栏，显示关注者的数量
            let githubLine = widget.addText(`[👨🏻‍💻] GitHub Stars: ${data.stars}`);
            // @ts-ignore
            githubLine.textColor = new Color("#ff9468");
            githubLine.font = new Font("Menlo", 11);

            // Weibo栏，显示粉丝数量
            let weiboLine = widget.addText(`[🙋‍♂️] Weibo: ${data.weibo}`);
            // @ts-ignore
            weiboLine.textColor = new Color("#ffcc66");
            weiboLine.font = new Font("Menlo", 11);

            // Twitter栏，显示粉丝数量
            let twitterLine = widget.addText(`[💊] Twitter: ${data.twitter}`);
            // @ts-ignore
            twitterLine.textColor = new Color("#69C2D8");
            twitterLine.font = new Font("Menlo", 11);

            // Instagram栏，显示粉丝数量】
            let insLine = widget.addText(`[📸] Ins: ${data.instagram}`);
            // @ts-ignore
            insLine.textColor = new Color("#9A8DEB");
            insLine.font = new Font("Menlo", 11);

            return widget;
        }
        /**
         * 渲染中尺寸组件
         */
    async renderMedium(data, num = 3) {
            return await this.renderSmall(data);
        }
        /**
         * 渲染大尺寸组件
         */
    async renderLarge(data) {
        return await this.renderMedium(data, 10)
    }

    /**
     * 获取数据函数，函数名可不固定
     */
    async getData() {
        // const api = 'https://x.im3x.cn/v1/test-api.json'
        const api = `https://api.spencerwoo.com/substats/?source=github&queryKey=${this.github}` +
            `&source=weibo&queryKey=${this.weibo}` + `&source=twitter&queryKey=${this.twitter}` +
            `&source=instagram&queryKey=${this.instagram}`;
        return await this.httpGet(api, true, false)
    }

    /**
     * 获取 GitHub 中相关的数据
     */
     async getGithubData() {
        const api = `https://api.github-star-counter.workers.dev/user/${this.github}`;
        return await this.httpGet(api, true, false)
    }

    /**
     * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
     * @param {string} url 打开的链接
     */
    async actionOpenUrl(url) {
        Safari.openInApp(url, false)
    }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)