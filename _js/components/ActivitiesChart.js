class ActivitiesChart extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {

        };
    }

    componentDidMount()
    {
        this.initializeChart();
    }

    initializeChart()
    {
        console.log(this.props);
        var $container = $(this.props.container);
        var containerHeight = parseInt($container.css('height')),
            containerWidth  = parseInt($container.css('width')),
            radius  = Math.min(containerWidth, containerHeight) / 3,
            backgroundColor = this.props.background_color,
            data = this.generateChartData();
        //TODO: Actually generate the chart here
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
                <div id="activities-chart">Visualize this chart mentally until I actually do it.</div>
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