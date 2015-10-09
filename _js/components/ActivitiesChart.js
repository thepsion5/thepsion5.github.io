class ActivitiesChart extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            'container_id' : this.generateChartId(),
            'data' : this.generateChartData()
        };
    }

    generateChartData()
    {
        var chartData = {
            "values" : [],
            "labels" : [],
            "colors" : this.generateColors(this.props.activities.length)
        };

        this.props.activities.forEach(function(activity) {
            chartData.values.push(activity.hours);
            chartData.labels.push(activity.activity);
        });
        return chartData;
    }

    generateChartId()
    {
        return 'activities_container_' + (Math.floor((Math.random() * 100000) + 1));
    }

    generateColors(colorCount)
    {
        var labelColor = Raphael.color(this.props.label_color);
        //interpolate
        var increments = {
            "r" : parseInt((labelColor.r/2) / colorCount),
            "g" : parseInt((labelColor.g/2) / colorCount),
            "b" : parseInt((labelColor.b/2) / colorCount)
        };
        var colors = [];
        for(let i = 0; i < colorCount; i++) {
            let r = labelColor.r-(increments.r*i);
            let g = labelColor.g-(increments.g*i);
            let b = labelColor.b-(increments.b*i);
            colors.push('rgb('+r+','+g+','+b+')');
        }
        return colors;

    }


    componentDidMount()
    {
        this.initializeChart();
    }

    static getReadableLabel(value)
    {
        var readableValue = value + ' hours';
        if(value < 1) {
            readableValue = value * 60 + ' minutes';
        } else if(value == 1) {
            readableValue = '1 hour';
        }
        return readableValue;
    }

    initializeChart()
    {
        //Inspired by and borrowing heavily from: http://codepen.io/dshapira/pen/CJind
        //TODO: Re-render the chart on resize
        var $container = $('#' + this.state.container_id),
            backgroundColor = this.props.background_color,
            strokeColor = this.props.stroke_color,
            data = this.state.data;
        var dimensions = this.getChartDimensions($container);
        $container.css('height', dimensions.container.height + 'px');
        var paper = new Raphael($container[0], dimensions.container.width, dimensions.container.height);

        //Render the Pie Chart
        var pie = paper.piechart(dimensions.chart.x, dimensions.chart.y, dimensions.chart.radius, data.values, {
            legend: data.labels,
            legendpos: 'east',
            legendcolor: strokeColor,
            stroke: strokeColor,
            strokewidth: 1,
            colors: data.colors
        });

        //Handle hover in and out
        pie.hover(function () {
            this.sector.stop();
            this.sector.scale(1.1, 1.1, this.cx, this.cy);

            if (this.label) {
                this.label[0].stop();
                this.label[0].attr({ r: 8.5 });
                this.label[1].attr({ "font-weight": 800 });
                centerLabel.stop();
                centerLabel.attr('text', ActivitiesChart.getReadableLabel(this.value.value));
                centerLabel.animate({ 'opacity': 1.0 }, 200);
            }
        }, function () {
            this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");
            this.sector.animate({ 'stroke': strokeColor }, 400);
            if (this.label) {
                this.label[0].attr({ r: 5 });
                this.label[1].attr({ "font-weight": 400 });
                centerLabel.stop();
                centerLabel.animate({ 'opacity': 0.0 }, 500);
            }
        });

        //Render the inner circle that turns the chart from Pie to Donut (delicious)
        paper.circle(dimensions.chart.x, dimensions.chart.y, dimensions.chart.inner_radius)
            .attr({'fill': backgroundColor, 'stroke': strokeColor});

        //Render the center label
        var centerLabel = paper.text(dimensions.chart.x, dimensions.chart.y, '')
            .attr({'fill': strokeColor, 'font-size': 16, "font-weight": 800, 'opacity': 0.0 });
    }

    getChartDimensions($container)
    {
        var baseWidth = parseInt($container.css('width'));
        return {
            'chart' : {
                'x' : baseWidth / 3,
                'y' : baseWidth / 4,
                'radius' : baseWidth / 5,
                'inner_radius' : (baseWidth / 9)
            },
            'container' : {
                'width' : baseWidth,
                'height' : baseWidth / 2
            }
        };
    }

    render()
    {
        return (
            <div className="chart-container" id={this.state.container_id} />
        );
    }
}

ActivitiesChart.defaultProps = {
    "activities" : [],
    "background_color" : "#FFF",
    "stroke_color" : "#000",
    "label_color" : "#AAA"
};

export default ActivitiesChart