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
        this.name = '圣诞快乐'
        this.desc = '距离圣诞还有多少天'
    }

    /**
     * 渲染函数，函数名固定
     * 可以根据 this.widgetFamily 来判断小组件尺寸，以返回不同大小的内容
     */
    async render() {
        const data = await this.getData()
        switch (this.widgetFamily) {
            case 'large':
                return await this.renderLarge(data)
            case 'medium':
                return await this.renderMedium(data)
            default:
                return await this.renderSmall()
        }
    }

    /**
     * 渲染小尺寸组件
     */
    async renderSmall() {
            // 创建小部件
            // let widget = new ListWidget()
            // await this.renderHeader(widget, data['logo'], data['title'])
            // const text = widget.addText(data['content'])
            // text.font = Font.lightSystemFont(16)
            // widget.addSpacer()
            // widget.url = this.actionUrl('open-url', data['url'])
            // return widget

            let widget = new ListWidget();
            widget.setPadding(12, 12, 12, 12);
            let title = widget.addText("🎅\n\n距离 CHRISTMAS");
            title.font = Font.mediumSystemFont(13);
            widget.addText("");
            let daysLeft = this.calculateDaysLeft();
            let daysLeftText = widget.addText(daysLeft + " 天");
            daysLeftText.textColor = this.displayByDiffColor(daysLeft);
            widget.addText("");

            let tree = widget.addText("🎄🎄🎄🎄");
            tree.font = Font.boldSystemFont(24);
            return widget;
        }
        /**
         * 渲染中尺寸组件
         */
    async renderMedium(data, num = 3) {
            let widget = new ListWidget()
            widget.setPadding(12, 12, 12, 12);
            let title = widget.addText("🎅 距离 CHRISTMAS");
            title.font = Font.mediumSystemFont(18);
            widget.addText("");
            let daysLeft = this.calculateDaysLeft();
            let daysLeftText = widget.addText(daysLeft + " 天");
            daysLeftText.font = Font.mediumSystemFont(24);
            daysLeftText.textColor = this.displayByDiffColor(daysLeft);
            widget.addText("");

            let tree = widget.addText("🎄🎄🎄🎄");
            tree.font = Font.boldSystemFont(36);
            return widget;
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
        const api = 'https://x.im3x.cn/v1/test-api.json'
        return await this.httpGet(api, true, false)
    }

    /**
     * 自定义注册点击事件，用 actionUrl 生成一个触发链接，点击后会执行下方对应的 action
     * @param {string} url 打开的链接
     */
    async actionOpenUrl(url) {
        Safari.openInApp(url, false)
    }

    /**
     * 计算距离圣诞还有多少天
     */
    calculateDaysLeft() {
        let today = new Date(Date.now());
        let christmas = new Date(Date.now());
        // 月份从0开始计算
        christmas.setMonth(11);
        christmas.setDate(24);

        // 如果今年的月份或者天数已经超过了今天的圣诞节日子
        if (today.getMonth() > christmas.getMonth() || (today.getMonth == christmas.getMonth() && today.getDay > christmas.getDay())) {
            let nextYear = christmas.getFullYear();
            nextYear += 1;
            christmas.setFullYear(nextYear);
        }

        // @ts-ignore
        christmas = christmas.getTime();
        // @ts-ignore
        today = today.getTime();
        let covertInDays = 24 * 3600 * 1000;
        // @ts-ignore
        return parseInt((christmas - today) / covertInDays);
    }

    /**
     * 根据天数显示不同的颜色
     * @param {距离天数} daysLeft
     */
    displayByDiffColor(daysLeft) {
        if (daysLeft >= 50) {
            return Color.green();
        }
        if (daysLeft >= 30) {
            return Color.yellow();
        }

        return Color.red();
    }

}
// @组件代码结束

const { Testing } = require("./「小件件」开发环境")
await Testing(Widget)