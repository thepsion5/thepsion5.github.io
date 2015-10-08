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
            "colors" : []
        };

        var colorsByCategory = this.props.label_colors;
        this.props.activities.forEach(function(activity) {
            chartData.values.push(activity.hours);
            chartData.labels.push(activity.activity);
            let color = (colorsByCategory[activity.category]) ? colorsByCategory[activity.category] : colorsByCategory.default;
            chartData.colors.push(color);
        });
        return chartData;
    }

    generateChartId()
    {
        return 'activities_container_' + (Math.floor((Math.random() * 100000) + 1));
    }


    componentDidMount()
    {
        this.initializeChart();
    }

    //TODO: Break labels into two lines when they would collide with the donut
    static getReadableLabel(value, label)
    {
        var readableValue = value + ' hours';
        if(value < 1) {
            readableValue = value * 60 + ' minutes';
        } else if(value == 1) {
            readableValue = '1 hour';
        }
        readableValue += "\n" + label[0].textContent;

        return readableValue;
    }



    initializeChart()
    {
        //Inspired by and borrowing heavily from: http://codepen.io/dshapira/pen/CJind
        //TODO: Re-render the chart on resize
        var $container = $(this.props.container);
        var backgroundColor = this.props.background_color,
            strokeColor = this.props.stroke_color,
            data = this.generateChartData();

        var dimensions = this.getChartDimensions($container, data);
        $container.css('height', dimensions.container.height + 'px');
        var paper = new Raphael($container[0], dimensions.container.width, dimensions.container.height);

        //Render the Pie Chart
        var pie = paper.piechart(dimensions.chart.x, dimensions.chart.y, dimensions.chart.radius, data.values, {
            legend: data.labels,
            legendpos: 'south',
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
                centerLabel.attr('text', ActivitiesChart.getReadableLabel(this.value.value, this.label[1]));
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

    getChartDimensions($container, chartData)
    {
        var labelOffset = 14 * chartData.values.length;
        var baseWidth = parseInt($container.css('width'));
        return {
            'chart' : {
                'x' : baseWidth / 2,
                'y' : baseWidth / 2,
                'radius' : baseWidth / 3,
                'inner_radius' : (baseWidth / 3) * 0.6
            },
            'container' : {
                'width' : baseWidth,
                'height' : baseWidth + 10 + labelOffset
            }
        };
    }

    generateChartData()
    {
        var chartData = {
            "values" : [],
            "labels" : [],
            "colors" : []
        };

        var colorsByCategory = this.props.label_colors;
        this.props.activities.forEach(function(activity) {
            chartData.values.push(activity.hours);
            chartData.labels.push(activity.activity);
            let color = (colorsByCategory[activity.category]) ? colorsByCategory[activity.category] : colorsByCategory.default;
            chartData.colors.push(color);
        });
        return chartData;
    }

    render()
    {
        return (
            <div className="col-sm-6">
                <h3>My Average Day</h3>
                <div id="activities-chart" />
            </div>
        );
    }
}

ActivitiesChart.defaultProps = {
    "activities" : [],
    "container" : "#activities-chart",
    "donut_size" : 0.5,
    "background_color" : "#FFF",
    "stroke_color" : "#000",
    "label_colors" : {
        "professional" : "#FAA",
        "personal" : "#AAF",
        "sleep" : "#AFA",
        "default" : "#AAA"
    }
};

export default ActivitiesChart