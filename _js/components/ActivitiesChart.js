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

        this.props.activities.forEach(function(activity) {
            chartData.values.push(activity.hours);
            chartData.labels.push(activity.activity);
            var color = '';
            switch(activity.category) {
                case 'professional': color = "#99F"; break;
                case 'personal' : color = "#F99"; break;
                case 'sleep' : color = "#9F9"; break;
            }
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
    "colors" : ["#AAF", "#AFF", "#FAA"]
};

export default ActivitiesChart