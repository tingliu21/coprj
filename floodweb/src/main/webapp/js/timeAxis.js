;(function ($, window, document) {
    var defaults = {
        data: [], // 展示数据
        id: '', // 判定dom ID
        props: { // 参数反显字段各1?7
            name: 'name',
            key: 'time',
        },
        index: 0, //默认当前选中
        width: '150px',
    };

    var TimeAxis = function (options, callback) {
        this.options = Object.assign(defaults, options);
        this.props = this.options.props;
        this.id = this.options.id;
        this.width = this.options.width;
        this.changeDate = callback;
        this.init();
    };

    TimeAxis.prototype = {

        // 组件初始匄1?7
        init: function () {
            // 生成时间轴盒子html
            this.setTimeBox();
        },

        // 生成时间轴盒子html
        setTimeBox: function () {
            var id = "#" + this.id;
            var html = '<span><</span> <div class="cx-time-box"> <ul></ul></div><span>></span>';
            $(id).empty().append(html);
            // 生成时间轴html
            this.setTimeAxisHtml();

            var self = this;

            $(id + '>span:first').on('click', function () {
                self.timeAxisMove(-1);
            });

            $(id + '>span:last').on('click', function () {
                self.timeAxisMove(1);
            })
        },

        // 生成时间轴html
        setTimeAxisHtml: function () {
            var list = this.options.data || [];
            var html = '';
            var self = this;
            $.each(list, function (index, item) {
                html += '<li class="cx-round-box cx-round-box'+index+'">';
                html += '<div class="cx-time-top">'+item[self.props.name]+'</div>';
                html += '<div class="cx-time-round" data-index="'+index+'"></div>';
                html += '<div class="cx-time-bottom">'+item[self.props.key]+'</div>';
                html += '</li>';
                if(index != list.length - 1){
                    html += '<li class="cx-time-line" style="width: '+ self.width +'"></li>';
                }
            });
            var cls = "#" + this.id + ' ul';
            $(cls).empty().append(html);
            $(cls + ' .cx-time-round').on('click', function () {
                self.options.index = $(this).data('index');
                self.timeAxisActive();
            })
            this.timeAxisMove(0);
        },

        //点击连边移动选中时间节点
        timeAxisMove: function (num){
            var list = this.options.data || [];
            this.options.index += num;
            if(this.options.index < 0){
                this.options.index = list.length - 1;
            }
            if(this.options.index > list.length - 1){
                this.options.index = 0;
            }
            this.timeAxisRoll();
            this.timeAxisActive(this.options.index);
        },

        //选中节点左右滚动
        timeAxisRoll: function (){
            var list = this.options.data || [];

            var width = parseInt(this.width);
            var roll = -(this.options.index * width);
            var widthBox = $('.cx-time-box').width();//时间轴宽度盒子??宽庄1?7
            var widthBox1 = Math.abs(list.length * width); //实际总宽庄1?7
            if(widthBox > widthBox1){
                return
            }
            var i = parseInt(widthBox/width);//显示时间轴条敄1?7

            var timeAxisLast = this.options.index == list.length -1//是否选中的最后一个参敄1?7

            if(timeAxisLast){
                roll =  -(widthBox1 - widthBox);
            }

            if(this.options.index + i > list.length && !timeAxisLast){
                return
            }

            var cla = "#" + this.id + ' ul li';
            $(cla).animate({
                'left': roll + 'px'
            });
        },

        // 前后滑动点击事件
        timeAxisActive: function (num) {
            $('.cx-round-box').removeClass('cx-time-active');
            $('.cx-round-box' + this.options.index).addClass('cx-time-active');
            this.changeDate()
        }
    };
    window.oTimeAxios = TimeAxis;
})(jQuery, window, document);