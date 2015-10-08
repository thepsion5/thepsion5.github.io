import SkillsTable from './SkillsTable.js';
import ActivitiesChart from './ActivitiesChart.js';

class Resume extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            'activities_by_category' : this.groupActivitiesByCategory()
        };
    }

    groupActivitiesByCategory()
    {
        var activitiesByCategory = {};
        this.props.data.activities.forEach(function(activity) {
            if(activitiesByCategory[activity.category] == undefined) {
                activitiesByCategory[activity.category] = [];
            }
            activitiesByCategory[activity.category].push(activity);
        });
        return activitiesByCategory;
    }

    render()
    {
        var charts = this.renderActivitiesCharts();
        return (
            <div className="row">
                <div className="col-sm-6">
                    <h2>My Average Day</h2>
                    {charts}
                </div>
                <div className="col-sm-6">
                    <h2>Skills</h2>
                    <SkillsTable skills={this.props.data.skills} />
                </div>
            </div>
        );
    }

    renderActivitiesCharts()
    {
        var charts = [];
        for(var category in this.state.activities_by_category) {
            if(this.state.activities_by_category.hasOwnProperty(category)) {
                let activities = this.state.activities_by_category[category];
                charts.push(
                    <div>
                        <h3>{category}</h3>
                        <ActivitiesChart activities={activities}/>
                    </div>
                );
            }
        }
        return charts;
    }

}
export default Resume;
