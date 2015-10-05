import SkillsTable from './SkillsTable.js';

class Resume extends React.Component
{
    render()
    {
        return (
            <div className="row">
                <SkillsTable skills={this.props.data.skills} />
            </div>
        );
    }

}
export default Resume;
