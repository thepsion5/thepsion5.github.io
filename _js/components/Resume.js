import SkillsTable from './SkillsTable.js';
import ActivitiesChart from './ActivitiesChart.js';

class Resume extends React.Component
{
    render()
    {
        return (
            <div className="row">
                <ActivitiesChart activities={this.props.data.activities} />
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

}
export default Resume;
