import SkillsTable from './SkillsTable.js';
import ActivitiesChart from './ActivitiesChart.js';

class Resume extends React.Component
{
    render()
    {
        return (
            <div className="row">
                <ActivitiesChart activities={this.props.data.activities} />
                <SkillsTable skills={this.props.data.skills} />
            </div>
        );
    }

}
export default Resume;
